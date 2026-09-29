import type { Metadata } from "next";
import { Karma, Inter } from "next/font/google";
import "./globals.css";
import { MobileShell } from "@/components/layout/MobileShell";

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
      <body className={`${karma.variable} ${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <MobileShell>
          {children}
        </MobileShell>
      </body>
    </html>
  );
}
