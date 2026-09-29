import { FileText } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { Template, TemplateTone } from '@/types/template';

interface TemplateCardProps {
  template: Template;
}

const TONE_STYLES: Record<TemplateTone, string> = {
  orange: 'bg-orange-50 text-orange-500',
  green: 'bg-emerald-50 text-emerald-500',
  amber: 'bg-amber-50 text-amber-500',
  indigo: 'bg-indigo-50 text-indigo-500',
  rose: 'bg-rose-50 text-rose-500',
  violet: 'bg-violet-50 text-violet-500',
};

export function TemplateCard({ template }: TemplateCardProps) {
  const toneClass = TONE_STYLES[template.tone];
  
  return (
    <li>
      <Link 
        href={ROUTES.EDITOR}
        className="w-full flex items-center gap-3.5 bg-white rounded-2xl shadow-sm shadow-indigo-100 px-3.5 py-3.5 text-left hover:bg-slate-50 active:scale-[.99] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <span className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${toneClass}`}>
          <FileText size={22} aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-[16px] font-semibold text-slate-900 leading-tight">{template.title}</span>
          <span className="block text-[12.5px] text-slate-500 mt-0.5">{template.description}</span>
        </span>
      </Link>
    </li>
  );
}
