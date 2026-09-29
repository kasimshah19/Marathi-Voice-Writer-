import Link from 'next/link';
import { FileText, Star, ChevronRight } from 'lucide-react';
import { Document } from '@/types/document';
import { ROUTES } from '@/constants/routes';

interface DocumentListItemProps {
  document: Document;
  isLast?: boolean;
}

export function DocumentListItem({ document, isLast = false }: DocumentListItemProps) {
  return (
    <li>
      <Link 
        href={ROUTES.DOCUMENT_DETAIL(document.id)}
        className={`flex items-center gap-3 py-3.5 focus:outline-none focus-visible:bg-slate-50 hover:bg-slate-50/50 transition-colors ${!isLast ? "border-b border-slate-100" : ""}`}
      >
        <span className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-blue-600 shrink-0">
          <FileText size={22} />
        </span>
        
        <span className="flex-1 min-w-0">
          <span className="block text-[16px] font-semibold text-slate-900 leading-tight truncate">{document.title}</span>
          <span className="block text-[12.5px] text-slate-500 mt-0.5 truncate">{document.date} &middot; {document.wordCount} शब्द</span>
        </span>
        
        {document.isFavorite ? (
          <Star size={18} className="text-amber-400 shrink-0" fill="currentColor" />
        ) : (
          <ChevronRight size={18} className="text-slate-400 shrink-0" />
        )}
      </Link>
    </li>
  );
}
