"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, CartesianAxis } from "recharts";

interface PartTimeEmploymentProps {
    selectedSuburb: string | null;
}

interface EmploymentDataItem {
    employment_data: any;
}

export default function ExamplePartTimeEmploymentLineGraph(props: PartTimeEmploymentProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);
    const [employmentData, setEmploymentData] = useState<EmploymentDataItem[]>([]);

    const [suburbPartTime, setSuburbPartTime] = useState<(number | null)[]>([24.9, 24.3, 25, 22.8, 24.1]);
    const [statePartTime, setStatePartTime] = useState<(number | null)[]>([null, null, 29.6, 31.4, 32.3]);
    const [australiaPartTime, setAustraliaPartTime] = useState<(number | null)[]>([30.0, 27.9, 28.7, 30.4, 31.2]);

    // States to manage instances where data does not exist
    const [insufficientSuburbData, setInsufficientSuburbData] = useState(false);
    const [insufficientStateData, setInsufficientStateData] = useState(false);
    const [insufficientAustraliaData, setInsufficientAustraliaData] = useState(false);

    // State to manage minimum and maximum data points for y-axis
    const [dataMin, setDataMin] = useState(0);
    const [dataMax, setDataMax] = useState(0);

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

        if ((numberCount === 1 && nullCount === 4) || nullCount === 5) {
            console.log("insufficient data");
            setInsufficientSuburbData(true);
        }

        return (numberCount === 1 && nullCount === 4) || nullCount === 5;
    }

    useEffect(() => {
        async function fetchData() {
            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchEmploymentDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbPartTime = [...suburbPartTime];
            const newStatePartTime = [...statePartTime];
            const newAustraliaPartTime = [...australiaPartTime];

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
                    // Clear suburbPartTime from previous search
                    setSuburbPartTime([null, null, null, null, null]);
                    setStatePartTime([null, null, null, null, null]);

                    // * 2001
                    if (year == "2001") {
                        const percentageSuburbPartTime = parseFloat(
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked part-time"]["% of suburb"]
                        );

                        const percentageStatePartTime = parseFloat(
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked part-time"]["% of state"]
                        );

                        // Set suburbPartTime if it exists
                        if (percentageSuburbPartTime) {
                            newSuburbPartTime[0] = percentageSuburbPartTime;
                            setSuburbPartTime(newSuburbPartTime);
                        } else if (!percentageSuburbPartTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbPartTime[0] = null;
                            setSuburbPartTime(newSuburbPartTime);
                        }

                        // Set statePartTime if it exists
                        if (percentageStatePartTime) {
                            newStatePartTime[0] = percentageStatePartTime;
                            setStatePartTime(newStatePartTime);
                        } else if (!percentageStatePartTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStatePartTime[0] = null;
                            setStatePartTime(newStatePartTime);
                        }
                    }

                    // * 2006
                    else if (year == "2006") {
                        const percentageSuburbPartTime = parseFloat(
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked part-time"]["% of suburb"]
                        );
                        const percentageStatePartTime = parseFloat(
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked part-time"]["% of state"]
                        );

                        // Set suburbPartTime if it exists
                        if (percentageSuburbPartTime) {
                            newSuburbPartTime[1] = percentageSuburbPartTime;
                            setSuburbPartTime(newSuburbPartTime);
                        } else if (!percentageSuburbPartTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbPartTime[1] = null;
                            setSuburbPartTime(newSuburbPartTime);
                        }

                        // Set statePartTime if it exists
                        if (percentageStatePartTime) {
                            newStatePartTime[1] = percentageStatePartTime;
                            setStatePartTime(newStatePartTime);
                        } else if (!percentageStatePartTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStatePartTime[1] = null;
                            setStatePartTime(newStatePartTime);
                        }
                    }

                    // * 2011
                    else if (year == "2011") {
                        const percentageSuburbPartTime = parseFloat(
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked part-time"
                            ]["% of suburb"]
                        );
                        const percentageStatePartTime = parseFloat(
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked part-time"
                            ]["% of state"]
                        );

                        // Set suburbPartTime if it exists
                        if (percentageSuburbPartTime) {
                            newSuburbPartTime[2] = percentageSuburbPartTime;
                            setSuburbPartTime(newSuburbPartTime);
                        } else if (!percentageSuburbPartTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbPartTime[2] = null;
                            setSuburbPartTime(newSuburbPartTime);
                        }

                        // Set statePartTime if it exists
                        if (percentageStatePartTime) {
                            newStatePartTime[2] = percentageStatePartTime;
                            setStatePartTime(newStatePartTime);
                        } else if (!percentageStatePartTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStatePartTime[2] = null;
                            setStatePartTime(newStatePartTime);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        const percentageSuburbPartTime = parseFloat(
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked part-time"
                            ]["% of suburb"]
                        );
                        const percentageStatePartTime = parseFloat(
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked part-time"
                            ]["% of state"]
                        );

                        // Set suburbPartTime if it exists
                        if (percentageSuburbPartTime) {
                            newSuburbPartTime[3] = percentageSuburbPartTime;
                            setSuburbPartTime(newSuburbPartTime);
                        } else if (!percentageSuburbPartTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbPartTime[3] = null;
                            setSuburbPartTime(newSuburbPartTime);
                        }

                        // Set statePartTime if it exists
                        if (percentageStatePartTime) {
                            newStatePartTime[3] = percentageStatePartTime;
                            setStatePartTime(newStatePartTime);
                        } else if (!percentageStatePartTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStatePartTime[3] = null;
                            setStatePartTime(newStatePartTime);
                        }
                    }

                    // * 2021
                    else if (year == "2021") {
                        const percentageSuburbPartTime = parseFloat(
                            data[0]["employment_data"]["Employment status"]["Worked part-time"]["% of suburb"]
                        );
                        const percentageStatePartTime = parseFloat(
                            data[0]["employment_data"]["Employment status"]["Worked part-time"]["% of state"]
                        );

                        // Set suburbPartTime if it exists
                        if (percentageSuburbPartTime) {
                            newSuburbPartTime[4] = percentageSuburbPartTime;
                            setSuburbPartTime(newSuburbPartTime);
                        } else if (!percentageSuburbPartTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbPartTime[4] = null;
                            setSuburbPartTime(newSuburbPartTime);
                        }

                        // Set statePartTime if it exists
                        if (percentageStatePartTime) {
                            newStatePartTime[4] = percentageStatePartTime;
                            setStatePartTime(newStatePartTime);
                        } else if (!percentageStatePartTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStatePartTime[4] = null;
                            setStatePartTime(newStatePartTime);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        // console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbPartTime[0] = null;
                        setSuburbPartTime(newSuburbPartTime);
                    } else if (year === "2006") {
                        // console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbPartTime[1] = null;
                        setSuburbPartTime(newSuburbPartTime);
                    } else if (year === "2011") {
                        // console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbPartTime[2] = null;
                        setSuburbPartTime(newSuburbPartTime);
                    } else if (year === "2016") {
                        // console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbPartTime[3] = null;
                        setSuburbPartTime(newSuburbPartTime);
                    } else if (year === "2021") {
                        // console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbPartTime[4] = null;
                        setSuburbPartTime(newSuburbPartTime);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbPartTime);
                    }
                }
            });
        }

        if (props.selectedSuburb) {
            fetchData();
        }
    }, [props.selectedSuburb]);

    // * useEffect hook to determine min and max for y-axis
    useEffect(() => {
        async function minMax(
            suburbUnemployment: (number | null)[],
            stateUnemployment: (number | null)[],
            australiaUnemployment: (number | null)[]
        ) {
            // Define minimum and maximum variables
            let dataMin: number = 100;
            let dataMax: number = 0;

            // Combine all 3 arrays
            const combinedList = suburbUnemployment.concat(stateUnemployment, australiaUnemployment);

            // Remove null values from combinedList
            const cleanedList = combinedList.filter((value) => value !== null) as number[];
            // console.log(cleanedList);

            // Iterate over items in arrays and determine lowest number for dataMin and highest number for dataMax
            for (let i = 0; i < cleanedList.length; i++) {
                if (cleanedList[i] !== null && cleanedList[i] < dataMin) {
                    dataMin = cleanedList[i];
                }
                if (cleanedList[i] !== null && cleanedList[i] > dataMax) {
                    dataMax = cleanedList[i];
                }
            }

            setDataMin(dataMin);
            setDataMax(dataMax);
        }

        minMax(suburbPartTime, statePartTime, australiaPartTime);
    }, [suburbPartTime, statePartTime, australiaPartTime]);

    // ! CONSOLE LOGS OUTSIDE useEffect hooks ************

    // console.log(`dataMin: ${dataMin}`);
    // console.log(`dataMax: ${dataMax}`);

    // ! CONSOLE LOGS OUTSIDE useEffect hooks ************

    // * <Recharts />

    const data = [
        { name: "2001", Suburb: suburbPartTime[0], State: statePartTime[0], Australia: australiaPartTime[0] },
        { name: "2006", Suburb: suburbPartTime[1], State: statePartTime[1], Australia: australiaPartTime[1] },
        { name: "2011", Suburb: suburbPartTime[2], State: statePartTime[2], Australia: australiaPartTime[2] },
        { name: "2016", Suburb: suburbPartTime[3], State: statePartTime[3], Australia: australiaPartTime[3] },
        { name: "2021", Suburb: suburbPartTime[4], State: statePartTime[4], Australia: australiaPartTime[4] },
    ];

    const renderLineChart = (
        <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 30, right: 40, bottom: 30, left: 0 }}>
                    <Line type="natural" dataKey="Suburb" stroke="#219C90" strokeWidth={2.8} />
                    <Line type="natural" dataKey="State" stroke="#068FFF" strokeWidth={1.2} />
                    <Line type="natural" dataKey="Australia" stroke="#A90076" strokeWidth={1.2} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name">
                        <Label value="year" position="bottom" />
                    </XAxis>
                    <YAxis tickCount={6} domain={[dataMin - 2, dataMax + 2]} padding={{ bottom: 30 }}>
                        <Label value="%" position="insideTopLeft" offset={-1.5} />
                    </YAxis>
                    <Tooltip offset={50} cursor={false} />
                    <Legend
                        height={36}
                        width={260}
                        layout={"horizontal"}
                        verticalAlign="top"
                        align="center"
                        margin={{ top: 10, left: 100, right: 0, bottom: 0 }}
                        // wrapperStyle={{ position: "relative" }}
                    />
                    <CartesianGrid y={40}></CartesianGrid>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    const insufficientDataLineChart = (
        <LineChart width={600} height={400} data={data} margin={{ right: 30, bottom: 30, left: 30 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name">
                <Label value="year" position="bottom" />
            </XAxis>
            <YAxis tickCount={10} domain={[35, 75]}>
                <Label value="%" position="insideLeft" offset={-1.5} />
            </YAxis>
            <Tooltip offset={50} cursor={false} />
            <Legend verticalAlign="top" height={36} align="center" />
            <CartesianGrid y={40}></CartesianGrid>
        </LineChart>
    );

    return (
        <>
            <div className="flex flex-col justify-center select-none">
                <h1 className="mx-auto mt-4 text-base text-center">
                    Part-time employment in <p className="text-base italic font-medium">Abbotsford, VIC, 3067</p>
                </h1>
                <div className="mx-auto -mt-4">
                    {insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">
                                Insufficient data in suburb to populate part-time employment trends.
                            </span>
                            {insufficientDataLineChart}
                        </div>
                    ) : (
                        // * <Recharts />
                        <div>{renderLineChart}</div>
                    )}
                </div>
            </div>
        </>
    );
}
