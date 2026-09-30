"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";

interface InstallContextValue {
  canInstall: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  promptInstall: () => Promise<"accepted" | "dismissed" | "unavailable">;
  hidePromptForSession: () => void;
  openPrompt: () => void;
  showPrompt: boolean;
}

const InstallContext = createContext<InstallContextValue | null>(null);

export function useInstallPrompt() {
  const context = useContext(InstallContext);
  if (!context) throw new Error("useInstallPrompt must be used within InstallProvider");
  return context;
}

export function InstallProvider({ children }: { children: React.ReactNode }) {
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  
  const deferredPromptRef = useRef<any>(null);
  const dismissedSessionRef = useRef(false);
  const installDoneSessionRef = useRef(false);

  useEffect(() => {
    const isStandalone = 
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: window-controls-overlay)").matches ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = 
      /iphone|ipad|ipod/.test(userAgent) ||
      (userAgent.includes("mac") && "ontouchend" in document);
      
    if (isIosDevice) {
      setIsIOS(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPromptRef.current = e;
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      installDoneSessionRef.current = true;
      setShowPrompt(false);
      deferredPromptRef.current = null;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    const timer = setTimeout(() => {
      if (!isStandalone && !installDoneSessionRef.current && !dismissedSessionRef.current) {
        setShowPrompt(true);
      }
    }, 1500);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearTimeout(timer);
    };
  }, []);

  const hidePromptForSession = () => {
    dismissedSessionRef.current = true;
    setShowPrompt(false);
  };

  const promptInstall = async (): Promise<"accepted" | "dismissed" | "unavailable"> => {
    const promptEvent = deferredPromptRef.current;
    if (!promptEvent) return "unavailable";

    try {
      await promptEvent.prompt();
      const choiceResult = await promptEvent.userChoice;
      
      if (choiceResult.outcome === "accepted") {
        setIsInstalled(true);
        installDoneSessionRef.current = true;
        setShowPrompt(false);
      }
      
      deferredPromptRef.current = null;
      setCanInstall(false);
      return choiceResult.outcome;
    } catch (err) {
      console.error("Install prompt error", err);
      return "unavailable";
    }
  };

  return (
    <InstallContext.Provider
      value={{
        canInstall,
        isInstalled,
        isIOS,
        promptInstall,
        hidePromptForSession,
        openPrompt: () => setShowPrompt(true),
        showPrompt,
      }}
    >
      {children}
    </InstallContext.Provider>
  );
}
