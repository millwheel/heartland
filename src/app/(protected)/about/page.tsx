"use client"

import Image from "next/image";
import { pacifico } from "@/font/pacifico";
import BottomActionButton from "@/component/bottomActionButton";
import {useRouter} from "next/navigation";

export default function About() {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push("/");
    };

    return (
        <div className="relative min-h-screen">
            <Image
                src="/image/heartland_profile.png"
                alt="Heartland"
                fill
                className="object-cover"
            />

            <div className="absolute inset-0 z-0 backdrop-blur-md" />

            <div className="relative z-10 min-h-screen px-6">
                <div className="py-5 text-center text-[#f9e7c4]">
                    <h1 className={`text-2xl font-bold mb-20 ${pacifico.className}`}>ABOUT HEARTLAND</h1>
                </div>
                <div className="max-w-2xl text-center font-semibold text-xl text-[#f9e7c4]">
                    <div className="flex-col space-y-2 mb-15">
                        <span className="block">
                            하트랜드는 ...님의 하루 속에서
                        </span>
                        <span className="block">
                            잠시 멈춰 설 수 있는 작은 섬입니다.
                        </span>
                    </div>
                    <div className="flex-col space-y-2 mb-25">
                        <span className="block">
                            외로움, 지침, 슬픔 같은 순간에도
                        </span>
                        <span className="block">
                            당신은 혼자가 아니라는 것을 보여주기
                        </span>
                        <span className="block">
                            위해 존재합니다.
                        </span>
                    </div>
                    <div className="flex-col space-y-2">
                        <span className="block">
                            우리는 위로와 응원을 디자인합니다.
                        </span>
                        <span className="block">
                            당신의 하루에 따뜻한 경험을 더합니다.
                        </span>
                        <span className={`block ${pacifico.className}`}>
                            XANDHEART
                        </span>
                    </div>
                </div>
                <BottomActionButton onClick={handleButtonClick} text={"하트랜드로 돌아가기"} position={"bottom-[15%]"}/>
            </div>
        </div>
    );
}
