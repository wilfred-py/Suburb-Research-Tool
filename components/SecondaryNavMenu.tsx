import Link from "next/link";
import SmallerSearchBar from "./SmallerSearchBar";
import { SignInButton, SignOutButton } from "./FireShipAuthButtons";
import AuthCheck from "./fireshipauthcheck";

export default function SecondaryNavMenu() {
    return (
        <nav className="bg-deepDarkBlue w-screen h-20 flex flex-row align-items">
            <div className="xl:pl-52 xl:mr-10 lg:pl-52 lg:mr-4 md:pl-32 md:mr-4 sm:pl-32 sm:mr-4 my-auto">
                <Link className="text-white text-2xl font-bold m-2" href={"/"}>
                    Suburbly
                </Link>
            </div>

            <div className="xl:w-[1000px] xl:mx-auto xl:mr-auto lg:w-[600px] lg:mx-auto mt-[13px] mb-[13px]">
                <SmallerSearchBar />
            </div>

            <div className="my-auto mr-6">
                <ul className="flex flex-row text-white space-x-7 font-semibold">
                    <li></li>
                </ul>
            </div>

            <div className="my-auto xl:pr-52 lg:pr-52 md:pr-32 sm:pr-32">
                {/* <ul>
                    <li className="border border-transparent rounded text-white bg-mainBlue p-2 font-semibold">
                        <Link href="/api/auth/signin">Sign in</Link>
                    </li>
                </ul> */}
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
