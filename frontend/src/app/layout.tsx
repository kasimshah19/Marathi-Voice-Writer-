import type { Metadata, Viewport } from "next";
import { Karma, Inter } from "next/font/google";
import "./globals.css";
import { MobileShell } from "@/components/layout/MobileShell";
import { InstallProvider } from "@/components/pwa/InstallProvider";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { InstallPopup } from "@/components/pwa/InstallPopup";

const karma = Karma({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-karma",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#4f6bff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Marathi Voice Writer",
  description: "आवाजातून मराठीत लेखन - वकिलांसाठी खास, सोपे आणि वेगवान साधन",
  applicationName: "Marathi Voice Writer",
  appleWebApp: { 
    capable: true, 
    title: "Voice Writer", 
    statusBarStyle: "default" 
  },
  formatDetection: { 
    telephone: false 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" translate="no" suppressHydrationWarning>
      <body className={`${karma.variable} ${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <InstallProvider>
          <MobileShell>
            <ServiceWorkerRegister />
            {children}
            <InstallPopup />
          </MobileShell>
        </InstallProvider>
      </body>
    </html>
  );
}
