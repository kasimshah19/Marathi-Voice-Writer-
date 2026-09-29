import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button 
        ref={ref}
        type="button"
        className={cn(
          "flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 active:scale-95 transition-transform",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
