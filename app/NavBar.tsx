import Link from "next/link";
import AuthCheck from "@/components/AuthCheck";
import { SignInButton, SignOutButton } from "@/components/AuthButtons";

export default function NavBar() {
    return (
        <nav className="sticky top-0 z-50 w-screen h-[92px] flex flex-row bg-landingPage">
            <div className="xl:pl-40 xl:mr-auto lg:pl-40 lg:mr-auto md:pl-32 md:mr-auto sm:pl-32 sm:mr-auto my-auto">
                <ul className="flex flex-row space-x-7 place-items-center font-semibold mr-7 list-none">
                    <li>
                        <Link className="text-2xl font-bold m-2" href={"/"}>
                            Suburbly
                        </Link>
                    </li>
                    <li>
                        <Link href={"/about"} className="text-gray-600">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href={"/features"} className="text-gray-600">
                            Features
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="my-auto xl:pr-40 lg:pr-40 md:pr-32 sm:pr-32">
                <ul className="flex flex-row space-x-7 place-items-center font-semibold mr-7 list-none">
                    <li>
                        <AuthCheck>
                            <Link href={"/search"} className="mx-3">
                                Search
                            </Link>
                            <Link href={"/dashboard"} className="mx-3">
                                Dashboard
                            </Link>
                        </AuthCheck>
                    </li>
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
