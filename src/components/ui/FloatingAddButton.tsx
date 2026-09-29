import Link from 'next/link';
import { Plus } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export function FloatingAddButton() {
  return (
    <Link 
      href={ROUTES.NEW_DOCUMENT}
      aria-label="नवा दस्तऐवज तयार करा"
      className="absolute right-5 bottom-6 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-400/50 active:scale-95 transition z-10"
      style={{ background: "linear-gradient(135deg,#4f6bff,#6d5cf5)" }}
    >
      <Plus size={28} />
    </Link>
  );
}
