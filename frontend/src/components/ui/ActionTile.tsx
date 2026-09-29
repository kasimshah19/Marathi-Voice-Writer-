import { ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ActionTileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  href?: string;
}

export function ActionTile({ icon, label, className, href, ...props }: ActionTileProps) {
  const content = (
    <>
      <div className="flex items-center justify-center h-[26px]">
        {icon}
      </div>
      <span className="text-[12px] font-medium text-slate-600">{label}</span>
    </>
  );

  const cssClasses = cn(
    "flex flex-col items-center justify-center gap-1.5 bg-white rounded-2xl shadow-sm border border-slate-100/50 h-[76px] hover:bg-slate-50 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cssClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={cssClasses} {...props}>
      {content}
    </button>
  );
}
