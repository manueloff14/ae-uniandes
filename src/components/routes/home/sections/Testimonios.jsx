export default function Testimonios() {
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-28">
                <div className="flex justify-center mb-4">
                    <span className="p-2 px-4 rounded-full border border-black text-xs text-center text-black font-serif">
                        Testimonios
                    </span>
                </div>
                <h2 className="text-3xl font-bold text-center text-black mb-2 font-serif">
                    ¡Saludos públicos para nosotros!
                </h2>
                <p className="text-center text-gray-700 mb-12 font-serif">
                    ¡Descubra cómo las personas están haciendo correr la voz!
                </p>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                    {[
                        {
                            id: 1,
                            nombre: "Hikmet Atçeken",
                            username: "@hiatceken",
                            texto: "Pulsefy's our daily tool to bypass averages and reveal true insights, for the whole team!",
                            imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=faces&fit=crop&w=80&h=80",
                        },
                        {
                            id: 2,
                            nombre: "Arda Guler",
                            username: "@ardaguler_",
                            texto: "Pulsefy levels the analytics field for our team, enabling both beginners and pros to easily bypass average data and uncover actionable insights!",
                            imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=faces&fit=crop&w=80&h=80",
                        },
                        {
                            id: 3,
                            nombre: "Maria Ancelotti",
                            username: "@maria_ancelotti",
                            texto: "From novice to pro, Pulsefy helps our team uncover the extraordinary in our marketing data!",
                            imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=faces&fit=crop&w=80&h=80",
                        },
                        {
                            id: 4,
                            nombre: "Ragip Diler",
                            username: "@rgdiler",
                            texto: "Pulsefy empowers our whole team, techies or not, to dive into marketing analytics and spot the insights that really matter—no more average data!",
                            imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=faces&fit=crop&w=80&h=80",
                        },
                        {
                            id: 5,
                            nombre: "Jenny Wilson",
                            username: "@wilson_jenny19",
                            texto: "Pulsefy’s user-friendly analytics let our whole team, regardless of skill, bypass averages to unearth real, game-changing marketing insights every day.",
                            imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=faces&fit=crop&w=80&h=80",
                        },
                        {
                            id: 6,
                            nombre: "Guy Hawkins",
                            username: "@ghawkins",
                            texto: "Pulsefy is a game-changer for our team—easy for beginners and powerful for digging beyond average data!",
                            imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=faces&fit=crop&w=80&h=80",
                        },
                    ].map(({ id, nombre, username, texto, imagen }) => (
                        <div
                            key={id}
                            // break-inside evita que se parta la tarjeta en columnas
                            className="mb-4 break-inside-avoid bg-[#f1f1f1] p-6 rounded-3xl shadow-lg flex flex-col justify-start"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {/* Imagen de perfil */}
                                    <div className="rounded-full w-[40px] h-[40px] overflow-hidden">
                                        <img
                                            src={imagen}
                                            alt={`Foto de ${nombre}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Nombre y usuario */}
                                    <div className="text-left">
                                        <p className="text-base font-bold text-black font-serif">
                                            {nombre}
                                        </p>
                                        <p className="text-sm text-gray-700 font-serif">
                                            {username}
                                        </p>
                                    </div>
                                </div>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 50 50"
                                    >
                                        <path
                                            d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                                            fill="black"
                                        ></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Texto del testimonio */}
                            <p className="text-gray-700 italic mt-4 text-sm font-serif">
                                "{texto}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
