import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orme Design",
  description: "Orme Design – Creative & Content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={dmSans.variable}>
      <body className="antialiased bg-[--color-background] text-[--color-foreground]">
        {children}
      </body>
    </html>
  );
}
