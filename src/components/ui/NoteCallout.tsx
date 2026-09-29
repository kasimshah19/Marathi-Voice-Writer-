import { Clock } from 'lucide-react';

interface NoteCalloutProps {
  note: string;
}

export function NoteCallout({ note }: NoteCalloutProps) {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-xl bg-emerald-50 px-3 py-3">
      <span className="w-7 h-7 shrink-0 rounded-full bg-emerald-500 text-white flex items-center justify-center">
        <Clock size={15} aria-hidden />
      </span>
      <p className="text-[13.5px] leading-snug text-emerald-900">
        <b>टीप:</b> {note}
      </p>
    </div>
  );
}
