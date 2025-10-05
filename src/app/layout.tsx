import type { Metadata } from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/component/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Heartland",
    description: "Heartland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-dvh flex justify-center">
          <div
              className={[
                "w-full max-w-[420px] min-h-dvh",
                "shadow-xl shadow-black/40",
              ].join(" ")}
          >
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
