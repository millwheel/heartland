"use client";

import { useEffect, useRef, useState } from "react";
import { loadProfile, saveProfile } from "@/util/profileStorage";

export default function ProfileModal() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        if (!loadProfile()) setOpen(true);
    }, []);
    
    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    if (!open) return null;

    const canSubmit = name.trim().length > 0 && name.trim().length <= 10;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            saveProfile(name.trim());
            setOpen(false);
        } catch (e) {
            console.error("프로필 저장 중 에러 발생");
        }
    };

    return (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
            {/* 오버레이 */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

            {/* 모달 */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   min-w-[400px] rounded-2xl p-5
                   bg-white"
            >
                <form onSubmit={handleSubmit} className="space-y-5 text-center">
                    <p className="text-sm text-stone-600">
                        당신의 이야기를 담을 이름을 알려주세요
                    </p>

                    <div className="rounded-xl ring-1 ring-stone-200 bg-white/80 focus-within:ring-yellow-300/80">
                        <input
                            ref={inputRef}
                            type="text"
                            maxLength={30}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름 또는 닉네임"
                            aria-label="이름 또는 닉네임"
                            className="w-full px-4 py-3 rounded-xl outline-none placeholder:text-stone-400 bg-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className={`inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold transition
                        ${canSubmit ? "bg-stone-900 text-white" : "bg-stone-300 text-stone-500 cursor-not-allowed"}`}
                    >
                        하트랜드 입장하기
                    </button>
                </form>
            </div>
        </div>
    );
}
