import Link from 'next/link';
import { Mic } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export function MicButton() {
  return (
    <div className="relative flex items-center justify-center w-[170px] h-[170px]">
      {/* Outer glow ring */}
      <div className="absolute inset-0 bg-indigo-200/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
      {/* Middle ring */}
      <div className="absolute w-[140px] h-[140px] bg-indigo-300/40 rounded-full"></div>
      {/* Inner Button */}
      <Link 
        href={ROUTES.RECORDING}
        aria-label="बोलायला सुरूवात करा"
        className="absolute w-[112px] h-[112px] rounded-full flex items-center justify-center shadow-xl shadow-indigo-400/40 active:scale-95 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 bg-gradient-to-br from-violet-500 to-blue-500"
      >
        <Mic size={44} className="text-white" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
