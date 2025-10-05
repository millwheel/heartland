"use client";

import Image from "next/image";
import BottomActionButton from "@/component/bottomActionButton";
import {useRouter} from "next/navigation";
import {useMemo, useRef, useState} from "react";
import { pacifico } from "@/font/pacifico";
import FadeUpWrapper from "@/component/fadeUpWrapper";
import { saveProfile } from "@/util/profileStorage";

type Phase = 0 | 1 | 2;

export default function Profile() {
    const router = useRouter();
    const [phase, setPhase] = useState<Phase>(0);
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const value = name.trim();

        if (!value) {
            setError("이름을 입력해주세요");
            return;
        }

        try {
            saveProfile(value);
            setPhase(2);
        } catch (err) {
            console.error("프로필 저장 중 에러 발생", err);
        }
    };

    const buttonText = useMemo(() => {
        switch (phase) {
            case 0:
                return "프로필 입력하기";
            case 1:
                return "다음";
            case 2:
                return "하트랜드 입장하기";
            default:
                return "다음";
        }
    }, [phase]);

    const handleButtonClick = () => {
        if (phase === 0) {
            setPhase(1);
            return;
        }
        if (phase === 1) {
            formRef.current?.requestSubmit();
            return;
        }
        router.push("/");
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <Image
                src="/image/heartland_profile.png"
                alt="프로필 배경"
                fill
                priority
                className="object-cover z-0"
            />

            <div className="absolute inset-0 z-10">
                {phase === 0 && (
                    <div className={`${pacifico.className} text-6xl mt-40 mx-10 flex flex-col gap-3 text-[#f9e7c4] text-center`}>
                        <FadeUpWrapper>
                            <span>
                                Welcome
                            </span>
                        </FadeUpWrapper>
                        <FadeUpWrapper delay={600}>
                            <span>
                                to
                            </span>
                        </FadeUpWrapper>
                        <FadeUpWrapper delay={1000}>
                            <span>
                                heartland
                            </span>
                        </FadeUpWrapper>
                    </div>
                )}

                {phase === 1 && (
                    <div className="mt-40 mx-10 flex flex-col gap-3 text-3xl font-semibold text-[#f9e7c4] text-center">
                        <FadeUpWrapper delay={100}>
                        <span>
                            당신의 이야기를 담을
                        </span>
                        </FadeUpWrapper>
                        <FadeUpWrapper delay={200}>
                        <span>
                            이름을 알려주세요
                        </span>
                        </FadeUpWrapper>
                    </div>
                )}

                {phase === 2 && (
                    <div className="mt-40 mx-10 flex flex-col gap-5 text-4xl font-bold text-[#f9e7c4]">
                        <FadeUpWrapper delay={100}>
                            <span>
                                {`${name}님,`}
                            </span>
                        </FadeUpWrapper>
                        <FadeUpWrapper delay={600}>
                            <span>
                                당신의 하루에 따뜻한
                            </span>
                        </FadeUpWrapper>
                        <FadeUpWrapper delay={1100}>
                            <span>
                                순간을 준비했어요
                            </span>
                        </FadeUpWrapper>
                    </div>
                )}
            </div>

            {phase === 1 && (
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="absolute bottom-[35%] left-1/2 -translate-x-1/2 z-20 w-full flex justify-center"
                >
                    <div
                        className={[
                            "w-72 h-14 rounded-4xl bg-white/80 backdrop-blur-sm border-4 transition-colors duration-300 ease-out",
                            error
                                ? "border-[rgba(239,68,68,0.7)]" // red-500/70
                                : "border-transparent focus-within:border-[rgba(248,187,51,0.6)]",
                        ].join(" ")}
                    >
                        <input
                            type="text"
                            maxLength={30}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름 또는 닉네임"
                            aria-label="이름 또는 닉네임"
                            aria-invalid={!!error}
                            className="w-full text-center rounded-4xl outline-none text-lg leading-[3rem] bg-transparent placeholder:text-stone-400"
                        />
                    </div>

                    {/* 모바일에서 엔터로 제출 가능하도록 보이지 않는 submit 버튼 */}
                    <button type="submit" className="sr-only">
                        제출
                    </button>
                </form>
            )}

            {phase === 1 && error && (
                <p className="absolute bottom-[30%] left-1/2 -translate-x-1/2 z-20 text-sm text-red-200">
                    {error}
                </p>
            )}
            
            <BottomActionButton onClick={handleButtonClick} text={buttonText} />
        </div>
    );
}