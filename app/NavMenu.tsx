import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import styles from "./NavMenu.module.css";

export default function NavMenu() {
    return (
        <nav className="bg-deepDarkBlue w-screen h-24 flex flex-row">
            <div className="ml-6 mr-auto my-auto">
                <Link className="text-white text-2xl m-2" href={"/"}>
                    Suburbly
                </Link>
            </div>
            <div className="my-auto mr-6">
                <ul className="flex flex-row text-white space-x-5">
                    <li>
                        <Link href="/load">Load</Link>
                    </li>
                    <li>
                        <Link href="About">About</Link>
                    </li>
                    <li className="border border-transparent rounded-lg bg-blue-700">
                        <Link href="Sign in">Sign in</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
