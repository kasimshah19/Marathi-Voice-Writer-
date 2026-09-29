import { cn } from '@/lib/utils';

export interface ChipItem {
  label: string;
  active: boolean;
}

interface FilterChipsProps {
  chips?: ChipItem[];
  className?: string;
}

const DEFAULT_CHIPS = [
  { label: 'सर्व', active: true },
  { label: 'आजचे', active: false },
  { label: 'महत्वाचे', active: false },
  { label: 'आवडते', active: false },
];

export function FilterChips({ chips = DEFAULT_CHIPS, className = "px-4" }: FilterChipsProps) {
  return (
    <div className={cn("flex gap-2 mt-4 overflow-x-auto [scrollbar-width:none]", className)}>
      {chips.map((chip, i) => (
        <span
          key={i}
          className={cn(
            "px-4 h-8 flex items-center rounded-full text-[13px] font-medium whitespace-nowrap",
            chip.active 
              ? "bg-indigo-600 text-white" 
              : "bg-slate-100 text-slate-500"
          )}
        >
          {chip.label}
        </span>
      ))}
    </div>
  );
}
