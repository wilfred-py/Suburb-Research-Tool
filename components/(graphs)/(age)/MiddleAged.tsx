"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

interface MiddleAgedProps {
    selectedSuburb: string | null;
}

export default function MiddleAged(props: MiddleAgedProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [suburbMiddleAged, setSuburbMiddleAged] = useState<(number | null)[]>([null, null, null]);
    const [stateMiddleAged, setStateMiddleAged] = useState<(number | null)[]>([null, null, null]);
    const [australiaMiddleAged, setAustraliaMiddleAged] = useState<(number | null)[]>([null, null, null]);

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
    async function fetchMiddleAgedDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            setSuburbMiddleAged([null, null, null]);
            setStateMiddleAged([null, null, null]);
            setAustraliaMiddleAged([null, null, null]);

            console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchMiddleAgedDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbMiddleAged = [...suburbMiddleAged];
            const newStateMiddleAged = [...stateMiddleAged];
            const newAustraliaMiddleAged = [...australiaMiddleAged];

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
                        // >> 40 - 44  y.o
                        const earlyFourtiesInSuburb = parseFloat(data[0]["percentage_40_44_years_in_suburb"]);
                        const earlyFourtiesInState = parseFloat(data[0]["percentage_40_44_years_in_state"]);
                        const earlyFourtiesInAustralia = parseFloat(data[0]["percentage_40_44_years_in_australia"]);

                        // >> 45 - 49  y.o
                        const lateFourtiesInSuburb = parseFloat(data[0]["percentage_45_49_years_in_suburb"]);
                        const lateFourtiesInState = parseFloat(data[0]["percentage_45_49_years_in_state"]);
                        const lateFourtiesInAustralia = parseFloat(data[0]["percentage_45_49_years_in_australia"]);

                        // >> 50 - 54  y.o
                        const earlyFiftiesInSuburb = parseFloat(data[0]["percentage_50_54_years_in_suburb"]);
                        const earlyFiftiesInState = parseFloat(data[0]["percentage_50_54_years_in_state"]);
                        const earlyFiftiesInAustralia = parseFloat(data[0]["percentage_50_54_years_in_australia"]);

                        // >> 55 - 59  y.o
                        const lateFiftiesInSuburb = parseFloat(data[0]["percentage_55_59_years_in_suburb"]);
                        const lateFiftiesInState = parseFloat(data[0]["percentage_55_59_years_in_state"]);
                        const lateFiftiesInAustralia = parseFloat(data[0]["percentage_55_59_years_in_australia"]);

                        const middleAgedInSuburb =
                            Math.round((earlyFourtiesInSuburb + lateFourtiesInSuburb + earlyFiftiesInSuburb + lateFiftiesInSuburb) * 100) /
                            100;
                        const MiddleAgedInState =
                            Math.round((earlyFourtiesInState + lateFourtiesInState + earlyFiftiesInState + lateFiftiesInState) * 100) / 100;
                        const MiddleAgedInAustralia =
                            Math.round(
                                (earlyFourtiesInAustralia + lateFourtiesInAustralia + earlyFiftiesInAustralia + lateFiftiesInAustralia) *
                                    100
                            ) / 100;

                        console.log(middleAgedInSuburb);
                        console.log(MiddleAgedInState);
                        console.log(MiddleAgedInAustralia);

                        // >> Set suburb
                        if (middleAgedInSuburb) {
                            newSuburbMiddleAged[0] = middleAgedInSuburb;
                            setSuburbMiddleAged(newSuburbMiddleAged);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbMiddleAged[0] = null;
                            setSuburbMiddleAged(newSuburbMiddleAged);
                        }

                        // >> Set state
                        if (MiddleAgedInState) {
                            newStateMiddleAged[0] = MiddleAgedInState;
                            setStateMiddleAged(newStateMiddleAged);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateMiddleAged[0] = null;
                            setStateMiddleAged(newStateMiddleAged);
                        }

                        // >> Set Australia
                        if (MiddleAgedInAustralia) {
                            newAustraliaMiddleAged[0] = MiddleAgedInAustralia;
                            setAustraliaMiddleAged(newAustraliaMiddleAged);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaMiddleAged[0] = null;
                            setAustraliaMiddleAged(newAustraliaMiddleAged);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        // >> 40 - 44  y.o
                        const earlyFourtiesInSuburb = parseFloat(data[0]["percentage_40_44_years_in_suburb"]);
                        const earlyFourtiesInState = parseFloat(data[0]["percentage_40_44_years_in_state"]);
                        const earlyFourtiesInAustralia = parseFloat(data[0]["percentage_40_44_years_in_australia"]);

                        // >> 45 - 49  y.o
                        const lateFourtiesInSuburb = parseFloat(data[0]["percentage_45_49_years_in_suburb"]);
                        const lateFourtiesInState = parseFloat(data[0]["percentage_45_49_years_in_state"]);
                        const lateFourtiesInAustralia = parseFloat(data[0]["percentage_45_49_years_in_australia"]);

                        // >> 50 - 54  y.o
                        const earlyFiftiesInSuburb = parseFloat(data[0]["percentage_50_54_years_in_suburb"]);
                        const earlyFiftiesInState = parseFloat(data[0]["percentage_50_54_years_in_state"]);
                        const earlyFiftiesInAustralia = parseFloat(data[0]["percentage_50_54_years_in_australia"]);

                        // >> 55 - 59  y.o
                        const lateFiftiesInSuburb = parseFloat(data[0]["percentage_55_59_years_in_suburb"]);
                        const lateFiftiesInState = parseFloat(data[0]["percentage_55_59_years_in_state"]);
                        const lateFiftiesInAustralia = parseFloat(data[0]["percentage_55_59_years_in_australia"]);

                        const middleAgedInSuburb =
                            Math.round((earlyFourtiesInSuburb + lateFourtiesInSuburb + earlyFiftiesInSuburb + lateFiftiesInSuburb) * 100) /
                            100;
                        const MiddleAgedInState =
                            Math.round((earlyFourtiesInState + lateFourtiesInState + earlyFiftiesInState + lateFiftiesInState) * 100) / 100;
                        const MiddleAgedInAustralia =
                            Math.round(
                                (earlyFourtiesInAustralia + lateFourtiesInAustralia + earlyFiftiesInAustralia + lateFiftiesInAustralia) *
                                    100
                            ) / 100;

                        console.log(middleAgedInSuburb);
                        console.log(MiddleAgedInState);
                        console.log(MiddleAgedInAustralia);

                        // >> Set suburb
                        if (middleAgedInSuburb) {
                            newSuburbMiddleAged[1] = middleAgedInSuburb;
                            setSuburbMiddleAged(newSuburbMiddleAged);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbMiddleAged[1] = null;
                            setSuburbMiddleAged(newSuburbMiddleAged);
                        }

                        // >> Set state
                        if (MiddleAgedInState) {
                            newStateMiddleAged[1] = MiddleAgedInState;
                            setStateMiddleAged(newStateMiddleAged);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateMiddleAged[1] = null;
                            setStateMiddleAged(newStateMiddleAged);
                        }

                        // >> Set Australia
                        if (MiddleAgedInAustralia) {
                            newAustraliaMiddleAged[1] = MiddleAgedInAustralia;
                            setAustraliaMiddleAged(newAustraliaMiddleAged);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaMiddleAged[1] = null;
                            setAustraliaMiddleAged(newAustraliaMiddleAged);
                        }
                    }

                    // * 2021
                    else if (year == "2021") {
                        // >> 40 - 44  y.o
                        const earlyFourtiesInSuburb = parseFloat(data[0]["percentage_40_44_years_in_suburb"]);
                        const earlyFourtiesInState = parseFloat(data[0]["percentage_40_44_years_in_state"]);
                        const earlyFourtiesInAustralia = parseFloat(data[0]["percentage_40_44_years_in_australia"]);

                        // >> 45 - 49  y.o
                        const lateFourtiesInSuburb = parseFloat(data[0]["percentage_45_49_years_in_suburb"]);
                        const lateFourtiesInState = parseFloat(data[0]["percentage_45_49_years_in_state"]);
                        const lateFourtiesInAustralia = parseFloat(data[0]["percentage_45_49_years_in_australia"]);

                        // >> 50 - 54  y.o
                        const earlyFiftiesInSuburb = parseFloat(data[0]["percentage_50_54_years_in_suburb"]);
                        const earlyFiftiesInState = parseFloat(data[0]["percentage_50_54_years_in_state"]);
                        const earlyFiftiesInAustralia = parseFloat(data[0]["percentage_50_54_years_in_australia"]);

                        // >> 55 - 59  y.o
                        const lateFiftiesInSuburb = parseFloat(data[0]["percentage_55_59_years_in_suburb"]);
                        const lateFiftiesInState = parseFloat(data[0]["percentage_55_59_years_in_state"]);
                        const lateFiftiesInAustralia = parseFloat(data[0]["percentage_55_59_years_in_australia"]);

                        const middleAgedInSuburb =
                            Math.round((earlyFourtiesInSuburb + lateFourtiesInSuburb + earlyFiftiesInSuburb + lateFiftiesInSuburb) * 100) /
                            100;
                        const MiddleAgedInState =
                            Math.round((earlyFourtiesInState + lateFourtiesInState + earlyFiftiesInState + lateFiftiesInState) * 100) / 100;
                        const MiddleAgedInAustralia =
                            Math.round(
                                (earlyFourtiesInAustralia + lateFourtiesInAustralia + earlyFiftiesInAustralia + lateFiftiesInAustralia) *
                                    100
                            ) / 100;

                        console.log(middleAgedInSuburb);
                        console.log(MiddleAgedInState);
                        console.log(MiddleAgedInAustralia);

                        // >> Set suburb
                        if (middleAgedInSuburb) {
                            newSuburbMiddleAged[2] = middleAgedInSuburb;
                            setSuburbMiddleAged(newSuburbMiddleAged);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbMiddleAged[2] = null;
                            setSuburbMiddleAged(newSuburbMiddleAged);
                        }

                        // >> Set state
                        if (MiddleAgedInState) {
                            newStateMiddleAged[2] = MiddleAgedInState;
                            setStateMiddleAged(newStateMiddleAged);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateMiddleAged[2] = null;
                            setStateMiddleAged(newStateMiddleAged);
                        }

                        // >> Set Australia
                        if (MiddleAgedInAustralia) {
                            newAustraliaMiddleAged[2] = MiddleAgedInAustralia;
                            setAustraliaMiddleAged(newAustraliaMiddleAged);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaMiddleAged[2] = null;
                            setAustraliaMiddleAged(newAustraliaMiddleAged);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);

                    if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbMiddleAged[0] = null;
                        setSuburbMiddleAged(newSuburbMiddleAged);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbMiddleAged[1] = null;
                        setSuburbMiddleAged(newSuburbMiddleAged);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbMiddleAged[2] = null;
                        setSuburbMiddleAged(newSuburbMiddleAged);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbMiddleAged);
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
            suburbAdolescents: (number | null)[],
            stateAdolescents: (number | null)[],
            australiaAdolescents: (number | null)[]
        ) {
            // Define minimum and maximum variables
            let dataMin: number = 999999;
            let dataMax: number = 0;

            const combinedList = suburbAdolescents.concat(stateAdolescents, australiaAdolescents);

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

        minMax(suburbMiddleAged, stateMiddleAged, australiaMiddleAged);
    }, [suburbMiddleAged, stateMiddleAged, australiaMiddleAged]);

    console.log(dataMin);
    console.log(dataMax);

    // ! Console Log
    console.log(suburbMiddleAged);
    console.log(stateMiddleAged);
    console.log(australiaMiddleAged);
    // ! Console Log

    // * <Recharts />
    const data = [
        { name: "2011", Suburb: suburbMiddleAged[0], State: stateMiddleAged[0], Australia: australiaMiddleAged[0] },
        { name: "2016", Suburb: suburbMiddleAged[1], State: stateMiddleAged[1], Australia: australiaMiddleAged[1] },
        { name: "2021", Suburb: suburbMiddleAged[2], State: stateMiddleAged[2], Australia: australiaMiddleAged[2] },
    ];

    const renderLineChart = (
        <LineChart width={600} height={400} data={data} margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
            <Line type="natural" dataKey="Suburb" stroke="#219C90" strokeWidth={2.4} />
            <Line type="natural" dataKey="State" stroke="#068FFF" strokeWidth={1.2} />
            <Line type="natural" dataKey="Australia" stroke="#A90076" strokeWidth={1.2} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name">
                <Label value="year" position="bottom" />
            </XAxis>
            <YAxis tickCount={10} domain={[dataMin - 2, dataMax + 2]} padding={{ bottom: 20 }}>
                <Label value="" position="insideLeft" />
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
            <YAxis tickCount={10} domain={[35, 75]} padding={{ bottom: 30 }}>
                <Label value="percentage" position="insideLeft" />
            </YAxis>
            <Tooltip offset={50} cursor={false} />
            <Legend verticalAlign="top" height={36} align="center" />
            <CartesianGrid y={40}></CartesianGrid>
        </LineChart>
    );

    return (
        <>
            <div className="flex flex-col justify-center">
                <h1 className="mt-4 mb-1 text-lg text-center font-bold">Middle-aged</h1>
                <p className="text-sm text-center font-normal">
                    {"("}40 - 59 years old{")"}
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
