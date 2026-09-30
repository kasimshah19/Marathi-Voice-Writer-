"use client";

import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { ProfileCard } from '@/components/ui/ProfileCard';
import { SettingsGroup } from '@/components/ui/SettingsGroup';
import { SettingsRow } from '@/components/ui/SettingsRow';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
import { LogoutButton } from '@/components/ui/LogoutButton';
import { Globe, Palette, Type, WifiOff, Volume2, Keyboard, Download, Share2 } from 'lucide-react';
import { useInstallPrompt } from '@/components/pwa/InstallProvider';
import { useState } from 'react';

export function SettingsScreen() {
  const { canInstall, isInstalled, isIOS, openPrompt } = useInstallPrompt();
  const [showUnsupportedHint, setShowUnsupportedHint] = useState(false);

  const handleInstallClick = () => {
    if (isInstalled) return;
    if (canInstall || isIOS) {
      openPrompt();
    } else {
      setShowUnsupportedHint(true);
      setTimeout(() => setShowUnsupportedHint(false), 3000);
    }
  };
  return (
    <div className="flex flex-col min-h-full pb-4" style={{ background: "linear-gradient(180deg,#ffffff 0%,#f7f5ff 60%,#efeaff 100%)" }}>
      <ScreenTitle title="सेटिंग्ज" />
      
      <ProfileCard />

      <SettingsGroup className="mt-3.5">
        <SettingsRow 
          icon={<Globe size={20} />} 
          label="भाषा" 
          rightText="Marathi (मराठी)" 
          chevron="right" 
        />
        <SettingsRow 
          icon={<Palette size={20} />} 
          label="थीम" 
          rightText="Light" 
          chevron="down" 
        />
        <SettingsRow 
          icon={<Type size={20} />} 
          label="Auto Punctuation" 
          rightContent={<ToggleSwitch initialState={true} ariaLabel="Toggle Auto Punctuation" />} 
        />
        <SettingsRow 
          icon={<WifiOff size={20} />} 
          label="ऑफलाईन मोड" 
          rightContent={<ToggleSwitch initialState={false} ariaLabel="Toggle Offline Mode" />} 
        />
        <SettingsRow 
          icon={<Volume2 size={20} />} 
          label="आवाज गुणवत्ता" 
          rightText="हाय क्वालिटी" 
          chevron="right" 
        />
        <SettingsRow 
          icon={<Keyboard size={20} />} 
          label="कीबोर्ड शॉर्टकट" 
          chevron="right" 
          hasDivider={false} 
        />
      </SettingsGroup>

      <SettingsGroup className="mt-3.5">
        <SettingsRow 
          icon={<Download size={20} />} 
          label="PWA इंस्टॉल करा" 
          chevron={isInstalled ? 'none' : 'right'} 
          rightContent={isInstalled ? <span className="text-green-600 font-sans text-xs font-semibold px-2">इंस्टॉल केले</span> : undefined}
          onClick={handleInstallClick}
        />
        {showUnsupportedHint && (
          <div className="px-4 py-2 bg-slate-50 text-slate-500 text-[13px] font-karma text-center">
            हा ब्राउझर इंस्टॉलला सपोर्ट करत नाही. Chrome किंवा Safari वापरा.
          </div>
        )}
        <SettingsRow 
          icon={<Share2 size={20} />} 
          label="ॲप शेअर करा" 
          chevron="right" 
          hasDivider={false} 
        />
      </SettingsGroup>

      <LogoutButton />
    </div>
  );
}
