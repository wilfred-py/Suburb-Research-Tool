"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, CartesianAxis } from "recharts";
import { render } from "react-dom";

interface UnemploymentProps {
    selectedSuburb: string | null;
}

interface EmploymentDataItem {
    employment_data: any;
}

export default function UnemploymentLineGraph(props: UnemploymentProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);
    const [employmentData, setEmploymentData] = useState<EmploymentDataItem[]>([]);

    const [suburbUnemployment, setSuburbUnemployment] = useState<(number | null)[]>([null, null, null, null, null]);
    const [stateUnemployment, setStateUnemployment] = useState<(number | null)[]>([null, null, null, null, null]);
    const [australiaUnemployment, setAustraliaUnemployment] = useState<(number | null)[]>([7.4, 5.2, 5.6, 6.9, 5.1]);

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

            const newSuburbUnemployment = [...suburbUnemployment];
            const newStateUnemployment = [...stateUnemployment];
            const newAustraliaUnemployment = [...australiaUnemployment];

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
                    // Clear suburbUnemployment from previous search
                    setSuburbUnemployment([null, null, null, null, null]);
                    setStateUnemployment([null, null, null, null, null]);

                    // * 2001
                    if (year == "2001") {
                        const percentageSuburbUnemployment = parseFloat(
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Unemployed"]["% of suburb"]
                        );

                        const percentageStateUnemployment = parseFloat(
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Unemployed"]["% of state"]
                        );

                        // Set suburbUnemployment if it exists
                        if (percentageSuburbUnemployment) {
                            newSuburbUnemployment[0] = percentageSuburbUnemployment;
                            setSuburbUnemployment(newSuburbUnemployment);
                        } else if (!percentageSuburbUnemployment) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbUnemployment[0] = null;
                            setSuburbUnemployment(newSuburbUnemployment);
                        }

                        // Set stateUnemployment if it exists
                        if (percentageStateUnemployment) {
                            newStateUnemployment[0] = percentageStateUnemployment;
                            setStateUnemployment(newStateUnemployment);
                        } else if (!percentageStateUnemployment) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateUnemployment[0] = null;
                            // console.log("state data not available for 2001");
                            setStateUnemployment(newStateUnemployment);
                        }

                        // console.log(`stateUnemployment: ${stateUnemployment}`);
                    }
                    // * 2006
                    else if (year == "2006") {
                        const percentageSuburbUnemployment = parseFloat(
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Unemployed"]["% of suburb"]
                        );
                        const percentageStateUnemployment = parseFloat(
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Unemployed"]["% of state"]
                        );

                        // Set suburbUnemployment if it exists
                        if (percentageSuburbUnemployment) {
                            newSuburbUnemployment[1] = percentageSuburbUnemployment;
                            setSuburbUnemployment(newSuburbUnemployment);
                        } else if (!percentageSuburbUnemployment) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbUnemployment[1] = null;
                            setSuburbUnemployment(newSuburbUnemployment);
                        }

                        // Set stateUnemployment if it exists
                        if (percentageStateUnemployment) {
                            newStateUnemployment[1] = percentageStateUnemployment;
                            setStateUnemployment(newStateUnemployment);
                        } else if (!percentageStateUnemployment) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateUnemployment[1] = null;
                            setStateUnemployment(newStateUnemployment);
                        }
                    }

                    // * 2011
                    else if (year == "2011") {
                        const percentageSuburbUnemployment = parseFloat(
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Unemployed"
                            ]["% of suburb"]
                        );
                        const percentageStateUnemployment = parseFloat(
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Unemployed"
                            ]["% of state"]
                        );

                        // Set suburbUnemployment if it exists
                        if (percentageSuburbUnemployment) {
                            newSuburbUnemployment[2] = percentageSuburbUnemployment;
                            setSuburbUnemployment(newSuburbUnemployment);
                        } else if (!percentageSuburbUnemployment) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbUnemployment[2] = null;
                            setSuburbUnemployment(newSuburbUnemployment);
                        }

                        // Set stateUnemployment if it exists
                        if (percentageStateUnemployment) {
                            newStateUnemployment[2] = percentageStateUnemployment;
                            setStateUnemployment(newStateUnemployment);
                        } else if (!percentageStateUnemployment) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateUnemployment[2] = null;
                            setStateUnemployment(newStateUnemployment);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        const percentageSuburbUnemployment = parseFloat(
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Unemployed"
                            ]["% of suburb"]
                        );
                        const percentageStateUnemployment = parseFloat(
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Unemployed"
                            ]["% of state"]
                        );

                        // Set suburbUnemployment if it exists
                        if (percentageSuburbUnemployment) {
                            newSuburbUnemployment[3] = percentageSuburbUnemployment;
                            setSuburbUnemployment(newSuburbUnemployment);
                        } else if (!percentageSuburbUnemployment) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbUnemployment[3] = null;
                            setSuburbUnemployment(newSuburbUnemployment);
                        }

                        // Set stateUnemployment if it exists
                        if (percentageStateUnemployment) {
                            newStateUnemployment[3] = percentageStateUnemployment;
                            setStateUnemployment(newStateUnemployment);
                        } else if (!percentageStateUnemployment) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateUnemployment[3] = null;
                            setStateUnemployment(newStateUnemployment);
                        }
                    }

                    // * 2021
                    else if (year == "2021") {
                        const percentageSuburbUnemployment = parseFloat(
                            data[0]["employment_data"]["Employment status"]["Unemployed"]["% of suburb"]
                        );
                        const percentageStateUnemployment = parseFloat(
                            data[0]["employment_data"]["Employment status"]["Unemployed"]["% of state"]
                        );

                        // Set suburbUnemployment if it exists
                        if (percentageSuburbUnemployment) {
                            newSuburbUnemployment[4] = percentageSuburbUnemployment;
                            setSuburbUnemployment(newSuburbUnemployment);
                        } else if (!percentageSuburbUnemployment) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbUnemployment[4] = null;
                            setStateUnemployment(newStateUnemployment);
                        }

                        // Set stateUnemployment if it exists
                        if (percentageStateUnemployment) {
                            newStateUnemployment[4] = percentageStateUnemployment;
                            setStateUnemployment(newStateUnemployment);
                        } else if (!percentageStateUnemployment) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateUnemployment[4] = null;
                            setStateUnemployment(newStateUnemployment);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        // console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbUnemployment[0] = null;
                        setSuburbUnemployment(newSuburbUnemployment);
                    } else if (year === "2006") {
                        // console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbUnemployment[1] = null;
                        setSuburbUnemployment(newSuburbUnemployment);
                    } else if (year === "2011") {
                        // console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbUnemployment[2] = null;
                        setSuburbUnemployment(newSuburbUnemployment);
                    } else if (year === "2016") {
                        // console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbUnemployment[3] = null;
                        setSuburbUnemployment(newSuburbUnemployment);
                    } else if (year === "2021") {
                        // console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbUnemployment[4] = null;
                        setSuburbUnemployment(newSuburbUnemployment);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbUnemployment);
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
        setDataMin(0);
        setDataMax(0);

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

        minMax(suburbUnemployment, stateUnemployment, australiaUnemployment);
    }, [suburbUnemployment, stateUnemployment, australiaUnemployment]);

    // ! CONSOLE LOGS OUTSIDE useEffect hooks ************

    // console.log(`suburbUnemployment: ${suburbUnemployment}`);
    // console.log(`stateUnemployment: ${stateUnemployment}`);
    // console.log(`australiaUnemployment: ${australiaUnemployment}`);

    // console.log(`dataMin: ${dataMin}`);
    // console.log(`dataMax: ${dataMax}`);

    // ! CONSOLE LOGS OUTSIDE useEffect hooks ************

    // * <Recharts />

    const data = [
        { name: "2001", Suburb: suburbUnemployment[0], State: stateUnemployment[0], Australia: australiaUnemployment[0] },
        { name: "2006", Suburb: suburbUnemployment[1], State: stateUnemployment[1], Australia: australiaUnemployment[1] },
        { name: "2011", Suburb: suburbUnemployment[2], State: stateUnemployment[2], Australia: australiaUnemployment[2] },
        { name: "2016", Suburb: suburbUnemployment[3], State: stateUnemployment[3], Australia: australiaUnemployment[3] },
        { name: "2021", Suburb: suburbUnemployment[4], State: stateUnemployment[4], Australia: australiaUnemployment[4] },
    ];

    const renderLineChart = (
        <div className="mobile-s:max-mobile-l:w-[260px] mobile-s:max-mobile-l:h-[440px] mobile-l:max-md:w-[360px] sm:max-md:h-[420px] md:max-md-l:w-[300px] md-l:h-[440px] md-l:w-[360px] mobile-s:max-sm:mt-10 sm:max-md:mt-12 md:mt-6">
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 0, right: 30, bottom: 60, left: 5 }}>
                    <Line type="natural" dataKey="Suburb" stroke="#219C90" strokeWidth={2.8} />
                    <Line type="natural" dataKey="State" stroke="#068FFF" strokeWidth={1.2} />
                    <Line type="natural" dataKey="Australia" stroke="#A90076" strokeWidth={1.2} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name">
                        <Label value="year" position="bottom" />
                    </XAxis>
                    <YAxis tickCount={6} domain={[dataMin - 2, dataMax + 2]} padding={{ bottom: 30 }}>
                        <Label value="%" position="insideLeft" />
                    </YAxis>
                    <Tooltip offset={50} cursor={false} />
                    <Legend
                        height={70}
                        layout="horizontal"
                        verticalAlign="top"
                        align="center"
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    />
                    <CartesianGrid y={40}></CartesianGrid>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    const insufficientDataLineChart = (
        <div className="mobile-s:max-mobile-l:w-[260px] mobile-s:max-mobile-l:h-[440px] mobile-l:max-md:w-[360px] sm:max-md:h-[420px] md:max-md-l:w-[300px] md-l:h-[440px] md-l:w-[360px] mobile-s:max-sm:mt-10 sm:max-md:mt-12 md:mt-6">
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 0, right: 30, bottom: 60, left: 5 }}>
                    <Line type="natural" dataKey="Suburb" stroke="#219C90" strokeWidth={2.8} />
                    <Line type="natural" dataKey="State" stroke="#068FFF" strokeWidth={1.2} />
                    <Line type="natural" dataKey="Australia" stroke="#A90076" strokeWidth={1.2} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name">
                        <Label value="year" position="bottom" />
                    </XAxis>
                    <YAxis tickCount={6} domain={[dataMin - 2, dataMax + 2]} padding={{ bottom: 30 }}>
                        <Label value="%" position="insideLeft" />
                    </YAxis>
                    <Tooltip offset={50} cursor={false} />
                    <Legend
                        height={70}
                        layout="horizontal"
                        verticalAlign="top"
                        align="center"
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    />
                    <CartesianGrid y={40}></CartesianGrid>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    return (
        <div>
            <div className="flex flex-col justify-center">
                <h1 className="mt-4 mb-4 text-lg text-center font-bold">Unemployment</h1>
                <div className="mx-auto -mt-4">
                    {insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">Insufficient data in suburb to populate unemployment trends.</span>
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
