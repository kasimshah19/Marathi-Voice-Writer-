import { Globe, ChevronDown, Settings, User } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';
import { MenuButton } from '@/components/layout/MenuButton';
import { MicButton } from '@/components/ui/MicButton';
import { AudioBars } from '@/components/ui/AudioBars';
import { BottomActionBar } from '@/components/ui/BottomActionBar';

export function NewDocumentScreen() {
  return (
    <div className="flex flex-col min-h-full justify-between pb-[90px]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <MenuButton className="w-10 h-10 border-none shadow-none bg-transparent" />
        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden">
          <User size={20} />
        </div>
      </div>

      {/* Title Area */}
      <div className="flex flex-col items-center px-6 mt-2">
        <h1 className="text-[22px] font-bold text-slate-900">नवा दस्तऐवज</h1>
        <p className="text-[15px] text-slate-500 mt-1">बोलून मराठीत टाईप करा</p>
      </div>

      {/* Language row */}
      <div className="flex items-center gap-2 px-6 mt-6">
        <div className="flex-1 h-10 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
              <Globe size={14} />
            </div>
            <span className="text-[13px] font-medium text-slate-700 font-[family-name:var(--font-inter)]">Marathi (मराठी)</span>
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
        <IconButton className="w-10 h-10" aria-label="Settings">
          <Settings size={18} className="text-slate-600" />
        </IconButton>
      </div>

      {/* Mic Area */}
      <div className="flex-1 flex flex-col items-center justify-center mt-6">
        <MicButton />
        
        {/* Status Text */}
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-[16px] font-semibold text-slate-900">बोलायला सुरूवात करा</h2>
          <p className="text-[16px] text-slate-500 mt-1 font-[family-name:var(--font-inter)]">00:00</p>
        </div>
        
        {/* Audio Bars */}
        <div className="w-full px-8 mt-6">
          <AudioBars />
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="px-3 mt-4 w-full">
        <BottomActionBar />
      </div>
    </div>
  );
}
