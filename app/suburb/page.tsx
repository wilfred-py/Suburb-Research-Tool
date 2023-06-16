import Link from "next/link";
import PocketBase from "pocketbase";
import { ReactNode } from "react";

// PocketBase
async function getSuburbs() {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const result = await pb.collection("summary_data").getFullList({
        sort: "-created",
    });
    const res = await fetch("http://127.0.0.1:8090/api/collections/summary_data/records?page=1&perPage=30", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch suburb data");
    }

    // Convert result into JSON
    const data = await res.json();

    // Return items as an array
    return data?.items as any[];
}

export default async function Suburbs() {
    try {
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
    } catch (error) {
        console.error("Failed to fetch suburbs:", error);
        return <div>Error fetching suburbs</div>;
    }
}

function Suburb({ suburb }: any) {
    const { id, suburb_name, summary_data, created } = suburb || {};

    return (
        <Link href={`/suburb/${id}`}>
            <div>
                <h1>{suburb_name}</h1>
                {/* <h1>{suburbName}</h1>
                {Object.entries(suburbDetails).map(([key, value]) => (
                    <p key={key}>
                        {key}: {value as ReactNode}
                    </p>
                ))} */}
            </div>
        </Link>
    );
}
