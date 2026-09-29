interface ScreenTitleProps {
  title: string;
  subtitle?: string;
}

export function ScreenTitle({ title, subtitle }: ScreenTitleProps) {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-[26px] font-bold text-slate-900 leading-tight">{title}</h1>
      {subtitle && <p className="text-[14px] text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}
