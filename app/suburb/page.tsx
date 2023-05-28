import Link from "next/link";

export default async function Suburbs() {
    return (
        <div>
            <h1>Which state are you looking to find more about?</h1>
            <div>
                <ul className="flex-row flex-auto justify-center">
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/suburb/ACT">ACT</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/suburb/NSW">NSW</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/suburb/NT">NT</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/suburb/QLD">QLD</Link>
                    </li>
                </ul>
                <ul className="flex-row flex-auto justify-center">
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/suburb/SA">SA</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/suburb/TAS">TAS</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/suburb/VIC">VIC</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/suburb/WA">WA</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
