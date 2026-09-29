import Link from 'next/link';
import { SquarePen } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { MenuButton } from '@/components/layout/MenuButton';

interface ScreenHeaderProps {
  title: string;
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 pt-5 pb-2">
      <div className="flex items-center gap-3">
        <MenuButton className="w-auto h-auto p-0 border-none shadow-none bg-transparent" />
        <h1 className="text-[22px] font-bold text-slate-900">{title}</h1>
      </div>
      
      <Link 
        href={ROUTES.NEW_DOCUMENT}
        aria-label="नवा दस्तऐवज"
        className="relative text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm"
      >
        <SquarePen size={24} />
        <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-blue-500"></span>
      </Link>
    </div>
  );
}
