export default function Loading({ isExiting }) {
    return (
        <div 
            className={`flex justify-center items-center h-screen flex-col transition-opacity duration-500 ease-in-out ${isExiting ? "opacity-0" : "opacity-100"}`}
        >
            <img
                src="/ae-uniandes-animated.gif"
                alt="Cargando..."
                className="w-[100px] h-[100px] object-contain"
            />
        </div>
    );
}
