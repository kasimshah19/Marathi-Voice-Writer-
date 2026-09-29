import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { FilterChips } from '@/components/ui/FilterChips';
import { TemplateCard } from '@/components/ui/TemplateCard';
import { MOCK_TEMPLATES } from '@/constants/mockTemplates';

export function TemplatesScreen() {
  const templateChips = [
    { label: 'सर्व', active: true },
    { label: 'अर्ज', active: false },
    { label: 'निवेदन', active: false },
    { label: 'प्रतिज्ञापत्र', active: false },
    { label: 'इतर', active: false },
  ];

  return (
    <div className="flex flex-col h-full relative" style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7f5ff 60%,#efeaff 100%)" }}>
      <div className="shrink-0 pb-1">
        <ScreenTitle title="टेम्पलेट्स" subtitle="साधारण वापरासाठी तयार नमुने" />
        <FilterChips chips={templateChips} className="px-5" />
      </div>
      
      {/* Scrollable list area */}
      <ul className="flex-1 overflow-y-auto px-4 mt-4 pb-6 space-y-2.5 [scrollbar-width:none]">
        {MOCK_TEMPLATES.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </ul>
    </div>
  );
}
