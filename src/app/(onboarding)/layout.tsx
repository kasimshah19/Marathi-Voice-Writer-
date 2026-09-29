import { ReactNode } from 'react';

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 overflow-y-auto">
      {children}
    </main>
  );
}
