import { MOCK_USER } from '@/constants/mockUser';

export function ProfileCard() {
  return (
    <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm border border-slate-100 p-3.5 flex items-center gap-4">
      <div className="w-[52px] h-[52px] rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
        <span className="text-indigo-600 font-bold text-[18px] font-sans">{MOCK_USER.initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-[16px] font-semibold text-slate-900 truncate font-sans">{MOCK_USER.name}</h2>
        <p className="text-[12.5px] text-slate-500 mt-0.5 truncate font-sans">{MOCK_USER.email}</p>
      </div>
    </div>
  );
}
