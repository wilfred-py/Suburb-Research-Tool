"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import EmploymentGraph from "./(graphs)/EmploymentGraph";

interface IncomeDataItem {
    income_data: any;
}

interface IncomeProps {
    selectedSuburb: string | null;
}

export default function Income(props: IncomeProps) {
    const [incomeData, setIncomeData] = useState<IncomeDataItem[]>([]); // Initialize state with an empty array
    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);
    const supabase = createClientComponentClient();

    console.log(`selectedSuburb: ${props.selectedSuburb}`);

    function deconstructSuburb(selectedSuburb: string | null) {
        // State Regex
        const stateRegex = /^(.*?),\s*(VIC|NSW|ACT|WA|SA|TAS|NT)/;

        // ! Suburb Name
        // Create substrings based on stateRegex
        const suburbMatch = selectedSuburb?.match(stateRegex);

        // If it exists, return first match in suburbName
        const suburbName = suburbMatch ? suburbMatch[1] : null;

        // ! State Name
        const stateName = suburbMatch ? suburbMatch[2] : null;

        // ! Post Code
        const postcode = selectedSuburb?.slice(-4);

        console.log(`suburbName: ${suburbName}`);

        setDeconstructedSuburb(suburbName);
        setDeconstructedState(stateName);

        return {
            suburbName,
            stateName,
            postcode,
        };
    }

    useEffect(() => {
        async function fetchIncomeData(selectedSuburb: string | null) {
            try {
                const { suburbName, stateName } = deconstructSuburb(selectedSuburb);

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

        fetchIncomeData(props.selectedSuburb);
    }, [props.selectedSuburb]);

    console.log(`suburbName: ${deconstructedSuburb} \n stateName: ${deconstructedState}`);

    return (
        <div>
            <div className="border-2 border-black">
                <div className="my-4">
                    <span>Demographics of </span>
                    <span className="font-semibold">{props.selectedSuburb}</span>
                </div>
                <div>
                    {incomeData ? (
                        <div>
                            {incomeData[0]?.income_data && (
                                <div>
                                    <p>
                                        Participation in the labour force:{" "}
                                        {incomeData[0].income_data["Participation in the labour force"]["In the labour force"]["suburb"]}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className="max-w-2xl h-3/6 border-2 border-orange-400">
                    <EmploymentGraph selectedSuburb={props.selectedSuburb} />
                </div>
            </div>
        </div>
    );
}
