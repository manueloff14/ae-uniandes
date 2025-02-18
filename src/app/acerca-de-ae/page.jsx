"use client"

import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/home/Footer";

export default function AcercaAEPage() {
    return (
        <div>
            <HeaderHome />

            <main>
                <section className="py-40 px-28 bg-black">
                    <div className="flex justify-center mb-4">
                        <span className="p-2 px-4 rounded-full border text-xs text-center text-white">
                            Nuestro Equipo
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-center text-white mb-2">
                        Expertos que impulsan el cambio
                    </h2>
                    <p className="text-center text-gray-400 mt-4 mb-12 px-32">
                        Conoce a las mentes creativas y comprometidas que
                        transforman ideas en soluciones innovadoras, trabajando
                        juntas para generar un impacto real en nuestra
                        comunidad.
                    </p>

                    {/* Contenedor de integrantes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
                        {[
                            {
                                id: 1,
                                name: "Persona",
                                role: "Administración",
                                image: "https://placehold.co/400x400?text=Persona",
                            },
                            {
                                id: 2,
                                name: "Persona",
                                role: "Administración",
                                image: "https://placehold.co/400x400?text=Persona",
                            },
                            {
                                id: 3,
                                name: "Persona",
                                role: "Administración",
                                image: "https://placehold.co/400x400?text=Persona",
                            },
                            {
                                id: 4,
                                name: "Persona",
                                role: "Administración",
                                image: "https://placehold.co/400x400?text=Persona",
                            },
                            {
                                id: 5,
                                name: "Persona",
                                role: "Administración",
                                image: "https://placehold.co/400x400?text=Persona",
                            },
                            {
                                id: 6,
                                name: "Persona",
                                role: "Administración",
                                image: "https://placehold.co/400x400?text=Persona",
                            },
                        ].map((member) => (
                            <div
                                key={member.id}
                                className="flex flex-col items-center"
                            >
                                <img
                                    src={member.image}
                                    alt={`Integrante ${member.name}`}
                                    className="w-[130px] h-[130px] rounded-full object-cover mb-4"
                                />
                                <h3 className="text-xl font-semibold">
                                    {member.name}
                                </h3>
                                <p className="text-gray-500">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
}
