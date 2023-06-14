import Link from "next/link";
import PocketBase from "pocketbase";
import { ReactNode } from "react";

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
    const { id, summary_data } = suburb || {};
    const suburbName = Object.keys(summary_data)[0]; // Get the suburb name dynamically
    const suburbDetails = summary_data[suburbName]; // Access the nested object

    return (
        <Link href={`/suburb/${id}`}>
            <div>
                <h1>{suburbName}</h1>
                {/* Render all key-value pairs dynamically */}
                {Object.entries(suburbDetails).map(([key, value]) => (
                    <p key={key}>
                        {key}: {value as ReactNode}
                    </p>
                ))}
            </div>
        </Link>
    );
}
