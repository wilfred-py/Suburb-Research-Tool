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

                console.log(suburbNameQuery);
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

    console.log(summaryData);

    return (
        <>
            {summaryData
                ?.filter((data) => data.suburb_name == suburbName)
                .map((data) => (
                    <div className="font-inter">
                        <div className="w-7/12 my-4">
                            {String(data.post_code).startsWith("8") ? (
                                <span>
                                    Snapshot of{" "}
                                    <span>
                                        {data.suburb_name}, {data.state_name}, 0{data.post_code}
                                    </span>
                                </span>
                            ) : (
                                <span>
                                    Snapshot of{" "}
                                    <span className="font-semibold">
                                        {data.suburb_name}, {data.state_name}, {data.post_code}
                                    </span>
                                </span>
                            )}
                        </div>

                        <div className="flex flex-row ">
                            <div className="w-7/12 flex flex-col">
                                <div className="border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                                    <div className="w-">
                                        <Map selectedSuburb={props.selectedSuburb} />
                                    </div>
                                    <Population selectedSuburb={props.selectedSuburb} />

                                    <ul className="flex flex-col border-opacity-0 rounded-md p-4">
                                        <li className="text-xl font-bold">People</li>
                                        <li>
                                            <span className="font-semibold">Median Age: </span>
                                            {data.median_age}
                                        </li>
                                        <li>
                                            <span className="font-semibold">Male: </span>
                                            <span>{(parseFloat(data.male) * 100).toFixed(2)}</span>
                                            <span className="ml-[2px]">%</span>
                                        </li>
                                        <li>
                                            <span className="font-semibold">Female: </span>
                                            <span>{(parseFloat(data.female) * 100).toFixed(2)}</span>
                                            <span className="ml-[2px]">%</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="w-5/12 flex flex-col">
                                <div>
                                    <FullTimeEmploymentLineGraph selectedSuburb={props.selectedSuburb} />
                                </div>
                                <div>
                                    <AncestryChart selectedSuburb={props.selectedSuburb} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
}
