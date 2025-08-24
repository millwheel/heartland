const HEARTLAND_PROFILE_KEY = "heartland:profile";

type HeartlandProfile = {
    schema: 1;
    name: string;
};

export function loadProfile(): HeartlandProfile | null {
    if (!isBrowser()) return null;
    const raw = localStorage.getItem(HEARTLAND_PROFILE_KEY);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        if (parsed?.schema === 1 && typeof parsed.name === "string") {
            return parsed as HeartlandProfile;
        }
        // 스키마 마이그레이션 포인트(추후 버전 업 시)
        return null;
    } catch {
        return null;
    }
}

export function saveProfile(name: string): HeartlandProfile {
    if (!isBrowser()) throw new Error("localStorage is not available (SSR).");
    const profile: HeartlandProfile = {
        schema: 1,
        name: name,
    };
    localStorage.setItem(HEARTLAND_PROFILE_KEY, JSON.stringify(profile));
    return profile;
}

export function clearProfile() {
    if (!isBrowser()) return;
    localStorage.removeItem(HEARTLAND_PROFILE_KEY);
}

function isBrowser() {
    return typeof window !== "undefined";
}