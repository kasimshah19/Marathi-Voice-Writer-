import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function StopButton() {
  return (
    <div className="relative flex items-center justify-center w-[190px] h-[190px]">
      {/* Decorative wavy lines */}
      <div className="absolute w-[340px] h-[40px] top-1/2 -translate-y-1/2 text-pink-100/60" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 340 40" preserveAspectRatio="none">
          <path 
            d="M0,20 Q10,0 20,20 T40,20 T60,20 T80,20 T100,20 T120,20 T140,20 T160,20 T180,20 T200,20 T220,20 T240,20 T260,20 T280,20 T300,20 T320,20 T340,20" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Outer glow ring */}
      <div className="absolute inset-0 bg-rose-100/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }} aria-hidden="true"></div>
      {/* Middle ring */}
      <div className="absolute w-[150px] h-[150px] bg-rose-200/40 rounded-full" aria-hidden="true"></div>
      
      {/* Inner Button */}
      <Link 
        href={ROUTES.EDITOR}
        aria-label="रेकॉर्डिंग थांबवा"
        className="absolute w-[112px] h-[112px] rounded-full flex items-center justify-center shadow-xl shadow-rose-400/40 active:scale-95 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-500 focus-visible:ring-offset-4 bg-gradient-to-br from-rose-500 to-pink-500"
      >
        <div className="w-[30px] h-[30px] bg-white rounded-md"></div>
      </Link>
    </div>
  );
}
