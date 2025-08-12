"use client";
import React, { useEffect, useState } from "react";

// Importas los módulos necesarios de Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import EmblaCarousel from "./embla/Carrousel";

// Se mantiene la carga del CSS externo como has pedido
const CarouselGallery = ({ galeria }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
            "https://carousel-slider.uiinitiative.com/assets/index.0f26cec9.css";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <p>Cargando...</p>
            </div>
        );
    } else {
        return (
            <>
                {/* DESKTOP */}
                <div className="hidden lg:block bg-transparent">
                    <Swiper
                        modules={[Navigation, Pagination, EffectCoverflow]}
                        effect={"coverflow"}
                        centeredSlides={true}
                        loop={true}
                        // 2. CAMBIO PRINCIPAL: El valor debe ser un número impar como 3 para centrar correctamente.
                        slidesPerView={3}
                        // 3. FIX PARA EL BUCLE: Asegura que la transición infinita sea suave.
                        loopedSlides={galeria.length}
                        navigation={true}
                        pagination={{ clickable: true }}
                        // 4. AJUSTE DE ESTILO: 'stretch: 0' da un espaciado más estándar.
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        className="swiper-carousel bg-white"
                    >
                        {galeria.map((item, index) => (
                            <SwiperSlide key={index} className="bg-white">
                                <div className="swiper-carousel-animate-opacity">
                                    <img
                                        src={`${item.image.url}`}
                                        alt={item.title}
                                    />
                                    <div className="slide-content">
                                        {item?.title ? (
                                            <h2>{item.title}</h2>
                                        ) : null}
                                        {item?.description ? (
                                            <p>{item.description}</p>
                                        ) : null}
                                    </div>
                                </div>
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
    }
};

export default CarouselGallery;
