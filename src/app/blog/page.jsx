import HeaderHome from "@/components/routes/HeaderHome";
import Footer from "@/components/routes/Footer";

export default function BlogPage() {
    return (
        <div>
            <HeaderHome blog={true} />

            <main className="pt-20">
                {/* Contenedor centrado y responsive */}
                <section className="container mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Columna izquierda (post destacado) */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-lg">
                            <img
                                src="https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg"
                                alt="Post destacado"
                                className="w-full h-[400px] object-cover"
                            />
                            {/* Capa oscura al hover */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-60"></div>
                            {/* Información del post */}
                            <div
                                className="absolute bottom-0 left-0 w-full p-6 text-white flex flex-col items-start gap-2 
                   backdrop-blur-sm bg-[#0000005d] rounded-b-3xl"
                            >
                                <span className="border rounded-full p-2 px-4 text-xs">
                                    Tecnologia
                                </span>
                                <h2 className="text-xl md:text-2xl font-bold">
                                    Desbloquea el potencial completo en todo lo
                                    que te propongas en la vida
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha (otros posts) */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Otros blogs</h2>
                        <ul className="space-y-4">
                            {Array(4)
                                .fill(null)
                                .map((_, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="relative group cursor-pointer overflow-hidden rounded-xl w-[120px] h-[70px] flex-shrink-0">
                                            <img
                                                src="https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg"
                                                alt="Miniatura"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="font-semibold text-sm leading-tight">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit.
                                        </h3>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </section>

                <section className="px-6 md:px-20 my-8">
                    <h2 className="text-xl font-bold mb-6">
                        Publicaciones recientes
                    </h2>

                    {/* Grid de varias columnas */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {Array(4)
                            .fill(null)
                            .map((_, index) => (
                                <li key={index}>
                                    <div className="relative group cursor-pointer overflow-hidden rounded-xl w-full h-[200px] flex-shrink-0 mb-4">
                                        <img
                                            src="https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg"
                                            alt="Miniatura"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Lorem ipsum dolor, sit amet
                                            consectetur adipisicing elit.
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit. Cum
                                            quaerat pariatur aut fuga.
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div className="relative group cursor-pointer overflow-hidden rounded-full w-[30px] h-[30px] flex-shrink-0">
                                                <img
                                                    src="https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg"
                                                    alt="Miniatura"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-medium">
                                                    Jose Gelves
                                                </span>
                                                <span className="block text-xs text-gray-400">
                                                    Hace 2 días
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </section>

                <section className="px-6 md:px-20 my-8">
                    <h2 className="text-xl font-bold mb-6">
                        Publicaciones recomendadas
                    </h2>

                    {/* Grid de varias columnas */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {Array(4)
                            .fill(null)
                            .map((_, index) => (
                                <li key={index}>
                                    <div className="relative group cursor-pointer overflow-hidden rounded-xl w-full h-[200px] flex-shrink-0 mb-4">
                                        <img
                                            src="https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg"
                                            alt="Miniatura"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Lorem ipsum dolor, sit amet
                                            consectetur adipisicing elit.
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit. Cum
                                            quaerat pariatur aut fuga.
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div className="relative group cursor-pointer overflow-hidden rounded-full w-[30px] h-[30px] flex-shrink-0">
                                                <img
                                                    src="https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg"
                                                    alt="Miniatura"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-medium">
                                                    Jose Gelves
                                                </span>
                                                <span className="block text-xs text-gray-400">
                                                    Hace 2 días
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    );
}
