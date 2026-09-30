import { ReactNode } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface SettingsRowProps {
  icon: ReactNode;
  label: string;
  rightContent?: ReactNode;
  rightText?: string;
  chevron?: 'right' | 'down' | 'none';
  hasDivider?: boolean;
  onClick?: () => void;
}

export function SettingsRow({ icon, label, rightContent, rightText, chevron = 'none', hasDivider = true, onClick }: SettingsRowProps) {
  return (
    <li 
      className={`flex items-center justify-between min-h-[50px] py-2 ${hasDivider ? 'border-b border-slate-100' : ''} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3.5">
        <span className="text-slate-600 flex items-center justify-center w-5 h-5 shrink-0">
          {icon}
        </span>
        <span className="text-[14.5px] text-slate-800">{label}</span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0 ml-4">
        {rightText && <span className="text-[13px] text-slate-500 font-sans">{rightText}</span>}
        {rightContent}
        {chevron === 'right' && <ChevronRight size={18} className="text-slate-400" aria-hidden />}
        {chevron === 'down' && <ChevronDown size={18} className="text-slate-400" aria-hidden />}
      </div>
    </li>
  );
}
