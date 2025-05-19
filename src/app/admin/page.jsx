"use client";

import { useAuth } from "@/app/hooks/useAuth";
import AsideDashboard from "@/components/global/AsideDashboard";
import HeaderDashboard from "@/components/global/HeaderDashboard";
import Chart from "@/components/routes/admin/home/Chart";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const { user, loading, hasToken } = useAuth();
    const router = useRouter();

    // Si ya terminó la carga y no hay usuario (no hay sesión iniciada),
    // no renderizamos nada.
    if (!user) {
        return null;
    }

    const data = [
        {
            titulo: "Cómo puedo mejorar mi página web?",
            id: 1,
            fecha: "2024-01-01",
        },
        {
            titulo: "Otro ejemplo",
            id: 2,
            fecha: "2024-04-15",
        },
        {
            titulo: "Otro ejemplo0",
            id: 3,
            fecha: "2024-04-15",
        },
        {
            titulo: "Otro ejemplo0",
            id: 4,
            fecha: "2024-04-15",
        },
        {
            titulo: "Otro ejemplo0",
            id: 5,
            fecha: "2024-04-15",
        },
        {
            titulo: "Otro ejemplo0",
            id: 6,
            fecha: "2024-04-15",
        },
        {
            titulo: "Otro ejemplo0",
            id: 7,
            fecha: "2024-04-15",
        },
        {
            titulo: "Otro ejemplo0",
            id: 8,
            fecha: "2024-04-15",
        },
    ];

    return (
        <div className="min-h-screen flex">
            {/* Solo se muestra si hay sesión iniciada */}
            <AsideDashboard />

            {/* Contenido dinámico */}
            <main className="flex-1 mx-6 pl-[280px]">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-white text-xl">Cargando...</p>
                    </div>
                ) : (
                    <div>
                        <HeaderDashboard title={"Inicio"} user={user} />
                        {/* Aquí puedes agregar más contenido del dashboard */}
                        <div className="pt-36 pb-10">
                            <div>
                                <h2 className="font-bold text-xl text-black font-serif">
                                    ¡Hola, {user.nombres}!
                                </h2>
                                <span className="text-sm text-gray-600 font-serif">
                                    Accede a un informe conciso sobre el
                                    desempeño reciente del sitio web.
                                </span>
                            </div>
                            <hr className="my-4" />
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <div className="flex gap-8">
                                        {[
                                            {
                                                label: "Total de likes",
                                                value: 100,
                                                icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxklEQVR4nO2UPQ5BQRRGj0YhrENlDUp5G9DYjMRP/xILUFiARmMBOivQiCc6EaGgkJFJpriRmQnP3Iov+Zqbm3Oqe+GXUgcWQA7UNARdwLhONQS5EJxSwxvARgiOKeFVYCngtqtU8Aowe4HbDlIJ+h64basMbAxcgZGYnQOCWAsg8wnubuEmZqZkdz6BXPhWYLQFW23BRFPwAJqagrkPnlLQ1hSsQ/BUgl5M4Du04gP43j3GYOyLuABDMcvelByATgz+D6E8ASt63fI/XuxnAAAAAElFTkSuQmCC",
                                                subio: true,
                                            },
                                            {
                                                label: "Registros en formularios",
                                                value: 100,
                                                icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABb0lEQVR4nO2aO07DQBRFT5U+iPBZAB1sjIZNEBIkWAEVPewg6VISIUAIGspYIogGGlI9FGksDRYGPD/PhDnSq2Jf36N5sptA5gtHwAKQhrO8p09ELAwkyvnwXa4DHAPFDyVKTCX+mjMDhqpTY4YOCrgSETUDE5EiQpHCRMRlAZc5jVlpkdBvLQkt0rf4jhzGJOILySIa+UQcInm1NPJq/afVWgcugXdgAuykKjKu5E5SFdkD5lruW0oiPWAE7H4jc5GKSA+4VRnPFZmx+t1bB1ciukQ5cyURpIM4CFm+nW5qskaBOmAb0gWuanIegK0URLoOJFoXcSXRqohLidZEfpPYDtDBOsSHRHCRNeC65vp7YNPk4W2I7Ndc+2hxEq2InHmSCC4y9SQRXOQJuAPOgQNgw+Rhlh38h1giWUQjn4hDJK+WRl6tFFZLIpjGrIzILILSUplXE5FBBMWlMqcmIh0lE8PJvAAnpn/hyGQw5xPgilAZrdIixQAAAABJRU5ErkJggg==",
                                                subio: false,
                                            },
                                            {
                                                label: "Comentarios",
                                                value: 100,
                                                icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXklEQVR4nO2UsQ2AMAwEbzwyFawK3gPTfIMgQhC7wie5snKvfGEoXtAAA3xwTK4La4DcNdtdwK7lKN7zVMAPKvIKEFXR94os+9g1LSLk0/NHz49mEkiVky0HWDLlYRxfuoOzN/WtOgAAAABJRU5ErkJggg==",
                                                subio: true,
                                            },
                                        ].map((metric, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2 items-center border-r border-gray-300 last:border-none pr-8"
                                            >
                                                <img
                                                    className="w-[45px] h-[45px] bg-[#F0F1F3] p-3 rounded-full"
                                                    src={metric.icon}
                                                    alt={metric.label}
                                                />
                                                <div>
                                                    <span className="text-sm text-gray-600 font-serif">
                                                        {metric.label}
                                                    </span>
                                                    <div>
                                                        <span className="text-sm text-black font-serif">
                                                            {metric.value}
                                                        </span>
                                                        <span className="ml-2 text-sm">
                                                            {metric.subio
                                                                ? "Subió"
                                                                : "Bajó"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr className="my-4" />
                                    <div>
                                        <div className="flex items-center justify-between gap-4">
                                            <h2 className="text-xl font-bold text-black font-serif mb-2">
                                                Estadísticas generales de los
                                                blogs
                                            </h2>

                                            <select
                                                className="block mt-1 px-4 py-2 text-sm text-gray-700 bg-[#F2F2F3] border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1A607A] focus:border-[#1A607A]"
                                                aria-label="Selecciona métrica"
                                            >
                                                <option value="visitas">
                                                    Visitas
                                                </option>
                                                <option value="comentarios">
                                                    Comentarios
                                                </option>
                                                <option value="likes">
                                                    Likes
                                                </option>
                                                <option value="registros">
                                                    Registros
                                                </option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <Chart />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-black font-serif mb-2">
                                            Formularios recientes
                                        </h2>
                                        <div className="mt-4">
                                            <table className="w-full text-left border-separate border-spacing-0 font-serif">
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 py-2 pl-0 border-b border-gray-200">
                                                            Título
                                                        </th>
                                                        <th className="px-4 py-2 border-b border-gray-200">
                                                            ID
                                                        </th>
                                                        <th className="px-4 py-2 border-b border-gray-200">
                                                            Fecha
                                                        </th>
                                                        <th className="px-4 py-2 border-b border-gray-200">
                                                            Acciones
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {data.map((item, index) => (
                                                        <tr
                                                            key={index}
                                                            className="hover:bg-gray-50 transition"
                                                        >
                                                            <td className="px-4 py-2 first:pl-0 border-b border-gray-100 last:border-t">
                                                                {item.titulo}
                                                            </td>
                                                            <td className="px-4 py-2 border-b border-gray-100 last:border-t">
                                                                {item.id}
                                                            </td>
                                                            <td className="px-4 py-2 border-b border-gray-100 last:border-t">
                                                                {item.fecha}
                                                            </td>
                                                            <td className="px-4 py-2 border-b border-gray-100 last:border-t">
                                                                <button className="text-blue-600 hover:text-blue-800">
                                                                    <i className="fa-solid fa-eye"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[50%]">
                                    <h2 className="text-xl font-bold text-black font-serif mb-2">
                                        Comentarios
                                    </h2>
                                    <div className="mt-4 w-full">
                                        <ul className="w-full">
                                            <li className="w-full">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex flex-col bg-[#F7F7F7] p-2 px-3 rounded-2xl">
                                                        <span className="text-sm text-black font-serif">
                                                            manueloffcabrera@gmail.com
                                                        </span>
                                                        <span className="text-sm text-gray-600 font-serif">
                                                            Comentó el 15/abr:{" "}
                                                        </span>
                                                    </div>
                                                    <button className="bg-gradient-to-r from-[#07859B] to-[#1A627C] text-white px-4 py-2 rounded-full font-serif font-bold text-sm flex items-center gap-2">
                                                        Ver blog
                                                        <img
                                                            className="w-[15px]"
                                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjElEQVR4nO2VQQqAIBBFvUTRkbpKHTcX7e0gL4KgAh1Hx1b11vP/G1TQuZ8SgBHYEHDXbHYmJghSsIVAHogAdMDyigDoAX/GfFMBz81XYGgmIFKuymsEJMqbCBDKVUgCrOWSAGV51RFRsHmtYL698z4ZtlwyMOXKTQIt3xAE7ITch2ORhKOj9gTcN9kBjOOGItmGz6sAAAAASUVORK5CYII="
                                                            alt="external-link"
                                                        />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-600 font-serif my-4">
                                                    Lorem ipsum dolor sit amet
                                                    consectetur adipisicing
                                                    elit. Maxime voluptatibus
                                                    eveniet autem neque dolorem
                                                    maiores placeat ex sed unde
                                                    a. Tempora enim sequi
                                                    necessitatibus, dolorum
                                                    possimus perspiciatis quasi
                                                    dolor qui? Voluptatem quae
                                                    tempora dicta veritatis ab
                                                    quisquam ut totam, ad quo
                                                    recusandae. A, repellat sit.
                                                    Impedit doloribus,
                                                    reprehenderit ipsum eligendi
                                                    incidunt quam pariatur nemo
                                                    nihil quos harum non
                                                    corporis excepturi.
                                                </p>
                                                <div className="flex gap-4 justify-end">
                                                    <button className="bg-gradient-to-r from-[#9b0707] to-[#7c1a1a] text-white px-4 py-2 rounded-full font-serif font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all duration-300">
                                                        Rechazar
                                                        <img
                                                            className="w-[15px]"
                                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQElEQVR4nO2ZQWrDMBBFfZQucpIESvZRsrCbs3fRM4RAEnglpKYO2CCPNaOR0d8ZjP5/GslI46apqqqqWpWADRAy+odnhqWDfADfwAM4J0sX738C7sCPGGYA0csUhn+IXjIY4PgXfqjnc6eS/N27m/A+ppoV9cqg5WkJg7aXBYzZhKFoZL6EUTDMsQ+TG2eDSBkgO0SKIG4glgRyByEJ5hZiTkD3EDFBi4GIOOxlOXwu0sTsl1GJGTDlQKwGhDUsLaAtfrOzhs8vr/v9WNCvwTu+YYiAcA/DDAi3MAgg3MHwamOKIDzdDsNSCA/39TBh3JXUQQmpIXL0tIIWhGWXMQA3TQiLvu9hAqJNll4bhvHldBe39tPcNFvJYJ/A1aoSEZW5ADvpYD2MKcQIjBxiMNg+88/QFtjm8q+qqqpqVPQL08n6GKXmFcYAAAAASUVORK5CYII="
                                                            alt="delete-sign--v1"
                                                        />
                                                    </button>
                                                    <button className="bg-gradient-to-r from-[#07859B] to-[#1A627C] text-white px-4 py-2 rounded-full font-serif font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all duration-300">
                                                        Aprobar
                                                        <img
                                                            className="w-[15px]"
                                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACCUlEQVR4nO3ZTYhOURgH8IchXwkpKRJlI5tZmIVkEiVN0axma5ZmI8rKYlI2LM1CiZVmY2HBhmLBQokSC0lZSELJRxPR+PjpNu/kdZwZY768R/e3vJ373Pu/95zTuedG1Gq1Wq32H8Mc7MAetEWpcNpP56NE2OtXXzE3SoJleJ4EuROlwbnM2+iIkmAnvidBTkZJsBhPkhCPsShKgoEkxDdsj5Jga2MsNBuIkmABHiYhnmJplAQnkhDVYN8dJUE7hpMgZ6MkmId7SYgXWBElQb/fdUdJsAmfkhCDUZJq8YdbSYjXWBUlwZFMl+qJkmADPiQhLkeBXepmEuI91szUBTtxDRewbhrr9mW6VO901c8tF942XegltsQUVQ8EQ0mIK1OtOyaszHwPVH16X0xBddNJzaHpfNsT+egfVa1MD8YkYH+mXt9kak1mG+aYvDPV0uIvaq3Gm6TGjeoaMVvQm1nQVa5OdImNi8m5H7Fx5u8+gV14lwnzAGv/cG5P5rzD8a9gc+NDJ1Vt2bSPM2m8Strf/uc7hkb6+t1MmGr26cq0H0zafa4eSLQCLMGlTJgvONDUrivT5mi0ErThlLzq+HI8S47fx/xoRTjU2K7JjZtmw2ONo5aB7sZ0Op7jUQJ0ZGanUY+wMEqB9Zl9qarbbYvSGBnk15uC9EepjKzROov7BVCr1Woxm34AHdCJS1EoyXEAAAAASUVORK5CYII="
                                                            alt="checkmark--v1"
                                                        />
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
