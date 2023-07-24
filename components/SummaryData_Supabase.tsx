"use client";

import { GetSummarySuburbData } from "@/app/database.types";
import { supaClient } from "@/app/supa-client";
import { useEffect, useState } from "react";

// Get Suburb Name from URL
function getSuburbNameFromURL() {
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const stringInURL = pathname.replace("/suburb/", "");
    const suburbInURL = stringInURL.replace(/&/g, " ");
    return suburbInURL;
}

export default function GetSummaryData() {
    const [suburbName, setSuburbName] = useState("");
    const [summaryData, setSummaryData] = useState<GetSummarySuburbData[]>([]);

    useEffect(() => {
        const searchQuery = String(getSuburbNameFromURL());
        console.log(searchQuery);
        setSuburbName(searchQuery);

        supaClient
            .rpc("get_first_10_rows")
            .eq("suburb_name", searchQuery)
            .then(({ data }) => {
                setSummaryData(data as GetSummarySuburbData[]);
            });
    }, [suburbName]);

    return (
        <>
            {summaryData?.map((data) => (
                <div>
                    <ul className="flex flex-row mt-10">
                        <li className="mx-4">{data.suburb_name}</li>
                        <li className="mx-4">{data.state_name}</li>
                        <li className="mx-4">{data.post_code}</li>
                        <li className="mx-4">
                            <span>Median Age: </span>
                            {data.median_age}
                        </li>
                    </ul>
                </div>
            ))}
        </>
    );
}
