import Image from "next/image";

type HowCardProps = {
    src: string;
    alt: string;
    text: string;
};

export default function HowCard({ src, alt, text }: HowCardProps) {
    return (
        <div
            className={[
                "flex items-center gap-2",
                "bg-[#ffd427]/50 rounded-4xl",
                "p-4 h-25 w-75",
            ].join(" ")}
        >
            <div className="flex-shrink-0">
                <Image
                    src={src}
                    alt={alt}
                    width={80}
                    height={80}
                    className="rounded-lg"
                />
            </div>

            <p className="text-white text-base font-semibold leading-snug">
                {text}
            </p>
        </div>
    );
}