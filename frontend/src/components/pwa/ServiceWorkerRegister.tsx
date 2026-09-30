"use client";

import { useEffect, useState } from "react";

export function ServiceWorkerRegister() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    let swRegistration: ServiceWorkerRegistration | null = null;

    if ("serviceWorker" in navigator) {
      const registerSW = () => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .then((registration) => {
            swRegistration = registration;
            
            if (registration.waiting) {
              setUpdateAvailable(true);
              setWaitingWorker(registration.waiting);
            }

            registration.addEventListener("updatefound", () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                    setUpdateAvailable(true);
                    setWaitingWorker(newWorker);
                  }
                });
              }
            });
          })
          .catch((err) => console.error("SW registration failed:", err));
      };
      
      if (document.readyState === "complete") {
        registerSW();
      } else {
        window.addEventListener("load", registerSW);
      }
      
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible" && swRegistration) {
          swRegistration.update();
        }
      };
      
      document.addEventListener("visibilitychange", handleVisibilityChange);
      
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
    }
  };

  return (
    <>
      {isOffline && (
        <div className="absolute top-2 left-0 w-full z-50 flex justify-center pointer-events-none">
          <div className="bg-amber-500 text-white text-xs font-medium px-4 py-1 rounded-full shadow pointer-events-auto">
            ऑफलाइन
          </div>
        </div>
      )}
      {updateAvailable && (
        <div className="absolute top-[calc(40px+env(safe-area-inset-top))] left-0 w-full z-50 flex justify-center pointer-events-none">
          <div className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-full shadow-xl flex items-center gap-3 pointer-events-auto">
            <span>नवीन आवृत्ती उपलब्ध आहे</span>
            <button 
              onClick={handleUpdate}
              className="bg-white text-slate-900 px-3 py-1 rounded-full text-xs font-bold active:scale-95 transition-transform"
            >
              अपडेट करा
            </button>
          </div>
        </div>
      )}
    </>
  );
}
