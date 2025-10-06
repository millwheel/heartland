"use client"

import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";
import FadeOverlay from "@/component/fadeOverlay";

export default function House() {
    const router = useRouter();
    const [leaving, setLeaving] = useState(false);

    const handleButtonClick = () => {
        if (leaving) return;
        setLeaving(true);
        setTimeout(() => router.push("/"), 300);
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <Image
                src="/image/heartland_house.png"
                alt="오두막 배경"
                fill
                priority
                className="object-cover z-0"
            />

            {/* 입장 시 밝아지고, 퇴장 시 어두워짐 */}
            <FadeOverlay leaving={leaving} />
        </div>
    )
}