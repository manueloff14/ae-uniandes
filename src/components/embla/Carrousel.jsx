"use client";

import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./BotButton";
import { PrevButton, NextButton, usePrevNextButtons } from "./ArrowButtons";
import { ChevronLeft } from "lucide-react";

const EmblaCarousel = ({ slides, options }) => {
    // loop SIEMPRE activado (otras opciones siguen permitidas)
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        ...(options || {}),
    });

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    return (
        <section className="embla mx-auto max-w-5xl px-2 sm:px-6">
            {/* Viewport */}
            <div
                className="embla__viewport overflow-hidden rounded-3xl shadow-lg"
                ref={emblaRef}
            >
                {/* Track */}
                <div className="embla__container flex touch-pan-y gap-2">
                    {slides.map((item, i) => {
                        const isActive = i === selectedIndex;

                        return (
                            <div
                                className="embla__slide relative min-w-0 flex-[0_0_100%] px-0 sm:px-0"
                                key={i}
                            >
                                <div
                                    className={`transition-all duration-300 ease-out ${
                                        isActive
                                            ? "opacity-100 scale-[1]"
                                            : "opacity-70 scale-[0.98]"
                                    }`}
                                >
                                    <img
                                        src={`/img/galeria/${item.imageLink}`}
                                        alt={item.title}
                                        className="h-[350px] sm:h-[500px] w-full rounded-3xl object-cover"
                                        loading="lazy"
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Controles */}
            <div className="relative mt-4 flex flex-col items-center justify-between gap-6">
                {/* Dots */}
                <div className="embla__dots flex flex-wrap items-center justify-center gap-2">
                    {scrollSnaps.map((_, i) => (
                        <DotButton
                            key={i}
                            onClick={() => onDotButtonClick(i)}
                            className={`embla__dot h-3 w-3 rounded-full border border-gray-200 transition-all ${
                                i === selectedIndex
                                    ? "scale-110 bg-white"
                                    : "bg-gray-200 hover:bg-white/50"
                            }`}
                            aria-label={`Ir al slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Prev/Next */}
                <div className="embla__buttons flex items-center gap-2">
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                        className="rounded-full border border-black/10 bg-white/80 px-3 py-2 shadow hover:bg-white disabled:opacity-50"
                        aria-label="Anterior"
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                        className="rounded-full border border-black/10 bg-white/80 px-3 py-2 shadow hover:bg-white disabled:opacity-50"
                        aria-label="Siguiente"
                    />
                </div>
            </div>
        </section>
    );
};

export default EmblaCarousel;
