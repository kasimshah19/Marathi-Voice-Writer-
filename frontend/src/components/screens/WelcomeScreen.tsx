import Link from "next/link";
import { FileText, Mic, PenSquare, ArrowRight } from "lucide-react";
import { AppLogo } from "@/components/ui/AppLogo";
import { VoiceWave } from "@/components/ui/VoiceWave";
import { ROUTES } from "@/constants/routes";

export function WelcomeScreen() {
  return (
    <div className="flex flex-col min-h-full items-center justify-between pb-8">
      <div className="flex flex-col items-center px-7 pt-14 w-full">
        <AppLogo />
        <h1 className="mt-6 text-[26px] font-bold text-slate-900 tracking-tight font-[family-name:var(--font-inter)]">
          Marathi Voice Writer
        </h1>
        <p className="mt-1 text-[15px] text-slate-400 font-[family-name:var(--font-inter)]">
          Speak. Type. Draft. Faster.
        </p>
      </div>

      <div className="w-full mt-6 flex-shrink-0">
        <VoiceWave />
      </div>

      <div className="flex items-center justify-center gap-7 mt-2 w-full">
        <div className="w-14 h-14 rounded-full bg-white shadow-lg shadow-indigo-200/70 flex items-center justify-center text-blue-500">
          <FileText size={22} />
        </div>
        <Mic size={30} className="text-violet-600" strokeWidth={2.4} />
        <div className="w-14 h-14 rounded-full bg-white shadow-lg shadow-fuchsia-200/70 flex items-center justify-center text-fuchsia-500">
          <PenSquare size={22} />
        </div>
      </div>

      <div className="text-center mt-14 px-6 w-full flex flex-col items-center">
        <h2 className="text-[24px] font-bold text-slate-900">आवाजातून मराठीत लेखन</h2>
        <p className="mt-2 text-[16px] text-slate-600 text-center">वकिलांसाठी खास, सोपे आणि वेगवान साधन</p>
      </div>

      <div className="mt-auto px-6 pb-8 pt-8 w-full">
        <Link 
          href={ROUTES.NEW_DOCUMENT}
          className="w-full py-4 rounded-full text-white font-semibold text-[17px] flex items-center justify-center gap-2 shadow-xl shadow-indigo-300/70 active:scale-[.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
          style={{ background: "linear-gradient(90deg, var(--color-primary-start) 0%, var(--color-primary-mid) 60%, var(--color-primary-end) 100%)" }}
        >
          सुरू करा <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
