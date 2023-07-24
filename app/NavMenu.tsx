import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// sm: "640px",
// => @media (min-width: 640px) { ... }

// md: "768px",
// => @media (min-width: 768px) { ... }

// lg: "1024px",
// => @media (min-width: 1024px) { ... }

// xl: "1280px",
// => @media (min-width: 1280px) { ... }

// "2xl": "1536px",
// => @media (min-width: 1536px) { ... }

import Link from "next/link";
import { SignInButton, SignOutButton } from "@/components/AuthButtons";
import AuthCheck from "@/components/AuthCheck";

export default function NavMenu() {
    return (
        <nav className="bg-deepDarkBlue w-screen h-20 flex flex-row">
            <div className="xl:pl-40 xl:mr-auto lg:pl-40 lg:mr-auto md:pl-32 md:mr-auto sm:pl-32 sm:mr-auto my-auto">
                <Link className="text-white text-2xl font-bold m-2" href={"/"}>
                    Suburbly
                </Link>
            </div>

            <div className="my-auto mr-6">
                <ul className="flex flex-row text-white space-x-7 font-semibold">
                    <li>
                        <Link href="/load">Load</Link>
                    </li>
                    <li>
                        <Link href="About">About</Link>
                    </li>
                </ul>
            </div>
            <div className="my-auto xl:pr-40 lg:pr-40 md:pr-32 sm:pr-32">
                {/* <li className="border border-transparent rounded text-white bg-mainBlue p-2 font-semibold">
                        <Link href="/api/auth/signin">Sign in</Link>
                    </li> */}
                <ul className="flex flex-row space-x-7 place-items-center text-white font-semibold mr-7 list-none">
                    <li>
                        <SignInButton />
                    </li>
                    <li>
                        <AuthCheck>
                            <SignOutButton />
                        </AuthCheck>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
