"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowHint(true);
        }, 3000); // 3초 후 표시

        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="relative min-h-screen">
            <Image
                src="/image/heartland_main.png"
                alt="Heartland"
                fill
                priority
                className="object-cover [object-position:49%_58%]"
            />

            {/* 나무 클릭 영역 (투명) */}
            <Link
                href="/detail"
                className="absolute left-1/2 top-[40%]
                           -translate-x-1/2 -translate-y-1/2
                           rounded-4xl hover:cursor-pointer
                           block px-26 py-26"
            >
            </Link>

            {/* 오버레이 알림 */}
            {showHint && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center">
                    <div
                        className="bg-[#ffd427] text-black
                           px-4 py-2 rounded-3xl font-bold shadow-lg
                           text-center text-sm
                           max-w-md break-words
                           animate-[fadeBlink_2.4s_ease-in-out_infinite]"
                    >
                        중앙에 있는 나무를 클릭해보세요!
                    </div>
                </div>
            )}
        </main>
    );
}