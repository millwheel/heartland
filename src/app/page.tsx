"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
    const router = useRouter();

    return (
        <main className="relative min-h-screen">
            <Image
                src="/image/heartland_main.png"
                alt="Heartland"
                fill
                priority
                className="object-cover [object-position:49%_58%]"
            />

            {/* 나무 클릭 버튼 (투명) */}
            <button
                className="absolute left-1/2 top-[40%]
                        -translate-x-1/2 -translate-y-1/2
                        rounded-4xl hover:cursor-pointer
                        px-26 py-26"
                onClick={() => router.push("/detail")}
            >
            </button>
        </main>
    );
}
