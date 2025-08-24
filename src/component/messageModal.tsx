"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {loadProfile} from "@/util/profileStorage";

type Props = {
    open: boolean;
    message: string;
};

export default function MessageModal({ open, message }: Props) {
    const [showAnim, setShowAnim] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (open) {
            // 다음 프레임에 애니메이션 트리거
            const t = requestAnimationFrame(() => setShowAnim(true));
            return () => cancelAnimationFrame(t);
        } else {
            setShowAnim(false);
        }

        try {
            const profile = loadProfile();
            if (profile == null) {
                setName('');
            } else {
                setName(profile.name);
            }
        } catch (e) {
            console.error("프로필 가져오기 에러");
        }

    }, [open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center"
        >
            {/* 어두운 반투명 오버레이 */}
            <div className="absolute inset-0 bg-black/40" />

            {/* 모달 박스 */}
            <div
                className={[
                    "relative z-[1001]",
                    "min-w-[400px]",
                    "min-h-[150px]",
                    "rounded-2xl p-5",
                    "bg-[#FFF8E6]",
                    "shadow-[0_12px_40px_rgba(255,200,0,0.25)]",
                    "ring-1 ring-yellow-100/70",
                    "transition-all duration-300 ease-out",
                    showAnim ? "opacity-100 scale-100" : "opacity-0 scale-95",
                    "flex flex-col" // 👈 flex 컨테이너로 변경
                ].join(" ")}
                onClick={(e) => e.stopPropagation()}
            >
                <p className="text-base text-stone-800 text-center mt-2">
                    {name}님, {message}
                </p>

                <Link
                    href="/"
                    className="bg-[#ffd427] font-semibold px-4 py-2 rounded-lg mt-auto mx-auto text-center w-40" // 👈 mt-auto로 아래 붙임
                >
                    오늘은 여기까지
                </Link>
            </div>
        </div>
    );
}
