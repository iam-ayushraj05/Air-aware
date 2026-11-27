import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "AirAware: Breathe Smarter, Live Safer",
  description:
    "AI-powered urban air quality assistant helping families navigate severe winter smog and urban pollution with low-emission routines, indoor hacks, and measurable sustainable alternatives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen bg-[#F8FAF8] text-slate-900 selection:bg-emerald-200">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
