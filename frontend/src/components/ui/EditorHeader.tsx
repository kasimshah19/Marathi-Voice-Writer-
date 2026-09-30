import Link from 'next/link';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

interface EditorHeaderProps {
  title: string;
  onChangeTitle: (title: string) => void;
  isSaving: boolean;
  backHref?: string;
}

export function EditorHeader({ title, onChangeTitle, isSaving, backHref = ROUTES.NEW_DOCUMENT }: EditorHeaderProps) {
  return (
    <div className="flex items-start justify-between px-4 pt-4 pb-2">
      <Link 
        href={backHref} 
        aria-label="मागे"
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 mt-0.5"
      >
        <ArrowLeft size={22} className="text-slate-800" />
      </Link>
      
      <div className="flex flex-col items-center flex-1 mx-2">
        <input 
          type="text" 
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="शीर्षकहीन दस्तऐवज"
          className="text-[17px] font-bold text-slate-900 bg-transparent text-center border-none outline-none focus:ring-1 focus:ring-indigo-500 rounded px-2 w-full max-w-[200px]"
        />
        <span className="text-[11px] text-slate-400 mt-0.5 font-[family-name:var(--font-inter)]">
          {isSaving ? 'जतन करत आहे...' : 'बदल जतन केले जातील'}
        </span>
      </div>

      <div className="w-10 h-10 flex items-center justify-center mt-0.5">
        {isSaving ? (
          <Loader2 size={18} className="text-indigo-500 animate-spin" />
        ) : (
          <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm" aria-label="जतन झाले">
            <Check size={12} className="text-white" strokeWidth={3} />
          </div>
        )}
      </div>
    </div>
  );
}
