/**
 * Centralised API client for the Marathi Voice Writer backend.
 *
 * Every fetch call goes through here so the base URL is configured once
 * via the NEXT_PUBLIC_API_URL environment variable.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TranscriptionResponse {
  success: boolean;
  text: string;
  language: string;
  duration_seconds: number | null;
  processing_time_seconds: number | null;
}

export interface ApiError {
  detail: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  language: string;
  word_count: number;
  created_at: string;
  updated_at: string;
}

// ─── Health check ───────────────────────────────────────────────────────────

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/health`);
    return res.ok;
  } catch {
    return false;
  }
}

// ─── Transcription ──────────────────────────────────────────────────────────

/**
 * Upload an audio `Blob` (from `MediaRecorder`) to the backend for
 * Marathi speech-to-text transcription.
 *
 * The browser sets the multipart boundary automatically — **do not**
 * manually set `Content-Type`.
 */
export async function transcribeAudio(
  audioBlob: Blob,
  filename: string = "recording.webm",
): Promise<TranscriptionResponse> {
  const formData = new FormData();
  formData.append("file", audioBlob, filename);

  const response = await fetch(
    `${API_BASE_URL}/api/v1/transcription`,
    {
      method: "POST",
      body: formData,
      // Do NOT set Content-Type – the browser must set the multipart boundary.
    },
  );

  if (!response.ok) {
    let message = `Server error (${response.status})`;
    try {
      const err: ApiError = await response.json();
      if (err.detail) message = err.detail;
    } catch {
      // response wasn't JSON – use the generic message.
    }
    throw new Error(message);
  }

  const data: TranscriptionResponse = await response.json();
  return data;
}

// ─── Documents ──────────────────────────────────────────────────────────────

export async function getDocuments(searchQuery?: string): Promise<Document[]> {
  const url = searchQuery 
    ? `${API_BASE_URL}/api/v1/documents?search=${encodeURIComponent(searchQuery)}` 
    : `${API_BASE_URL}/api/v1/documents`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch documents");
  const data = await response.json();
  return data.documents;
}

export async function getDocument(id: string): Promise<Document> {
  const response = await fetch(`${API_BASE_URL}/api/v1/documents/${id}`);
  if (!response.ok) throw new Error("Failed to fetch document");
  const data = await response.json();
  return data.document;
}

export async function createDocument(title: string, content: string): Promise<Document> {
  const response = await fetch(`${API_BASE_URL}/api/v1/documents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  if (!response.ok) throw new Error("Failed to create document");
  const data = await response.json();
  return data.document;
}

export async function updateDocument(id: string, title: string, content: string): Promise<Document> {
  const response = await fetch(`${API_BASE_URL}/api/v1/documents/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  if (!response.ok) throw new Error("Failed to update document");
  const data = await response.json();
  return data.document;
}

export async function deleteDocument(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/documents/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete document");
}
