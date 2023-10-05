"use client";

import { GetSummarySuburbData } from "@/app/database.types";
import { supaClient } from "@/app/supa-client";
import { useEffect, useState } from "react";

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

    return (
        <>
            {summaryData?.map((data) => (
                <div className="font-inter">
                    <div className="my-4">
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
                    <div className="flex flex-row flex-wrap space-x-6">
                        <div id="people" className="border border-gray-200 rounded-md shadow-lg">
                            <ul className="flex flex-col border-opacity-0 rounded-md p-4">
                                <li className="text-xl font-bold">People</li>
                                <li>
                                    <span className="font-semibold">Population: </span>
                                    {data.people}
                                </li>
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
                        <div id="families" className="border border-gray-200 rounded-md">
                            <ul className="flex flex-col border-opacity-0 rounded-md p-4 shadow-lg">
                                <li className="text-xl font-bold">Families</li>
                                <li>
                                    <span className="font-semibold">Number of Families: </span>
                                    {data.families}
                                </li>
                                <li>
                                    <span className="font-semibold">Homes: </span>
                                    {data.all_private_dwellings}
                                </li>
                                <li>
                                    <span className="font-semibold">Average number of people per household: </span>
                                    {data.average_number_of_people_per_household}
                                </li>
                                <li>
                                    <span className="font-semibold">Average number of children per family: </span>
                                    {parseFloat(data.for_families_with_children)}
                                </li>
                            </ul>
                        </div>
                        <div id="homes" className="border border-gray-200 rounded-md">
                            <ul className="flex flex-col border-opacity-0 rounded-md p-4 shadow-lg">
                                <li className="text-xl font-bold">Homes</li>
                                <li>
                                    <span className="font-semibold">Median weekly household income: </span>$
                                    {data.median_weekly_household_income}
                                </li>
                                <li>
                                    <span className="font-semibold">Median monthly mortgage repayments: </span>$
                                    {data.median_monthly_mortgage_repayments}
                                </li>
                                <li>
                                    <span className="font-semibold">Median weekly rent: </span>${data.median_weekly_rent_b}
                                </li>
                                <li>
                                    <span className="font-semibold">Average number of mortor vehicles per home: </span>
                                    {data.average_number_of_motor_vehicles_per_dwelling}
                                </li>
                            </ul>
                        </div>
                        <div id="owners-and-renters" className="border border-gray-200 rounded-md">
                            <ul className="flex flex-col border-opacity-0 rounded-md p-4 shadow-lg">
                                <li className="text-xl font-bold">Owners and Renters</li>
                                <li>
                                    <span className="font-semibold">Median weekly household income: </span>$
                                    {data.median_weekly_household_income}
                                </li>
                                <li>
                                    <span className="font-semibold">Median monthly mortgage repayments: </span>$
                                    {data.median_monthly_mortgage_repayments}
                                </li>
                                <li>
                                    <span className="font-semibold">Median weekly rent: </span>${data.median_weekly_rent_b}
                                </li>
                                <li>
                                    <span className="font-semibold">Average number of mortor vehicles per home: </span>
                                    {data.average_number_of_motor_vehicles_per_dwelling}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
