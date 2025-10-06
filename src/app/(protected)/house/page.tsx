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
    [Phase.Inhale]: 4000, // 4초
    [Phase.Hold]: 7000,   // 7초
    [Phase.Exhale]: 8000, // 8초
    [Phase.Done]: 0,
};

export default function House() {
    const router = useRouter();
    const [leaving, setLeaving] = useState(false);
    const [phase, setPhase] = useState<Phase>(Phase.Idle);
    const [remainingMs, setRemainingMs] = useState<number>(0);

    // 타이머/루프 제어용 ref
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

    // 남은 시간을 rAF로 빈번히 갱신(부드러움 + 드리프트 제거)
    const startTicker = (duration: number) => {
        endAtRef.current = performance.now() + duration;
        setRemainingMs(duration); // 시작 프레임에 정확히 표기(예: 4000ms -> 4초)

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

    // 정확한 시각에 다음 페이즈로 전환(전환은 setTimeout 하나만)
    const scheduleNextPhase = (duration: number, current: Phase) => {
        if (nextPhaseTimeoutRef.current) clearTimeout(nextPhaseTimeoutRef.current);
        if (duration <= 0) return;

        nextPhaseTimeoutRef.current = window.setTimeout(() => {
            switch (current) {
                case Phase.Inhale:
                    runPhase(Phase.Hold);
                    break;
                case Phase.Hold:
                    runPhase(Phase.Exhale);
                    break;
                case Phase.Exhale:
                    runPhase(Phase.Done);
                    break;
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
            // Idle/Done 등 표시만 필요한 경우
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

    useEffect(() => {
        return () => clearAllTimers();
    }, []);

    // 화면에 보여줄 남은 "초" (ceil로 4→3→2→1 정확히 떨어지게)
    const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));

    const phaseText = (() => {
        switch (phase) {
            case Phase.Inhale: return "들이마시기";
            case Phase.Hold:   return "참기";
            case Phase.Exhale: return "내쉬기";
            case Phase.Done:   return "수고하셨어요!";
            default:           return "";
        }
    })();

    const showCenterText = [Phase.Inhale, Phase.Hold, Phase.Exhale, Phase.Done].includes(phase);

    return (
        <div className="relative min-h-screen overflow-hidden">
            <Image
                src="/image/heartland_house.png"
                alt="오두막 배경"
                fill
                priority
                className="object-cover z-0"
            />

            {/* 입장 시 밝아지고, 퇴장 시 어두워짐 */}
            <FadeOverlay leaving={leaving} />

            {/* 중앙 원형 카운트다운/완료 메세지 */}
            {showCenterText && (
                <div
                    className={[
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                        "bg-[#f8bb33]/90 text-white font-extrabold text-3xl",
                        "flex items-center justify-center text-center select-none z-20",
                        "w-48 h-48 rounded-full shadow-xl"
                    ].join(" ")}
                >
                    {phase === Phase.Done ? (
                        <div> 수고하셨어요! </div>
                    ) : (
                        <div>
                            <div className="text-5xl mb-1">{remainingSec}</div>
                            <div className="text-xl">{phaseText}</div>
                        </div>
                    )}
                </div>
            )}

            {/* 버튼: 페이즈별 표시 제어 */}
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
