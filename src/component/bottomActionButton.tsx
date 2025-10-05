interface CommonButtonProps {
    onClick: () => void;
    text: string;
    position: string;
    width?: string;
}

export default function BottomActionButton({ onClick, text, position, width }: CommonButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`absolute ${position} left-1/2 -translate-x-1/2
                   bg-[#f8bb33] text-[#613c00] font-bold px-6 py-4 rounded-4xl
                   shadow-lg z-30 active:scale-95 transition cursor-pointer text-lg
                   ${width ?? ""}`}
        >
            {text}
        </button>
    );
}