"use client";

import { useEffect, useState } from "react";

type FadeOverlayProps = {
    leaving: boolean;
    enterDuration?: number;
    leaveDuration?: number;
};

/**
 * 페이지 간 자연스러운 밝기 전환을 위한 공용 오버레이.
 * - 처음 진입 시 어두운 상태에서 점점 밝아짐.
 * - 떠날 때 다시 어두워짐.
 */
export default function FadeOverlay({
                                        leaving,
                                        enterDuration = 100,
                                        leaveDuration = 500,
                                    }: FadeOverlayProps) {
    const [entering, setEntering] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setEntering(false), enterDuration);
        return () => clearTimeout(timeout);
    }, [enterDuration]);

    return (
        <div
            className={[
                "absolute inset-0 z-30 bg-black ease-out transition-opacity",
                // 동적 트랜지션 시간 적용
                `duration-${leaving ? leaveDuration : enterDuration}`,
                entering
                    ? "opacity-60" // 진입 시 어두운 상태 → 점점 밝아짐
                    : leaving
                        ? "opacity-60" // 떠날 때 다시 어두워짐
                        : "opacity-0 pointer-events-none",
            ].join(" ")}
            style={{
                transitionDuration: `${leaving ? leaveDuration : enterDuration}ms`,
            }}
        />
    );
}
