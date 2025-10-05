import Image from "next/image";

export default function House() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <Image
                src="/image/heartland_house.png"
                alt="오두막 배경"
                fill
                priority
                className="object-cover z-0"
            />
        </div>
    )
}