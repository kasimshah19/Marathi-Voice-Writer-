"use client";
import { useEffect, useState } from 'react';
import { DetailHeader } from '@/components/ui/DetailHeader';
import { ActionList } from '@/components/ui/ActionList';
import { getDocument, type Document } from '@/lib/api';

export function DocumentDetailScreen({ id }: { id: string }) {
  const [doc, setDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDocument(id);
        setDoc(data);
      } catch (err) {
        console.error("Failed to load document", err);
        setError("दस्तऐवज लोड करण्यात त्रुटी आली.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-[100dvh] pb-6" style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7f5ff 60%,#efeaff 100%)" }}>
        <DetailHeader documentId={id} />
        <div className="flex justify-center p-8 text-slate-500">लोड होत आहे...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-[100dvh] pb-6" style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7f5ff 60%,#efeaff 100%)" }}>
        <DetailHeader documentId={id} />
        <div className="flex justify-center p-8 text-red-500">{error}</div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="flex flex-col min-h-[100dvh] pb-6" style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7f5ff 60%,#efeaff 100%)" }}>
        <DetailHeader documentId={id} />
        <div className="flex justify-center p-8 text-slate-500">दस्तऐवज सापडला नाही</div>
      </div>
    );
  }

  const dateStr = new Date(doc.updated_at).toLocaleDateString();

  return (
    <div className="flex flex-col min-h-[100dvh] pb-6" style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7f5ff 60%,#efeaff 100%)" }}>
      <DetailHeader documentId={id} />
      
      <div className="px-5 mt-5">
        <h1 className="text-[25px] font-bold text-slate-900 leading-tight">
          {doc.title}
        </h1>
        <p className="text-[14px] text-slate-500 mt-1 font-[family-name:var(--font-inter)]">
          <span className="font-[family-name:var(--font-karma)]">{dateStr}</span>
          {" · "}
          {doc.word_count} शब्द
        </p>
      </div>
      
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <p className="text-[18px] leading-[1.75] text-slate-900 whitespace-pre-line">
          {doc.content}
        </p>
      </div>
      
      <h2 className="px-5 mt-6 mb-2 text-[14px] font-bold text-slate-900">कृती</h2>
      <ActionList documentId={doc.id} content={doc.content} />
    </div>
  );
}
