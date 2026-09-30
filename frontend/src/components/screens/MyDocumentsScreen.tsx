"use client";

import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterChips } from '@/components/ui/FilterChips';
import { DocumentListItem } from '@/components/ui/DocumentListItem';
import { useEffect, useState } from 'react';
import { FloatingAddButton } from '@/components/ui/FloatingAddButton';
import { getDocuments, type Document as ApiDocument } from '@/lib/api';
import type { Document } from '@/types/document';

export function MyDocumentsScreen() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const apiDocs = await getDocuments();
        const mapped: Document[] = apiDocs.map((doc: ApiDocument) => ({
          id: doc.id,
          title: doc.title,
          date: new Date(doc.created_at).toLocaleDateString(),
          wordCount: doc.word_count,
          isFavorite: false,
        }));
        setDocuments(mapped);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="flex flex-col h-full relative" style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7f5ff 60%,#efeaff 100%)" }}>
      <div className="shrink-0">
        <ScreenHeader title="माझे दस्तऐवज" />
        <SearchBar />
        <FilterChips />
      </div>
      
      {/* Scrollable list area */}
      <ul className="px-4 mt-3 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-[100px]">
        {isLoading ? (
          <div className="flex justify-center p-4"><span className="text-sm text-slate-500">Loading...</span></div>
        ) : documents.length === 0 ? (
          <div className="flex justify-center p-4"><span className="text-sm text-slate-500">No documents found.</span></div>
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
