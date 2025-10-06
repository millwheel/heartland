"use client"

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import FadeOverlay from "@/component/fadeOverlay";
import BottomActionButton from "@/component/bottomActionButton";

enum Phase {
    Idle = 0,
    Inhale = 1,
    Hold = 2,
    Exhale = 3,
    Done = 4
}

const DURATIONS: Record<Phase, number> = {
    [Phase.Idle]: 0,
    [Phase.Inhale]: 4000,
    [Phase.Hold]: 7000,
    [Phase.Exhale]: 8000,
    [Phase.Done]: 0,
};

export default function House() {
    const router = useRouter();
    const [leaving, setLeaving] = useState(false);
    const [phase, setPhase] = useState<Phase>(Phase.Idle);
    const [remainingMs, setRemainingMs] = useState<number>(0);

    // 정확도 개선용: rAF + endAt
    const rafIdRef = useRef<number | null>(null);
    const endAtRef = useRef<number>(0);
    const nextPhaseTimeoutRef = useRef<number | null>(null);

    const clearAllTimers = () => {
        if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
        }
        if (nextPhaseTimeoutRef.current) {
            clearTimeout(nextPhaseTimeoutRef.current);
            nextPhaseTimeoutRef.current = null;
        }
    };

    const startTicker = (duration: number) => {
        endAtRef.current = performance.now() + duration;
        setRemainingMs(duration);
        const tick = () => {
            const now = performance.now();
            const remain = Math.max(0, endAtRef.current - now);
            setRemainingMs(remain);
            if (remain > 0) {
                rafIdRef.current = requestAnimationFrame(tick);
            } else {
                rafIdRef.current = null;
            }
        };
        rafIdRef.current = requestAnimationFrame(tick);
    };

    const scheduleNextPhase = (duration: number, current: Phase) => {
        if (nextPhaseTimeoutRef.current) clearTimeout(nextPhaseTimeoutRef.current);
        if (duration <= 0) return;
        nextPhaseTimeoutRef.current = window.setTimeout(() => {
            switch (current) {
                case Phase.Inhale: runPhase(Phase.Hold); break;
                case Phase.Hold:   runPhase(Phase.Exhale); break;
                case Phase.Exhale: runPhase(Phase.Done); break;
            }
        }, duration) as unknown as number;
    };

    const runPhase = (next: Phase) => {
        clearAllTimers();
        setPhase(next);
        const duration = DURATIONS[next];
        if (duration > 0) {
            startTicker(duration);
            scheduleNextPhase(duration, next);
        } else {
            setRemainingMs(0);
        }
    };

    const startBreathing = () => runPhase(Phase.Inhale);
    const restartBreathing = () => runPhase(Phase.Inhale);

    const goHome = () => {
        if (leaving) return;
        setLeaving(true);
        setTimeout(() => router.push("/"), 300);
    };

    useEffect(() => () => clearAllTimers(), []);

    const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));

    const phaseText = (() => {
        switch (phase) {
            case Phase.Inhale: return "들이마시기";
            case Phase.Hold:   return "참기";
            case Phase.Exhale: return "내쉬기";
            case Phase.Done:   return "수고하셨어요!";
            default: return "";
        }
    })();

    const showCenterText = [Phase.Inhale, Phase.Hold, Phase.Exhale, Phase.Done].includes(phase);
    const animateCircles = [Phase.Inhale, Phase.Hold, Phase.Exhale].includes(phase);
    const doneCircles = [Phase.Done].includes(phase);

    return (
        <div className="relative min-h-screen overflow-hidden">
            <Image
                src="/image/heartland_house.png"
                alt="오두막 배경"
                fill
                priority
                className="object-cover z-0"
            />

            <FadeOverlay leaving={leaving} />

            {/* 중앙 원형 카운트다운/완료 메세지 + 이중 원 애니메이션 */}
            {showCenterText && (
                <div
                    className={[
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                        "flex items-center justify-center text-center select-none z-20",
                        "w-48 h-48"
                    ].join(" ")}
                >
                    {/* 두 겹 원: 뒤(고정) + 앞(성장 애니메이션) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* 뒤 원: 고정, 50% 투명 */}
                        <div className="absolute w-56 h-56 rounded-full bg-[#f8bb33]/50" />
                        {/* 앞 원: 50% 투명, 매 초 1s 동안 scale 변동 */}
                        {animateCircles && (
                            <div
                                key={`beat-${remainingSec}`} // 매 초 리마운트 → 애니메이션 재시작
                                className="absolute w-56 h-56 rounded-full bg-[#f8bb33]/50 animate-[circleGrow_1s_ease-out_forwards]"
                            />
                        )}
                        {doneCircles && (
                            <div
                                className="absolute w-48 h-48 rounded-full bg-[#f8bb33]/50"
                            />
                        )}
                    </div>

                    {/* 텍스트 레이어 */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        {phase === Phase.Done ? (
                            <div className="bg-transparent font-extrabold text-3xl">수고하셨어요!</div>
                        ) : (
                            <div className="bg-transparent">
                                <div className="text-5xl font-extrabold mb-1">{remainingSec}</div>
                                <div className="text-xl font-extrabold">{phaseText}</div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 버튼 */}
            {phase === Phase.Idle && (
                <BottomActionButton
                    onClick={startBreathing}
                    text="호흡 함께하기"
                    position="bottom-[10%]"
                    width="min-w-[200px]"
                />
            )}

            {phase === Phase.Done && (
                <>
                    <BottomActionButton
                        onClick={restartBreathing}
                        text="호흡 다시 함께하기"
                        position="bottom-[20%]"
                        width="min-w-[200px]"
                    />
                    <BottomActionButton
                        onClick={goHome}
                        text="하트랜드 돌아가기"
                        position="bottom-[10%]"
                        width="min-w-[200px]"
                    />
                </>
            )}
        </div>
    );
}
