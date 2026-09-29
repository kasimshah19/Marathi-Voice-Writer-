import { ReactNode } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { DrawerProvider } from '@/components/layout/DrawerProvider';
import { SideDrawer } from '@/components/layout/SideDrawer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <DrawerProvider>
      <main className="flex-1 overflow-y-auto pb-[80px]">
        {children}
      </main>
      <BottomNav />
      <SideDrawer />
    </DrawerProvider>
  );
}
