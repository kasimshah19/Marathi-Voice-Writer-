"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";

interface MicButtonProps {
  onRecordingStarted?: () => void;
}

export function MicButton({ onRecordingStarted }: MicButtonProps) {
  const router = useRouter();
  const { startRecording } = useAudioRecorder();

  const handleClick = useCallback(async () => {
    // We just navigate to the recording page — actual recording starts there
    // so the MediaRecorder lifecycle stays on the page that manages it.
    router.push(ROUTES.RECORDING);
  }, [router]);

  return (
    <div className="relative flex items-center justify-center w-[170px] h-[170px]">
      {/* Outer glow ring */}
      <div className="absolute inset-0 bg-indigo-200/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
      {/* Middle ring */}
      <div className="absolute w-[140px] h-[140px] bg-indigo-300/40 rounded-full"></div>
      {/* Inner Button */}
      <button
        type="button"
        onClick={handleClick}
        aria-label="बोलायला सुरूवात करा"
        className="absolute w-[112px] h-[112px] rounded-full flex items-center justify-center shadow-xl shadow-indigo-400/40 active:scale-95 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 bg-gradient-to-br from-violet-500 to-blue-500 cursor-pointer"
      >
        <Mic size={44} className="text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
}
