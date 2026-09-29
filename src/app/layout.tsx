import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Inter } from "next/font/google";
import "./globals.css";
import { MobileShell } from "@/components/layout/MobileShell";

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-devanagari",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Marathi Voice Writer",
  description: "आवाजातून मराठीत लेखन",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" translate="no" suppressHydrationWarning>
      <body className={`${notoSansDevanagari.variable} ${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <MobileShell>
          {children}
        </MobileShell>
      </body>
    </html>
  );
}
