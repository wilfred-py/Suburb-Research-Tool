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

// Record[0][suburb_name]
// {
//     "collectionId": "lpn7gchnuw11ylw",
//     "collectionName": "summary_data",
//     "created": "2023-06-14 13:20:34.873Z",
//     "id": "5j1i07egtzv06ki",
//     "suburb_name": "Zillmere",
//     "summary_data": {
//         "All private dwellings": "4,334",
//         "Average number of children per family": "null",
//         "Average number of motor vehicles per dwelling": "1.5",
//         "Average number of people per household": "2.3",
//         "Families": "2,390",
//         "Female": "51.0%",
//         "Male": "49.0%",
//         "Median age": "34",
//         "Median monthly mortgage repayments": "$1,677",
//         "Median weekly household income": "$1,426",
//         "Median weekly rent (b)": "$350",
//         "People": "9,323",
//         "for all households (a)": "0.6",
//         "for families with children": "1.7"
//     },
//     "updated": "2023-06-14 13:20:34.873Z",
//     "expand": {}
// }
