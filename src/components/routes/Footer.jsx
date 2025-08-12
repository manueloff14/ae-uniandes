"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function Footer({
    data,
    unirmeLink = "https://forms.gle/6G74rJuyKTibZ1EA7",
}) {
    const { language } = useParams();

    console.log(data);

    return (
        <footer className="text-black py-8 px-4 md:px-20">
            <div className="mx-auto p-6 rounded-3xl bg-[#f1f1f1] shadow-lg">
                <div className="space-y-8">
                    {/* Sección: Título, descripción y CTA */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1 font-inter">
                                {data.footer.callForAttention.cta_section.title}
                            </h2>
                            <p className="text-sm text-gray-600 mb-4 font-inter">
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
                            target="_black"
                            className="flex items-center gap-2 text-sm font-bold mt-6 bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white px-6 py-3 rounded-full whitespace-nowrap hover:bg-red-600 hover:shadow-2xl shadow-black"
                        >
                            {
                                data.footer.callForAttention.cta_section.button
                                    .label
                            }
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                            >
                                <path
                                    d="M7 17L17 7M17 7H8M17 7V16"
                                    stroke="#ffffff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                    </div>

                    {/* Sección: Logo, tagline y enlaces */}
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
                        {/* Logo y tagline */}
                        <div>
                            <div className="flex items-center gap-3 mb-0">
                                <Image
                                    src="/ae-logo-black.svg"
                                    alt="Logo"
                                    width={210}
                                    height={40}
                                />
                            </div>
                            <span className="text-xs text-gray-500 font-inter">
                                {data.header.lema}
                            </span>
                        </div>

                        {/* Enlaces de navegación */}
                        <ul className="flex flex-col items-start md:flex-row md:items-center gap-6 text-sm text-gray-700 [&>li>a]:font-inter">
                            {data.header.links.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={`/${language}${link.url}`}
                                        className="hover:text-black transition"
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sección inferior: Copyright y redes */}
                <div className="mt-8 pt-4 border-t border-gray-300 text-xs flex flex-col md:flex-row items-center justify-between">
                    <span className="text-gray-500 font-inter">
                        &copy; 2021 - {new Date().getFullYear()} AE Uniandes,{" "}
                        {data.footer.socialNetworks.bottom.copyright}
                    </span>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        {data.footer.socialNetworks.bottom.social_links.map(
                            (item, index) => (
                                <a
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.name}
                                    className="hover:text-black hover:scale-[1.2] transition-all duration-200"
                                >
                                    {/* hacemos un case para retornar el src correspondiente */}
                                    {item.name === "Instagram" ? (
                                        <Image
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB1ElEQVR4nO2WuU7DQBCG3SfIXieBBuqUHAUBBO8AEe8zayMKRMWRImQmSHREkfIkSXgI6DhCoAgFh8YHCpBdO2IJTUYayfIen//Zf9drWdP478jAxayQtCckdh3AZyHpPU06kp4EUEcA+tl9KowFdYF2HaB+Wpj6I/DRhlo5NVQAvv0WOpSviXAurwmlPxKopy17uKYmQPUNAbT59T16ajDglSGFm45X3/r2rqMEJ5YZaCAkHrkeleYOLzKc/CwknQiJL1qjAfV1pdYMxGvHp0XVWBvOl7iPbg5rbDDQIIaKvfqCA9RkBVGFWjkfiwHcx2Wdcmt8xXgUQ4WkuxEfds9tkU9OjYFdqK1GHmhq1rDBfVw4WzMGLsBpNsl8fEpxn9wBzkwULIB6xsGuR6WovaVRfBn08XDdpKuPAzU+FgMj/WjHWxfO5qM5Kka3kw3nS0PbqcFrGuVlDLWhvmJ4O1FwgMTwUcFQR9KNbg5LFcl/pkDNCa8jG44zWtNK4pEpQ9crFGNXD/5NYlsNBvT/DAwklWD+WXNJ/kDtQxaqeSU4NEmtzNcVg+BXG3BbC/0CB+oZKG/P9mgnFfSz7FDN83WFTRFcWVPCwp2BbR6bWN5pWBOID5DrO0N+hJA3AAAAAElFTkSuQmCC"
                                            alt="Instagram"
                                            width={30}
                                            height={30}
                                        />
                                    ) : item.name === "LinkedIn" ? (
                                        <Image
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABt0lEQVR4nO2ZO07DQBRFB4GoSDyP0CJRwA7YA0gQQYlAoqNkC7wxUVBYQuT3HCGosgC6fICF0IH4KBKfisbIIQ3geBxSzDjMlW43Y9+j6/H4I4STk9OfJP1wC5C6EukdFEcmLb8ydKQflEeDQK6ZDg/DXc3ehPmwUXpDvKkFiS8n00FBZ+S2vhHFbzlo5FXfiAVBIYMdCEwSiFR0D0g7hZOzUmypaA+QHnMHAn64ZsvtWowDMo/nxV/ja3UvdyAy4REh3pxyBwKKnyTy/hzWF2L314iihzyCRLZYOBA1QSAiwxz9GLqJ9yKohIsCm7OlUyoUkVYl8hEgPdsPEm+cGKynndvDhpRIl1aDFDFYFlmEOANI19aCjCIPG0uA/GE/SLM5rc2BfGEtiFR0KJHvBov+FhQdDAcJdq0E8ZC2R3n/LhyHK1aCgOKrxOMidRPH19IfRs2BIPeSQbiXPCOashNkzOOCA1EOJFEORDkQdiDgQJIFDkT8k3d2yBOIzMOPHkUvWRrpmA4KWlNL34gflM0H5XT7tKEFGbRSNR5WDXUlE8S3r+zIbRvWjOxnoFbmJpycnMRPfQIWUq13MuyLXQAAAABJRU5ErkJggg=="
                                            alt="LinkedIn"
                                            width={30}
                                            height={30}
                                        />
                                    ) : item.name === "Email" ? (
                                        <Image
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABI0lEQVR4nO2Uv0rEQBDGg3aCZuasFM5nEAWfwROE6xVLX8Hym3iNPkLITATtUgk+hSDYae2/B7CwUyLZIyLukUsughYZGHZhdufH9+2wQdDFvwlGukPQZxbL2ySJPXFkAw9Aovdtm3MJgd15gGXoKsPO2wP0ihGv+YBTXSzWEDp0MmewJoQOv/f6YZG9EOyg2K8gXiDYCUPfazT/ING4h4sl1ydKdlnswX/kCRJDnK2T2HWFHbc9JFulxQTLyloFwMl9Y9GjIMvmA2COYYck+lq3PhXwlbCb8DjZdPVR2mfopctR2h8rTDeKM5Pu1gOI73HdN2oCyMezrY8E2yfRvWI/7XxjADfMDpA3BszyPXDFQPgKIhv8BoSKCUOy7QG6+LP4BORBgNjfJXYdAAAAAElFTkSuQmCC"
                                            alt="Email"
                                            width={30}
                                            height={30}
                                        />
                                    ) : item.name === "WhatsApp" ? (
                                        <Image
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB4ElEQVR4nN1VTWsUQRCdiPET3KoVDILEHyGK4F08mVuCSkRBLx7yE3y1AfEQRCJGHKdqQgRRFg8GL17Fm4qiB5GAClGTQBAh4gcoWeklS9jp3tnZ3VPSUKeufu/Ve90zUbSp10FM7yiJnWfRxwT9wmI1gq0QdJ7E7ru9CNVtXYGzpCMEW3CgeUVin0l0tDgysIVhN9oBs19TURz3F1Cu17sAr9ULmuaCUyUd6hpcGpa1sgvYyrCPnr/QSy7kDggW3eXw1UNPegcqybG6bYgHGfqvpykIdru5Ub83ZQN9VJgAVg1N8DzT+PfAtepOtzcwcXc3i73pIOy5EEH9IWWmuOj29lbSwwxd7WCClRDBfCiwfVeSgTULLxfPwH54BCz2InxAnzUekAuPxb4R9FcZd44ybJhhrwITvPcJoDdzVM028ihdvcWl8eTQ+slaH4l9bSbQBx5BGXo8Pzh7WUZyxBcWD2Z7S9BzHoFTwtC3bW7HKkGfEGzMkTmLCPYu07fcmDaUw9PCV1FaiUgvBMH3ICm7u98jwT3nRJCARM/0Bq4zuZ9r94fKhPqHYEsFHtUCwc62BF73X1+7IrEJRnJiP+JdThGLnSLYQxb9RKK/Sewni36oC0JyOpqc3N4WfEOv//b2tHPpKYftAAAAAElFTkSuQmCC"
                                            alt="WhatsApp"
                                            width={30}
                                            height={30}
                                        />
                                    ) : null}
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
