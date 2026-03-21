"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import {
    Instagram,
    Linkedin,
    Mail,
    MessageCircle,
    ExternalLink,
} from "lucide-react";

export default function Footer({
    data,
    unirmeLink = "https://forms.gle/6G74rJuyKTibZ1EA7",
}) {
    const { language } = useParams();

    console.log(data);

    return (
        <footer className="bg-black text-white py-16 px-6 md:px-16 lg:px-32 xl:px-72">
            <div className="w-full">
                <div className="space-y-12">
                    {/* Sección: Título, descripción y CTA */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 font-inter">
                                {data.footer.callForAttention.cta_section.title}
                            </h2>
                            <p className="text-sm text-gray-200 mb-0 font-inter leading-relaxed">
                                {
                                    data.footer.callForAttention.cta_section
                                        .subtitle
                                }
                            </p>
                        </div>
                        <a
                            href={
                                data.footer.callForAttention.cta_section.button
                                    .url
                            }
                            target="_blank"
                            className="flex items-center justify-center min-w-[180px] gap-2 text-sm font-bold bg-white text-black px-6 py-4 rounded-none whitespace-nowrap hover:bg-gradient-to-r hover:from-[#06869B] hover:via-[#11809D] hover:to-[#1B607A] hover:text-white transition-all duration-300 shadow-black"
                        >
                            {
                                data.footer.callForAttention.cta_section.button
                                    .label
                            }
                            <ExternalLink size={18} />
                        </a>
                    </div>

                    {/* Sección: Logo, tagline y enlaces */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
                        {/* Logo y tagline */}
                        <div className="max-w-xs">
                            <div className="flex items-center gap-3 mb-2">
                                <Image
                                    src="/ae-logo.svg"
                                    alt="Logo"
                                    width={210}
                                    height={40}
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xs text-gray-300 font-inter leading-relaxed block">
                                {data.header.lema}
                            </span>
                        </div>

                        {/* Enlaces de navegación usando Grid para no crear columnas gigantes en Tablet */}
                        <ul className="grid grid-cols-2 lg:flex lg:flex-row gap-x-8 gap-y-4 text-sm text-white [&>li>a]:font-inter w-full md:w-auto">
                            {data.header.links.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={`/${language}${link.url}`}
                                        className="hover:text-gray-300 text-gray-100 transition"
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sección inferior: Copyright y redes */}
                <div className="mt-16 pt-8 border-t border-gray-800 text-xs flex flex-col md:flex-row gap-6 md:gap-0 items-center justify-between">
                    <span className="text-gray-300 flex-1 font-inter text-center md:text-left leading-relaxed">
                        &copy; 2021 - {new Date().getFullYear()} AE Uniandes.{" "}
                        {data.footer.socialNetworks.bottom.copyright}
                    </span>
                    <div className="flex gap-6 mt-2 md:mt-0">
                        {data.footer.socialNetworks.bottom.social_links.map(
                            (item, index) => {
                                let Icon = null;
                                if (item.name === "Instagram") Icon = Instagram;
                                else if (item.name === "LinkedIn")
                                    Icon = Linkedin;
                                else if (item.name === "Email") Icon = Mail;
                                else if (item.name === "WhatsApp")
                                    Icon = MessageCircle;

                                if (!Icon) return null;

                                return (
                                    <a
                                        key={index}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={item.name}
                                        className="text-white hover:scale-[1.2] transition-all duration-200 opacity-90 hover:opacity-100"
                                    >
                                        <Icon size={22} />
                                    </a>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
