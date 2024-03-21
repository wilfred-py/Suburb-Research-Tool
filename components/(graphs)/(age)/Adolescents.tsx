"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface AdolescentsProps {
    selectedSuburb: string | null;
}

export default function Adolescents(props: AdolescentsProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [suburbAdolescents, setSuburbAdolescents] = useState<(number | null)[]>([null, null, null]);
    const [stateAdolescents, setStateAdolescents] = useState<(number | null)[]>([null, null, null]);
    const [australiaAdolescents, setAustraliaAdolescents] = useState<(number | null)[]>([null, null, null]);

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
    async function fetchAdolescentsDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            // console.log("insufficient data");
            setInsufficientSuburbData(true);
        }
        return (numberCount === 1 && nullCount === 4) || nullCount === 5;
    }

    useEffect(() => {
        async function fetchData() {
            // Clear old array values from previous search
            setSuburbAdolescents([null, null, null]);
            setStateAdolescents([null, null, null]);
            setAustraliaAdolescents([null, null, null]);

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchAdolescentsDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbAdolescents = [...suburbAdolescents];
            const newStateAdolescents = [...stateAdolescents];
            const newAustraliaAdolescents = [...australiaAdolescents];

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
                        // >> 10 - 14 y.o
                        const tenToFourteenInSuburb = parseFloat(data[0]["percentage_10_14_years_in_suburb"]);
                        const tenToFourteenInState = parseFloat(data[0]["percentage_10_14_years_in_state"]);
                        const tenToFourteenInAustralia = parseFloat(data[0]["percentage_10_14_years_in_australia"]);

                        // >> 15 - 19 y.o
                        const fifteenToNineteenSuburb = parseFloat(data[0]["percentage_15_19_years_in_suburb"]);
                        const fifteenToNineteenState = parseFloat(data[0]["percentage_15_19_years_in_state"]);
                        const fifteenToNineteenAustralia = parseFloat(data[0]["percentage_15_19_years_in_australia"]);

                        // console.log(tenToFourteenInSuburb);
                        // console.log(fifteenToNineteenSuburb);

                        const adolescentsInSuburb = Math.round((tenToFourteenInSuburb + fifteenToNineteenSuburb) * 100) / 100;
                        const adolescentsInState = Math.round((tenToFourteenInState + fifteenToNineteenState) * 100) / 100;
                        const adolescentsInAustralia = Math.round((tenToFourteenInAustralia + fifteenToNineteenAustralia) * 100) / 100;

                        // console.log(adolescentsInSuburb);
                        // console.log(adolescentsInState);
                        // console.log(adolescentsInAustralia);

                        // >> Set suburb
                        if (adolescentsInSuburb) {
                            newSuburbAdolescents[0] = adolescentsInSuburb;
                            setSuburbAdolescents(newSuburbAdolescents);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbAdolescents[0] = null;
                            setSuburbAdolescents(newSuburbAdolescents);
                        }

                        // >> Set state
                        if (adolescentsInState) {
                            newStateAdolescents[0] = adolescentsInState;
                            setStateAdolescents(newStateAdolescents);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbAdolescents[0] = null;
                            setStateAdolescents(newStateAdolescents);
                        }

                        // >> Set Australia
                        if (adolescentsInAustralia) {
                            newAustraliaAdolescents[0] = adolescentsInAustralia;
                            setAustraliaAdolescents(newAustraliaAdolescents);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbAdolescents[0] = null;
                            setAustraliaAdolescents(newAustraliaAdolescents);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        // >> 10 - 14 y.o
                        const tenToFourteenInSuburb = parseFloat(data[0]["percentage_10_14_years_in_suburb"]);
                        const tenToFourteenInState = parseFloat(data[0]["percentage_10_14_years_in_state"]);
                        const tenToFourteenInAustralia = parseFloat(data[0]["percentage_10_14_years_in_australia"]);

                        // >> 15 - 19 y.o
                        const fifteenToNineteenSuburb = parseFloat(data[0]["percentage_15_19_years_in_suburb"]);
                        const fifteenToNineteenState = parseFloat(data[0]["percentage_15_19_years_in_state"]);
                        const fifteenToNineteenAustralia = parseFloat(data[0]["percentage_15_19_years_in_australia"]);

                        // console.log(tenToFourteenInSuburb);
                        // console.log(fifteenToNineteenSuburb);

                        const adolescentsInSuburb = Math.round((tenToFourteenInSuburb + fifteenToNineteenSuburb) * 100) / 100;
                        const adolescentsInState = Math.round((tenToFourteenInState + fifteenToNineteenState) * 100) / 100;
                        const adolescentsInAustralia = Math.round((tenToFourteenInAustralia + fifteenToNineteenAustralia) * 100) / 100;

                        // console.log(adolescentsInSuburb);
                        // console.log(adolescentsInState);
                        // console.log(adolescentsInAustralia);

                        // >> Set suburb
                        if (adolescentsInSuburb) {
                            newSuburbAdolescents[1] = adolescentsInSuburb;
                            setSuburbAdolescents(newSuburbAdolescents);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbAdolescents[1] = null;
                            setSuburbAdolescents(newSuburbAdolescents);
                        }

                        // >> Set state
                        if (adolescentsInState) {
                            newStateAdolescents[1] = adolescentsInState;
                            setStateAdolescents(newStateAdolescents);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbAdolescents[1] = null;
                            setStateAdolescents(newStateAdolescents);
                        }

                        // >> Set Australia
                        if (adolescentsInAustralia) {
                            newAustraliaAdolescents[1] = adolescentsInAustralia;
                            setAustraliaAdolescents(newAustraliaAdolescents);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbAdolescents[1] = null;
                            setAustraliaAdolescents(newAustraliaAdolescents);
                        }
                    }

                    // * 2021
                    else if (year == "2021") {
                        // >> 10 - 14 y.o
                        const tenToFourteenInSuburb = parseFloat(data[0]["percentage_10_14_years_in_suburb"]);
                        const tenToFourteenInState = parseFloat(data[0]["percentage_10_14_years_in_state"]);
                        const tenToFourteenInAustralia = parseFloat(data[0]["percentage_10_14_years_in_australia"]);

                        // >> 15 - 19 y.o
                        const fifteenToNineteenSuburb = parseFloat(data[0]["percentage_15_19_years_in_suburb"]);
                        const fifteenToNineteenState = parseFloat(data[0]["percentage_15_19_years_in_state"]);
                        const fifteenToNineteenAustralia = parseFloat(data[0]["percentage_15_19_years_in_australia"]);

                        // console.log(tenToFourteenInSuburb);
                        // console.log(fifteenToNineteenSuburb);

                        const adolescentsInSuburb = Math.round((tenToFourteenInSuburb + fifteenToNineteenSuburb) * 100) / 100;
                        const adolescentsInState = Math.round((tenToFourteenInState + fifteenToNineteenState) * 100) / 100;
                        const adolescentsInAustralia = Math.round((tenToFourteenInAustralia + fifteenToNineteenAustralia) * 100) / 100;

                        // console.log(adolescentsInSuburb);
                        // console.log(adolescentsInState);
                        // console.log(adolescentsInAustralia);

                        // >> Set suburb
                        if (adolescentsInSuburb) {
                            newSuburbAdolescents[2] = adolescentsInSuburb;
                            setSuburbAdolescents(newSuburbAdolescents);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbAdolescents[2] = null;
                            setSuburbAdolescents(newSuburbAdolescents);
                        }

                        // >> Set state
                        if (adolescentsInState) {
                            newStateAdolescents[2] = adolescentsInState;
                            setStateAdolescents(newStateAdolescents);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbAdolescents[2] = null;
                            setStateAdolescents(newStateAdolescents);
                        }

                        // >> Set Australia
                        if (adolescentsInAustralia) {
                            newAustraliaAdolescents[2] = adolescentsInAustralia;
                            setAustraliaAdolescents(newAustraliaAdolescents);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbAdolescents[2] = null;
                            setAustraliaAdolescents(newAustraliaAdolescents);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);

                    if (year === "2011") {
                        // console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbAdolescents[0] = null;
                        setSuburbAdolescents(newSuburbAdolescents);
                    } else if (year === "2016") {
                        // console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbAdolescents[1] = null;
                        setSuburbAdolescents(newSuburbAdolescents);
                    } else if (year === "2021") {
                        // console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbAdolescents[2] = null;
                        setSuburbAdolescents(newSuburbAdolescents);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbAdolescents);
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

        minMax(suburbAdolescents, stateAdolescents, australiaAdolescents);
    }, [suburbAdolescents, stateAdolescents, australiaAdolescents]);

    // console.log(dataMin);
    // console.log(dataMax);

    // ! Console Log
    // console.log(suburbAdolescents);
    // console.log(stateAdolescents);
    // console.log(australiaAdolescents);
    // ! Console Log

    // * <Recharts />
    const data = [
        { name: "2011", Suburb: suburbAdolescents[0], State: stateAdolescents[0], Australia: australiaAdolescents[0] },
        { name: "2016", Suburb: suburbAdolescents[1], State: stateAdolescents[1], Australia: australiaAdolescents[1] },
        { name: "2021", Suburb: suburbAdolescents[2], State: stateAdolescents[2], Australia: australiaAdolescents[2] },
    ];

    const renderLineChart = (
        <div className="w-96 mobile-s:max-mobile-m:w-[240px] mobile-m:max-mobile-l:w-[260px] mobile-s:h-[440px] mobile-s:max-sm:mt-10 sm:max-md:mt-12 md:mt-6">
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
        <div className="w-96 mobile-s:max-mobile-m:w-[240px] mobile-m:max-mobile-l:w-[260px] mobile-s:h-[440px] mobile-s:max-sm:mt-10 sm:max-md:mt-12 md:mt-6">
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
                <h1 className="mt-4 mb-1 text-lg text-center font-bold">Adolescents</h1>
                <p className="text-sm text-center font-normal">
                    {"("}10 - 19 years old{")"}
                </p>
                <div className="mx-auto mt-1 mobile-s:max-md:-mt-4">
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
