import { DetailHeader } from '@/components/ui/DetailHeader';
import { NoteCallout } from '@/components/ui/NoteCallout';
import { ActionList } from '@/components/ui/ActionList';
import { MOCK_DOCUMENT_DETAIL } from '@/constants/mockDocumentDetail';

export function DocumentDetailScreen() {
  const doc = MOCK_DOCUMENT_DETAIL;
  
  return (
    <div className="flex flex-col min-h-[100dvh] pb-6" style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7f5ff 60%,#efeaff 100%)" }}>
      <DetailHeader />
      
      <div className="px-5 mt-5">
        <h1 className="text-[25px] font-bold text-slate-900 leading-tight">
          {doc.title}
        </h1>
        <p className="text-[14px] text-slate-500 mt-1 font-[family-name:var(--font-inter)]">
          <span className="font-[family-name:var(--font-karma)]">{doc.date.split('·')[0].trim()}</span>
          {" · "}
          {doc.date.split('·')[1].trim()}
        </p>
      </div>
      
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <p className="text-[18px] leading-[1.75] text-slate-900 whitespace-pre-line">
          {doc.content}
        </p>
        <NoteCallout note={doc.note} />
      </div>
      
      <h2 className="px-5 mt-6 mb-2 text-[14px] font-bold text-slate-900">कृती</h2>
      <ActionList />
    </div>
  );
}
