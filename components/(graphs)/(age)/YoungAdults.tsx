"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface YoungAdultsProps {
    selectedSuburb: string | null;
}

export default function YoungAdults(props: YoungAdultsProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [suburbYoungAdults, setSuburbYoungAdults] = useState<(number | null)[]>([null, null, null]);
    const [stateYoungAdults, setStateYoungAdults] = useState<(number | null)[]>([null, null, null]);
    const [australiaYoungAdults, setAustraliaYoungAdults] = useState<(number | null)[]>([null, null, null]);

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
    async function fetchYoungAdultsDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            setSuburbYoungAdults([null, null, null]);
            setStateYoungAdults([null, null, null]);
            setAustraliaYoungAdults([null, null, null]);

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchYoungAdultsDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbYoungAdults = [...suburbYoungAdults];
            const newStateYoungAdults = [...stateYoungAdults];
            const newAustraliraYoungAdults = [...australiaYoungAdults];

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
                        // >> 20 - 24 y.o
                        const earlyTwentiesInSuburb = parseFloat(data[0]["percentage_20_24_years_in_suburb"]);
                        const earlyTwentiesInState = parseFloat(data[0]["percentage_20_24_years_in_state"]);
                        const earlyTwentiesInAustralia = parseFloat(data[0]["percentage_20_24_years_in_australia"]);

                        // >> 25 - 29  y.o
                        const lateTwentiesSuburb = parseFloat(data[0]["percentage_25_29_years_in_suburb"]);
                        const lateTwentiesState = parseFloat(data[0]["percentage_25_29_years_in_state"]);
                        const lateTwentiesAustralia = parseFloat(data[0]["percentage_25_29_years_in_australia"]);

                        // >> 30 - 34  y.o
                        const earlyThirtiesSuburb = parseFloat(data[0]["percentage_30_34_years_in_suburb"]);
                        const earlyThirtiesState = parseFloat(data[0]["percentage_30_34_years_in_state"]);
                        const earlyThirtiesAustralia = parseFloat(data[0]["percentage_30_34_years_in_australia"]);

                        // >> 35 - 39  y.o
                        const lateThirtiesSuburb = parseFloat(data[0]["percentage_35_39_years_in_suburb"]);
                        const lateThirtiesState = parseFloat(data[0]["percentage_35_39_years_in_state"]);
                        const lateThirtiesAustralia = parseFloat(data[0]["percentage_35_39_years_in_australia"]);

                        const youngAdultsInSuburb =
                            Math.round((earlyTwentiesInSuburb + lateTwentiesSuburb + earlyThirtiesSuburb + lateThirtiesSuburb) * 100) / 100;
                        const youngAdultsInState =
                            Math.round((earlyTwentiesInState + lateTwentiesState + earlyThirtiesState + lateThirtiesState) * 100) / 100;
                        const youngAdultsInAustralia =
                            Math.round(
                                (earlyTwentiesInAustralia + lateTwentiesAustralia + earlyThirtiesAustralia + lateThirtiesAustralia) * 100
                            ) / 100;

                        // console.log(youngAdultsInSuburb);
                        // console.log(youngAdultsInState);
                        // console.log(youngAdultsInAustralia);

                        // >> Set suburb
                        if (youngAdultsInSuburb) {
                            newSuburbYoungAdults[0] = youngAdultsInSuburb;
                            setSuburbYoungAdults(newSuburbYoungAdults);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbYoungAdults[0] = null;
                            setSuburbYoungAdults(newSuburbYoungAdults);
                        }

                        // >> Set state
                        if (youngAdultsInState) {
                            newStateYoungAdults[0] = youngAdultsInState;
                            setStateYoungAdults(newStateYoungAdults);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbYoungAdults[0] = null;
                            setStateYoungAdults(newStateYoungAdults);
                        }

                        // >> Set Australia
                        if (youngAdultsInAustralia) {
                            newAustraliraYoungAdults[0] = youngAdultsInAustralia;
                            setAustraliaYoungAdults(newAustraliraYoungAdults);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliraYoungAdults[0] = null;
                            setAustraliaYoungAdults(newAustraliraYoungAdults);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        // >> 20 - 24 y.o
                        const earlyTwentiesInSuburb = parseFloat(data[0]["percentage_20_24_years_in_suburb"]);
                        const earlyTwentiesInState = parseFloat(data[0]["percentage_20_24_years_in_state"]);
                        const earlyTwentiesInAustralia = parseFloat(data[0]["percentage_20_24_years_in_australia"]);

                        // >> 25 - 29  y.o
                        const lateTwentiesSuburb = parseFloat(data[0]["percentage_25_29_years_in_suburb"]);
                        const lateTwentiesState = parseFloat(data[0]["percentage_25_29_years_in_state"]);
                        const lateTwentiesAustralia = parseFloat(data[0]["percentage_25_29_years_in_australia"]);

                        // >> 30 - 34  y.o
                        const earlyThirtiesSuburb = parseFloat(data[0]["percentage_30_34_years_in_suburb"]);
                        const earlyThirtiesState = parseFloat(data[0]["percentage_30_34_years_in_state"]);
                        const earlyThirtiesAustralia = parseFloat(data[0]["percentage_30_34_years_in_australia"]);

                        // >> 35 - 39  y.o
                        const lateThirtiesSuburb = parseFloat(data[0]["percentage_35_39_years_in_suburb"]);
                        const lateThirtiesState = parseFloat(data[0]["percentage_35_39_years_in_state"]);
                        const lateThirtiesAustralia = parseFloat(data[0]["percentage_35_39_years_in_australia"]);

                        const youngAdultsInSuburb =
                            Math.round((earlyTwentiesInSuburb + lateTwentiesSuburb + earlyThirtiesSuburb + lateThirtiesSuburb) * 100) / 100;
                        const youngAdultsInState =
                            Math.round((earlyTwentiesInState + lateTwentiesState + earlyThirtiesState + lateThirtiesState) * 100) / 100;
                        const youngAdultsInAustralia =
                            Math.round(
                                (earlyTwentiesInAustralia + lateTwentiesAustralia + earlyThirtiesAustralia + lateThirtiesAustralia) * 100
                            ) / 100;

                        // console.log(youngAdultsInSuburb);
                        // console.log(youngAdultsInState);
                        // console.log(youngAdultsInAustralia);

                        // >> Set suburb
                        if (youngAdultsInSuburb) {
                            newSuburbYoungAdults[1] = youngAdultsInSuburb;
                            setSuburbYoungAdults(newSuburbYoungAdults);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbYoungAdults[1] = null;
                            setSuburbYoungAdults(newSuburbYoungAdults);
                        }

                        // >> Set state
                        if (youngAdultsInState) {
                            newStateYoungAdults[1] = youngAdultsInState;
                            setStateYoungAdults(newStateYoungAdults);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbYoungAdults[1] = null;
                            setStateYoungAdults(newStateYoungAdults);
                        }

                        // >> Set Australia
                        if (youngAdultsInAustralia) {
                            newAustraliraYoungAdults[1] = youngAdultsInAustralia;
                            setAustraliaYoungAdults(newAustraliraYoungAdults);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliraYoungAdults[1] = null;
                            setAustraliaYoungAdults(newAustraliraYoungAdults);
                        }
                    }

                    // * 2021
                    else if (year == "2021") {
                        // >> 20 - 24 y.o
                        const earlyTwentiesInSuburb = parseFloat(data[0]["percentage_20_24_years_in_suburb"]);
                        const earlyTwentiesInState = parseFloat(data[0]["percentage_20_24_years_in_state"]);
                        const earlyTwentiesInAustralia = parseFloat(data[0]["percentage_20_24_years_in_australia"]);

                        // >> 25 - 29  y.o
                        const lateTwentiesSuburb = parseFloat(data[0]["percentage_25_29_years_in_suburb"]);
                        const lateTwentiesState = parseFloat(data[0]["percentage_25_29_years_in_state"]);
                        const lateTwentiesAustralia = parseFloat(data[0]["percentage_25_29_years_in_australia"]);

                        // >> 30 - 34  y.o
                        const earlyThirtiesSuburb = parseFloat(data[0]["percentage_30_34_years_in_suburb"]);
                        const earlyThirtiesState = parseFloat(data[0]["percentage_30_34_years_in_state"]);
                        const earlyThirtiesAustralia = parseFloat(data[0]["percentage_30_34_years_in_australia"]);

                        // >> 35 - 39  y.o
                        const lateThirtiesSuburb = parseFloat(data[0]["percentage_35_39_years_in_suburb"]);
                        const lateThirtiesState = parseFloat(data[0]["percentage_35_39_years_in_state"]);
                        const lateThirtiesAustralia = parseFloat(data[0]["percentage_35_39_years_in_australia"]);

                        const youngAdultsInSuburb =
                            Math.round((earlyTwentiesInSuburb + lateTwentiesSuburb + earlyThirtiesSuburb + lateThirtiesSuburb) * 100) / 100;
                        const youngAdultsInState =
                            Math.round((earlyTwentiesInState + lateTwentiesState + earlyThirtiesState + lateThirtiesState) * 100) / 100;
                        const youngAdultsInAustralia =
                            Math.round(
                                (earlyTwentiesInAustralia + lateTwentiesAustralia + earlyThirtiesAustralia + lateThirtiesAustralia) * 100
                            ) / 100;

                        // console.log(youngAdultsInSuburb);
                        // console.log(youngAdultsInState);
                        // console.log(youngAdultsInAustralia);

                        // >> Set suburb
                        if (youngAdultsInSuburb) {
                            newSuburbYoungAdults[2] = youngAdultsInSuburb;
                            setSuburbYoungAdults(newSuburbYoungAdults);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbYoungAdults[2] = null;
                            setSuburbYoungAdults(newSuburbYoungAdults);
                        }

                        // >> Set state
                        if (youngAdultsInState) {
                            newStateYoungAdults[2] = youngAdultsInState;
                            setStateYoungAdults(newStateYoungAdults);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbYoungAdults[2] = null;
                            setStateYoungAdults(newStateYoungAdults);
                        }

                        // >> Set Australia
                        if (youngAdultsInAustralia) {
                            newAustraliraYoungAdults[2] = youngAdultsInAustralia;
                            setAustraliaYoungAdults(newAustraliraYoungAdults);
                        } else {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliraYoungAdults[2] = null;
                            setAustraliaYoungAdults(newAustraliraYoungAdults);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);

                    if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbYoungAdults[0] = null;
                        setSuburbYoungAdults(newSuburbYoungAdults);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbYoungAdults[1] = null;
                        setSuburbYoungAdults(newSuburbYoungAdults);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbYoungAdults[2] = null;
                        setSuburbYoungAdults(newSuburbYoungAdults);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbYoungAdults);
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

        minMax(suburbYoungAdults, stateYoungAdults, australiaYoungAdults);
    }, [suburbYoungAdults, stateYoungAdults, australiaYoungAdults]);

    // console.log(dataMin);
    // console.log(dataMax);

    // ! Console Log
    // console.log(suburbYoungAdults);
    // console.log(stateYoungAdults);
    // console.log(australiaYoungAdults);
    // ! Console Log

    // * <Recharts />
    const data = [
        { name: "2011", Suburb: suburbYoungAdults[0], State: stateYoungAdults[0], Australia: australiaYoungAdults[0] },
        { name: "2016", Suburb: suburbYoungAdults[1], State: stateYoungAdults[1], Australia: australiaYoungAdults[1] },
        { name: "2021", Suburb: suburbYoungAdults[2], State: stateYoungAdults[2], Australia: australiaYoungAdults[2] },
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
                <h1 className="mt-4 mb-1 text-lg text-center font-bold">Young Adults</h1>
                <p className="text-sm text-center font-normal">
                    {"("}20 - 39 years old{")"}
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
