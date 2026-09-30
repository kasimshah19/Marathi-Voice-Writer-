import { Search, Filter } from 'lucide-react';
import React from 'react';

interface SearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex gap-2 px-4 mt-4">
      <label className="flex-1 flex items-center gap-2 bg-slate-100 rounded-full px-4 h-11 focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow">
        <Search size={18} className="text-slate-400" />
        <input 
          type="search" 
          placeholder="दस्तऐवज शोधा..." 
          aria-label="दस्तऐवज शोधा"
          value={value}
          onChange={onChange}
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
        />
      </label>
      <button 
        type="button" 
        aria-label="फिल्टर"
        className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <Filter size={17} />
      </button>
    </div>
  );
}
