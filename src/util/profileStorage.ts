import {HeartlandMessageRecord, HeartlandProfile} from "@/data/type";

const HEARTLAND_PROFILE_KEY = "heartland:profile";
const HEARTLAND_MESSAGE_KEY = "heartland:message";

export function loadProfile(): HeartlandProfile | null {
    if (!isBrowser()) return null;
    const raw = localStorage.getItem(HEARTLAND_PROFILE_KEY);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw)
        if (parsed?.schema !== 1) return null;
        return parsed as HeartlandProfile;
    } catch {
        return null;
    }
}

export function saveProfile(name: string): HeartlandProfile {
    if (!isBrowser()) throw new Error("localStorage not available.");
    const profile: HeartlandProfile = {
        schema: 1,
        name: name,
    };
    localStorage.setItem(HEARTLAND_PROFILE_KEY, JSON.stringify(profile));
    return profile;
}

export function loadTodayMessage(): HeartlandMessageRecord | null {
    if (!isBrowser()) return null;
    const raw = localStorage.getItem(HEARTLAND_MESSAGE_KEY);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        // 날짜 비교 (KST 기준)
        if (parsed?.schema !== 1) return null;
        const today = new Date().toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" });
        if (parsed.date === today) {
            return parsed as HeartlandMessageRecord;
        }
        return null;
    } catch {
        return null;
    }
}

export function saveTodayMessage(record: Omit<HeartlandMessageRecord, "schema">) {
    if (!isBrowser()) throw new Error("localStorage not available");
    const data: HeartlandMessageRecord = { schema: 1, ...record };
    localStorage.setItem(HEARTLAND_MESSAGE_KEY, JSON.stringify(data));
}

export function clearProfile() {
    if (!isBrowser()) return;
    localStorage.removeItem(HEARTLAND_PROFILE_KEY);
}

function isBrowser() {
    return typeof window !== "undefined";
}