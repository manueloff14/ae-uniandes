"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function HeroSection({
    image,
    preTitle,
    title,
    subtitle,
    buttonText,
    buttonLink,
}) {
    return (
        <section style={{ paddingTop: "var(--header-height)" }}>
            <div className="relative w-full md:w-[98%] h-[600px] md:h-[700px] lg:h-[800px] mx-auto mb-16">
                <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={title || "Hero Image"}
                />
                <div className="absolute top-0 right-0 bg-black opacity-40 w-full h-full"></div>
                
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end px-6 md:px-24 lg:px-[17rem] py-10 md:py-20 lg:py-28">
                    <div className="space-y-4 md:space-y-6">
                        {preTitle && (
                            <span className="inline-block text-xs p-2 px-4 rounded-none border border-white text-white font-inter">
                                {preTitle}
                            </span>
                        )}
                        {title && (
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-inter text-white max-w-4xl">
                                {title}
                            </h1>
                        )}
                        {subtitle && (
                            <p className="mb-6 text-sm md:text-base lg:text-lg text-white font-semibold max-w-2xl">
                                {subtitle}
                            </p>
                        )}
                        {buttonText && buttonLink && (
                            <div>
                                <Link href={buttonLink} target="_blank">
                                    <div className="bg-white text-black hover:bg-[#06869B] hover:text-white p-3 px-6 w-fit flex items-center gap-3 transition-all duration-200 font-semibold text-sm md:text-base rounded-none border border-transparent hover:border-[#06869B]">
                                        {buttonText}
                                        <ExternalLink size={16} />
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
