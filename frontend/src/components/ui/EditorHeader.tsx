import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export function EditorHeader() {
  return (
    <div className="flex items-start justify-between px-4 pt-4 pb-2">
      <Link 
        href={ROUTES.NEW_DOCUMENT} 
        aria-label="मागे"
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 mt-0.5"
      >
        <ArrowLeft size={22} className="text-slate-800" />
      </Link>
      
      <div className="flex flex-col items-center flex-1">
        <h1 className="text-[17px] font-bold text-slate-900">दस्तऐवज संपादित करा</h1>
        <span className="text-[11px] text-slate-400 mt-0.5 font-[family-name:var(--font-inter)]">Auto Saved 1 min ago</span>
      </div>

      <div className="w-10 h-10 flex items-center justify-center mt-0.5">
        <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm" aria-label="जतन झाले">
          <Check size={12} className="text-white" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
