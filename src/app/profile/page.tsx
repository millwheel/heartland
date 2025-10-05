"use client";

import Image from "next/image";
import BottomActionButton from "@/component/bottomActionButton";
import {useRouter} from "next/navigation";
import {useMemo, useState} from "react";
import {pacifico} from "@/font/pacifico";

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
                    <div className="mt-40 mx-10 flex flex-col gap-3 text-3xl text-[#f9e7c4] text-center">
                        <p className={`${pacifico.className} text-6xl font-normal leading-snug text-[#f9e7c4]`}>
                            Welcome <br/> to <br/> heartland
                        </p>
                    </div>
                )}

                {phase === 1 && (
                    <div className="mt-40 mx-10 flex flex-col gap-3 text-3xl font-semibold text-[#f9e7c4] text-center">
                        <span>
                            당신의 이야기를 담을
                        </span>
                        <span>
                            이름을 알려주세요
                        </span>
                    </div>
                )}

                {phase === 2 && (
                    <div className="mt-40 mx-10 flex flex-col gap-5 text-4xl font-bold text-[#f9e7c4]">
                        <p>
                            ...님,
                        </p>
                        <p>
                            당신의 하루에 따뜻한
                        </p>
                        <p>
                            순간을 준비했어요
                        </p>
                    </div>
                )}
            </div>
            
            <BottomActionButton onClick={handleButtonClick} text={buttonText} />
        </div>
    );
}