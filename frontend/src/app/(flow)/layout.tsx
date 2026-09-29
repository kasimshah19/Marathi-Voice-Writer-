import { ReactNode } from 'react';

export default function FlowLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 overflow-y-auto">
      {children}
    </main>
  );
}
