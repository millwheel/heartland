import Image from "next/image";
import PostItText from "@/component/postItText";

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

            {/* 포스트잇1 */}
            <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <Image
                    src="/image/post_it.png"
                    alt="포스트잇"
                    width={140}
                    height={140}
                    className="z-10"
                />

                <PostItText text="공사중 <br/> 입니다" fontSize="text-2xl" fontWeight="font-bold" />
            </div>

            {/* 포스트잇2 */}
            <div className="absolute left-3/5 top-[60%] translate-x-5 overflow-hidden">
                <Image
                    src="/image/post_it.png"
                    alt="포스트잇"
                    width={110}
                    height={100}
                    className="z-10"
                />

                <PostItText text="이걸 본 사람은 모두 행복하세요" fontSize="text-xs" fontWeight="font-bold" />
            </div>
            
        </div>
    )
}