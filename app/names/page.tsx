"use client";

import PocketBase from "pocketbase";
import { useState, useEffect } from "react";

async function getNames() {
    const pb = new PocketBase("http://127.0.0.1:8090");

    const res = await pb.collection("summary_data").getFullList({
        sort: "-created",
    });

    return res as any[];
    // return res?.[1]["suburb_name"] as any[]; // returns Zetland
    // return res?.[2]["suburb_name"] as any[]; // returns Yuendumu - Anmatjere
    // return res?.[3]["suburb_name"] as any[]; // returns Youngtown - Relbia
}

export default function Names() {
    const [names, setNames] = useState("");

    useEffect(() => {
        async function fetchNames() {
            try {
                const names = await getNames();
                console.log(names);
                names.map((suburb_name) => {
                    return <div>{suburb_name}</div>;
                });
            } catch (error) {
                console.error("Unsuccessful datah fetch", error);
            }
        }
        fetchNames();
    }, []);

    return (
        <div>
            <h1>Suburbs: {names}</h1>
        </div>
    );
}
