"use client";

import Image from "next/image";
import {useMemo, useState} from "react";
import { useRouter } from "next/navigation";
import { messages, type Message } from "@/data/messages";
import CommonButton from "@/component/commonButton";

export default function Detail() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState<string | null>(null);
    const router = useRouter();

    const randomMessage: Message | null = useMemo(() => {
        if (!messages.length) return null;
        const i = Math.floor(Math.random() * messages.length);
        return messages[i]!;
    }, []);

    const displayedText = useMemo(() => {
        if (!randomMessage) return "";
        const prefix = randomMessage.personalized && name ? `${name}, ` : "";
        return prefix + randomMessage.text;
    }, [randomMessage, name]);

    const handleButtonClick = () => {
        if (open) {
            router.push("/");
        } else {
            setOpen(true);
        }
    };

    const buttonText = open ? "하트랜드로 돌아가기" : "오늘의 메세지 받아보기"

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* 배경 */}
            <Image
                src="/image/heartland_tree.png"
                alt="나무 배경"
                fill
                priority
                className="object-cover z-0"
            />

            {/* 포스트잇 이미지 */}
            <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <Image
                    src="/image/post_it.png"
                    alt="포스트잇"
                    width={140}
                    height={140}
                    className="z-10"
                />

                {/* open 시 메시지 표시 */}
                {open && (
                    <p
                        className="absolute inset-0 flex items-center justify-center
                       text-center font-semibold text-stone-800
                       leading-relaxed p-3 z-20"
                    >
                        {displayedText}
                    </p>
                )}
            </div>

            <CommonButton onClick={handleButtonClick} text={buttonText} />
        </div>
    );
}
