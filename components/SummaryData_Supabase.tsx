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
