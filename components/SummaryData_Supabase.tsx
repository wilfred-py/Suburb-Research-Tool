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
                            <strong>
                                {data.suburb_name}, {data.state_name}, {data.post_code}
                            </strong>
                        </h1>
                    </div>
                    <div className="flex flex-wrap place-content-evenly">
                        <div>
                            <ul className="flex flex-col mt-4">
                                <li className="">
                                    <strong>Population: </strong>
                                    {data.people}
                                </li>
                                <li className="">
                                    <strong>Male: </strong>
                                    {(parseFloat(data.male) * 100).toFixed(2)}%
                                </li>
                                <li className="">
                                    <strong>Female: </strong>
                                    {(parseFloat(data.female) * 100).toFixed(2)}%
                                </li>
                                <li className="">
                                    <strong>Median Age: </strong>
                                    {data.median_age}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className="flex flex-col mt-4">
                                <li className="">
                                    <strong>Number of Families: </strong>
                                    {data.families}
                                </li>
                                <li className="">
                                    <strong>Average number of children per family: </strong>
                                    {parseFloat(data.for_families_with_children)}
                                </li>
                                <li className="">
                                    <strong>Homes: </strong>
                                    {data.all_private_dwellings}
                                </li>
                                <li className="">
                                    <strong>Average number of people per household: </strong>
                                    {data.average_number_of_people_per_household}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className="flex flex-col mt-4">
                                <li className="">
                                    <strong>Median weekly household income: </strong>${data.median_weekly_household_income}
                                </li>
                                <li className="">
                                    <strong>Median monthly mortgage repayments: </strong>${data.median_monthly_mortgage_repayments}
                                </li>
                                <li className="">
                                    <strong>Median weekly rent: </strong>${data.median_weekly_rent_b}
                                </li>
                                <li className="">
                                    <strong>Average number of mortor vehicles per home: </strong>
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
