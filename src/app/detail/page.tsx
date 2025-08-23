"use client"

import Image from "next/image";

export default function Detail() {
    return (
        <div className="relative min-h-screen">
            <Image
                src="/image/heartland_sub.png"
                alt="Heartland_tree"
                fill
                priority
                className="object-cover"
            />

            <button
                className="absolute left-1/2 top-[40%]
                        -translate-x-1/2 -translate-y-1/2
                        rounded-4xl hover:cursor-pointer
                        px-26 py-26"
                onClick={() => alert("heartland")}
            >
            </button>
        </div>
    )
}