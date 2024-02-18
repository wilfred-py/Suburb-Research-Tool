"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, CartesianAxis } from "recharts";

interface NeverMarriedProps {
    selectedSuburb: string | null;
}

export default function NeverMarriedLineGraph(props: NeverMarriedProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);

    const [suburbNeverMarried, setSuburbNeverMarried] = useState<(number | null)[]>([null, null, null]);
    const [stateNeverMarried, setStateNeverMarried] = useState<(number | null)[]>([null, null, null]);
    const [australiaNeverMarried, setAustraliaNeverMarried] = useState<(number | null)[]>([null, null, null]);

    // States to manage instances where data does not exist
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

        setDeconstructedSuburb(suburbName);
        setDeconstructedState(stateName);

        return {
            suburbName,
            stateName,
            postcode,
        };
    }

    // * Function that fetches data for a specific year
    async function fetchNeverMarriedDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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

        // console.log(`HouseholdIncome nullCount: ${nullCount} \n HouseholdIncome numberCount: ${numberCount}`);

        return (numberCount === 1 && nullCount === 4) || nullCount === 5;
    }

    useEffect(() => {
        async function fetchData() {
            // Clear suburbHouseholdIncome from previous search
            setSuburbNeverMarried([null, null, null, null, null]);
            setStateNeverMarried([null, null, null, null, null]);
            setAustraliaNeverMarried([null, null, null, null, null]);

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchNeverMarriedDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbNeverMarried = [...suburbNeverMarried];
            const newStateNeverMarried = [...stateNeverMarried];
            const newAustraliaNeverMarried = [...australiaNeverMarried];

            //  Wait for data to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;

                try {
                    // * 2001 - registered marriage recorded slightly different

                    // * 2006 - registered marriage recorded slightly different

                    // * 2011
                    if (year == "2011") {
                        const suburbNeverMarried = data[0]["percentage_never_married_in_suburb"];
                        const stateNeverMarried = data[0]["percentage_never_married_in_state"];
                        const australiaNeverMarried = data[0]["percentage_never_married_in_australia"];

                        // >> Suburb
                        if (suburbNeverMarried) {
                            newSuburbNeverMarried[2] = suburbNeverMarried;
                            setSuburbNeverMarried(newSuburbNeverMarried);
                        } else if (!suburbNeverMarried) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbNeverMarried[2] = null;
                            setSuburbNeverMarried(newSuburbNeverMarried);
                        }

                        // >> State
                        if (stateNeverMarried) {
                            newStateNeverMarried[2] = stateNeverMarried;
                            setStateNeverMarried(newStateNeverMarried);
                        } else if (!stateNeverMarried) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateNeverMarried[2] = null;
                            setStateNeverMarried(newStateNeverMarried);
                        }

                        // >> Australia
                        if (australiaNeverMarried) {
                            newAustraliaNeverMarried[2] = australiaNeverMarried;
                            setAustraliaNeverMarried(newAustraliaNeverMarried);
                        } else if (!australiaNeverMarried) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaNeverMarried[2] = null;
                            setAustraliaNeverMarried(newAustraliaNeverMarried);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        const suburbNeverMarried = data[0]["percentage_never_married_in_suburb"];
                        const stateNeverMarried = data[0]["percentage_never_married_in_state"];
                        const australiaNeverMarried = data[0]["percentage_never_married_in_australia"];

                        // >> Suburb
                        if (suburbNeverMarried) {
                            newSuburbNeverMarried[3] = suburbNeverMarried;
                            setSuburbNeverMarried(newSuburbNeverMarried);
                        } else if (!suburbNeverMarried) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbNeverMarried[3] = null;
                            setSuburbNeverMarried(newSuburbNeverMarried);
                        }

                        // >> State
                        if (stateNeverMarried) {
                            newStateNeverMarried[3] = stateNeverMarried;
                            setStateNeverMarried(newStateNeverMarried);
                        } else if (!stateNeverMarried) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateNeverMarried[3] = null;
                            setStateNeverMarried(newStateNeverMarried);
                        }

                        // >> Australia
                        if (australiaNeverMarried) {
                            newAustraliaNeverMarried[3] = australiaNeverMarried;
                            setAustraliaNeverMarried(newAustraliaNeverMarried);
                        } else if (!australiaNeverMarried) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaNeverMarried[3] = null;
                            setAustraliaNeverMarried(newAustraliaNeverMarried);
                        }
                    }

                    // * 2021
                    else if (year === "2021") {
                        const suburbNeverMarried = data[0]["percentage_never_married_in_suburb"];
                        const stateNeverMarried = data[0]["percentage_never_married_in_state"];
                        const australiaNeverMarried = data[0]["percentage_never_married_in_australia"];

                        // >> Suburb
                        if (suburbNeverMarried) {
                            newSuburbNeverMarried[4] = suburbNeverMarried;
                            setSuburbNeverMarried(newSuburbNeverMarried);
                        } else if (!suburbNeverMarried) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbNeverMarried[4] = null;
                            setSuburbNeverMarried(newSuburbNeverMarried);
                        }

                        // >> State
                        if (stateNeverMarried) {
                            newStateNeverMarried[4] = stateNeverMarried;
                            setStateNeverMarried(newStateNeverMarried);
                        } else if (!stateNeverMarried) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateNeverMarried[4] = null;
                            setStateNeverMarried(newStateNeverMarried);
                        }

                        // >> Australia
                        if (australiaNeverMarried) {
                            newAustraliaNeverMarried[4] = australiaNeverMarried;
                            setAustraliaNeverMarried(newAustraliaNeverMarried);
                        } else if (!australiaNeverMarried) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaNeverMarried[4] = null;
                            setAustraliaNeverMarried(newAustraliaNeverMarried);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbNeverMarried[0] = null;
                        setSuburbNeverMarried(newSuburbNeverMarried);
                    } else if (year === "2006") {
                        console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbNeverMarried[1] = null;
                        setSuburbNeverMarried(newSuburbNeverMarried);
                    } else if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbNeverMarried[2] = null;
                        setSuburbNeverMarried(newSuburbNeverMarried);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbNeverMarried[3] = null;
                        setSuburbNeverMarried(newSuburbNeverMarried);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbNeverMarried[4] = null;
                        setSuburbNeverMarried(newSuburbNeverMarried);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbNeverMarried);
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
            let dataMin: number = 9999;
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

        minMax(suburbNeverMarried, stateNeverMarried, australiaNeverMarried);
    }, [suburbNeverMarried, stateNeverMarried, australiaNeverMarried]);

    // console.log(suburbNeverMarried);
    // console.log(stateNeverMarried);
    // console.log(australiaNeverMarried);

    // * <Recharts />

    const data = [
        { name: "2011", Suburb: suburbNeverMarried[2], State: stateNeverMarried[2], Australia: australiaNeverMarried[2] },
        { name: "2016", Suburb: suburbNeverMarried[3], State: stateNeverMarried[3], Australia: australiaNeverMarried[3] },
        { name: "2021", Suburb: suburbNeverMarried[4], State: stateNeverMarried[4], Australia: australiaNeverMarried[4] },
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
                <h1 className="mt-4 mb-4 text-lg text-center font-bold">Never Married</h1>
                <div className="mx-auto -mt-4">
                    {insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">Insufficient data in suburb to populate never married trends.</span>
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
