"use client";

import React, { useEffect, useRef } from "react";
import { useInstallPrompt } from "./InstallProvider";
import { X, Zap, Maximize, Smartphone, Download, Share, PlusSquare, ChevronDown } from "lucide-react";
import Image from "next/image";

export function InstallPopup() {
  const { showPrompt, canInstall, isIOS, isInstalled, hidePromptForSession, promptInstall } = useInstallPrompt();
  
  const dialogRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showPrompt) {
        hidePromptForSession();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showPrompt, hidePromptForSession]);

  if (isInstalled) return null;
  if (!showPrompt || (!canInstall && !isIOS)) return null;

  const isIosSafari = isIOS && typeof navigator !== "undefined" && !/crios|fxios/.test(navigator.userAgent.toLowerCase());

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center pointer-events-none sm:pb-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 pointer-events-auto transition-opacity"
        onClick={hidePromptForSession}
        aria-hidden="true"
      />
      
      {/* Bottom Sheet */}
      <div 
        ref={dialogRef}
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="pwa-title"
        className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl pointer-events-auto pb-[env(safe-area-inset-bottom)] sm:rounded-3xl animate-in slide-in-from-bottom-full duration-250 ease-out"
      >
        <div className="p-5 flex flex-col gap-4">
          <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mb-1" />
          
          <button 
            onClick={hidePromptForSession}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            aria-label="बंद करा"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-4 mt-2">
            <Image 
              src="/icons/icon-192.png" 
              alt="App Icon" 
              width={56} 
              height={56} 
              className="rounded-2xl shadow-sm"
            />
            <div>
              <h2 id="pwa-title" className="font-sans font-bold text-[17px] text-slate-900 leading-tight">
                Marathi Voice Writer
              </h2>
              <p className="font-karma text-[13px] text-slate-500 mt-0.5">
                आवाजातून मराठीत लेखन
              </p>
            </div>
          </div>

          <p className="font-karma text-[15px] text-slate-700 mt-1">
            ॲप इंस्टॉल करा आणि फोनच्या होम स्क्रीनवरून एका टॅपमध्ये उघडा. जलद, सोपे आणि पूर्ण स्क्रीन.
          </p>

          <div className="flex flex-col gap-3 my-2">
            <div className="flex items-center gap-3 text-slate-600">
              <Zap size={18} className="text-violet-500" />
              <span className="font-karma text-[14px]">जलद सुरुवात</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Maximize size={18} className="text-violet-500" />
              <span className="font-karma text-[14px]">पूर्ण स्क्रीन</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Smartphone size={18} className="text-violet-500" />
              <span className="font-karma text-[14px]">होम स्क्रीनवर आयकॉन</span>
            </div>
          </div>

          {canInstall && (
            <div className="mt-2 flex flex-col gap-2">
              <button 
                onClick={() => promptInstall()}
                autoFocus
                className="w-full h-[52px] rounded-full bg-gradient-to-r from-[#4f6bff] via-[#7c5cf5] to-[#b06cf0] text-white font-sans font-semibold flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity"
              >
                <Download size={20} />
                <span className="font-karma text-[16px]">इंस्टॉल करा</span>
              </button>
              <button 
                onClick={hidePromptForSession}
                className="w-full py-3 text-center text-slate-500 font-karma text-[15px] hover:text-slate-700 transition-colors"
              >
                नंतर
              </button>
            </div>
          )}

          {isIOS && (
            <div className="mt-2 flex flex-col gap-2">
              {isIosSafari ? (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold font-sans">1</span>
                    <p className="font-karma text-[14px] text-slate-700 leading-tight">
                      Safari च्या खालील Share (शेअर) बटणावर <Share size={16} className="inline mx-1 text-blue-500 mb-0.5" /> टॅप करा
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold font-sans">2</span>
                    <p className="font-karma text-[14px] text-slate-700 leading-tight">
                      खाली स्क्रोल करून <span className="font-sans font-medium text-slate-900 mx-1">Add to Home Screen</span> <PlusSquare size={16} className="inline mx-0.5 text-slate-500 mb-0.5" /> निवडा
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold font-sans">3</span>
                    <p className="font-karma text-[14px] text-slate-700 leading-tight">
                      वरती <span className="font-sans font-medium text-slate-900 mx-1">Add</span> वर टॅप करा
                    </p>
                  </div>
                  
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-blue-500 animate-bounce">
                    <ChevronDown size={24} />
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 text-amber-700 p-3 rounded-xl font-karma text-[14px] text-center">
                  इंस्टॉल करण्यासाठी हे पेज Safari मध्ये उघडा.
                </div>
              )}
              
              <button 
                onClick={hidePromptForSession}
                className="w-full py-3 mt-1 text-center text-slate-500 font-karma text-[15px] hover:text-slate-700 transition-colors"
              >
                नंतर
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
