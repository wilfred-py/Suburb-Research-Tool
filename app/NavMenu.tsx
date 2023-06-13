import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import styles from "./NavMenu.module.css";

export default function NavMenu() {
    return (
        <nav className={styles.nav}>
            <Link href={"/"}>Logo</Link>

            <ul className={styles.links}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/load">Load</Link>
                </li>
                <li>
                    <Link href="About">About</Link>
                </li>
                <li>
                    <Link href="/suburb/">Suburbs</Link>
                </li>
                <li>
                    <Link href="How to use">How to use</Link>
                </li>
                <li>
                    <Link href="FAQs">FAQs</Link>
                </li>
                <li>
                    <Link href="Sign in">Sign in</Link>
                </li>
            </ul>
        </nav>
    );
}
