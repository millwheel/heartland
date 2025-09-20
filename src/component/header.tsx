"use client";

import Link from "next/link";
import { useState } from "react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/20/solid";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="sticky top-0 z-50 w-full bg-[#ffd427] text-black shadow-md">
            <div className="mx-auto flex h-14 w-full items-center justify-between px-4">
                {/* 좌측 브랜드 */}
                <Link
                    href="/"
                    className="text-lg font-extrabold tracking-tight hover:opacity-90"
                    aria-label="Go Home"
                >
                    HEARTLAND
                </Link>

                {/* 모바일 햄버거 버튼 */}
                <button className="" onClick={toggleMenu}>
                    <Bars3Icon className="w-8 h-8 cursor-pointer" />
                </button>
            </div>

            {/* 모바일 메뉴 오버레이 & 패널 */}
            {isOpen && (
                <>
                    {/* 1) 전체 화면 딤 */}
                    <div
                        className="fixed inset-0 z-40 bg-black/40"
                        onClick={toggleMenu}
                    />

                    {/* 2) 가운데 정렬된 '폰 폭' 패널 */}
                    <div
                        className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[420px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="bg-[#ffd427] shadow-2xl rounded-b-xl p-3 flex flex-col
                            pt-[max(12px,env(safe-area-inset-top))]
                            transition-transform duration-300 ease-out"
                        >
                            {/* 닫기 버튼 */}
                            <div className="flex justify-end">
                                <button onClick={toggleMenu}>
                                    <XMarkIcon className="w-8 h-8 cursor-pointer" />
                                </button>
                            </div>

                            {/* 메뉴 항목 */}
                            <nav className="mt-4 p-2 flex flex-col gap-6 text-xl font-semibold text-black">
                                <Link href="/about" onClick={toggleMenu} className="cursor-pointer">
                                    ABOUT HEARTLAND
                                </Link>
                                <a href="https://xandheart.com" onClick={toggleMenu}>
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
