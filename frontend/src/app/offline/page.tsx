'use client';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full h-[60vh] pb-4 px-6 text-center" style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7f5ff 60%,#efeaff 100%)" }}>
      <WifiOff size={48} className="text-slate-400 mb-6" />
      <h1 className="text-2xl font-bold text-slate-800 mb-3">तुम्ही ऑफलाइन आहात</h1>
      <p className="text-[15px] text-slate-500 mb-8 max-w-[280px]">
        इंटरनेट कनेक्शन नसतानाही तुम्ही आधी उघडलेली पेजेस वापरू शकता.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-[#7c5cf5] text-white px-8 py-3 rounded-full font-semibold text-[15px] shadow-lg shadow-[#7c5cf5]/30 active:scale-95 transition-transform touch-manipulation"
      >
        पुन्हा प्रयत्न करा
      </button>
    </div>
  );
}
