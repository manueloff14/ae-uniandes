import { useMemo } from "react";

export default function HeaderDashboard({ title, user }) {
    const formattedDate = useMemo(() => {
        const today = new Date();
        const day = today.getDate();
        const month = today.toLocaleString("en-US", { month: "short" });
        const year = today.getFullYear();
        return `${day} ${month}, ${year}`;
    }, []);

    return (
        <header className="py-4 flex items-center justify-between fixed w-[calc(100%-325px)] bg-white z-[100]">
            <h1 className="text-3xl font-extrabold text-black font-serif">
                {title}
            </h1>

            <div className="flex items-center gap-10">
                <span className="font-serif text-base text-black font-bold">
                    {formattedDate}
                </span>
                <div className="flex items-center gap-3 bg-[#F7F7F7] p-2 px-3 rounded-2xl border border-[#DAD3D3]">
                    <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                            alt="avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="font-bold pr-1 text-black font-serif text-sm">
                        {user.nombres} {user.apellidos}
                    </span>
                </div>
            </div>
        </header>
    );
}
