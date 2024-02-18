"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, CartesianAxis } from "recharts";

interface DivorcedProps {
    selectedSuburb: string | null;
}

export default function DivorcedLineGraph(props: DivorcedProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);

    const [suburbDivorced, setSuburbDivorced] = useState<(number | null)[]>([null, null, null]);
    const [stateDivorced, setStateDivorced] = useState<(number | null)[]>([null, null, null]);
    const [australiaDivorced, setAustraliaDivorced] = useState<(number | null)[]>([null, null, null]);

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
    async function fetchDivorcedDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            setSuburbDivorced([null, null, null, null, null]);
            setStateDivorced([null, null, null, null, null]);
            setAustraliaDivorced([null, null, null, null, null]);

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchDivorcedDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbDivorced = [...suburbDivorced];
            const newStateDivorced = [...stateDivorced];
            const newAustraliaDivorced = [...australiaDivorced];

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
                        const suburbDivorced = data[0]["percentage_divorced_in_suburb"];
                        const stateDivorced = data[0]["percentage_divorced_in_state"];
                        const australiaDivorced = data[0]["percentage_divorced_in_australia"];

                        // >> Suburb
                        if (suburbDivorced) {
                            newSuburbDivorced[2] = suburbDivorced;
                            setSuburbDivorced(newSuburbDivorced);
                        } else if (!suburbDivorced) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbDivorced[2] = null;
                            setSuburbDivorced(newSuburbDivorced);
                        }

                        // >> State
                        if (stateDivorced) {
                            newStateDivorced[2] = stateDivorced;
                            setStateDivorced(newStateDivorced);
                        } else if (!stateDivorced) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateDivorced[2] = null;
                            setStateDivorced(newStateDivorced);
                        }

                        // >> Australia
                        if (australiaDivorced) {
                            newAustraliaDivorced[2] = australiaDivorced;
                            setAustraliaDivorced(newAustraliaDivorced);
                        } else if (!australiaDivorced) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaDivorced[2] = null;
                            setAustraliaDivorced(newAustraliaDivorced);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        const suburbDivorced = data[0]["percentage_divorced_in_suburb"];
                        const stateDivorced = data[0]["percentage_divorced_in_state"];
                        const australiaDivorced = data[0]["percentage_divorced_in_australia"];

                        // >> Suburb
                        if (suburbDivorced) {
                            newSuburbDivorced[3] = suburbDivorced;
                            setSuburbDivorced(newSuburbDivorced);
                        } else if (!suburbDivorced) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbDivorced[3] = null;
                            setSuburbDivorced(newSuburbDivorced);
                        }

                        // >> State
                        if (stateDivorced) {
                            newStateDivorced[3] = stateDivorced;
                            setStateDivorced(newStateDivorced);
                        } else if (!stateDivorced) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateDivorced[3] = null;
                            setStateDivorced(newStateDivorced);
                        }

                        // >> Australia
                        if (australiaDivorced) {
                            newAustraliaDivorced[3] = australiaDivorced;
                            setAustraliaDivorced(newAustraliaDivorced);
                        } else if (!australiaDivorced) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaDivorced[3] = null;
                            setAustraliaDivorced(newAustraliaDivorced);
                        }
                    }

                    // * 2021
                    else if (year === "2021") {
                        const suburbDivorced = data[0]["percentage_divorced_in_suburb"];
                        const stateDivorced = data[0]["percentage_divorced_in_state"];
                        const australiaDivorced = data[0]["percentage_divorced_in_australia"];

                        // >> Suburb
                        if (suburbDivorced) {
                            newSuburbDivorced[4] = suburbDivorced;
                            setSuburbDivorced(newSuburbDivorced);
                        } else if (!suburbDivorced) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbDivorced[4] = null;
                            setSuburbDivorced(newSuburbDivorced);
                        }

                        // >> State
                        if (stateDivorced) {
                            newStateDivorced[4] = stateDivorced;
                            setStateDivorced(newStateDivorced);
                        } else if (!stateDivorced) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateDivorced[4] = null;
                            setStateDivorced(newStateDivorced);
                        }

                        // >> Australia
                        if (australiaDivorced) {
                            newAustraliaDivorced[4] = australiaDivorced;
                            setAustraliaDivorced(newAustraliaDivorced);
                        } else if (!australiaDivorced) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaDivorced[4] = null;
                            setAustraliaDivorced(newAustraliaDivorced);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbDivorced[0] = null;
                        setSuburbDivorced(newSuburbDivorced);
                    } else if (year === "2006") {
                        console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbDivorced[1] = null;
                        setSuburbDivorced(newSuburbDivorced);
                    } else if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbDivorced[2] = null;
                        setSuburbDivorced(newSuburbDivorced);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbDivorced[3] = null;
                        setSuburbDivorced(newSuburbDivorced);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbDivorced[4] = null;
                        setSuburbDivorced(newSuburbDivorced);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbDivorced);
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

        minMax(suburbDivorced, stateDivorced, australiaDivorced);
    }, [suburbDivorced, stateDivorced, australiaDivorced]);

    // console.log(suburbDivorced);
    // console.log(stateDivorced);
    // console.log(australiaDivorced);

    // * <Recharts />

    const data = [
        { name: "2011", Suburb: suburbDivorced[2], State: stateDivorced[2], Australia: australiaDivorced[2] },
        { name: "2016", Suburb: suburbDivorced[3], State: stateDivorced[3], Australia: australiaDivorced[3] },
        { name: "2021", Suburb: suburbDivorced[4], State: stateDivorced[4], Australia: australiaDivorced[4] },
    ];

    const renderLineChart = (
        <div className="mobile-s:max-mobile-l:w-[260px] mobile-s:max-mobile-l:h-[440px] mobile-l:max-md:w-[360px] sm:max-md:h-[420px] md:max-md-l:w-[300px] md-l:h-[440px] md-l:w-[360px] mobile-s:max-sm:mt-10 sm:max-md:mt-12 md:mt-6">
            <ResponsiveContainer>
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
            </ResponsiveContainer>
        </div>
    );

    const insufficientDataLineChart = (
        <div className="mobile-s:max-mobile-l:w-[260px] mobile-s:max-mobile-l:h-[440px] mobile-l:max-md:w-[360px] sm:max-md:h-[420px] md:max-md-l:w-[300px] md-l:h-[440px] md-l:w-[360px] mobile-s:max-sm:mt-10 sm:max-md:mt-12 md:mt-6">
            <ResponsiveContainer>
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
            </ResponsiveContainer>
        </div>
    );

    return (
        <div>
            <div className="flex flex-col justify-center">
                <h1 className="mt-4 mb-4 text-lg text-center font-bold">Divorced</h1>
                <div className="mx-auto -mt-4">
                    {insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">Insufficient data in suburb to populate divorced trends.</span>
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
