import Link from "next/link";
import SmallerSearchBar from "./SmallerSearchBar";
import { SignInButton, SignOutButton } from "./AuthButtons";
import AuthCheck from "./AuthCheck";

export default function SecondaryNavMenu() {
    return (
        <nav className="bg-deepDarkBlue w-screen h-20 flex flex-row align-items">
            <div className="ml-6 mr-auto my-auto">
                <Link className="text-white text-2xl font-bold m-2" href={"/"}>
                    Suburbly
                </Link>
            </div>

            <div className="mt-[13px] mb-[13px]">
                <SmallerSearchBar />
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
                {/* <ul>
                    <li className="border border-transparent rounded text-white bg-mainBlue p-2 font-semibold">
                        <Link href="/api/auth/signin">Sign in</Link>
                    </li>
                </ul> */}
                <li>
                    <SignInButton />
                </li>
                <li>
                    <AuthCheck>
                        <SignOutButton />
                    </AuthCheck>
                </li>
            </div>
        </nav>
    );
}
