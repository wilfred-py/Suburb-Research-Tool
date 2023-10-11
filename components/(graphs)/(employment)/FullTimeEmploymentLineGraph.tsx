"use client";

import * as React from "react";
import { useEffect, useState } from "react";
// import { LineChart } from "@mui/x-charts/LineChart";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, CartesianAxis } from "recharts";

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
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);
    const [incomeData, setIncomeData] = useState<IncomeDataItem[]>([]);
    const [employmentData, setEmploymentData] = useState<EmploymentDataItem[]>([]);

    const [suburbFullTime, setSuburbFullTime] = useState<(number | null)[]>([null, null, null, null, null]);
    const [stateFullTime, setStateFullTime] = useState<(number | null)[]>([null, null, null, null, null]);
    const [australiaFullTime, setAustraliaFullTime] = useState<(number | null)[]>([59.8, 60.7, 59.7, 57.7, 55.9]);

    // States to manage instances where data does not exist
    const [insufficientSuburbData, setInsufficientSuburbData] = useState(false);
    const [insufficientStateData, setInsufficientStateData] = useState(false);
    const [insufficientAustraliaData, setInsufficientAustraliaData] = useState(false);

    const supabase = createClientComponentClient();

    function deconstructSuburb(selectedSuburb: string | null) {
        // State Regex
        const stateRegex = /^(.*?),\s*(VIC|NSW|ACT|WA|SA|TAS|NT|QLD|Other Territories)/;

        // ! Suburb Name
        // Create substrings based on stateRegex
        const suburbMatch = selectedSuburb?.match(stateRegex);

        // If it exists, return first match in suburbName
        const suburbName = suburbMatch ? suburbMatch[1] : null;

        // ! State Name
        const stateName = suburbMatch ? suburbMatch[2] : null;

        // ! Post Code
        const postcode = selectedSuburb?.slice(-4);

        // console.log(`suburbName: ${suburbName}`);
        // console.log(`stateName: ${stateName}`);

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
            setSelectedSuburb(suburbName);
            setSelectedState(stateName);

            const { data, error } = await supabase
                .from(tableName)
                .select("*")
                .like("suburb_name", `%${suburbName}%`)
                .eq("state_name", stateName);

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

    // * Function that checks if there is insufficient data in suburb to populate on line graphs
    async function checkIfInsufficientData(arr: (number | null)[]) {
        let numberCount = 0;
        let nullCount = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === null) {
                nullCount++;
            } else if (typeof arr[i] === "number") {
                numberCount++;
            }
        }

        // If only one year of data available or no data available at all
        if ((numberCount === 1 && nullCount === 4) || nullCount === 5) {
            console.log("insufficient data");
            setInsufficientSuburbData(true);
        }

        // console.log(`fullTime nullCount: ${nullCount} \n fullTime numberCount: ${numberCount}`);

        return (numberCount === 1 && nullCount === 4) || nullCount === 5;
    }

    useEffect(() => {
        async function fetchData() {
            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchEmploymentDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbFullTime = [...suburbFullTime];
            const newStateFullTime = [...stateFullTime];
            const newAustraliaFullTime = [...australiaFullTime];

            //  Wait for data to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;

                // Process and update state based on year and data
                // (Similar to what you were doing in your fetchEmploymentDataA function)
                // console.log(`result: ${JSON.stringify(result, null, 2)}`);
                // console.log(`data: ${data}`);

                try {
                    // Clear suburbFullTime from previous search
                    setSuburbFullTime([null, null, null, null, null]);
                    setStateFullTime([null, null, null, null, null]);

                    // * 2001
                    if (year == "2001") {
                        const percentageSuburbFullTime =
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of suburb"];

                        const percentageStateFullTime =
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of state"];

                        // Set suburbFullTime if it exists
                        if (percentageSuburbFullTime) {
                            newSuburbFullTime[0] = percentageSuburbFullTime;
                            setSuburbFullTime(newSuburbFullTime);
                        } else if (!percentageSuburbFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbFullTime[0] = null;
                            setSuburbFullTime(newSuburbFullTime);
                        }

                        // Set stateFullTime if it exists
                        if (percentageStateFullTime) {
                            newStateFullTime[0] = percentageStateFullTime;
                            setStateFullTime(newStateFullTime);
                        } else if (!percentageStateFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateFullTime[0] = null;
                            setStateFullTime(newStateFullTime);
                        }
                    }
                    // * 2006
                    else if (year == "2006") {
                        const percentageSuburbFullTime =
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of suburb"];
                        const percentageStateFullTime =
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of state"];

                        // Set suburbFullTime if it exists
                        if (percentageSuburbFullTime) {
                            newSuburbFullTime[1] = percentageSuburbFullTime;
                            setSuburbFullTime(newSuburbFullTime);
                        } else if (!percentageSuburbFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbFullTime[1] = null;
                            setSuburbFullTime(newSuburbFullTime);
                        }

                        // Set stateFullTime if it exists
                        if (percentageStateFullTime) {
                            newStateFullTime[1] = percentageStateFullTime;
                            setStateFullTime(newStateFullTime);
                        } else if (!percentageStateFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateFullTime[1] = null;
                            setStateFullTime(newStateFullTime);
                        }
                    }

                    // * 2011
                    else if (year == "2011") {
                        const percentageSuburbFullTime =
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked full-time"
                            ]["% of suburb"];
                        const percentageStateFullTime =
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked full-time"
                            ]["% of state"];

                        // Set suburbFullTime if it exists
                        if (percentageSuburbFullTime) {
                            newSuburbFullTime[2] = percentageSuburbFullTime;
                            setSuburbFullTime(newSuburbFullTime);
                        } else if (!percentageSuburbFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbFullTime[2] = null;
                            setSuburbFullTime(newSuburbFullTime);
                        }

                        // Set stateFullTime if it exists
                        if (percentageStateFullTime) {
                            newStateFullTime[2] = percentageStateFullTime;
                            setStateFullTime(newStateFullTime);
                        } else if (!percentageStateFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateFullTime[2] = null;
                            setStateFullTime(newStateFullTime);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        const percentageSuburbFullTime =
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked full-time"
                            ]["% of suburb"];
                        const percentageStateFullTime =
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked full-time"
                            ]["% of state"];

                        // Set suburbFullTime if it exists
                        if (percentageSuburbFullTime) {
                            newSuburbFullTime[3] = percentageSuburbFullTime;
                            setSuburbFullTime(newSuburbFullTime);
                        } else if (!percentageSuburbFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbFullTime[3] = null;
                            setSuburbFullTime(newSuburbFullTime);
                        }

                        // Set stateFullTime if it exists
                        if (percentageStateFullTime) {
                            newStateFullTime[3] = percentageStateFullTime;
                            setStateFullTime(newStateFullTime);
                        } else if (!percentageStateFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateFullTime[3] = null;
                            setStateFullTime(newStateFullTime);
                        }
                    }

                    // * 2021
                    else if (year == "2021") {
                        const percentageSuburbFullTime = data[0]["employment_data"]["Employment status"]["Worked full-time"]["% of suburb"];
                        const percentageStateFullTime = data[0]["employment_data"]["Employment status"]["Worked full-time"]["% of state"];

                        // Set suburbFullTime if it exists
                        if (percentageSuburbFullTime) {
                            newSuburbFullTime[4] = percentageSuburbFullTime;
                            setSuburbFullTime(newSuburbFullTime);
                        } else if (!percentageSuburbFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbFullTime[4] = null;
                            setSuburbFullTime(newSuburbFullTime);
                        }

                        // Set stateFullTime if it exists
                        if (percentageStateFullTime) {
                            newStateFullTime[4] = percentageStateFullTime;
                            setStateFullTime(newStateFullTime);
                        } else if (!percentageStateFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateFullTime[4] = null;
                            setStateFullTime(newStateFullTime);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        // console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbFullTime[0] = null;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (year === "2006") {
                        // console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbFullTime[1] = null;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (year === "2011") {
                        // console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbFullTime[2] = null;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (year === "2016") {
                        // console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbFullTime[3] = null;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (year === "2021") {
                        // console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbFullTime[4] = null;
                        setSuburbFullTime(newSuburbFullTime);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbFullTime);
                    }
                }
            });
        }

        if (props.selectedSuburb) {
            fetchData();
        }
    }, [props.selectedSuburb]);

    // console.log(`suburbFullTime: ${suburbFullTime}`);
    // console.log(`stateFullTime: ${stateFullTime}`);
    // console.log(`australiaFullTime: ${australiaFullTime}`);

    // * <Recharts />

    const data = [
        { name: "2001", Suburb: suburbFullTime[0], State: stateFullTime[0], Australia: australiaFullTime[0] },
        { name: "2006", Suburb: suburbFullTime[1], State: stateFullTime[1], Australia: australiaFullTime[1] },
        { name: "2011", Suburb: suburbFullTime[2], State: stateFullTime[2], Australia: australiaFullTime[2] },
        { name: "2016", Suburb: suburbFullTime[3], State: stateFullTime[3], Australia: australiaFullTime[3] },
        { name: "2021", Suburb: suburbFullTime[4], State: stateFullTime[4], Australia: australiaFullTime[4] },
    ];

    const renderLineChart = (
        <LineChart width={600} height={400} data={data} margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
            <Line type="natural" dataKey="Suburb" stroke="#219C90" strokeWidth={2.8} />
            <Line type="natural" dataKey="State" stroke="#068FFF" strokeWidth={1.2} />
            <Line type="natural" dataKey="Australia" stroke="#A90076" strokeWidth={1.2} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name">
                <Label value="year" position="bottom" />
            </XAxis>
            <YAxis tickCount={10} domain={[35, 75]}>
                <Label value="%" position="insideLeft" />
            </YAxis>
            <Tooltip offset={50} cursor={false} />
            <Legend verticalAlign="top" height={36} align="center" />
            <CartesianGrid y={40}></CartesianGrid>
        </LineChart>
    );

    const insufficientDataLineChart = (
        <LineChart width={600} height={400} data={data} margin={{ right: 30, bottom: 30, left: 30 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name">
                <Label value="year" position="bottom" />
            </XAxis>
            <YAxis tickCount={10} domain={[35, 75]}>
                <Label value="%" position="insideLeft" />
            </YAxis>
            <Tooltip offset={50} cursor={false} />
            <Legend verticalAlign="top" height={36} align="center" />
            <CartesianGrid y={40}></CartesianGrid>
        </LineChart>
    );

    return (
        <div>
            <div className="flex flex-col justify-center">
                <h1 className="mt-4 mb-4 text-lg text-center font-bold">Full-time employment</h1>
                <div className="mx-auto -mt-4">
                    {insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">
                                Insufficient data in suburb to populate full-time employment trends.
                            </span>
                            {insufficientDataLineChart}
                        </div>
                    ) : (
                        // * <Recharts />
                        <div>{renderLineChart}</div>
                    )}
                </div>
            </div>
        </div>
    );
}
