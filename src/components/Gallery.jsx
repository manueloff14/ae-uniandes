"use client";
import React from "react";

// 1. Importa los módulos necesarios de Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";

// 2. 🔥 IMPORTANTE: Importa los estilos base de Swiper y los módulos que usas
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';


// Tu componente para móvil (no lo modificamos)
import EmblaCarousel from "./embla/Carrousel";

const CarouselGallery = ({ galeria }) => {
    // 3. El estado de "loading" fue eliminado porque no se usaba.
    // Si en el futuro cargas los datos de una API, puedes volver a añadirlo.

    // Si la galería no tiene imágenes, puedes mostrar un mensaje o nada.
    if (!galeria || galeria.length === 0) {
        return <p className="text-center">No hay imágenes en la galería.</p>;
    }
    
    return (
        <>
            {/* DESKTOP */}
            <div className="hidden lg:block bg-transparent">
                {/* 4. Asegúrate de que el contenedor de Swiper tenga un tamaño definido, 
                    puedes hacerlo con una clase CSS o inline styles. 
                    Ej: className="w-full h-[500px]" */}
                <Swiper
                    modules={[Navigation, Pagination, EffectCoverflow]}
                    effect={"coverflow"}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={3} // Ideal para el efecto coverflow
                    navigation={true}
                    pagination={{ clickable: true }}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    className="mySwiper" // Usa una clase más genérica y dale estilos si es necesario
                >
                    {galeria.map((item) => (
                        <SwiperSlide key={item.id || item.image.url}> {/* Es mejor usar un ID único si lo tienes */}
                            <img
                                src={item.image.url}
                                alt={item.title || 'Imagen de la galería'}
                                className="block w-full h-full object-cover"
                            />
                            {/* Si quieres texto sobre la imagen, puedes posicionarlo aquí */}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* MOBIL */}
            <div className="lg:hidden">
                <EmblaCarousel slides={galeria} />
            </div>
        </>
    );
};

export default CarouselGallery;