import Link from "next/link";
import styles from "./NavMenu.module.css";

export default function NavMenu() {
    return (
        <nav className={styles.nav}>
            <Link href={"/"}>Logo</Link>
            <form>
                <input
                    className="pl-4 py-1"
                    type="text"
                    placeholder="Suburb or Postcode..."
                />
                <button>Search</button>
            </form>
            <ul className={styles.links}>
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
