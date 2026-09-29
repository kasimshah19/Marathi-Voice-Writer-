import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function LogoutButton() {
  return (
    <Link 
      href={ROUTES.HOME}
      className="mx-4 mt-3.5 mb-6 bg-white rounded-2xl shadow-sm border border-slate-100 h-[52px] flex items-center justify-center gap-2 text-rose-500 hover:bg-slate-50 active:scale-[.99] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
    >
      <LogOut size={18} aria-hidden />
      <span className="text-[15px] font-semibold">लॉगआउट</span>
    </Link>
  );
}
