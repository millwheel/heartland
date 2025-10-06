"use client"

import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState} from "react";
import FadeOverlay from "@/component/fadeOverlay";
import HowCard from "@/component/howCard";
import BottomActionButton from "@/component/bottomActionButton";
import FadeUpWrapper from "@/component/fadeUpWrapper";

export default function How() {
    const router = useRouter();
    const [leaving, setLeaving] = useState(false);

    const handleButtonClick = () => {
        if (leaving) return;
        setLeaving(true);
        setTimeout(() => router.push("/"), 300);
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <Image
                src="/image/heartland_main.png"
                alt="메인 사용법 배경"
                fill
                priority
                className="object-cover z-0"
            />

            <div className="absolute inset-0 z-0 backdrop-blur-md" />

            {/* 입장 시 밝아지고, 퇴장 시 어두워짐 */}
            <FadeOverlay leaving={leaving} />

            <div className="relative z-10 min-h-screen px-6">
                <div className="py-5 text-center text-[#f9e7c4]">
                    <h1 className={`text-4xl font-bold mt-5 mb-10`}>하트랜드 이용 방법</h1>
                </div>
                <div className="absolute left-1/4 top-[20%] -translate-x-20 overflow-hidden">
                    <FadeUpWrapper delay={300}>
                        <HowCard src="/icon/tree.PNG" alt="나무아이콘" text="나무를 클릭하면 응원과 위로를 건네는 오늘의 메시지를 볼 수 있어요."/>
                    </FadeUpWrapper>
                </div>
                <div className="absolute left-1/4 top-[35%] -translate-x-2 overflow-hidden">
                    <FadeUpWrapper delay={600}>
                        <HowCard src="/icon/house.PNG" alt="나무아이콘" text="집을 클릭하면 간단한 호흡으로 스트레스를 해소하는 공간으로 이동해요."/>
                    </FadeUpWrapper>
                </div>
                <div className="absolute left-1/4 top-[50%] -translate-x-20 overflow-hidden">
                    <FadeUpWrapper delay={900}>
                        <HowCard src="/icon/train.PNG" alt="나무아이콘" text="기차를 클릭하면 콜라보레이션 및 다른 섬들을 탐험할 수 있어요."/>
                    </FadeUpWrapper>
                </div>
            </div>

            <BottomActionButton onClick={handleButtonClick} text={"하트랜드로 돌아가기"} position={"bottom-[15%]"}/>
        </div>
    );
}