"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { messages, type Message } from "@/data/messages";
import BottomActionButton from "@/component/bottomActionButton";
import PostItText from "@/component/postItText";
import {loadProfile} from "@/util/profileStorage";
import FadeOverlay from "@/component/fadeOverlay";

export default function Detail() {
    const [open, setOpen] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const router = useRouter();
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        const profile = loadProfile();

        // 랜덤 메시지 선택
        if (!messages.length) return;
        const randomIndex = Math.floor(Math.random() * messages.length);
        const randomMessage: Message = messages[randomIndex]!;

        // 메시지 조합
        const prefix =
            randomMessage.personalized && profile?.name
                ? `${profile.name}님, `
                : "";
        const fullText = prefix + randomMessage.text;

        setDisplayedText(fullText);
    }, []);

    const handleButtonClick = () => {
        if (open) {
            if (leaving) return;
            setLeaving(true);
            setTimeout(() => router.push("/"), 300);
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

            {/* 입장 시 밝아지고, 퇴장 시 어두워짐 */}
            <FadeOverlay leaving={leaving} />

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
                    <PostItText text={displayedText} fontSize="" fontWeight="font-semibold" />
                )}
            </div>

            <BottomActionButton onClick={handleButtonClick} text={buttonText} position={"bottom-[10%]"} width={"min-w-[250px]"}/>
        </div>
    );
}
