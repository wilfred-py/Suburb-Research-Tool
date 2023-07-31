"use client";

import { GetSummarySuburbData } from "@/app/database.types";
import { supaClient } from "@/app/supa-client";
import { useEffect, useState } from "react";

// Get Suburb Name from URL
function getSuburbDetails() {
    const url = new URL(window.location.href);
    const pathname = url.pathname;

    // State Regex
    const stateRegex = /^(.*?)(VIC|NSW|ACT|WA|SA)/;

    // String in URL
    const stringInURL = pathname.replace("/suburb/", "");

    // ! Suburb Name
    // Create substrings based on stateRegex
    const suburbMatch = stringInURL.match(stateRegex);

    // If it exists, return first match in suburbName
    const suburbName = suburbMatch ? suburbMatch[1] : null;

    // Replace "+" and remove leading and trailing white spaces
    const formattedSuburbName = suburbName ? suburbName.replaceAll("+", " ").trim() : null;

    // ! State Name
    const stateName = suburbMatch ? suburbMatch[2] : null;

    // ! Post Code
    const postcode = stringInURL.slice(-4);

    return {
        suburbName: formattedSuburbName,
        stateName,
        postcode,
    };
}

export default function GetSummaryData() {
    const [suburbName, setSuburbName] = useState("");
    const [summaryData, setSummaryData] = useState<GetSummarySuburbData[]>([]);

    // ! Filter through Supabase using suburbName, stateName, and postcode
    useEffect(() => {
        const { suburbName, stateName, postcode } = getSuburbDetails();
        const suburbNameQuery = String(suburbName);
        const stateNameQuery = stateName;
        console.log(`search query: ${suburbNameQuery}`);
        setSuburbName(suburbNameQuery);

        supaClient
            .rpc("get_first_10_rows")
            .eq("suburb_name", suburbNameQuery)
            .eq("state_name", stateNameQuery)
            .eq("post_code", postcode)
            .then(({ data }) => {
                setSummaryData(data as GetSummarySuburbData[]);
            });
    }, [suburbName]);

    return (
        <>
            {summaryData?.map((data) => (
                <div className="ml-2 mt-10">
                    <div className="">
                        <h1>
                            Snapshot of{" "}
                            <span className="font-medium">
                                {data.suburb_name}, {data.state_name}, {data.post_code}
                            </span>
                        </h1>
                    </div>
                    <div className="flex flex-wrap place-content-evenly">
                        <div>
                            <ul className="flex flex-col mt-4 border-opacity-0 rounded-md hover:bg-hoverBlue p-4">
                                <li className="text-xl font-bold">People</li>
                                <li>
                                    <span className="font-medium">Population: </span>
                                    {data.people}
                                </li>
                                <li>
                                    <span className="font-medium">Male: </span>
                                    {(parseFloat(data.male) * 100).toFixed(2)}%
                                </li>
                                <li>
                                    <span className="font-medium">Female: </span>
                                    {(parseFloat(data.female) * 100).toFixed(2)}%
                                </li>
                                <li>
                                    <span className="font-medium">Median Age: </span>
                                    {data.median_age}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className="flex flex-col mt-4 border-opacity-0 rounded-md hover:bg-hoverBlue p-4">
                                <li className="text-xl font-bold">Families</li>
                                <li>
                                    <span className="font-medium">Number of Families: </span>
                                    {data.families}
                                </li>
                                <li>
                                    <span className="font-medium">Average number of children per family: </span>
                                    {parseFloat(data.for_families_with_children)}
                                </li>
                                <li>
                                    <span className="font-medium">Homes: </span>
                                    {data.all_private_dwellings}
                                </li>
                                <li>
                                    <span className="font-medium">Average number of people per household: </span>
                                    {data.average_number_of_people_per_household}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className="flex flex-col mt-4 border-opacity-0 rounded-md hover:bg-hoverBlue p-4">
                                <li className="text-xl font-bold">Homes</li>
                                <li>
                                    <span className="font-medium">Median weekly household income: </span>$
                                    {data.median_weekly_household_income}
                                </li>
                                <li>
                                    <span className="font-medium">Median monthly mortgage repayments: </span>$
                                    {data.median_monthly_mortgage_repayments}
                                </li>
                                <li>
                                    <span className="font-medium">Median weekly rent: </span>${data.median_weekly_rent_b}
                                </li>
                                <li>
                                    <span className="font-medium">Average number of mortor vehicles per home: </span>
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
