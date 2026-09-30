import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-[100dvh] w-full flex justify-center bg-gray-100 sm:p-4 overflow-hidden">
      <div className={cn(
        "w-full h-full sm:max-w-[430px] sm:max-h-[min(800px,calc(100vh-2rem))]",
        "bg-gradient-to-b from-white to-[#efeaff]",
        "sm:rounded-[40px] sm:shadow-2xl overflow-hidden relative flex flex-col"
      )}>
        {children}
      </div>
    </div>
  );
}
