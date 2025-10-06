import React from "react";

type PostItTextProps = {
    text: string;
    fontSize: string;
    fontWeight: string;
};

export default function PostItText({
                                       text,
                                       fontSize,
                                       fontWeight,
                                   }: PostItTextProps) {
    return (
        <p
            className={[
                "absolute inset-0 flex items-center justify-center",
                "text-center text-[#613c00] leading-relaxed p-3 z-20",
                fontSize,
                fontWeight,
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: text }}
        />
    );
}