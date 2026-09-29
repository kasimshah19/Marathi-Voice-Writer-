"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Share2, FileText, Save } from "lucide-react";
import { EditorHeader } from "@/components/ui/EditorHeader";
import { EditorTextArea } from "@/components/ui/EditorTextArea";
import { UndoRedoBar } from "@/components/ui/UndoRedoBar";
import { ActionTile } from "@/components/ui/ActionTile";
import { ROUTES } from "@/constants/routes";
import type { TranscriptionResponse } from "@/lib/api";

export function EditorScreen() {
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Load transcript from sessionStorage (set by RecordingScreen on success)
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("mvw_transcript");
      if (stored) {
        const data: TranscriptionResponse = JSON.parse(stored);
        setText(data.text);
      }
    } catch {
      // Ignore parse errors — editor starts empty if nothing stored
    }
    setLoaded(true);
  }, []);

  const wordCount = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  }, [text]);

  // Don't render until sessionStorage has been checked (avoids flash)
  if (!loaded) return null;

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-white via-[#f7f5ff] to-[#efeaff]">
      <EditorHeader />

      <EditorTextArea value={text} onChange={setText} />

      <UndoRedoBar wordCount={wordCount} />

      <div className="mt-auto px-4 mb-4 pt-4 grid grid-cols-4 gap-2.5">
        <ActionTile
          icon={<Copy size={22} className="text-indigo-600" />}
          label="कॉपी"
          onClick={handleCopy}
        />
        <ActionTile
          icon={<Share2 size={22} className="text-emerald-500" />}
          label="शेअर"
        />
        <ActionTile
          icon={<FileText size={22} className="text-rose-500" />}
          label="PDF"
        />
        <ActionTile
          icon={<Save size={22} className="text-blue-600" />}
          label="जतन करा"
          href={ROUTES.DOCUMENTS}
        />
      </div>
    </div>
  );
}
