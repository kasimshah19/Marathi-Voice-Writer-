import Link from 'next/link';
import { ArrowLeft, Pencil, Star, MoreVertical } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export function DetailHeader({ documentId }: { documentId?: string }) {
  return (
    <div className="flex items-center justify-between px-5 pt-6">
      <Link 
        href={ROUTES.DOCUMENTS} 
        aria-label="मागे"
        className="text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm"
      >
        <ArrowLeft size={24} />
      </Link>
      
      <div className="flex items-center gap-5 text-slate-900">
        {documentId ? (
          <Link href={`/editor?docId=${documentId}`} aria-label="संपादित करा" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm inline-block">
            <Pencil size={21} />
          </Link>
        ) : (
          <button type="button" aria-label="संपादित करा" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm">
            <Pencil size={21} />
          </button>
        )}
        <button type="button" aria-label="आवडते" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm">
          <Star size={21} />
        </button>
        <button type="button" aria-label="अधिक" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm">
          <MoreVertical size={21} />
        </button>
      </div>
    </div>
  );
}
