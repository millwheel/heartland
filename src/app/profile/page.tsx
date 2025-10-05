import Image from "next/image";


export default function Profile() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <Image
                src="/image/heartland_profile.png"
                alt="프로필 배경"
                fill
                priority
                className="object-cover z-0"
            />

            <div>

            </div>

            <div>

            </div>
        </div>
    );
}