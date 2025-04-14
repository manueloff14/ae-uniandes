import Link from "next/link";

export default function BlogPage() {
    // Items for the left menu
    const menuItems = [
        {
            label: "Inicio",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAeklEQVR4nN3RsQnCUBSG0QdiG7BOQhp3sHKMrOAKrpA5UlqLA9g5g40TBNIG4Vj6MASTiCCe9vJ/zQ3hW5CgxgGrqeMNrp5u2I4ZLrBHp++OCsuhcYGz9y5Yv45LNMZrsYsDs/x+4IgUGU5zAll0zycHQv/Nfx0IH3gAoFJWrP4FW0kAAAAASUVORK5CYII=",
            alt: "home",
        },
        {
            label: "Categorías",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA0UlEQVR4nO2UywrCMBBFz09oo5+tv6Nd2IW4ta1VslP/oyJMMNT0MX0gSC+ElJKbw1wmA7AHyo5rx0exwpegOOyWU6n1DQW1aQYxR+c0NwODH+xJcfjogRKF78BfKtZO4b6+n01v611mO4CWwFm+C8AAEZC1ge7eZY8OoIvsmUCNAB34C2QFsgWeAtnIbluiy6WKKsSEQKEq/OqaKopqIIsxQaYG8o4xrYvOj8uPsSk6E4BM0gxFAJLLv3TM9i6BK7CuVHIDVk2gyR5s3yms8r0AzYXL1fwcPT4AAAAASUVORK5CYII=",
            alt: "categorize",
        },
        {
            label: "Archivo",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAArUlEQVR4nN2VQQrCQAxF38pDCF5DRC/QI7j1MMU7CJ7BjSca7dbiCSLCLwyltqFk0fFDIJNM5s1kMYF/VAU8AMus06/115JqJ5V6heYEdJBJ9Q/xyl03ttFm5pYDGFMZL7CiW3TKcsdowAZ4Z7kWWEcCrordgLv8SySgVWwL7OS/IgGNYnvgIP8ZCTgPfGx1JGAlSKOb14qFATxaDiAN9Nuc5ho41UxI8o7MsvQBuGWXkAKfATMAAAAASUVORK5CYII=",
            alt: "archive",
        },
        {
            label: "Sobre los autores",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+UlEQVR4nO3WvwpBYRjH8W8ZSAaUgZmLMLoFLkEZZFeschk2dyCZlEUWJrKQC0BRkkV06j3jeZz39Lwl+dZvOn8+wzmdDvz70lJAF1gBN7Ml0DHHnFQC9sArYDugqI0mga2A+tsACU24FQL119SEZxbwVBM+W8AnTfhhAXvnqnWwgL03X62xBTzShBsWcF0TzgLXEOgFyKBcNwTcxkEJYCGgcyCOowoCnMdxr4Dxk3BNgKvaWAyoAEPgKcBPc07FXBO5MjAAjhYfD39Hc613j9DlgEkELGgTc0+xzIffm6jbAWkJ7jtA/fUkeOMQXkvw3SF8//Sc/+GiN3b4Ij8AwzjdAAAAAElFTkSuQmCC",
            alt: "Icono sobre los autores",
        },
        {
            label: "Contacto",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVR4nO3UPWpCQRSG4UeSzpS5kCYguA53kOwgCa7CFdgF13C3oIWtG0gU0qTKDiyTIj8YgziCyNzgz7Hzg8sUc8/7wpkzwylHTIE2Sjxhim+MDgW3MMAP5hXfXmli+A/0IMED3lPxYn2LEtTQXSvs4zr1/6UC/rmLoJuKftHZ2LvEGDNM0mH3cLst/D7BF4C7in/OULfnga563nGEDNd6Hp5Wgn+gEY9fXqJ5GsUiGl6k674auVdcRQrambme4DxKUGYEM1xECZ4zgrHATDOCMlLwlRE8RgpGmYfrJlJwis38AUj7Y5yq5cw9AAAAAElFTkSuQmCC",
            alt: "contact",
        },
    ];

    return (
        <div className="font-serif">
            {/* Header */}
            <header className="flex items-center justify-between gap-4 p-4 px-6 bg-white border border-[#e2e2e2] z-10 fixed w-full">
                <div className="flex items-center gap-4">
                    {/* Hamburger button */}
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
                        </svg>
                    </button>
                    {/* Logo + divider + Title */}
                    <div className="flex items-center gap-4">
                        <img
                            className="w-[150px]"
                            src="https://www.aeuniandes.com/ae-logo-black.svg"
                            alt="Logo"
                        />
                        <div className="w-[2px] h-[35px] bg-[#d6d6d6]" />
                        <h1 className="font-bold text-xl">Blog</h1>
                    </div>
                </div>
                {/* Right side of header */}
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 p-2 border border-[#e2e2e2] rounded-2xl">
                        <img
                            className="w-[20px]"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaUlEQVR4nO2Wz0pCQRjFf2i6ydop9ArZO1T7FhrlK0TSH+spxNcw61GCaJMFJZn71rqolfHBufBtwjtzLxLkgYELM+ecud98cxhY4Q+hDLSAW+ANmGnY90BztiZXHAIfwHzBGAPNPAwLQM8JPwEXwDawrlEHLoGhW9cVNxo9CX0BJwvEbO5UaxPz6PLOJbQbwNtz5o1Q07I7U/vTULTFfQdKIcSWO9OYsyoCz9I4CiHeiXROPDrSuAkhjUSy7o1FXRp2z1NjKlIlg/GGNKbLNt6MMR7lUOod19mpMRDJEikW19Lox1ynYYbr9CKN49AAGYtoMRiKM3EnwFooueki02IwLfaBb3EPiETXmbdVwt9Q1J8mpp9ANda44MznisGOwqGiYd175c40MU3W18iAhq7FoofAROWtuqzObF5S4Fv2vioYZtpQX93rG6mWp3koqu5lYpvd4r+Y11zZH5ZpnJg/AvfLNl4Bww/dcoIlpDH7/gAAAABJRU5ErkJggg=="
                            alt="search"
                        />
                    </button>
                    <button className="bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white font-bold py-2 px-4 rounded-2xl flex items-center gap-2 text-base">
                        ¡Únete ahora!
                    </button>
                </div>
            </header>

            {/* Main container to hold sidebar + center + right aside */}
            <div className="relative flex pt-[72px]">
                {/* Left Sidebar (fixed) */}
                <aside className="fixed top-0 left-0 w-[260px] p-6 text-base border-r border-[#e2e2e2] h-screen pt-28 font-bold">
                    <nav>
                        <ul className="space-y-2">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={`/blog/${item.label
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}`}
                                        className={`flex items-center gap-2 p-3 px-4 rounded-2xl border-2 border-transparent hover:border-[#e2e2e2] ${
                                            index === 0
                                                ? "bg-gradient-to-r from-[#1A627C] to-[#07859B] text-white border-none px-5"
                                                : ""
                                        }`}
                                    >
                                        <img
                                            className="w-[18px]"
                                            src={item.img}
                                            alt={item.alt}
                                        />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Right Sidebar (fixed) */}
                <aside className="hidden lg:block fixed top-0 right-0 w-[300px] h-screen pt-28 px-6 border-l border-[#e2e2e2] overflow-y-auto">
                    {/* Signup box */}
                    <div className="bg-[#f8f8f8] p-4 rounded mb-6 border border-[#e2e2e2]">
                        <h4 className="font-bold mb-2">
                            Sign up for the weekly EA Forum Digest
                        </h4>
                        <p className="text-sm mb-2">
                            A curated reading list of Forum posts, every
                            Wednesday
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 p-2 border border-gray-300 rounded-l"
                            />
                            <button className="bg-gradient-to-r from-[#06869B] via-[#11809D] to-[#1B607A] text-white px-4 rounded-r">
                                Sign up
                            </button>
                        </form>
                    </div>

                    {/* Recently posted */}
                    <div className="mb-6">
                        <h5 className="font-bold mb-2">Recently posted</h5>
                        <ul className="space-y-1 text-sm list-disc list-inside">
                            <li>PauseAI US is looking for local group lead</li>
                            <li>Anima International is global policy</li>
                            <li>Help Eliminate Lead Exposure: LEEP</li>
                        </ul>
                    </div>

                    {/* Upcoming events */}
                    <div className="mb-6">
                        <h5 className="font-bold mb-2">Upcoming Events</h5>
                        <ul className="space-y-1 text-sm">
                            <li>
                                Apr 7: EA Mental Health Flash Talks &amp;
                                Gathering (Online)
                            </li>
                            <li>Apr 19: Reading / Community Meetup (Online)</li>
                            <li>Apr 20: EA Professional Meetup (Online)</li>
                        </ul>
                    </div>

                    {/* Online courses */}
                    <div>
                        <h5 className="font-bold mb-2">Online Courses</h5>
                        <p className="text-sm">
                            Apply by Apr 27, starting May 19
                        </p>
                    </div>
                </aside>

                {/* Center content (feed) */}
                {/* Add a right margin of 300px to avoid overlapping the fixed right sidebar */}
                <main className="flex-1 ml-[260px] mr-[300px] min-h-screen p-6 px-60 border-r border-[#e2e2e2]">
                    {/* "New & Upvoted" Header row */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">New & Upvoted</h2>
                        <button className="text-sm underline">
                            Customize feed
                        </button>
                    </div>

                    {/* Example list of posts */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-2 border-b border-[#e2e2e2] pb-3">
                            <span className="text-gray-500 text-sm w-6 text-center">
                                1
                            </span>
                            <div>
                                <h3 className="font-bold">
                                    Open thread: April - June 2025
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Toby Tremlett • 2d ago
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 border-b border-[#e2e2e2] pb-3">
                            <span className="text-gray-500 text-sm w-6 text-center">
                                4
                            </span>
                            <div>
                                <h3 className="font-bold">
                                    Promoting immediate skin-to-skin contact
                                    &amp; early breastfeeding for all newborns
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Marshall, vktocha • 1 day
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 border-b border-[#e2e2e2] pb-3">
                            <span className="text-gray-500 text-sm w-6 text-center">
                                3
                            </span>
                            <div>
                                <h3 className="font-bold">
                                    AI for Animals 2025 Bay Area Retrospective
                                </h3>
                                <p className="text-sm text-gray-500">
                                    AI for Animals • 3d
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 border-b border-[#e2e2e2] pb-3">
                            <span className="text-gray-500 text-sm w-6 text-center">
                                470
                            </span>
                            <div>
                                <h3 className="font-bold">
                                    Centre for Effective Altruism is No Longer
                                    “Effective Altruism”-Related
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Anna Weldon, Emma Richter • 4d
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 pb-3">
                            <span className="text-gray-500 text-sm w-6 text-center">
                                1
                            </span>
                            <div>
                                <h3 className="font-bold">
                                    The ‘Bad Parent’ Problem: Why Human Society
                                    Complicates AI Alignment
                                </h3>
                                <p className="text-sm text-gray-500">
                                    1 day ago
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
