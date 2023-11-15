import Link from "next/link";
import AuthCheck from "@/components/AuthCheck";
import { SignInButton, SignOutButton } from "@/components/AuthButtons";

export default function NavBar() {
    return (
        <nav className="sticky top-0 z-50 w-screen h-[92px] flex flex-row">
            <div className="xl:px-56 lg:px-56 md:pl-32 md:mr-auto sm:pl-32 sm:mr-auto my-auto">
                <ul className="flex flex-row space-x-7 place-items-center font-semibold mr-7 list-none">
                    <li>
                        <Link className="text-2xl font-bold m-2" href={"/"}>
                            Suburbly
                        </Link>
                    </li>
                    <li>
                        <Link href={"/about"} className="text-gray-500">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href={"/features"} className="text-gray-500">
                            Features
                        </Link>
                    </li>
                    <li>
                        <Link href={"/test"} className="text-purple-500 font-bold text-2xl">
                            Test
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="my-auto xl:pr-px-56 lg:pr-px-56 md:pr-32 sm:pr-32">
                <ul className="flex flex-row space-x-7 place-items-center font-semibold mr-7 list-none">
                    <li>
                        <AuthCheck>
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
