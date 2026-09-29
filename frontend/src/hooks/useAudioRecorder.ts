"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { transcribeAudio, type TranscriptionResponse } from "@/lib/api";

// ─── MIME type negotiation ──────────────────────────────────────────────────

/** MIME types to try in order of preference. */
const PREFERRED_MIME_TYPES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/ogg;codecs=opus",
  "audio/ogg",
  "audio/mp4",
  "audio/wav",
];

function getSupportedMimeType(): string {
  if (typeof MediaRecorder === "undefined") return "";
  for (const type of PREFERRED_MIME_TYPES) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return "";
}

function extensionForMime(mime: string): string {
  if (mime.includes("webm")) return "webm";
  if (mime.includes("ogg")) return "ogg";
  if (mime.includes("mp4")) return "mp4";
  if (mime.includes("wav")) return "wav";
  return "webm";
}

// ─── Recording states ───────────────────────────────────────────────────────

export type RecordingState = "idle" | "recording" | "processing" | "success" | "error";

export interface AudioRecorderReturn {
  /** Current state of the recorder flow. */
  state: RecordingState;
  /** Human-readable error message if state === "error". */
  error: string | null;
  /** Transcription result if state === "success". */
  transcript: TranscriptionResponse | null;
  /** Elapsed recording time in seconds (ticks every second while recording). */
  elapsedSeconds: number;
  /** Begin recording from the microphone. */
  startRecording: () => Promise<void>;
  /** Stop recording and upload for transcription. */
  stopAndTranscribe: () => void;
  /** Reset back to idle so the user can record again. */
  reset: () => void;
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useAudioRecorder(): AudioRecorderReturn {
  const [state, setState] = useState<RecordingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptionResponse | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mimeRef = useRef<string>("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // ── Cleanup helpers ────────────────────────────────────────────────────

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const releaseStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimer();
      releaseStream();
    };
  }, [stopTimer, releaseStream]);

  // ── Start recording ────────────────────────────────────────────────────

  const startRecording = useCallback(async () => {
    // Guard: don't start if already recording / processing
    if (state === "recording" || state === "processing") return;

    setError(null);
    setTranscript(null);
    setElapsedSeconds(0);

    // Check browser support
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError("तुमचा ब्राउझर मायक्रोफोन रेकॉर्डिंगला सपोर्ट करत नाही.");
      setState("error");
      return;
    }

    const mime = getSupportedMimeType();
    if (!mime) {
      setError("तुमचा ब्राउझर ऑडिओ रेकॉर्डिंगला सपोर्ट करत नाही.");
      setState("error");
      return;
    }
    mimeRef.current = mime;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream, { mimeType: mime });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.start();
      setState("recording");

      // Elapsed timer
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      releaseStream();
      const msg =
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "मायक्रोफोनची परवानगी नाकारली. कृपया ब्राउझर सेटिंग्जमध्ये परवानगी द्या."
          : err instanceof DOMException && err.name === "NotFoundError"
            ? "मायक्रोफोन सापडला नाही. कृपया तुमचे मायक्रोफोन तपासा."
            : "मायक्रोफोनमध्ये त्रुटी आली.";
      setError(msg);
      setState("error");
    }
  }, [state, releaseStream, stopTimer]);

  // ── Stop recording & transcribe ────────────────────────────────────────

  const stopAndTranscribe = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === "inactive") return;

    stopTimer();
    setState("processing");

    recorder.onstop = async () => {
      releaseStream();

      const blob = new Blob(chunksRef.current, { type: mimeRef.current });
      chunksRef.current = [];

      if (blob.size === 0) {
        setError("रेकॉर्डिंग रिकामी आहे. कृपया पुन्हा प्रयत्न करा.");
        setState("error");
        return;
      }

      const ext = extensionForMime(mimeRef.current);

      try {
        const result = await transcribeAudio(blob, `recording.${ext}`);
        setTranscript(result);
        setState("success");
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "ट्रान्सक्रिप्शन अयशस्वी.";
        setError(msg);
        setState("error");
      }
    };

    recorder.stop();
  }, [stopTimer, releaseStream]);

  // ── Reset ──────────────────────────────────────────────────────────────

  const reset = useCallback(() => {
    stopTimer();
    releaseStream();
    setState("idle");
    setError(null);
    setTranscript(null);
    setElapsedSeconds(0);
    chunksRef.current = [];
    mediaRecorderRef.current = null;
  }, [stopTimer, releaseStream]);

  return {
    state,
    error,
    transcript,
    elapsedSeconds,
    startRecording,
    stopAndTranscribe,
    reset,
  };
}
