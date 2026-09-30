export default function Loading() {
  return (
    <div className="flex flex-col min-h-full pb-4 animate-pulse" style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7f5ff 60%,#efeaff 100%)" }}>
      <div className="px-5 pt-[calc(24px+env(safe-area-inset-top))]">
        <div className="w-40 h-8 bg-slate-200 rounded-md"></div>
      </div>
      <div className="px-5 mt-6">
        <div className="w-full h-32 bg-white rounded-3xl shadow-sm mb-4"></div>
        <div className="w-full h-20 bg-white rounded-2xl shadow-sm mb-4"></div>
        <div className="w-full h-20 bg-white rounded-2xl shadow-sm"></div>
      </div>
    </div>
  );
}
