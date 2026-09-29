import { Home, FileText, LayoutTemplate, Settings } from 'lucide-react';

export const ROUTES = {
  HOME: '/',
  NEW_DOCUMENT: '/new',
  RECORDING: '/recording',
  EDITOR: '/editor',
  DOCUMENTS: '/documents',
  DOCUMENT_DETAIL: (id: string) => `/documents/${id}`,
  TEMPLATES: '/templates',
  SETTINGS: '/settings',
};

export const BOTTOM_NAV_ITEMS = [
  { label: 'होम', shortLabel: 'होम', icon: Home, href: ROUTES.NEW_DOCUMENT },
  { label: 'माझे दस्तऐवज', shortLabel: 'दस्तऐवज', icon: FileText, href: ROUTES.DOCUMENTS },
  { label: 'टेम्पलेट्स', shortLabel: 'टेम्पलेट्स', icon: LayoutTemplate, href: ROUTES.TEMPLATES },
  { label: 'सेटिंग्ज', shortLabel: 'सेटिंग्ज', icon: Settings, href: ROUTES.SETTINGS },
];
