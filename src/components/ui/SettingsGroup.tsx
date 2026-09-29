import { ReactNode } from 'react';

interface SettingsGroupProps {
  children: ReactNode;
  className?: string;
}

export function SettingsGroup({ children, className = '' }: SettingsGroupProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 px-3.5 mx-4 ${className}`}>
      <ul className="flex flex-col">
        {children}
      </ul>
    </div>
  );
}
