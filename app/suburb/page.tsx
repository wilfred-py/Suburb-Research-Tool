import Link from "next/link";

export default async function Suburbs() {
    return (
        <div>
            <h1>Which state are you looking to find more about?</h1>
            <div>
                <ul className="flex-row flex-auto justify-center">
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/ACT">ACT</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/NSW">NSW</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/NT">NT</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/QLD">QLD</Link>
                    </li>
                </ul>
                <ul className="flex-row flex-auto justify-center">
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/SA">SA</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/TAS">TAS</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/VIC">VIC</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href="/WA">WA</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
