import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ActionListItemProps {
  icon: LucideIcon;
  label: string;
  isDanger?: boolean;
  isLast?: boolean;
  href?: string;
}

export function ActionListItem({ icon: Icon, label, isDanger, isLast, href }: ActionListItemProps) {
  const content = (
    <>
      <Icon size={18} aria-hidden />{label}
    </>
  );

  const className = `w-full flex items-center gap-3 h-12 text-[14.5px] text-left focus:outline-none focus-visible:bg-slate-50 hover:bg-slate-50/50 transition-colors ${isDanger ? "text-rose-500" : "text-slate-800"}`;

  return (
    <li className={`${!isLast ? "border-b border-slate-100" : ""}`}>
      {href ? (
        <Link href={href} className={className}>
          {content}
        </Link>
      ) : (
        <button type="button" className={className}>
          {content}
        </button>
      )}
    </li>
  );
}
