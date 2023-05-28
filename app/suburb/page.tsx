import Link from "next/link";

export default async function Suburbs() {
    return (
        <div>
            <h1>Which state are you interested in finding more about?</h1>
            <div>
                <ul className="flex-row flex-auto justify-center">
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href={`./state/$state_name`}>ACT</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href={`./state/$state_name`}>NSW</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href={`./state/$state_name`}>NT</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href={`./state/$state_name`}>QLD</Link>
                    </li>
                </ul>
                <ul className="flex-row flex-auto justify-center">
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href={`./state/$state_name`}>SA</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href={`./state/$state_name`}>TAS</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href={`./state/$state_name`}>VIC</Link>
                    </li>
                    <li className="w-40 border border-black border-solid m-10 hover:bg-hoverYellow text-center">
                        <Link href={`./state/$state_name`}>WA</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
