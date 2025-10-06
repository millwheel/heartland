"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { messages } from "@/data/messages";
import BottomActionButton from "@/component/bottomActionButton";
import PostItText from "@/component/postItText";
import {loadProfile, loadTodayMessage, saveTodayMessage} from "@/util/profileStorage";
import FadeOverlay from "@/component/fadeOverlay";
import {Message} from "@/data/type";

export default function Tree() {
    const [open, setOpen] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const router = useRouter();
    const [leaving, setLeaving] = useState(false);
    const [alreadySeen, setAlreadySeen] = useState(false);

    useEffect(() => {
        const profile = loadProfile();
        const todaySeenMessage = loadTodayMessage();
        if (todaySeenMessage) {
            setAlreadySeen(true);
            return;
        }

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
        if (alreadySeen) {
            if (leaving) return;
            setLeaving(true);
            setTimeout(() => router.push("/"), 300);
            return;
        }

        if (!open) {
            if (displayedText) {
                saveTodayMessage({
                    date: new Date().toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" }),
                    text: displayedText,
                });
            }
            setOpen(true);
            return;
        }

        if (leaving) return;
        setLeaving(true);
        setTimeout(() => router.push("/"), 300);
    };

    const buttonText = alreadySeen
        ? "하트랜드로 돌아가기"
        : open
            ? "하트랜드로 돌아가기"
            : "오늘의 메세지 받아보기";

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

            {alreadySeen && (
                <div
                    className="absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-1/2
                       bg-white/90 rounded-4xl shadow-md text-center px-3 py-3 min-w-70"
                >
                    <p className="text-[#613c00] text-base font-semibold leading-relaxed">
                        오늘은 이미 함께 나눈 순간이 있네요
                    </p>
                </div>
            )}

            <BottomActionButton onClick={handleButtonClick} text={buttonText} position={"bottom-[10%]"} width={"min-w-[250px]"}/>
        </div>
    );
}
