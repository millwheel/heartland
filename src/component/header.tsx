"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import {pacifico} from "@/font/pacifico";

const PANEL_DURATION = 300; // ms - duration-* 과 맞추기

export default function Header() {
    const [isOpen, setIsOpen] = useState(false); // 오버레이/패널 마운트 여부
    const [show, setShow] = useState(false);     // 슬라이드/페이드 상태

    // 열기
    const openMenu = () => {
        if (isOpen) return;
        setIsOpen(true);
        requestAnimationFrame(() => setShow(true));
    };

    // 닫기
    const closeMenu = () => {
        setShow(false);
        setTimeout(() => setIsOpen(false), PANEL_DURATION);
    };

    // ESC 키로 닫기
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen]);

    return (
        <header className="sticky top-0 z-50 w-full bg-[#ffd427] text-black shadow-md">
            <div className="mx-auto flex h-14 w-full items-center justify-between px-4">
                {/* 좌측 브랜드 */}
                <Link
                    href="/"
                    className={`text-lg font-extrabold tracking-tight hover:opacity-90 ${pacifico.className}`}
                    aria-label="Go Home"
                >
                    HEARTLAND
                </Link>

                {/* 모바일 햄버거 버튼 */}
                <button onClick={openMenu} aria-label="메뉴 열기">
                    <Bars3Icon className="w-8 h-8 cursor-pointer" />
                </button>
            </div>

            {/* 오버레이 & 패널 (마운트는 isOpen, 애니메이션은 show로 제어) */}
            {isOpen && (
                <>
                    {/* 딤 오버레이 */}
                    <div
                        onClick={closeMenu}
                        className={[
                            "fixed inset-0 z-40 " +
                            // 블러/투명도 애니메이션
                            "transition-[backdrop-filter,opacity] duration-300 ease-out",
                            // 열림/닫힘 상태
                            show ? "backdrop-blur-md opacity-100" : "backdrop-blur-none opacity-0",
                            // 접근성(모션 최소화)
                            "motion-reduce:transition-none"
                        ].join(" ")}
                    />

                    {/* 가운데 정렬된 '폰 폭' 패널 */}
                    <div
                        className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[420px] pointer-events-none"
                        aria-hidden={!show}
                    >
                        <div
                            // 패널 자체 트랜지션: 위에서 '쑥' 내려오고 닫힐 때 '쑥' 올라감
                            className={[
                                "pointer-events-auto",
                                "bg-[#ffd427] shadow-2xl rounded-b-xl p-3 flex flex-col",
                                "pt-[max(12px,env(safe-area-inset-top))] pb-6",
                                "transition-transform duration-300 ease-out transform-gpu",
                                show ? "translate-y-0" : "-translate-y-full",
                                "motion-reduce:transition-none motion-reduce:transform-none",
                            ].join(" ")}
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                        >
                            {/* 닫기 버튼 */}
                            <div className="flex justify-end">
                                <button onClick={closeMenu} aria-label="메뉴 닫기">
                                    <XMarkIcon className="w-8 h-8 cursor-pointer" />
                                </button>
                            </div>

                            {/* 메뉴 항목 */}
                            <nav className="mt-4 p-2 flex flex-col gap-6 text-xl font-semibold text-black">
                                <Link href="/about" onClick={closeMenu} className={`cursor-pointer ${pacifico.className}`}>
                                    ABOUT HEARTLAND
                                </Link>
                                <a href="https://xandheart.com" onClick={closeMenu} className={`cursor-pointer ${pacifico.className}`}>
                                    XANDHEART 홈페이지로 돌아가기
                                </a>
                            </nav>

                        </div>
                    </div>
                </>
            )}

        </header>
    );
}
