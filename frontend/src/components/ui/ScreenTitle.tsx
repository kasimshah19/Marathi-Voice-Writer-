import { MenuButton } from '@/components/layout/MenuButton';

interface ScreenTitleProps {
  title: string;
  subtitle?: string;
}

export function ScreenTitle({ title, subtitle }: ScreenTitleProps) {
  return (
    <div className="px-5 pt-6">
      <div className="flex items-center gap-3">
        <MenuButton className="w-auto h-auto p-0 border-none shadow-none bg-transparent" />
        <h1 className="text-[26px] font-bold text-slate-900 leading-tight">{title}</h1>
      </div>
      {subtitle && <p className="text-[14px] text-slate-500 mt-1 ml-[44px]">{subtitle}</p>}
    </div>
  );
}
