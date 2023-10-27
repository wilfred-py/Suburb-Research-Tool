"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

interface SeniorsProps {
    selectedSuburb: string | null;
}

export default function Seniors(props: SeniorsProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [suburbSeniors, setSuburbSeniors] = useState<(number | null)[]>([null, null, null]);
    const [stateSeniors, setStateSeniors] = useState<(number | null)[]>([null, null, null]);
    const [australiaSeniors, setAustraliaSeniors] = useState<(number | null)[]>([null, null, null]);

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
    async function fetchSeniorsDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            setSuburbSeniors([null, null, null]);
            setStateSeniors([null, null, null]);
            setAustraliaSeniors([null, null, null]);

            console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchSeniorsDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbSeniors = [...suburbSeniors];
            const newStateSeniors = [...stateSeniors];
            const newAustraliaSeniors = [...australiaSeniors];

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
                        // >> 60 - 64 y.o
                        const earlySixtiesInSuburb = parseFloat(data[0]["percentage_60_64_years_in_suburb"]);
                        const earlySixtiesInState = parseFloat(data[0]["percentage_60_64_years_in_state"]);
                        const earlySixtiesInAustralia = parseFloat(data[0]["percentage_60_64_years_in_australia"]);

                        // >> 65 - 69  y.o
                        const lateSixtiesSuburb = parseFloat(data[0]["percentage_65_69_years_in_suburb"]);
                        const lateSixtiesState = parseFloat(data[0]["percentage_65_69_years_in_state"]);
                        const lateSixtiesAustralia = parseFloat(data[0]["percentage_65_69_years_in_australia"]);

                        // >> 70 - 74  y.o
                        const earlySeventiesSuburb = parseFloat(data[0]["percentage_70_74_years_in_suburb"]);
                        const earlySeventiesState = parseFloat(data[0]["percentage_70_74_years_in_state"]);
                        const earlySeventiesAustralia = parseFloat(data[0]["percentage_70_74_years_in_australia"]);

                        // >> 75 - 79  y.o
                        const lateSeventiesSuburb = parseFloat(data[0]["percentage_75_79_years_in_suburb"]);
                        const lateSeventiesState = parseFloat(data[0]["percentage_75_79_years_in_state"]);
                        const lateSeventiesAustralia = parseFloat(data[0]["percentage_75_79_years_in_australia"]);

                        // >> 80 - 84  y.o
                        const earlyEightiesSuburb = parseFloat(data[0]["percentage_70_74_years_in_suburb"]);
                        const earlyEightiesState = parseFloat(data[0]["percentage_70_74_years_in_state"]);
                        const earlyEightiesAustralia = parseFloat(data[0]["percentage_70_74_years_in_australia"]);

                        // >> 85+ y.o
                        const EightiesPlusSuburb = parseFloat(data[0]["percentage_85_years_and_over_in_suburb"]);
                        const EightiesPlusState = parseFloat(data[0]["percentage_85_years_and_over_in_state"]);
                        const EightiesPlusAustralia = parseFloat(data[0]["percentage_85_years_and_over_in_australia"]);

                        const seniorsInSuburb =
                            Math.round(
                                (earlySixtiesInSuburb +
                                    lateSixtiesSuburb +
                                    earlySeventiesSuburb +
                                    lateSeventiesSuburb +
                                    earlyEightiesSuburb +
                                    EightiesPlusSuburb) *
                                    100
                            ) / 100;
                        const seniorsInState =
                            Math.round(
                                (earlySixtiesInState +
                                    lateSixtiesState +
                                    earlySeventiesState +
                                    lateSeventiesState +
                                    earlyEightiesState +
                                    EightiesPlusState) *
                                    100
                            ) / 100;
                        const seniorsInAustralia =
                            Math.round(
                                (earlySixtiesInAustralia +
                                    lateSixtiesAustralia +
                                    earlySeventiesAustralia +
                                    lateSeventiesAustralia +
                                    earlyEightiesAustralia +
                                    EightiesPlusAustralia) *
                                    100
                            ) / 100;

                        console.log(seniorsInSuburb);
                        console.log(seniorsInState);
                        console.log(seniorsInAustralia);

                        // >> Set suburb
                        if (seniorsInSuburb) {
                            newSuburbSeniors[0] = seniorsInSuburb;
                            setSuburbSeniors(newSuburbSeniors);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbSeniors[0] = null;
                            setSuburbSeniors(newSuburbSeniors);
                        }

                        // >> Set state
                        if (stateSeniors) {
                            newStateSeniors[0] = seniorsInState;
                            setStateSeniors(newStateSeniors);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateSeniors[0] = null;
                            setStateSeniors(newStateSeniors);
                        }

                        // >> Set Australia
                        if (seniorsInAustralia) {
                            newAustraliaSeniors[0] = seniorsInAustralia;
                            setAustraliaSeniors(newAustraliaSeniors);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaSeniors[0] = null;
                            setAustraliaSeniors(newAustraliaSeniors);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        // >> 60 - 64 y.o
                        const earlySixtiesInSuburb = parseFloat(data[0]["percentage_60_64_years_in_suburb"]);
                        const earlySixtiesInState = parseFloat(data[0]["percentage_60_64_years_in_state"]);
                        const earlySixtiesInAustralia = parseFloat(data[0]["percentage_60_64_years_in_australia"]);

                        // >> 65 - 69  y.o
                        const lateSixtiesSuburb = parseFloat(data[0]["percentage_65_69_years_in_suburb"]);
                        const lateSixtiesState = parseFloat(data[0]["percentage_65_69_years_in_state"]);
                        const lateSixtiesAustralia = parseFloat(data[0]["percentage_65_69_years_in_australia"]);

                        // >> 70 - 74  y.o
                        const earlySeventiesSuburb = parseFloat(data[0]["percentage_70_74_years_in_suburb"]);
                        const earlySeventiesState = parseFloat(data[0]["percentage_70_74_years_in_state"]);
                        const earlySeventiesAustralia = parseFloat(data[0]["percentage_70_74_years_in_australia"]);

                        // >> 75 - 79  y.o
                        const lateSeventiesSuburb = parseFloat(data[0]["percentage_75_79_years_in_suburb"]);
                        const lateSeventiesState = parseFloat(data[0]["percentage_75_79_years_in_state"]);
                        const lateSeventiesAustralia = parseFloat(data[0]["percentage_75_79_years_in_australia"]);

                        // >> 80 - 84  y.o
                        const earlyEightiesSuburb = parseFloat(data[0]["percentage_70_74_years_in_suburb"]);
                        const earlyEightiesState = parseFloat(data[0]["percentage_70_74_years_in_state"]);
                        const earlyEightiesAustralia = parseFloat(data[0]["percentage_70_74_years_in_australia"]);

                        // >> 85+ y.o
                        const EightiesPlusSuburb = parseFloat(data[0]["percentage_85_years_and_over_in_suburb"]);
                        const EightiesPlusState = parseFloat(data[0]["percentage_85_years_and_over_in_state"]);
                        const EightiesPlusAustralia = parseFloat(data[0]["percentage_85_years_and_over_in_australia"]);

                        const seniorsInSuburb =
                            Math.round(
                                (earlySixtiesInSuburb +
                                    lateSixtiesSuburb +
                                    earlySeventiesSuburb +
                                    lateSeventiesSuburb +
                                    earlyEightiesSuburb +
                                    EightiesPlusSuburb) *
                                    100
                            ) / 100;
                        const seniorsInState =
                            Math.round(
                                (earlySixtiesInState +
                                    lateSixtiesState +
                                    earlySeventiesState +
                                    lateSeventiesState +
                                    earlyEightiesState +
                                    EightiesPlusState) *
                                    100
                            ) / 100;
                        const seniorsInAustralia =
                            Math.round(
                                (earlySixtiesInAustralia +
                                    lateSixtiesAustralia +
                                    earlySeventiesAustralia +
                                    lateSeventiesAustralia +
                                    earlyEightiesAustralia +
                                    EightiesPlusAustralia) *
                                    100
                            ) / 100;

                        console.log(seniorsInSuburb);
                        console.log(seniorsInState);
                        console.log(seniorsInAustralia);

                        // >> Set suburb
                        if (seniorsInSuburb) {
                            newSuburbSeniors[1] = seniorsInSuburb;
                            setSuburbSeniors(newSuburbSeniors);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbSeniors[1] = null;
                            setSuburbSeniors(newSuburbSeniors);
                        }

                        // >> Set state
                        if (stateSeniors) {
                            newStateSeniors[1] = seniorsInState;
                            setStateSeniors(newStateSeniors);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateSeniors[1] = null;
                            setStateSeniors(newStateSeniors);
                        }

                        // >> Set Australia
                        if (seniorsInAustralia) {
                            newAustraliaSeniors[1] = seniorsInAustralia;
                            setAustraliaSeniors(newAustraliaSeniors);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaSeniors[1] = null;
                            setAustraliaSeniors(newAustraliaSeniors);
                        }
                    }

                    // * 2021
                    else if (year == "2021") {
                        // >> 60 - 64 y.o
                        const earlySixtiesInSuburb = parseFloat(data[0]["percentage_60_64_years_in_suburb"]);
                        const earlySixtiesInState = parseFloat(data[0]["percentage_60_64_years_in_state"]);
                        const earlySixtiesInAustralia = parseFloat(data[0]["percentage_60_64_years_in_australia"]);

                        // >> 65 - 69  y.o
                        const lateSixtiesSuburb = parseFloat(data[0]["percentage_65_69_years_in_suburb"]);
                        const lateSixtiesState = parseFloat(data[0]["percentage_65_69_years_in_state"]);
                        const lateSixtiesAustralia = parseFloat(data[0]["percentage_65_69_years_in_australia"]);

                        // >> 70 - 74  y.o
                        const earlySeventiesSuburb = parseFloat(data[0]["percentage_70_74_years_in_suburb"]);
                        const earlySeventiesState = parseFloat(data[0]["percentage_70_74_years_in_state"]);
                        const earlySeventiesAustralia = parseFloat(data[0]["percentage_70_74_years_in_australia"]);

                        // >> 75 - 79  y.o
                        const lateSeventiesSuburb = parseFloat(data[0]["percentage_75_79_years_in_suburb"]);
                        const lateSeventiesState = parseFloat(data[0]["percentage_75_79_years_in_state"]);
                        const lateSeventiesAustralia = parseFloat(data[0]["percentage_75_79_years_in_australia"]);

                        // >> 80 - 84  y.o
                        const earlyEightiesSuburb = parseFloat(data[0]["percentage_70_74_years_in_suburb"]);
                        const earlyEightiesState = parseFloat(data[0]["percentage_70_74_years_in_state"]);
                        const earlyEightiesAustralia = parseFloat(data[0]["percentage_70_74_years_in_australia"]);

                        // >> 85+ y.o
                        const EightiesPlusSuburb = parseFloat(data[0]["percentage_85_years_and_over_in_suburb"]);
                        const EightiesPlusState = parseFloat(data[0]["percentage_85_years_and_over_in_state"]);
                        const EightiesPlusAustralia = parseFloat(data[0]["percentage_85_years_and_over_in_australia"]);

                        const seniorsInSuburb =
                            Math.round(
                                (earlySixtiesInSuburb +
                                    lateSixtiesSuburb +
                                    earlySeventiesSuburb +
                                    lateSeventiesSuburb +
                                    earlyEightiesSuburb +
                                    EightiesPlusSuburb) *
                                    100
                            ) / 100;
                        const seniorsInState =
                            Math.round(
                                (earlySixtiesInState +
                                    lateSixtiesState +
                                    earlySeventiesState +
                                    lateSeventiesState +
                                    earlyEightiesState +
                                    EightiesPlusState) *
                                    100
                            ) / 100;
                        const seniorsInAustralia =
                            Math.round(
                                (earlySixtiesInAustralia +
                                    lateSixtiesAustralia +
                                    earlySeventiesAustralia +
                                    lateSeventiesAustralia +
                                    earlyEightiesAustralia +
                                    EightiesPlusAustralia) *
                                    100
                            ) / 100;

                        console.log(seniorsInSuburb);
                        console.log(seniorsInState);
                        console.log(seniorsInAustralia);

                        // >> Set suburb
                        if (seniorsInSuburb) {
                            newSuburbSeniors[2] = seniorsInSuburb;
                            setSuburbSeniors(newSuburbSeniors);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbSeniors[2] = null;
                            setSuburbSeniors(newSuburbSeniors);
                        }

                        // >> Set state
                        if (stateSeniors) {
                            newStateSeniors[2] = seniorsInState;
                            setStateSeniors(newStateSeniors);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateSeniors[2] = null;
                            setStateSeniors(newStateSeniors);
                        }

                        // >> Set Australia
                        if (seniorsInAustralia) {
                            newAustraliaSeniors[2] = seniorsInAustralia;
                            setAustraliaSeniors(newAustraliaSeniors);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaSeniors[2] = null;
                            setAustraliaSeniors(newAustraliaSeniors);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);

                    if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbSeniors[0] = null;
                        setSuburbSeniors(newSuburbSeniors);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbSeniors[1] = null;
                        setSuburbSeniors(newSuburbSeniors);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbSeniors[2] = null;
                        setSuburbSeniors(newSuburbSeniors);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbSeniors);
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

        minMax(suburbSeniors, stateSeniors, australiaSeniors);
    }, [suburbSeniors, stateSeniors, australiaSeniors]);

    console.log(dataMin);
    console.log(dataMax);

    // ! Console Log
    console.log(suburbSeniors);
    console.log(stateSeniors);
    console.log(australiaSeniors);
    // ! Console Log

    // * <Recharts />
    const data = [
        { name: "2011", Suburb: suburbSeniors[0], State: stateSeniors[0], Australia: australiaSeniors[0] },
        { name: "2016", Suburb: suburbSeniors[1], State: stateSeniors[1], Australia: australiaSeniors[1] },
        { name: "2021", Suburb: suburbSeniors[2], State: stateSeniors[2], Australia: australiaSeniors[2] },
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
                <h1 className="mt-4 mb-1 text-lg text-center font-bold">Seniors</h1>
                <p className="text-sm text-center font-normal">
                    {"("}60+ years old{")"}
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
