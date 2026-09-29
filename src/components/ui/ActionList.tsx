import { Pencil, Copy, FileDown, Share2, Trash2 } from 'lucide-react';
import { ActionListItem } from './ActionListItem';
import { ROUTES } from '@/constants/routes';

export function ActionList() {
  const actions = [
    { icon: Pencil, label: "संपादित करा", href: ROUTES.EDITOR },
    { icon: Copy, label: "कॉपी करा" },
    { icon: FileDown, label: "PDF म्हणून डाउनलोड" },
    { icon: Share2, label: "शेअर करा" },
    { icon: Trash2, label: "मिटवा", isDanger: true, href: ROUTES.DOCUMENTS },
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
          href={action.href}
        />
      ))}
    </ul>
  );
}
