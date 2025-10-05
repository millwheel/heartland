"use client";

import Image from "next/image";
import BottomActionButton from "@/component/bottomActionButton";
import {useRouter} from "next/navigation";
import {useMemo, useState} from "react";
import {pacifico} from "@/font/pacifico";
import FadeUpWrapper from "@/component/fadeUpWrapper";

type Phase = 0 | 1 | 2;

export default function Profile() {
    const router = useRouter();
    const [phase, setPhase] = useState<Phase>(0);


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
        if (phase < 2) {
            setPhase((p) => (p + 1) as Phase);
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
                    <div className={`${pacifico.className} text-6xl mt-40 mx-10 flex flex-col gap-3 text-3xl text-[#f9e7c4] text-center`}>
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
                                ...님,
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
            
            <BottomActionButton onClick={handleButtonClick} text={buttonText} />
        </div>
    );
}