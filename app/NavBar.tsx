import Link from "next/link";
import AuthCheck from "@/components/AuthCheck";
import { SignInButton, SignOutButton } from "@/components/AuthButtons";

export default function NavBar() {
    return (
        <nav className="sticky top-0 z-50 w-screen h-[92px] flex flex-row bg-navigationBarBlue ">
            <div className="xl:px-32 lg:px-32 md:pl-32 md:mr-auto sm:pl-32 sm:mr-auto my-auto text-offwhite">
                <ul className="flex flex-row space-x-7 place-items-center mr-7 list-none font-semibold">
                    <li>
                        <Link className="text-2xl font-bold m-2" href={"/"}>
                            Suburbly
                        </Link>
                    </li>
                    {/* <li>
                        <Link href={"/test"} className="text-purple-500 font-bold text-2xl">
                            Test
                        </Link>
                    </li> */}
                </ul>
            </div>

            <div className="my-auto xl:pr-32 lg:pr-32 md:pr-32 sm:pr-32 text-offwhite">
                <ul className="flex flex-row space-x-7 place-items-center font-semibold mr-7 list-none">
                    <li className="hover:underline hover:underline-offset-1">
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
