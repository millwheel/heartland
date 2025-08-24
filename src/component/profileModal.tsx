"use client";

import { useEffect, useState } from "react";
import { loadProfile, saveProfile } from "@/util/profileStorage";

enum Step {
    AskName = "askName",
    AskEmotion = "askEmotion",
}

export default function ProfileModal() {
    const [open, setOpen] = useState(false);
    const [showEnter, setShowEnter] = useState(false);
    const [showLeaving, setShowLeaving] = useState(false);
    const [step, setStep] = useState<Step>(Step.AskName);
    const [name, setName] = useState("");

    useEffect(() => {
        const profile = loadProfile();
        if (!profile) {
            setOpen(true);
            setStep(Step.AskName);
        }
    }, []);

    useEffect(() => {
        if (open) {
            const t = requestAnimationFrame(() => setShowEnter(true));
            return () => cancelAnimationFrame(t);
        } else {
            setShowEnter(false);
        }
    }, [open]);

    if (!open) return null;

    const canSubmitName = name.length > 1 && name.length <= 10;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (step === Step.AskName) {
            if (!canSubmitName) return;
            setStep(Step.AskEmotion);
            return;
        }

        try {
            saveProfile(name);
            setShowLeaving(true);
            setTimeout(() => setOpen(false), 300);
        } catch (err) {
            console.error("프로필 저장 중 에러 발생", err);
        }
    };

    return (
        <ModalShell showEnter={showEnter} showLeaving={showLeaving}>
            <form onSubmit={handleSubmit} className="space-y-5 text-center">
                {step === Step.AskName ? (
                    <>
                        <p className="text-sm text-stone-600">당신의 이야기를 담을 이름을 알려주세요</p>
                        <div className="rounded-xl ring-1 ring-stone-200 bg-white/80 focus-within:ring-yellow-300/80">
                            <input
                                type="text"
                                maxLength={30}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름 또는 닉네임"
                                aria-label="이름 또는 닉네임"
                                className="w-full px-4 py-3 rounded-xl outline-none placeholder:text-stone-400 bg-transparent"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!canSubmitName}
                            className={`inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold transition
                            ${canSubmitName ? "bg-stone-900 text-white cursor-pointer" : "bg-stone-300 text-stone-500 cursor-not-allowed"}`}
                        >
                            다음
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-base text-stone-800">{name}님, 현재 감정은 무슨 감정인가요?</p>
                        <button
                            type="submit"
                            className="items-center justify-center rounded-2xl px-6 py-3 font-semibold transition
                            bg-stone-900 text-white cursor-pointer"
                        >
                            하트랜드에 입장하기
                        </button>
                    </>
                )}
            </form>
        </ModalShell>
    );
}

/** 공통 모달 셸: 오버레이 + 박스 레이아웃 */
function ModalShell({ children, showEnter, showLeaving }: { children: React.ReactNode, showEnter: boolean, showLeaving: boolean }) {
    const panelState = showLeaving
        ? "opacity-0 scale-95"
        : showEnter
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95";

    const overlayState = showLeaving ? "opacity-0" : "opacity-100";

    return (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
            {/* 오버레이 */}
            <div
                className={[
                    "absolute inset-0 bg-black/40 backdrop-blur-[1px]",
                    "transition-opacity duration-300 ease-out",
                    overlayState,
                ].join(" ")}
            />
            {/* 모달 박스 */}
            <div
                className={[
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    "min-w-[400px] min-h-[150px] rounded-2xl p-6 bg-white shadow-lg",
                    "transition-all duration-300 ease-out",
                    panelState,
                ].join(" ")}
            >
                {children}
            </div>
        </div>
    );
}
