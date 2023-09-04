"use client";

import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface IncomeDataItem {
    income_data: any;
}

interface IncomeProps {
    selectedSuburb: string | null;
}

export default function Income(props: IncomeProps) {
    const [incomeData, setIncomeData] = useState<IncomeDataItem[]>([]); // Initialize state with an empty array
    const [suburbName, setSuburbName] = useState<string | null>(null);
    const [stateName, setStateName] = useState<string | null>(null);
    const supabase = createClientComponentClient();

    console.log(`selectedSuburb: ${props.selectedSuburb}`);

    function deconstructSuburb(suburb: string | null) {
        // State Regex
        const stateRegex = /^(.*?),\s*(VIC|NSW|ACT|WA|SA|TAS|NT)/;

        // ! Suburb Name
        // Create substrings based on stateRegex
        const suburbMatch = suburb?.match(stateRegex);

        // If it exists, return first match in suburbName
        const suburbName = suburbMatch ? suburbMatch[1] : null;

        // ! State Name
        const stateName = suburbMatch ? suburbMatch[2] : null;

        // ! Post Code
        const postcode = suburb?.slice(-4);

        setSuburbName(suburbName);
        setStateName(stateName);

        return {
            suburbName,
            stateName,
            postcode,
        };
    }

    useEffect(() => {
        async function fetchIncomeData(selectedSuburb: string | null) {
            try {
                // * Filter through income_and_work table on Supabase using suburb_name & state_name
                const { data, error } = await supabase
                    .from("income_and_work")
                    .select("*")
                    .eq("suburb_name", suburbName)
                    .eq("state_name", stateName);

                console.log(data);
                console.log(error);
                setIncomeData(data || []);

                if (error) {
                    console.error("Error fetching data:", error);
                } else {
                    const formattedData = data?.map((item: IncomeDataItem) => {
                        const incomeData = item?.income_data;
                        const formattedIncomeData: any = {};

                        // Key examples:
                        // 1. "Employment status"
                        // 2. "Employment, hours worked"
                        // 3. "Median weekly incomes (a)"
                        for (const key in incomeData) {
                            if (incomeData?.hasOwnProperty(key)) {
                                const innerData = incomeData[key];
                                // innerData example:
                                // {
                                //     "Unemployed": {
                                //       "NSW": "2,136,610",
                                //       "Australia": "7,095,103",
                                //       "% of state": "55.2",
                                //       "Abbotsbury": "1,110",
                                //       "% of suburb": "53.0",
                                //       "% of country": "55.9"
                                //     },
                                //     "Worked full-time": {
                                //       "NSW": "2,136,610",
                                //       "Australia": "7,095,103",
                                //       "% of state": "55.2",
                                //       "Abbotsbury": "1,110",
                                //       "% of suburb": "53.0",
                                //       "% of country": "55.9"
                                //     },
                                //     "Worked part-time": {
                                //       "NSW": "2,136,610",
                                //       "Australia": "7,095,103",
                                //       "% of state": "55.2",
                                //       "Abbotsbury": "1,110",
                                //       "% of suburb": "53.0",
                                //       "% of country": "55.9"
                                //     },
                                //     "Away from work (a)": {
                                //       "NSW": "2,136,610",
                                //       "Australia": "7,095,103",
                                //       "% of state": "55.2",
                                //       "Abbotsbury": "1,110",
                                //       "% of suburb": "53.0",
                                //       "% of country": "55.9"
                                //     }
                                //   }

                                const formattedInnerData: any = {};
                                for (const innerKey in innerData) {
                                    if (innerData?.hasOwnProperty(innerKey)) {
                                        formattedInnerData[innerKey] = innerData[innerKey];
                                        // formattedInnerData example
                                        // {
                                        //   "NSW": "2,136,610",
                                        //   "Australia": "7,095,103",
                                        //   "% of state": "55.2",
                                        //   "Abbotsbury": "1,110",
                                        //   "% of suburb": "53.0",
                                        //   "% of country": "55.9"
                                        // }
                                    }
                                }
                                formattedIncomeData[key] = formattedInnerData;
                            }
                        }
                        return {
                            incomeData: formattedIncomeData,
                        };
                    });
                }
            } catch (error) {
                console.error("Data fetch unsuccessful", error);
            }
        }
        deconstructSuburb(props.selectedSuburb);
        fetchIncomeData(props.selectedSuburb);
    }, [props.selectedSuburb]);

    console.log(stateName);

    return (
        <div>
            <div className="max-w-full min-h-screen bg-Shakespeare">
                <div>
                    {incomeData ? (
                        <div>
                            {incomeData[0]?.income_data && (
                                <div>
                                    <h2>Income Data for {suburbName}</h2>
                                    <p>
                                        Unemployment (% of australia):{" "}
                                        {incomeData[0].income_data["Employment status"]["Worked full-time"]["Australia"]}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
