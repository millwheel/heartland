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
                <div className="fixed inset-0 bg-opacity-40 z-10" onClick={toggleMenu}>
                    <div
                        className="absolute w-full bg-[#ffd427] shadow-2xl rounded-b-xl p-3 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 닫기 버튼 */}
                        <div className="flex justify-end">
                            <button onClick={toggleMenu} className="">
                                <XMarkIcon className="w-8 h-8 cursor-pointer" />
                            </button>
                        </div>

                        {/* 메뉴 항목 */}
                        <nav className="mt-4 p-2 flex flex-col gap-6 bg- text-xl font-semibold text-black">
                            <Link href="/about" onClick={toggleMenu} className="cursor-pointer">
                                ABOUT HEARTLAND
                            </Link>
                            <a href="https://xandheart.com" onClick={toggleMenu}>
                                XANDHEART 홈페이지로 돌아가기
                            </a>
                        </nav>

                    </div>
                </div>
            )}
        </header>
    );
}
