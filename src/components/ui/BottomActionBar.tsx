import { Save, Copy, Trash2 } from 'lucide-react';

export function BottomActionBar() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100/50 p-2 flex justify-between items-center px-4 py-3">
      <button type="button" className="flex flex-col items-center gap-1.5 flex-1 group active:scale-95 transition-transform" aria-label="जतन करा">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-100 transition-colors">
          <Save size={20} />
        </div>
        <span className="text-[11.5px] text-slate-500 font-medium">जतन करा</span>
      </button>

      <button type="button" className="flex flex-col items-center gap-1.5 flex-1 group active:scale-95 transition-transform" aria-label="कॉपी">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-100 transition-colors">
          <Copy size={20} />
        </div>
        <span className="text-[11.5px] text-slate-500 font-medium">कॉपी</span>
      </button>

      <button type="button" className="flex flex-col items-center gap-1.5 flex-1 group active:scale-95 transition-transform" aria-label="साफ करा">
        <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-100 transition-colors">
          <Trash2 size={20} />
        </div>
        <span className="text-[11.5px] text-slate-500 font-medium">साफ करा</span>
      </button>
    </div>
  );
}
