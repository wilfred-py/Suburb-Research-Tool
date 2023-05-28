import Link from "next/link";
import styles from "./Suburbs.module.css";

export default async function Suburbs() {
    return (
        <div>
            <h1>Which state are you looking to find more about?</h1>
            <div className="flex flex-wrap flex-auto m-4">
                <ul className={styles.links}>
                    <li>
                        <Link href="/ACT">ACT</Link>
                    </li>
                    <li>
                        <Link href="/NSW">NSW</Link>
                    </li>
                    <li>
                        <Link href="/NT">NT</Link>
                    </li>
                    <li>
                        <Link href="/QLD">QLD</Link>
                    </li>
                </ul>
                <ul className={styles.links}>
                    <li>
                        <Link href="/SA">SA</Link>
                    </li>
                    <li>
                        <Link href="/TAS">TAS</Link>
                    </li>
                    <li>
                        <Link href="/VIC">VIC</Link>
                    </li>
                    <li>
                        <Link href="/WA">WA</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
