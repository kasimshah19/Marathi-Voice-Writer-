'use client';
import { useState } from 'react';

interface ToggleSwitchProps {
  initialState?: boolean;
  onColor?: string;
  offColor?: string;
  ariaLabel: string;
}

export function ToggleSwitch({ 
  initialState = false, 
  onColor = "bg-indigo-600", 
  offColor = "bg-slate-200",
  ariaLabel
}: ToggleSwitchProps) {
  const [checked, setChecked] = useState(initialState);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => setChecked(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${checked ? onColor : offColor}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
}
