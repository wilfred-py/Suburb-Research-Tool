"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, CartesianAxis } from "recharts";

interface SeparatedProps {
    selectedSuburb: string | null;
}

export default function SeparatedLineGraph(props: SeparatedProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);

    const [suburbSeparated, setSuburbSeparated] = useState<(number | null)[]>([null, null, null]);
    const [stateSeparated, setStateSeparated] = useState<(number | null)[]>([null, null, null]);
    const [australiaSeparated, setAustraliaSeparated] = useState<(number | null)[]>([null, null, null]);

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
    async function fetchSeparatedDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            setSuburbSeparated([null, null, null, null, null]);
            setStateSeparated([null, null, null, null, null]);
            setAustraliaSeparated([null, null, null, null, null]);

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchSeparatedDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbSeparated = [...suburbSeparated];
            const newStateSeparated = [...stateSeparated];
            const newAustraliaSeparated = [...australiaSeparated];

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
                        const suburbSeparated = data[0]["percentage_separated_in_suburb"];
                        const stateSeparated = data[0]["percentage_separated_in_state"];
                        const australiaSeparated = data[0]["percentage_separated_in_australia"];

                        // >> Suburb
                        if (suburbSeparated) {
                            newSuburbSeparated[2] = suburbSeparated;
                            setSuburbSeparated(newSuburbSeparated);
                        } else if (!suburbSeparated) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbSeparated[2] = null;
                            setSuburbSeparated(newSuburbSeparated);
                        }

                        // >> State
                        if (stateSeparated) {
                            newStateSeparated[2] = stateSeparated;
                            setStateSeparated(newStateSeparated);
                        } else if (!stateSeparated) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateSeparated[2] = null;
                            setStateSeparated(newStateSeparated);
                        }

                        // >> Australia
                        if (australiaSeparated) {
                            newAustraliaSeparated[2] = australiaSeparated;
                            setAustraliaSeparated(newAustraliaSeparated);
                        } else if (!australiaSeparated) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaSeparated[2] = null;
                            setAustraliaSeparated(newAustraliaSeparated);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        const suburbSeparated = data[0]["percentage_separated_in_suburb"];
                        const stateSeparated = data[0]["percentage_separated_in_state"];
                        const australiaSeparated = data[0]["percentage_separated_in_australia"];

                        // >> Suburb
                        if (suburbSeparated) {
                            newSuburbSeparated[3] = suburbSeparated;
                            setSuburbSeparated(newSuburbSeparated);
                        } else if (!suburbSeparated) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbSeparated[3] = null;
                            setSuburbSeparated(newSuburbSeparated);
                        }

                        // >> State
                        if (stateSeparated) {
                            newStateSeparated[3] = stateSeparated;
                            setStateSeparated(newStateSeparated);
                        } else if (!stateSeparated) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateSeparated[3] = null;
                            setStateSeparated(newStateSeparated);
                        }

                        // >> Australia
                        if (australiaSeparated) {
                            newAustraliaSeparated[3] = australiaSeparated;
                            setAustraliaSeparated(newAustraliaSeparated);
                        } else if (!australiaSeparated) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaSeparated[3] = null;
                            setAustraliaSeparated(newAustraliaSeparated);
                        }
                    }

                    // * 2021
                    else if (year === "2021") {
                        const suburbSeparated = data[0]["percentage_separated_in_suburb"];
                        const stateSeparated = data[0]["percentage_separated_in_state"];
                        const australiaSeparated = data[0]["percentage_separated_in_australia"];

                        // >> Suburb
                        if (suburbSeparated) {
                            newSuburbSeparated[4] = suburbSeparated;
                            setSuburbSeparated(newSuburbSeparated);
                        } else if (!suburbSeparated) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbSeparated[4] = null;
                            setSuburbSeparated(newSuburbSeparated);
                        }

                        // >> State
                        if (stateSeparated) {
                            newStateSeparated[4] = stateSeparated;
                            setStateSeparated(newStateSeparated);
                        } else if (!stateSeparated) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateSeparated[4] = null;
                            setStateSeparated(newStateSeparated);
                        }

                        // >> Australia
                        if (australiaSeparated) {
                            newAustraliaSeparated[4] = australiaSeparated;
                            setAustraliaSeparated(newAustraliaSeparated);
                        } else if (!australiaSeparated) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaSeparated[4] = null;
                            setAustraliaSeparated(newAustraliaSeparated);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbSeparated[0] = null;
                        setSuburbSeparated(newSuburbSeparated);
                    } else if (year === "2006") {
                        console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbSeparated[1] = null;
                        setSuburbSeparated(newSuburbSeparated);
                    } else if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbSeparated[2] = null;
                        setSuburbSeparated(newSuburbSeparated);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbSeparated[3] = null;
                        setSuburbSeparated(newSuburbSeparated);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbSeparated[4] = null;
                        setSuburbSeparated(newSuburbSeparated);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbSeparated);
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

        minMax(suburbSeparated, stateSeparated, australiaSeparated);
    }, [suburbSeparated, stateSeparated, australiaSeparated]);

    // console.log(suburbSeparated);
    // console.log(stateSeparated);
    // console.log(australiaSeparated);

    // * <Recharts />

    const data = [
        { name: "2011", Suburb: suburbSeparated[2], State: stateSeparated[2], Australia: australiaSeparated[2] },
        { name: "2016", Suburb: suburbSeparated[3], State: stateSeparated[3], Australia: australiaSeparated[3] },
        { name: "2021", Suburb: suburbSeparated[4], State: stateSeparated[4], Australia: australiaSeparated[4] },
    ];

    const renderLineChart = (
        <LineChart width={600} height={400} data={data} margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
            <Line type="natural" dataKey="Suburb" stroke="#219C90" strokeWidth={2.4} />
            <Line type="natural" dataKey="State" stroke="#068FFF" strokeWidth={1.4} />
            <Line type="natural" dataKey="Australia" stroke="#A90076" strokeWidth={1.4} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name">
                <Label value="year" position="bottom" />
            </XAxis>
            <YAxis tickCount={6} domain={[dataMin, dataMax + 0.5]} padding={{ bottom: 30 }}>
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
                <Label value="$" position="insideLeft" />
            </YAxis>
            <Tooltip offset={50} cursor={false} />
            <Legend verticalAlign="top" height={36} align="center" />
            <CartesianGrid y={40}></CartesianGrid>
        </LineChart>
    );

    return (
        <div>
            <div className="flex flex-col justify-center">
                <h1 className="mt-4 mb-4 text-lg text-center font-bold">Separated</h1>
                <div className="mx-auto -mt-4">
                    {insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">Insufficient data in suburb to populate separated trends.</span>
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
