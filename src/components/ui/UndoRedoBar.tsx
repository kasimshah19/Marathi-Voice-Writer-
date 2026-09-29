import { Undo2, Redo2 } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';

export function UndoRedoBar() {
  return (
    <div className="flex items-center justify-between mx-5 mt-3">
      <div className="flex items-center gap-2">
        <IconButton className="w-9 h-9" aria-label="मागे घ्या">
          <Undo2 size={18} className="text-slate-700" />
        </IconButton>
        <IconButton className="w-9 h-9 opacity-60 pointer-events-none" aria-label="पुन्हा करा">
          <Redo2 size={18} className="text-slate-300" />
        </IconButton>
      </div>
      <span className="text-[13px] text-slate-500 font-medium">78 शब्द</span>
    </div>
  );
}
