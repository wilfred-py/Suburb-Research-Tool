import Link from "next/link";
import PocketBase from "pocketbase";

// PocketBase
async function getSuburbs() {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const records = await pb.collection("summary_data").getFullList({
        sort: "-created",
    });
    const res = await fetch("http://127.0.0.1:8090/api/collections/summary_data/records?page=1&perPage=30", {
        cache: "no-store",
    });

    const data = await res.json();
    return data?.items as any[];
}

export default async function Suburbs() {
    const suburbs = await getSuburbs();
    return (
        <div>
            <h1>All Suburbs</h1>
            <div>
                {suburbs?.map((suburb) => {
                    return <Suburb key={suburb.id} suburb={suburb} />;
                })}
            </div>
        </div>
    );
}

function Suburb({ suburb }: any) {
    const { id, suburb_name, people, Male, Female } = suburb || {};
    return (
        <Link href={`/suburb/${id}`}>
            <div>
                <h1>{suburb_name}</h1>
                <h2>{people}</h2>
                <h2>{Male}</h2>
                <h2>{Female}</h2>
            </div>
        </Link>
    );
}

{
    /* <ul className="flex-row flex-auto justify-center">
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
</ul> */
}
