'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, LogOut } from 'lucide-react';
import { useDrawer } from './DrawerProvider';
import { BOTTOM_NAV_ITEMS, ROUTES } from '@/constants/routes';
import { AppLogo } from '@/components/ui/AppLogo';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';

export function SideDrawer() {
  const { isOpen, closeDrawer } = useDrawer();
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeDrawer]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the close button when opened
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap (simple implementation)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-slate-900/40 transition-opacity animate-in fade-in duration-200"
        onClick={closeDrawer}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div
        id="side-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="मुख्य मेनू"
        onKeyDown={handleKeyDown}
        className="fixed inset-y-0 left-0 z-50 w-[80%] max-w-[300px] bg-white rounded-r-3xl shadow-xl flex flex-col overflow-y-auto animate-in slide-in-from-left duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="scale-75 origin-left">
              <AppLogo />
            </div>
            <span className="font-semibold text-slate-900 text-sm font-[family-name:var(--font-inter)]">
              Marathi Voice Writer
            </span>
          </div>
          <IconButton
            ref={closeBtnRef}
            onClick={closeDrawer}
            aria-label="मेनू बंद करा"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <X size={20} />
          </IconButton>
        </div>

        {/* Profile Row */}
        <div className="p-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold text-lg shrink-0">
            SP
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[16px] font-bold text-slate-900 truncate">Adv. S. Patil</span>
            <span className="text-[12px] text-slate-500 font-[family-name:var(--font-inter)] truncate">
              adv.patil@example.com
            </span>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="px-3 py-2 flex flex-col gap-1">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeDrawer}
                className={cn(
                  "flex items-center gap-3 h-12 px-4 rounded-xl text-[15px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
                  isActive 
                    ? "bg-indigo-50 text-indigo-600" 
                    : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={22} className={isActive ? "fill-indigo-600/20 text-indigo-600" : "text-slate-500"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-5 py-4">
          <div className="h-px bg-slate-100 w-full mb-4"></div>
          
          <Link
            href={ROUTES.NEW_DOCUMENT}
            onClick={closeDrawer}
            className="w-full h-11 rounded-full text-white font-medium text-[15px] flex items-center justify-center shadow-md active:scale-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            style={{ background: "linear-gradient(90deg, var(--color-primary-start) 0%, var(--color-primary-mid) 60%, var(--color-primary-end) 100%)" }}
          >
            नवा दस्तऐवज तयार करा
          </Link>
        </div>

        {/* Logout (Pinned to bottom) */}
        <div className="mt-auto px-3 pb-6">
          <Link
            href={ROUTES.HOME}
            onClick={closeDrawer}
            className="flex items-center gap-3 h-12 px-4 rounded-xl text-[15px] font-medium text-rose-500 hover:bg-rose-50 active:bg-rose-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <LogOut size={22} />
            लॉगआउट
          </Link>
        </div>
      </div>
    </>
  );
}
