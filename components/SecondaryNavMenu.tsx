import Link from "next/link";
import SmallerSearchBar from "./SmallerSearchBar";

export default function SecondaryNavMenu() {
    return (
        <nav className="bg-deepDarkBlue w-screen h-20 flex flex-row">
            <div className="ml-6 mr-auto my-auto">
                <Link className="text-white text-2xl font-bold m-2" href={"/"}>
                    Suburbly
                </Link>
            </div>

            <div>
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
                <ul>
                    <li className="border border-transparent rounded text-white bg-mainBlue p-2 font-semibold">
                        <Link href="Sign in">Sign in</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
