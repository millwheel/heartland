

interface CommonButtonProps {
    onClick: () => void;
    text: string;
}

export default function CommonButton({ onClick, text }: CommonButtonProps) {
    return (
        <button
            onClick={onClick}
            className="absolute bottom-[15%] left-1/2 -translate-x-1/2
                   bg-[#ffd427] text-black font-bold px-6 py-4 rounded-4xl
                   shadow-lg z-30 active:scale-95 transition cursor-pointer"
        >
            {text}
        </button>
    );
}