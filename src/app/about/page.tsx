import Image from "next/image";

export default function About() {
    return (
        <div className="relative min-h-screen">
            <Image
                src="/image/heartland_main.png"
                alt="Heartland"
                fill
                className="object-cover [object-position:49%_58%]"
            />

            <div className="absolute inset-0 bg-white/40 z-0" />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
                <div className="max-w-2xl text-center flex flex-col space-y-30">
                    <div>
                        <h1 className="text-2xl font-bold mb-6">ABOUT HEARTLAND</h1>

                        <p className="mb-6 flex-col space-y-2">
                            <span className="block">
                                하트랜드는 당신의 하루 속에서 잠시 멈춰 설 수 있는 작은 섬입니다.
                            </span>
                            <span className="block">
                                하트랜드는 누구에게나 감정이 머무는 공간을 제공합니다.
                            </span>
                            <span className="block">
                                외로움, 지침, 슬픔 같은 순간에도,
                            </span>
                            <span className="block">
                                당신은 혼자가 아니라는 것을 보여주기 위해 존재합니다.
                            </span>
                        </p>
                    </div>

                    <div className="space-y-2 font-semibold">
                        <p>“하트랜드는 하루에 한 번만 열립니다.”</p>
                        <p>“오늘 당신이 만나는 문장은, 오늘을 위한 단 하나의 위로입니다.”</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
