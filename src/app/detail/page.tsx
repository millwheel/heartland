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

        </div>
    )
}