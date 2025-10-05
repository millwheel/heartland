"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { loadProfile } from "@/util/profileStorage";

export default function ProtectedLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const profile = loadProfile();
        const hasName = !!profile?.name && profile.name.trim().length > 0;

        if (!hasName) {
            router.replace("/profile");
            return;
        }

        setReady(true);
    }, [pathname, router]);

    if (!ready) return null; // 체크 전에는 렌더하지 않음
    return <>{children}</>;
}
