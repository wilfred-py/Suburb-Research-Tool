"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";

export default function upload() {
    const router = useRouter();
    const upload = async () => {
        const pb = new PocketBase("http://127.0.0.1:8090");

        const data = {
            summary_data: {
                Abbotsford: {
                    People: "9,088",
                    Male: "51.0%",
                    Female: "49.0%",
                    "Median age": "33",
                    Families: "2,127",
                    "Average number of children per family": "null",
                    "for families with children": "1.5",
                    "for all households (a)": "0.2",
                    "All private dwellings": "5,673",
                    "Average number of people per household": "1.9",
                    "Median weekly household income": "$2,197",
                    "Median monthly mortgage repayments": "$2,167",
                    "Median weekly rent (b)": "$425",
                    "Average number of motor vehicles per dwelling": "1.1",
                },
            },
        };

        const record = await pb.collection("test2").create(data);

        router.refresh();
    };
    return (
        <div>
            <button onClick={upload} type="submit">
                Upload Data
            </button>
        </div>
    );
}
