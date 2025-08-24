

export function BottomOverlayHint() {
    return(
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center">
            <div
                className="bg-[#ffd427] text-black
                           px-4 py-2 rounded-3xl font-bold shadow-lg
                           text-center text-sm
                           max-w-md break-words
                           blink-glow"
            >
                중앙에 있는 나무를 클릭해보세요!
            </div>
        </div>
    );
}