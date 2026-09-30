"use client";

import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterChips } from '@/components/ui/FilterChips';
import { DocumentListItem } from '@/components/ui/DocumentListItem';
import { useEffect, useState } from 'react';
import { FloatingAddButton } from '@/components/ui/FloatingAddButton';
import { getDocuments, type Document as ApiDocument } from '@/lib/api';
import type { Document } from '@/types/document';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function MyDocumentsScreen() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiDocs = await getDocuments(search);
        if (!active) return;
        const mapped: Document[] = apiDocs.map((doc: ApiDocument) => ({
          id: doc.id,
          title: doc.title,
          date: new Date(doc.created_at).toLocaleDateString(),
          wordCount: doc.word_count,
          isFavorite: false,
        }));
        setDocuments(mapped);
      } catch (e) {
        if (!active) return;
        console.error(e);
        setError("दस्तऐवज लोड करण्यात त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
      } finally {
        if (active) setIsLoading(false);
      }
    };
    
    const timeoutId = setTimeout(load, 300);
    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [search]);

  return (
    <div className="flex flex-col h-full relative" style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7f5ff 60%,#efeaff 100%)" }}>
      <div className="shrink-0">
        <ScreenHeader title="माझे दस्तऐवज" />
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <FilterChips />
      </div>
      
      {/* Scrollable list area */}
      <ul className="px-4 mt-3 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-[100px]">
        {isLoading ? (
          <div className="flex justify-center p-4"><span className="text-sm text-slate-500">लोड होत आहे...</span></div>
        ) : error ? (
          <div className="flex justify-center p-4"><span className="text-sm text-red-500">{error}</span></div>
        ) : documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 mt-10">
            <span className="text-lg text-slate-500 mb-4">{search ? "कोणतेही दस्तऐवज सापडले नाहीत" : "अजून कोणतेही दस्तऐवज नाहीत"}</span>
            {!search && (
              <Link href={ROUTES.RECORDING} className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium">
                नवीन दस्तऐवज
              </Link>
            )}
          </div>
        ) : (
          documents.map((doc, i) => (
            <DocumentListItem key={doc.id} document={doc} isLast={i === documents.length - 1} />
          ))
        )}
      </ul>

      <FloatingAddButton />
    </div>
  );
}
