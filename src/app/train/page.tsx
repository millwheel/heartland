import Image from "next/image";

export default function Train() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <Image
                src="/image/heartland_train.png"
                alt="기차 칸 배경"
                fill
                priority
                className="object-cover z-0"
            />
        </div>
    )
}