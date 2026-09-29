"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { PulseDot } from "@/components/ui/PulseDot";
import { StopButton } from "@/components/ui/StopButton";
import { RecordingWave } from "@/components/ui/RecordingWave";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (totalSeconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

export function RecordingScreen() {
  const router = useRouter();
  const {
    state,
    error,
    transcript,
    elapsedSeconds,
    startRecording,
    stopAndTranscribe,
    reset,
  } = useAudioRecorder();

  // Auto-start recording when the screen mounts
  useEffect(() => {
    startRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When transcription succeeds, store result and navigate to editor
  useEffect(() => {
    if (state === "success" && transcript) {
      try {
        sessionStorage.setItem(
          "mvw_transcript",
          JSON.stringify(transcript),
        );
      } catch {
        // sessionStorage may be unavailable in some contexts — ignore.
      }
      router.push(ROUTES.EDITOR);
    }
  }, [state, transcript, router]);

  const handleBack = useCallback(() => {
    reset();
    router.push(ROUTES.NEW_DOCUMENT);
  }, [reset, router]);

  const handleRetry = useCallback(() => {
    reset();
    // Small delay to let cleanup finish before re-acquiring the mic
    setTimeout(() => {
      startRecording();
    }, 200);
  }, [reset, startRecording]);

  // ── Processing state ────────────────────────────────────────────────────
  if (state === "processing") {
    return (
      <div className="flex flex-col min-h-full bg-gradient-to-b from-white via-[#fff5f8] to-[#f3edff]">
        {/* Top Bar */}
        <div className="flex items-center px-4 pt-4 pb-2 relative">
          <div className="w-10 h-10" /> {/* spacer to keep centering */}
          <div className="flex-1 flex items-center justify-center gap-2">
            <Loader2 size={18} className="text-indigo-500 animate-spin" />
            <h1 className="text-[19px] font-bold text-slate-900">
              ट्रान्सक्रिप्शन सुरू आहे...
            </h1>
          </div>
        </div>

        <div className="px-5 mt-6 text-center">
          <p className="text-[14px] text-slate-500">
            कृपया थांबा, तुमचा आवाज मराठीत रूपांतरित होत आहे
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 size={48} className="text-indigo-400 animate-spin" />
          <p className="text-[15px] text-slate-500 mt-6">
            रेकॉर्डिंग कालावधी: {formatTime(elapsedSeconds)}
          </p>
        </div>
      </div>
    );
  }

  // ── Error state ─────────────────────────────────────────────────────────
  if (state === "error") {
    return (
      <div className="flex flex-col min-h-full bg-gradient-to-b from-white via-[#fff5f8] to-[#f3edff]">
        {/* Top Bar */}
        <div className="flex items-center px-4 pt-4 pb-2 relative">
          <button
            type="button"
            onClick={handleBack}
            aria-label="मागे"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 absolute left-4"
          >
            <ArrowLeft size={22} className="text-slate-800" />
          </button>
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-[19px] font-bold text-rose-600">
              त्रुटी
            </h1>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-[16px] text-slate-700 text-center leading-relaxed">
            {error}
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-8 px-8 h-[48px] bg-gradient-to-br from-violet-500 to-blue-500 text-white rounded-full font-semibold text-[15px] shadow-lg shadow-indigo-400/30 active:scale-95 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500"
          >
            पुन्हा प्रयत्न करा
          </button>
        </div>
      </div>
    );
  }

  // ── Default: Recording / Idle ───────────────────────────────────────────
  const isRecording = state === "recording";

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-white via-[#fff5f8] to-[#f3edff]">
      {/* Top Bar */}
      <div className="flex items-center px-4 pt-4 pb-2 relative">
        <button
          type="button"
          onClick={handleBack}
          aria-label="मागे"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 absolute left-4"
        >
          <ArrowLeft size={22} className="text-slate-800" />
        </button>
        <div className="flex-1 flex items-center justify-center gap-2">
          {isRecording && <PulseDot />}
          <h1 className="text-[19px] font-bold text-slate-900">
            {isRecording ? "रेकॉर्डिंग सुरू आहे..." : "रेकॉर्डिंग तयार आहे"}
          </h1>
        </div>
      </div>

      {/* Helper Text */}
      <div className="px-5 mt-6 text-center">
        <p className="text-[14px] text-slate-500">
          बोलत रहा, आम्ही मराठीत टाईप करत आहोत
        </p>
      </div>

      {/* Main Recording Area */}
      <div className="flex-1 flex flex-col mt-[56px]">
        {/* Stop Button */}
        <div className="flex justify-center">
          <StopButton
            onClick={stopAndTranscribe}
            disabled={!isRecording}
          />
        </div>

        {/* Timer */}
        <div className="flex justify-center mt-5">
          <span className="text-[17px] font-medium text-slate-800 font-[family-name:var(--font-inter)]">
            {formatTime(elapsedSeconds)}
          </span>
        </div>

        {/* Waveform */}
        <div className="w-full px-5 mt-8">
          <RecordingWave />
        </div>

        {/* Stop Pill Button */}
        <div className="px-5 mt-auto mb-8">
          <button
            type="button"
            onClick={stopAndTranscribe}
            disabled={!isRecording}
            className="w-full h-[52px] bg-white rounded-full border-[1.5px] border-rose-300 shadow-md shadow-pink-100 flex items-center justify-center gap-3 hover:bg-rose-50 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <div className="w-[14px] h-[14px] bg-rose-500 rounded-[3px]"></div>
            <span className="text-[16px] font-semibold text-rose-500">
              रेकॉर्डिंग थांबवा
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
