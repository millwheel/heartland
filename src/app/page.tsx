"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {BottomOverlayHint} from "@/component/bottomOverlayHint";

export default function Home() {
    const [showHint, setShowHint] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setShowHint(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    function handleGoDetail() {
        if (leaving) return;          // 중복 클릭 방지
        setLeaving(true);             // 확대 애니메이션 시작
        setShowHint(false);           // 힌트 숨김(선택)
        // 트랜지션 시간(아래 duration-500과 맞춰주세요)
        setTimeout(() => router.push("/detail"), 500);
    }

    return (
        <main className="relative min-h-screen">
            {/* 배경 이미지를 감싸는 컨테이너에 scale 트랜지션 */}
            <div
                className={[
                    "absolute inset-0",
                    "transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
                    "will-change-transform",
                    leaving ? "scale-[1.3]" : "scale-100",
                ].join(" ")}
            >
                <Image
                    src="/image/heartland_main.png"
                    alt="Heartland"
                    fill
                    priority
                    className="object-cover [object-position:49%_58%]"
                />
            </div>

            {/* 투명 클릭 영역: 배경 확대 후 이동 */}
            <button
                onClick={handleGoDetail}
                className="absolute left-1/2 top-[40%]
                   -translate-x-1/2 -translate-y-1/2
                   rounded-4xl hover:cursor-pointer
                   px-26 py-26"
                aria-label="상세로 이동"
            />

            {showHint && !leaving && (
                <BottomOverlayHint />
            )}
        </main>
    );
}
