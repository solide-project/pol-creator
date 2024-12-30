import type { Metadata } from "next";
import { NavBar } from "@/components/nav";
import { aeonik } from "@/lib/fonts";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CreatorProvider } from "@/components/providers/creator-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Proof of Learn",
  description: "Rewarding learning with NFTs",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">
    <body className={`${aeonik.variable} font-sans`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={0}>
          <CreatorProvider>
            <NavBar />
            {children}
            <Toaster />
          </CreatorProvider>
        </TooltipProvider>
      </ThemeProvider>
    </body>
  </html>
}
