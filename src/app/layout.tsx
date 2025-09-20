import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/component/header";
import ProfileModal from "@/component/profileModal";

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
    viewport: {
        width: "device-width",
        initialScale: 1,
        viewportFit: "cover"
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* 배경은 넓게, 실제 UI는 '폰 폭'으로 제한 */}
        <div className="min-h-dvh flex justify-center">
          <div
              className={[
                "w-full max-w-[420px] min-h-dvh", // 폰 폭 고정
                "shadow-xl shadow-black/40",              // 카드처럼 떠보이게(선택)
                // "pt-[max(16px,env(safe-area-inset-top))]",
                // "pb-[max(16px,env(safe-area-inset-bottom))]",
              ].join(" ")}
          >
            <Header />
            <ProfileModal />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
