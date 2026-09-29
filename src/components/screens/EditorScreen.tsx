import { Copy, Share2, FileText, Save } from 'lucide-react';
import { EditorHeader } from '@/components/ui/EditorHeader';
import { EditorTextArea } from '@/components/ui/EditorTextArea';
import { UndoRedoBar } from '@/components/ui/UndoRedoBar';
import { ActionTile } from '@/components/ui/ActionTile';
import { ROUTES } from '@/constants/routes';

export function EditorScreen() {
  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-white via-[#f7f5ff] to-[#efeaff]">
      <EditorHeader />
      
      <EditorTextArea />
      
      <UndoRedoBar />
      
      <div className="mt-auto px-4 mb-4 pt-4 grid grid-cols-4 gap-2.5">
        <ActionTile 
          icon={<Copy size={22} className="text-indigo-600" />} 
          label="कॉपी" 
        />
        <ActionTile 
          icon={<Share2 size={22} className="text-emerald-500" />} 
          label="शेअर" 
        />
        <ActionTile 
          icon={<FileText size={22} className="text-rose-500" />} 
          label="PDF" 
        />
        <ActionTile 
          icon={<Save size={22} className="text-blue-600" />} 
          label="जतन करा" 
          href={ROUTES.DOCUMENTS}
        />
      </div>
    </div>
  );
}
