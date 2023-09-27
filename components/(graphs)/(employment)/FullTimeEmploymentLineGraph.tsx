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

interface EmploymentDataItem {
    employment_data: any;
}

export default function FullTimeEmploymentLineGraph(props: FullTimeEmploymentProps) {
    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);
    const [incomeData, setIncomeData] = useState<IncomeDataItem[]>([]);
    const [employmentData, setEmploymentData] = useState<EmploymentDataItem[]>([]);
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

    // * Function that fetches data for a specific year
    async function fetchEmploymentDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
        try {
            const { suburbName, stateName } = deconstructSuburb(selectedSuburb);
            console.log(`suburbName: ${suburbName}`);
            const { data, error } = await supabase.from(tableName).select("*").eq("suburb_name", suburbName).eq("state_name", stateName);

            if (error) {
                console.error("Error fetching data:", error);
                return null;
            }

            return { year, data };
        } catch (error) {
            console.error("Data fetch unsuccessful", error);
            return null;
        }
    }

    useEffect(() => {
        async function fetchData() {
            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchEmploymentDataByYear(year, `data_${year}`, props.selectedSuburb));

            const newSuburbFullTime = [...suburbFullTime];
            const newStateFullTime = [...stateFullTime];
            const newAustraliaFullTime = [...australiaFullTime];

            //  Wait for datat to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;

                // Process and update state based on year and data
                // (Similar to what you were doing in your fetchEmploymentDataA function)
                console.log(`result: ${JSON.stringify(result, null, 2)}`);
                console.log(`data: ${data}`);

                // * 2001
                if (year == "2001") {
                    const percentageSuburbFullTime =
                        data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of suburb"];

                    if (percentageSuburbFullTime) {
                        newSuburbFullTime[0] = percentageSuburbFullTime;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (!percentageSuburbFullTime) {
                        // ! If data is not available, remove element from array so line graph does not display it
                        newSuburbFullTime[0] = 0;
                    }
                }
                // * 2006
                else if (year == "2006") {
                    const percentageSuburbFullTime =
                        data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of suburb"];

                    if (percentageSuburbFullTime) {
                        newSuburbFullTime[1] = percentageSuburbFullTime;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (!percentageSuburbFullTime) {
                        // ! If data is not available, remove element from array so line graph does not display it
                        newSuburbFullTime[1] = 0;
                    }
                }

                // * 2011
                else if (year == "2011") {
                    const percentageSuburbFullTime =
                        data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                            "Worked full-time"
                        ]["% of suburb"];

                    if (percentageSuburbFullTime) {
                        newSuburbFullTime[2] = percentageSuburbFullTime;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (!percentageSuburbFullTime) {
                        // ! If data is not available, remove element from array so line graph does not display it
                        newSuburbFullTime[2] = 0;
                    }
                }

                // * 2016
                else if (year == "2016") {
                    try {
                        const percentageSuburbFullTime =
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked full-time"
                            ]["% of suburb"];
                        if (percentageSuburbFullTime) {
                            newSuburbFullTime[3] = percentageSuburbFullTime;
                            setSuburbFullTime(newSuburbFullTime);
                        }
                    } catch (error) {
                        console.error("Error: data does not exist", error);
                        // ! If data is not available, remove element from array so line graph does not display it
                        newSuburbFullTime[3] = 0;
                    }
                }

                // * 2021
                else if (year == "2021") {
                    const percentageSuburbFullTime = data[0]["employment_data"]["Employment status"]["Worked full-time"]["% of suburb"];

                    if (percentageSuburbFullTime) {
                        newSuburbFullTime[4] = percentageSuburbFullTime;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (!percentageSuburbFullTime) {
                        // ! If data is not available, remove element from array so line graph does not display it
                        newSuburbFullTime[4] = 0;
                    }
                }
            });
        }

        if (props.selectedSuburb) {
            fetchData();
        }
    }, [props.selectedSuburb]);

    console.log(`suburbFullTime: ${suburbFullTime}`);

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
                            yAxis={[
                                {
                                    min: 30,
                                    max: 80,
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
