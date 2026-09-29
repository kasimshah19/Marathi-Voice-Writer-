import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100 sm:p-4">
      <div className={cn(
        "w-full max-w-[430px] min-h-[100dvh] sm:min-h-[800px] sm:h-[800px]",
        "bg-gradient-to-b from-white to-[#efeaff]",
        "sm:rounded-[40px] sm:shadow-2xl overflow-hidden relative flex flex-col"
      )}>
        {children}
      </div>
    </div>
  );
}
