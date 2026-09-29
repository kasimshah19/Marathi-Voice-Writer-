import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterChips } from '@/components/ui/FilterChips';
import { DocumentListItem } from '@/components/ui/DocumentListItem';
import { FloatingAddButton } from '@/components/ui/FloatingAddButton';
import { MOCK_DOCUMENTS } from '@/constants/mockDocuments';

export function MyDocumentsScreen() {
  return (
    <div className="flex flex-col h-full relative" style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7f5ff 60%,#efeaff 100%)" }}>
      <div className="shrink-0">
        <ScreenHeader title="माझे दस्तऐवज" />
        <SearchBar />
        <FilterChips />
      </div>
      
      {/* Scrollable list area */}
      <ul className="px-4 mt-3 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-[100px]">
        {MOCK_DOCUMENTS.map((doc, i) => (
          <DocumentListItem key={doc.id} document={doc} isLast={i === MOCK_DOCUMENTS.length - 1} />
        ))}
      </ul>

      <FloatingAddButton />
    </div>
  );
}
