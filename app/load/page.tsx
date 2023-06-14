"use client";

import React from "react";
import PocketBase from "pocketbase";
import summary_data from "../../data/summary_data.json";

// interface SuburbData {
//     suburb_name: string;
//     summary_data: {
//         People: string;
//         Male: string;
//         Female: string;
//         "Median age": string;
//         Families: string;
//         "Average number of children per family": string;
//         "for families with children": string;
//         "for all households (a)": string;
//         "All private dwellings": string;
//         "Average number of people per household": string;
//         "Median weekly household income": string;
//         "Median monthly mortgage repayments": string;
//         "Median weekly rent (b)": string;
//         "Average number of motor vehicles per dwelling": string;
//     };
// }

interface SuburbData {
    suburb_name: string;
    summary_data: { [key: string]: string };
}

async function uploadData() {
    const pb = new PocketBase("http://127.0.0.1:8090");

    const suburbData: SuburbData[] = Object.entries(summary_data).map(([suburbName, summaryData]) => ({
        suburb_name: suburbName,
        summary_data: summaryData,
    }));

    for (const data of suburbData) {
        const record = await pb.collection("summary_data").create(data);
    }
}

export default function Load() {
    const handleUpload = async () => {
        try {
            await uploadData();
            console.log("Data loaded successfully.");
            // Redirect or perform any other action after successful data upload
        } catch (error) {
            console.error("Error loading data:", error);
            // Handle error state or display an error message
        }
    };

    return (
        <div>
            <button onClick={handleUpload} type="submit">
                Upload Data
            </button>
        </div>
    );
}
