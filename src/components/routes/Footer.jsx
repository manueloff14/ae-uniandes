"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function Footer({ data, unirmeLink = "https://forms.gle/6G74rJuyKTibZ1EA7" }) {
    const { language } = useParams();

    return (
        <footer className="text-black py-8 px-4 md:px-20">
            <div className="mx-auto p-6 rounded-3xl bg-[#f1f1f1] shadow-lg">
                <div className="space-y-8">
                    {/* Sección: Título, descripción y CTA */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1 font-inter">
                                {data.Footer.heading}
                            </h2>
                            <p className="text-sm text-gray-600 mb-4 font-inter">
                                {data.Footer.description}
                            </p>
                        </div>
                        <a href={unirmeLink} target="_black" className="flex items-center gap-2 text-sm font-bold mt-6 bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white px-6 py-3 rounded-full whitespace-nowrap hover:bg-red-600 hover:shadow-2xl shadow-black">
                            {data.Footer.buttonText}
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
                                {data.Footer.question}
                            </span>
                        </div>

                        {/* Enlaces de navegación */}
                        <ul className="flex flex-col items-start md:flex-row md:items-center gap-6 text-sm text-gray-700 [&>li>a]:font-inter">
                            {data.Footer.navItems.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={`/${language}${link.link}`}
                                        className="hover:text-black transition"
                                    >
                                        {link.label}
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
                        {data.Footer.copyRight}
                    </span>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        {/* Redes sociales */}
                        {/* <a
                            href="#"
                            aria-label="Facebook"
                            className="hover:text-black hover:scale-[1.2] transition-all duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                            >
                                <path
                                    d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"
                                    fill="#11809D"
                                ></path>
                            </svg>
                        </a> */}
                        {/* <a
                            href="#"
                            aria-label="Twitter"
                            className="hover:text-black hover:scale-[1.2] transition-all duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 50 50"
                            >
                                <path
                                    d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"
                                    fill="#11809D"
                                ></path>
                            </svg>
                        </a> */}
                        <a
                            target="_blank"
                            href="https://www.instagram.com/aeuniandes/"
                            aria-label="Instagram"
                            className="hover:text-black hover:scale-[1.2] transition-all duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"
                                    fill="#11809D"
                                ></path>
                            </svg>
                        </a>
                        <a
                            target="_blank"
                            href="https://www.linkedin.com/company/aeuniandes"
                            aria-label="LinkedIn"
                            className="hover:text-black hover:scale-[1.2] transition-all duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 50 50"
                            >
                                <path
                                    d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                                    fill="#11809D"
                                ></path>
                            </svg>
                        </a>
                        <a
                            target="_blank"
                            href="mailto:altruismoeficaz@uniandes.edu.co"
                            className="hover:text-black hover:scale-[1.2] transition-all duration-200"
                        >
                            <img
                                className="w-[30px] h-[30px]"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACkElEQVR4nO1Yz2sTURDeVq0i0cxL2oM/UEQQQYrgQbwIHvRP8OrRg2g9FY/zkirWY0GE3cykBW/5D7QH8dKaQ6h4EA8iiAgiomirUKqNTLIx6Wa3u/mxyRbfB3MJb2a+772ZWTKWZWBgYGBg4IPjOL8PkKdAcxmQ1pTm6iANkNbquXlKuFidIHN34YjStDJo0irQaCWLdDgaeyyNKaSXwyfNbSKEWyh/0HRr+GQ5oKwKNyMI4HJiBWheDheA/DTBAp5EaoMM8uUk9QEgv87k6KrVERBHxUkhvxvijX9QyNetUmlXdOKewzKDlaZphfx1YORRctF02/yPIiToudL3HylAngWkX/GRp3XQZKfu8URQWYcKaHm+ZcgVL7YHco5KEqV5o4/k/wByKT3jnGjPVzivND9rnI0soCmEFlW+OOk9l8X505K09zqnRcjzWW/8cXRO1eIjbbae71iAaxty636f8ww6F5Tm5100aDmNhUveeFI+UqpSTn5+3QpoJP1ZCz5rpwNq9FUoceQ39R6rjrT6T+DDlNJ0B5B/bOffk4DmlKAvkqxtSiCOAvI10PzRx+czaLptIe7e4mPbe2RUAvKnKLn7I6Bp7/3m9CG094tApekbaF6VV8s+oANbM1VH6t8ZettJzn4LcI0qmVzhijdWCu1xMe/vclZ8VBe5YhLQnChpLJ4LjJ13zvQ6uaw4Bbi1vikkD84snPwXE+1jtW8H0u9e41uxC2iW1brS9Ng135Goki0gHrOMAG1eoGpKaDvs+CYGzavDJqkCDDR9DxeA9CKxApCXdvhii26ECrDm5vYmay/KrlEl0moxocvdSvTlbgNYGpNdpNTdMBob6v8jlmplE/XmDQwMDAz+O/wFYobOTTvqX58AAAAASUVORK5CYII="
                            />
                        </a>
                        <a
                            target="_blank"
                            href="https://chat.whatsapp.com/LXkClBdqTFC6mfbyP8JIvy"
                            className="hover:text-black hover:scale-[1.2] transition-all duration-200"
                        >
                            <img
                                className="w-[27px] h-[27px]"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEKklEQVR4nO2aTYwURRTHG1BAXaarWhc0IWBEDxouJBw4G5WoGDbG+AEXbkZRQY5e/jVLCCxg4kSDDv1er1kSNWM8gCDhIEYOxBguXHCBjUGEEMJmE8KBj4Ud8maGj93u6anu6e2ZECqp08z8u371Xr167007zsPxgA536y7tgvqU4R3K0AEFHtbgMW3oem2Cx5Shf2qfyXeKwWoXg8rpilEqzVGG1irDhzTopjZcTTRBN5Xhgxr+GtFy8h4Lv6w8pkGblOHziRffZCrQORe8cTEG5+YCoYv8ugaNZAUQMU/rYrBy+ghKpTnaUGkaAaa4HQ+J5TNlmL/FX6DBx3KDMHfd7e8nMDQ/EwgXg8/WzJ0zhL4XEE7JGtqC6NnCvbUw2ikIcxdmpBeDT6eCkOjRCXfSMW6WKkQrw992evE6PL9OHmI7v+hq1PRAryW4rflkpxesm8/TVpem3NhWguAbCvzZMyg/7gAzvaL/qjZ8Kw8YZWiDjTUs0w7/w/Am8L58QPj/2IMvCaCl2J+R1iwGK3N0sQ9iQPiQnUjwXrRCdUZe50uBfmtaT9im4gX4z8dYdUNOFhn3sKcQBgH12YrE+acUSxIIcrFK0X8rvJOgnbYCkro0Ayls/n6JBk3k4168PbQADd5vLVKkNyMpyuVHNfhwTq5V1YZ+jQChUwl2otINaY0CD0eBjFqLyBlAeVFIw/AfeYJow5fCILVuR5LdoJ+manj9/ovK0NXcQMDXItwi+QJc+G+HdEAfdxrkQgqhMbWZFkdYt9Qx11LgEynFjj85QPMmq1VntAzn4DOp+2GmPqXh1174DQsecCqVWRFWlubdlTAEjbrg5+7cOxLtUp0t8L4IEOpvz18pkHR+qq6H3QsV6If7UvxxF8HLU78nNbkCb1OGLifYwIG2UpSYHRqSSzEk7jjOvP7gBbmJPfA7UZ/f/z1tCwJeFbbItrIrUaBtGEO/F+B7TsrRg/JTlpt2IzJpzLQwAp+Jch+boRG8YfmM/VkUVjZnZkIZ8uWMJAIxvNdS//3mKpL0Gf4vM5j6zl3ToF0F0PKWZTb4O7uzQWcdVGbH6inD6zMFmXw4TyjQF24/LZOmRS++6Wm0ZD/S4H+tdQx92tK0DeFpAcloM4atOo4uaF2nF6ubuilNeOBXWkI0XOvH7gXhr6wgJM1IVJfk6lL0V8sDfmd42L2iS11qRP5ssrNG/R5B11nC8MmoUiEeBHy029ypJ6Zj03aDLh9LUDnVHzsa/G53WIGHrUNsNAgFFg+6pA3/In8neIY/l+QwQzc6W7ux230DQlr14QfQRWXoZwX/Ew1aKiXspB8Bj0hXXLLmlN2T8VplKgmgbWhtNTToiDQgpM0juY8Hfim08JhRz5uor1Fp7m28QHOhDigv1dBorS9Qhx6Qoihc6z8czgMzbgONkbWg+Cdq6gAAAABJRU5ErkJggg=="
                                alt="whatsapp--v1"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
