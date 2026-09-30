'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BOTTOM_NAV_ITEMS } from '@/constants/routes';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-6 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] flex justify-between items-center sm:rounded-b-[40px] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40">
      {BOTTOM_NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
        const Icon = item.icon;
        return (
          <Link 
            key={item.href} 
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1",
              isActive ? "text-[#7c5cf5]" : "text-gray-400"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon size={24} className={isActive ? "fill-[#7c5cf5]/20" : ""} />
            <span className="text-[10px] font-medium">{item.shortLabel || item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
