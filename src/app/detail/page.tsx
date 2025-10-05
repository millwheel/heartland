"use client";

import Image from "next/image";
import {useMemo, useState} from "react";
import { messages, type Message } from "@/data/messages";
import MessageModal from "@/component/messageModal";

export default function Detail() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState<string | null>(null);

    const randomMessage: Message | null = useMemo(() => {
        if (!messages.length) return null;
        const i = Math.floor(Math.random() * messages.length);
        return messages[i]!;
    }, []);

    const displayedText = useMemo(() => {
        if (!randomMessage) return "";
        const prefix = randomMessage.personalized && name ? `${name}, ` : "";
        return prefix + randomMessage.text;
    }, [randomMessage, name]);

    return (
        <div className="relative min-h-screen">
            <Image
                src="/image/heartland_tree.png"
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
                message={displayedText}
            />

        </div>
    );
}
