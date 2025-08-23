"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import MessageModal from "@/component/messageModal";

const MESSAGES = [
    "오늘 충분히 잘해냈어요.",
    "잠시 쉬어가도 괜찮아요.",
    "외로움도 당신의 일부예요. 함께 지나가요.",
    "마음이 무거운 날엔, 가볍게 한 걸음만.",
    "당신이 느끼는 감정은 모두 유효해요.",
    "오늘의 나를 살며시 안아주세요.",
];

export default function Detail() {
    const [open, setOpen] = useState(false);

    const randomMessage = useMemo(() => {
        const i = Math.floor(Math.random() * MESSAGES.length);
        return MESSAGES[i]!;
    }, []);

    return (
        <div className="relative min-h-screen">
            <Image
                src="/image/heartland_sub.png"
                alt="Heartland_tree"
                fill
                priority
                className="object-cover"
            />

            {/* 투명 클릭 영역 (나무 클릭) */}
            <button
                className="absolute left-1/2 top-[40%]
                   -translate-x-1/2 -translate-y-1/2
                   rounded-4xl hover:cursor-pointer
                   px-26 py-26"
                onClick={() => setOpen(true)}
            />

            <MessageModal
                open={open}
                message={randomMessage}
            />

            {!open && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center">
                    <div
                        className="bg-[#ffd427] text-black
                           px-4 py-2 rounded-3xl font-bold shadow-lg
                           text-center text-sm
                           max-w-md break-words
                           animate-[fadeBlink_2.4s_ease-in-out_infinite]"
                    >
                        중앙에 있는 나무를 클릭해보세요!
                    </div>
                </div>
            )}
        </div>
    );
}
