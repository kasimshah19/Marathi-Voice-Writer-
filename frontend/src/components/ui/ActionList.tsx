import { Pencil, Copy, FileDown, Share2, Trash2 } from 'lucide-react';
import { ActionListItem } from './ActionListItem';
import { ROUTES } from '@/constants/routes';

import { Pencil, Copy, FileDown, Share2, Trash2 } from 'lucide-react';
import { ActionListItem } from './ActionListItem';
import { ROUTES } from '@/constants/routes';
import { deleteDocument } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ActionList({ documentId, content }: { documentId?: string, content?: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!documentId) return;
    if (confirm("हा दस्तऐवज हटवायचा आहे का?")) {
      setIsDeleting(true);
      try {
        await deleteDocument(documentId);
        router.push(ROUTES.DOCUMENTS);
      } catch (err) {
        console.error("Failed to delete", err);
        alert("दस्तऐवज हटविण्यात त्रुटी आली.");
        setIsDeleting(false);
      }
    }
  };

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      alert("कॉपी केले!");
    } catch {
      alert("कॉपी करण्यात त्रुटी आली.");
    }
  };

  const actions = [
    { icon: Pencil, label: "संपादित करा", href: documentId ? `/editor?docId=${documentId}` : ROUTES.EDITOR },
    { icon: Copy, label: "कॉपी करा", onClick: handleCopy },
    { icon: FileDown, label: "PDF म्हणून डाउनलोड" },
    { icon: Share2, label: "शेअर करा" },
    { icon: Trash2, label: isDeleting ? "हटवत आहे..." : "मिटवा", isDanger: true, onClick: handleDelete },
  ];

  return (
    <ul className="mx-4 bg-white rounded-2xl shadow-sm border border-slate-100 px-4 mb-6">
      {actions.map((action, i) => (
        <ActionListItem 
          key={i} 
          icon={action.icon} 
          label={action.label} 
          isDanger={action.isDanger} 
          isLast={i === actions.length - 1} 
          href={action.onClick ? undefined : action.href}
          onClick={action.onClick}
        />
      ))}
    </ul>
  );
}
