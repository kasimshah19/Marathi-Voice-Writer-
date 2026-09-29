'use client';
import { Menu } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';
import { useDrawer } from './DrawerProvider';

interface MenuButtonProps {
  className?: string;
}

export function MenuButton({ className }: MenuButtonProps) {
  const { openDrawer, isOpen } = useDrawer();

  return (
    <IconButton 
      className={className} 
      aria-label="मेनू उघडा" 
      aria-expanded={isOpen}
      aria-controls="side-drawer"
      onClick={openDrawer}
    >
      <Menu size={22} className="text-slate-800" />
    </IconButton>
  );
}
