"use client";

import { GetSummarySuburbData } from "@/app/database.types";
import { supaClient } from "@/app/supa-client";
import { useEffect, useState } from "react";
import Population from "./(graphs)/{population}/Population";
import Map from "./Map";
import AncestryChart from "./(graphs)/(ancestry)/AncestryRadar";
import FullTimeEmploymentLineGraph from "./(graphs)/(employment)/FullTimeEmploymentLineGraph";

interface SummaryDataProps {
    selectedSuburb: string | null;
}

function deconstructSuburb(suburb: string | null) {
    // State Regex
    const stateRegex = /^(.*?),\s*(VIC|NSW|ACT|WA|SA|TAS|NT|QLD|Other Territories)/;

    // ! Suburb Name
    // Create substrings based on stateRegex
    const suburbMatch = suburb?.match(stateRegex);

    // If it exists, return first match in suburbName
    const suburbName = suburbMatch ? suburbMatch[1] : null;

    // ! State Name
    const stateName = suburbMatch ? suburbMatch[2] : null;

    // ! Post Code
    const postcode = suburb?.slice(-4);

    return {
        suburbName,
        stateName,
        postcode,
    };
}

export default function SummaryData(props: SummaryDataProps) {
    const [suburbName, setSuburbName] = useState<String | null>("");
    const [summaryData, setSummaryData] = useState<GetSummarySuburbData[]>([]);

    // * Filter through Supabase using suburbName, stateName, and postcode
    useEffect(() => {
        async function fetchSuburbData() {
            try {
                const { suburbName, stateName, postcode } = deconstructSuburb(props.selectedSuburb);

                const suburbNameQuery = String(suburbName);
                const stateNameQuery = stateName;

                // console.log(suburbNameQuery);
                setSuburbName(suburbNameQuery);

                if (suburbName) {
                    supaClient
                        .rpc("get_first_10_rows")
                        .like("suburb_name", `%${suburbNameQuery}%`)
                        .eq("state_name", stateNameQuery)
                        .eq("post_code", postcode)
                        .then(({ data }) => {
                            setSummaryData(data as GetSummarySuburbData[]);
                        });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchSuburbData();
    }, [props.selectedSuburb]);

    // console.log(summaryData);

    return (
        <>
            {summaryData
                ?.filter((data) => data.suburb_name == suburbName)
                .map((data) => (
                    <div className="w-full">
                        <div className="flex flex-row space-x-2">
                            <div className="w-6/12 flex flex-col">
                                <div className="w-full h-3/6 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                                    <Map selectedSuburb={props.selectedSuburb} />
                                </div>

                                <div className="w-full h-3/6 mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                                    <Population selectedSuburb={props.selectedSuburb} />
                                </div>
                            </div>

                            <div className="w-6/12 flex flex-col">
                                <div className="w-full h-3/6 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                                    <FullTimeEmploymentLineGraph selectedSuburb={props.selectedSuburb} />
                                </div>

                                <div className="w-full h-3/6 mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                                    <AncestryChart selectedSuburb={props.selectedSuburb} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
}
