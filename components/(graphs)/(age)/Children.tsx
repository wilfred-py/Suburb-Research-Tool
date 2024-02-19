"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChildrenProps {
    selectedSuburb: string | null;
}

export default function Children(props: ChildrenProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [suburbChildren, setSuburbChildren] = useState<(number | null)[]>([null, null, null]);
    const [stateChildren, setStateChildren] = useState<(number | null)[]>([null, null, null]);
    const [australiaChildren, setAustraliaChildren] = useState<(number | null)[]>([null, null, null]);

    const [insufficientSuburbData, setInsufficientSuburbData] = useState(false);

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

        return {
            suburbName,
            stateName,
            postcode,
        };
    }

    // * Function that fetches age data for a specific year
    async function fetchChildrenDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
        return (numberCount === 1 && nullCount === 4) || nullCount === 5;
    }

    useEffect(() => {
        async function fetchData() {
            // Clear old array values from previous search
            setSuburbChildren([null, null, null]);
            setStateChildren([null, null, null]);
            setAustraliaChildren([null, null, null]);

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchChildrenDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbChildren = [...suburbChildren];
            const newStateChildren = [...stateChildren];
            const newAustraliaChildren = [...australiaChildren];

            //  Wait for data to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;

                try {
                    // Age brackets different to 2011, 2016, 2021
                    // * 2001
                    // * 2006

                    // * 2011
                    if (year == "2011") {
                        // >> 0 - 4 y.o
                        const zeroToFourInSuburb = parseFloat(data[0]["percentage_0_4_years_in_suburb"]);
                        const zeroToFourInState = parseFloat(data[0]["percentage_0_4_years_in_state"]);
                        const zeroToFourInAustralia = parseFloat(data[0]["percentage_0_4_years_in_australia"]);

                        // >> 5 - 9 y.o
                        const fiveToNineInSuburb = parseFloat(data[0]["percentage_5_9_years_in_suburb"]);
                        const fiveToNineInState = parseFloat(data[0]["percentage_5_9_years_in_state"]);
                        const fiveToNineInAustralia = parseFloat(data[0]["percentage_5_9_years_in_australia"]);

                        // console.log(zeroToFourInSuburb);
                        // console.log(fiveToNineInSuburb);

                        const childrenInSuburb = Math.round((zeroToFourInSuburb + fiveToNineInSuburb) * 100) / 100;
                        const childrenInState = Math.round((zeroToFourInState + fiveToNineInState) * 100) / 100;
                        const childrenInAustralia = Math.round((zeroToFourInAustralia + fiveToNineInAustralia) * 100) / 100;

                        // console.log(childrenInSuburb);
                        // console.log(childrenInState);
                        // console.log(childrenInAustralia);

                        // >> Set suburb
                        if (childrenInSuburb) {
                            newSuburbChildren[0] = childrenInSuburb;
                            setSuburbChildren(newSuburbChildren);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbChildren[0] = null;
                            setSuburbChildren(newSuburbChildren);
                        }

                        // >> Set state
                        if (childrenInState) {
                            newStateChildren[0] = childrenInState;
                            setStateChildren(newStateChildren);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbChildren[0] = null;
                            setStateChildren(newStateChildren);
                        }

                        // >> Set Australia
                        if (childrenInAustralia) {
                            newAustraliaChildren[0] = childrenInAustralia;
                            setAustraliaChildren(newAustraliaChildren);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbChildren[0] = null;
                            setAustraliaChildren(newAustraliaChildren);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        // >> 0 - 4 y.o
                        const zeroToFourInSuburb = parseFloat(data[0]["percentage_0_4_years_in_suburb"]);
                        const zeroToFourInState = parseFloat(data[0]["percentage_0_4_years_in_state"]);
                        const zeroToFourInAustralia = parseFloat(data[0]["percentage_0_4_years_in_australia"]);

                        // >> 5 - 9 y.o
                        const fiveToNineInSuburb = parseFloat(data[0]["percentage_5_9_years_in_suburb"]);
                        const fiveToNineInState = parseFloat(data[0]["percentage_5_9_years_in_state"]);
                        const fiveToNineInAustralia = parseFloat(data[0]["percentage_5_9_years_in_australia"]);

                        // console.log(zeroToFourInSuburb);
                        // console.log(fiveToNineInSuburb);

                        const childrenInSuburb = Math.round((zeroToFourInSuburb + fiveToNineInSuburb) * 100) / 100;
                        const childrenInState = Math.round((zeroToFourInState + fiveToNineInState) * 100) / 100;
                        const childrenInAustralia = Math.round((zeroToFourInAustralia + fiveToNineInAustralia) * 100) / 100;

                        // console.log(childrenInSuburb);
                        // console.log(childrenInState);

                        // >> Set suburb
                        if (childrenInSuburb) {
                            newSuburbChildren[1] = childrenInSuburb;
                            setSuburbChildren(newSuburbChildren);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbChildren[1] = null;
                            setSuburbChildren(newSuburbChildren);
                        }

                        // >> Set state
                        if (childrenInState) {
                            newStateChildren[1] = childrenInState;
                            setStateChildren(newStateChildren);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbChildren[1] = null;
                            setStateChildren(newStateChildren);
                        }

                        // >> Set Australia
                        if (childrenInAustralia) {
                            newAustraliaChildren[1] = childrenInAustralia;
                            setAustraliaChildren(newAustraliaChildren);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbChildren[1] = null;
                            setAustraliaChildren(newAustraliaChildren);
                        }
                    }

                    // * 2021
                    else if (year == "2021") {
                        // >> 0 - 4 y.o
                        const zeroToFourInSuburb = parseFloat(data[0]["percentage_0_4_years_in_suburb"]);
                        const zeroToFourInState = parseFloat(data[0]["percentage_0_4_years_in_state"]);
                        const zeroToFourInAustralia = parseFloat(data[0]["percentage_0_4_years_in_australia"]);

                        // >> 5 - 9 y.o
                        const fiveToNineInSuburb = parseFloat(data[0]["percentage_5_9_years_in_suburb"]);
                        const fiveToNineInState = parseFloat(data[0]["percentage_5_9_years_in_state"]);
                        const fiveToNineInAustralia = parseFloat(data[0]["percentage_5_9_years_in_australia"]);

                        // console.log(zeroToFourInSuburb);
                        // console.log(fiveToNineInSuburb);

                        const childrenInSuburb = Math.round((zeroToFourInSuburb + fiveToNineInSuburb) * 100) / 100;
                        const childrenInState = Math.round((zeroToFourInState + fiveToNineInState) * 100) / 100;
                        const childrenInAustralia = Math.round((zeroToFourInAustralia + fiveToNineInAustralia) * 100) / 100;

                        // console.log(childrenInSuburb);
                        // console.log(childrenInState);
                        // console.log(childrenInAustralia);

                        // >> Set suburb
                        if (childrenInSuburb) {
                            newSuburbChildren[2] = childrenInSuburb;
                            setSuburbChildren(newSuburbChildren);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbChildren[2] = null;
                            setSuburbChildren(newSuburbChildren);
                        }

                        // >> Set state
                        if (childrenInState) {
                            newStateChildren[2] = childrenInState;
                            setStateChildren(newStateChildren);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbChildren[2] = null;
                            setStateChildren(newStateChildren);
                        }

                        // >> Set Australia
                        if (childrenInAustralia) {
                            newAustraliaChildren[2] = childrenInAustralia;
                            setAustraliaChildren(newAustraliaChildren);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbChildren[2] = null;
                            setAustraliaChildren(newAustraliaChildren);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);

                    if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbChildren[0] = null;
                        setSuburbChildren(newSuburbChildren);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbChildren[1] = null;
                        setSuburbChildren(newSuburbChildren);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbChildren[2] = null;
                        setSuburbChildren(newSuburbChildren);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbChildren);
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
        async function minMax(suburbChildren: (number | null)[], stateChildren: (number | null)[], australiaChildren: (number | null)[]) {
            // Define minimum and maximum variables
            let dataMin: number = 999999;
            let dataMax: number = 0;

            const combinedList = suburbChildren.concat(stateChildren, australiaChildren);

            // Remove null values from combinedList
            const cleanedList = combinedList.filter((value: any) => value !== null) as number[];
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

        minMax(suburbChildren, stateChildren, australiaChildren);
    }, [suburbChildren, stateChildren, australiaChildren]);

    // console.log(dataMin);
    // console.log(dataMax);

    // ! Console Log
    // console.log(suburbChildren);
    // console.log(stateChildren);
    // console.log(australiaChildren);
    // ! Console Log

    // * <Recharts />
    const data = [
        { name: "2011", Suburb: suburbChildren[0], State: stateChildren[0], Australia: australiaChildren[0] },
        { name: "2016", Suburb: suburbChildren[1], State: stateChildren[1], Australia: australiaChildren[1] },
        { name: "2021", Suburb: suburbChildren[2], State: stateChildren[2], Australia: australiaChildren[2] },
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
        <>
            <div className="flex flex-col justify-center">
                <h1 className="mt-4 mb-1 text-lg text-center font-bold">Children</h1>
                <p className="text-sm text-center font-normal">
                    {"("}0 - 9 years old{")"}
                </p>
                <div className="mx-auto -mt-4">
                    {insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">Insufficient data in suburb to populate population trends.</span>
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
