import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { PulseDot } from '@/components/ui/PulseDot';
import { StopButton } from '@/components/ui/StopButton';
import { RecordingWave } from '@/components/ui/RecordingWave';

export function RecordingScreen() {
  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-white via-[#fff5f8] to-[#f3edff]">
      {/* Top Bar */}
      <div className="flex items-center px-4 pt-4 pb-2 relative">
        <Link 
          href={ROUTES.NEW_DOCUMENT} 
          aria-label="मागे"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 absolute left-4"
        >
          <ArrowLeft size={22} className="text-slate-800" />
        </Link>
        <div className="flex-1 flex items-center justify-center gap-2">
          <PulseDot />
          <h1 className="text-[19px] font-bold text-slate-900">रेकॉर्डिंग सुरू आहे...</h1>
        </div>
      </div>

      {/* Helper Text */}
      <div className="px-5 mt-6 text-center">
        <p className="text-[14px] text-slate-500">बोलत रहा, आम्ही मराठीत टाईप करत आहोत</p>
      </div>

      {/* Main Recording Area */}
      <div className="flex-1 flex flex-col mt-[56px]">
        {/* Stop Button */}
        <div className="flex justify-center">
          <StopButton />
        </div>

        {/* Timer */}
        <div className="flex justify-center mt-5">
          <span className="text-[17px] font-medium text-slate-800 font-[family-name:var(--font-inter)]">00:12</span>
        </div>

        {/* Waveform */}
        <div className="w-full px-5 mt-8">
          <RecordingWave />
        </div>

        {/* Stop Pill Button */}
        <div className="px-5 mt-auto mb-8">
          <Link
            href={ROUTES.EDITOR}
            className="w-full h-[52px] bg-white rounded-full border-[1.5px] border-rose-300 shadow-md shadow-pink-100 flex items-center justify-center gap-3 hover:bg-rose-50 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
          >
            <div className="w-[14px] h-[14px] bg-rose-500 rounded-[3px]"></div>
            <span className="text-[16px] font-semibold text-rose-500">रेकॉर्डिंग थांबवा</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
