"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface FullTimeEmploymentProps {
    selectedSuburb: string | null;
}

interface IncomeDataItem {
    income_data: any;
}

export default function FullTimeEmploymentLineGraph(props: FullTimeEmploymentProps) {
    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);
    const [incomeData, setIncomeData] = useState<IncomeDataItem[]>([]);
    const [suburbFullTime, setSuburbFullTime] = useState<number[]>([55, 55, 55, 55, 55]);
    const [stateFullTime, setStateFullTime] = useState<number[]>([55, 55, 55, 55, 55]);
    const [australiaFullTime, setAustraliaFullTime] = useState<number[]>([55, 55, 55, 55, 55]);

    const supabase = createClientComponentClient();

    // const suburbFullTime = [51.1, 53.1, 52.5, 53.5, 53.2];
    // const stateFullTime = [54.2, 54.9, 53.2, 57.2, 57.1];
    // const australiaFullTime = [55.1, 55.3, 54.9, 57.2, 56.8];

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

                        // Loop through keys in income_data
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

                                // Loop through keys in innerData
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

                                // Assign the formattedInnerData to corresponding key in formattedFullTImeData
                                formattedIncomeData[key] = formattedInnerData;
                            }
                        }

                        // Return an object containing the formatted data

                        console.log(incomeData);
                        setIncomeData(incomeData);

                        // Read FT employment % of suburb from incomeData and set to state
                        const suburbFullTime = [
                            55.0,
                            55.0,
                            55.0,
                            55.0,
                            parseFloat(incomeData["Employment status"]["Worked full-time"]["% of suburb"]),
                        ];
                        setSuburbFullTime(suburbFullTime);

                        // Read FT employment % of suburb from incomeData and set to state
                        const stateFullTime = [
                            55.0,
                            55.0,
                            55.0,
                            55.0,
                            parseFloat(incomeData["Employment status"]["Worked full-time"]["% of state"]),
                        ];
                        setStateFullTime(stateFullTime);

                        // Read FT employment % of suburb from incomeData and set to state
                        const australiaFullTime = [
                            55.0,
                            55.0,
                            55.0,
                            55.0,
                            parseFloat(incomeData["Employment status"]["Worked full-time"]["% of Australia"]),
                        ];
                        setAustraliaFullTime(australiaFullTime);

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
    console.log(suburbFullTime);
    console.log(stateFullTime);
    console.log(australiaFullTime);
    return (
        <div>
            <div className="flex flex-col justify-center">
                <h1 className="mt-4 text-lg text-center font-bold">Full-time employment</h1>
                <div className="mx-auto -mt-10">
                    {incomeData ? (
                        <LineChart
                            xAxis={[
                                {
                                    data: ["2001", "2006", "2011", "2016", "2021"],
                                },
                            ]}
                            series={[
                                {
                                    id: "suburb",
                                    label: "Suburb",
                                    data: suburbFullTime,
                                    showMark: false,
                                    curve: "natural",
                                },
                                {
                                    id: "state",
                                    label: "State",
                                    data: stateFullTime,
                                    showMark: false,
                                    curve: "natural",
                                },
                                {
                                    id: "australia",
                                    label: "Australia",
                                    data: australiaFullTime,
                                    showMark: false,
                                    curve: "natural",
                                },
                            ]}
                            sx={{
                                "--ChartsLegend-itemWidth": "70px",
                                "--ChartsLegend-itemMarkSize": "10px",
                                "--ChartsLegend-labelSpacing": "5px",
                                "--ChartsLegend-rootSpacing": "20px",
                            }}
                            legend={{
                                direction: "row",
                                position: {
                                    vertical: "top",
                                    horizontal: "middle",
                                },
                            }}
                            width={550}
                            height={400}
                            margin={{ left: 70 }}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
