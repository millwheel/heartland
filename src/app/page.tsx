"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [leaving, setLeaving] = useState(false);
    const router = useRouter();


    function handleGoTree() {
        if (leaving) return;
        setLeaving(true);
        setTimeout(() => router.push("/tree"), 500);
    }

    function handleGoTrain() {
        if (leaving) return;
        setLeaving(true);
        setTimeout(() => router.push("/train"), 500);
    }

    function handleGoHouse() {
        if (leaving) return;
        setLeaving(true);
        setTimeout(() => router.push("/house"), 500);
    }


    return (
        <main className="relative min-h-screen">
            {/* 배경 이미지를 감싸는 컨테이너에 scale 트랜지션 */}
            <div>
                <div className="absolute inset-0 overflow-hidden">
                    {/* 배경 이미지 (스케일은 여기만!) */}
                    <Image
                        src="/image/heartland_main.png"
                        alt="Heartland"
                        fill
                        priority
                        className={[
                            "object-cover [object-position:49%_58%]",
                            "transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] will-change-transform",
                            leaving ? "scale-[1.3]" : "scale-100",
                        ].join(" ")}
                    />
                </div>
            </div>

            {/* 투명 클릭 영역 */}
            <button
                onClick={handleGoTree}
                className="absolute left-1/2 top-[40%]
                   -translate-x-1/2 -translate-y-1/2
                   rounded-4xl hover:cursor-pointer
                   px-30 py-26"
            />

        </main>
    );
}
