"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Share2, FileText, Save } from "lucide-react";
import { EditorHeader } from "@/components/ui/EditorHeader";
import { EditorTextArea } from "@/components/ui/EditorTextArea";
import { UndoRedoBar } from "@/components/ui/UndoRedoBar";
import { useRouter } from "next/navigation";
import { ActionTile } from "@/components/ui/ActionTile";
import { ROUTES } from "@/constants/routes";
import { type TranscriptionResponse, createDocument, updateDocument } from "@/lib/api";

export function EditorScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load transcript from sessionStorage or from API
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const docId = searchParams.get('docId');

    async function loadDoc() {
      if (docId) {
        try {
          const { getDocument } = await import('@/lib/api');
          const doc = await getDocument(docId);
          setText(doc.content);
          setTitle(doc.title);
          setDocumentId(docId);
        } catch (e) {
          console.error("Failed to load document:", e);
        }
      } else {
        try {
          const stored = sessionStorage.getItem("mvw_transcript");
          if (stored) {
            const data: TranscriptionResponse = JSON.parse(stored);
            setText(data.text);
          }
        } catch {
          // Ignore parse errors
        }
      }
      setLoaded(true);
    }
    loadDoc();
  }, []);

  const wordCount = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  }, [text]);

  const handleSave = async () => {
    if (!text.trim() || isSaving) return;
    setIsSaving(true);
    
    const finalTitle = title.trim() ? title.trim() : "शीर्षकहीन दस्तऐवज";

    try {
      if (documentId) {
        await updateDocument(documentId, finalTitle, text);
      } else {
        const doc = await createDocument(finalTitle, text);
        setDocumentId(doc.id);
      }
      // Clean up session storage on success
      sessionStorage.removeItem("mvw_transcript");
      
      alert("यशस्वीरीत्या जतन केले!");
      router.push(ROUTES.DOCUMENTS);
    } catch (error) {
      console.error("Failed to save document:", error);
      alert("Failed to save document. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Don't render until sessionStorage has been checked (avoids flash)
  if (!loaded) return null;

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-white via-[#f7f5ff] to-[#efeaff]">
      <EditorHeader title={title} onChangeTitle={setTitle} isSaving={isSaving} backHref={documentId ? ROUTES.DOCUMENTS : ROUTES.NEW_DOCUMENT} />

      <EditorTextArea value={text} onChange={setText} />

      <UndoRedoBar wordCount={wordCount} />

      <div className="mt-auto px-4 mb-4 pt-4 grid grid-cols-4 gap-2.5">
        <ActionTile
          icon={<Copy size={22} className="text-indigo-600" />}
          label="कॉपी"
          onClick={handleCopy}
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
          label={isSaving ? "जतन करत आहे..." : "जतन करा"}
          onClick={handleSave}
          disabled={isSaving}
        />
      </div>
    </div>
  );
}
