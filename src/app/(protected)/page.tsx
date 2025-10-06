"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FadeOverlay from "@/component/fadeOverlay";

export default function Home() {
    const [leaving, setLeaving] = useState(false);
    const [focus, setFocus] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
    const [zoom, setZoom] = useState(1);
    const [durationMs, setDurationMs] = useState(500);
    const router = useRouter();

    const go = (to: string, fx: number, fy: number, z: number, dur = 500) => {
        if (leaving) return;
        setFocus({ x: fx, y: fy });
        setZoom(z);
        setDurationMs(dur);
        setLeaving(true);
        setTimeout(() => router.push(to), dur);
    };

    const handleGoTree  = () => go("/tree", 50, 43, 1.35, 500);
    const handleGoTrain = () => go("/train", 20, 60, 1.75, 500);
    const handleGoHouse = () => go("/house", 80, 80, 1.55, 500);

    return (
        <main className="relative min-h-screen">
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src="/image/heartland_main.png"
                    alt="Heartland"
                    fill
                    priority
                    className={[
                        "object-cover [object-position:49%_58%]",
                        "transition-transform ease-[cubic-bezier(.22,.61,.36,1)] will-change-transform",
                    ].join(" ")}
                    style={{
                        transformOrigin: `${focus.x}% ${focus.y}%`,
                        transform: leaving ? `scale(${zoom})` : "scale(1)",
                        transitionDuration: `${durationMs}ms`,
                    }}
                />
            </div>

            {/* 입장 시 밝아지고, 퇴장 시 어두워짐 */}
            <FadeOverlay leaving={leaving} leaveDuration={15000} />

            {/* 투명 클릭 영역들 */}
            <button
                onClick={handleGoTree}
                className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 rounded-4xl px-30 py-22 cursor-pointer"
                aria-label="나무로 이동"
            />
            <button
                onClick={handleGoTrain}
                className="absolute left-1/5 top-[60%] -translate-x-1/2 -translate-y-1/2 rounded-4xl px-10 py-8 cursor-pointer"
                aria-label="기차로 이동"
            />
            <button
                onClick={handleGoHouse}
                className="absolute left-4/5 top-[70%] -translate-x-7 -translate-y-15 rounded-4xl px-10 py-10 cursor-pointer"
                aria-label="집으로 이동"
            />
        </main>
    );
}
