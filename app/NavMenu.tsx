import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import { SignInButton, SignOutButton } from "@/components/AuthButtons";
import AuthCheck from "@/components/AuthCheck";

export default function NavMenu() {
    return (
        <nav className="bg-deepDarkBlue w-screen h-20 flex flex-row">
            <div className="ml-6 mr-auto my-auto">
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
            <div className="my-auto mr-7">
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
