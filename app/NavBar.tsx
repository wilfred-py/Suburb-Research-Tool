import Link from "next/link";
import AuthCheck from "@/components/AuthCheck";
import { SignInButton, SignOutButton } from "@/components/AuthButtons";

export default function NavBar() {
    return (
        <nav className="sticky top-0 z-50 w-screen h-[92px] flex flex-row bg-navigationBarBlue ">
            <div className="xl:px-24 lg:px-24 md:pl-24 md:mr-auto sm:pl-24 sm:mr-auto my-auto text-offwhite">
                <ul className="flex flex-row space-x-7 place-items-center mr-7 list-none font-semibold">
                    <li>
                        <Link className="text-2xl font-bold m-2" href={"/"}>
                            Suburb IQ
                        </Link>
                    </li>
                    {/* <li>
                        <Link href={"/test"} className="text-purple-500 font-bold text-2xl">
                            Test
                        </Link>
                    </li> */}
                </ul>
            </div>

            <div className="my-auto xl:pr-24 lg:pr-24 md:pr-24 sm:pr-24 text-offwhite">
                <ul className="flex flex-row space-x-7 place-items-center font-semibold  list-none">
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
