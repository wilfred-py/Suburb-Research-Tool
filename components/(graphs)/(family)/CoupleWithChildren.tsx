"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, CartesianAxis } from "recharts";

interface CoupleWithChildrenProps {
    selectedSuburb: string | null;
}

export default function CoupleWithChildrenLineGraph(props: CoupleWithChildrenProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);

    const [suburbCoupleWithChildren, setSuburbCoupleWithChildren] = useState<(number | null)[]>([null, null, null]);
    const [stateCoupleWithChildren, setStateCoupleWithChildren] = useState<(number | null)[]>([null, null, null]);
    const [australiaCoupleWithChildren, setAustraliaCoupleWithChildren] = useState<(number | null)[]>([null, null, null]);

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
    async function fetchCoupleWithChildrenDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            setSuburbCoupleWithChildren([null, null, null, null, null]);
            setStateCoupleWithChildren([null, null, null, null, null]);
            setAustraliaCoupleWithChildren([null, null, null, null, null]);

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchCoupleWithChildrenDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbCoupleWithChildren = [...suburbCoupleWithChildren];
            const newStateCoupleWithChildren = [...stateCoupleWithChildren];
            const newAustraliaCoupleWithChildren = [...australiaCoupleWithChildren];

            //  Wait for data to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;

                try {
                    // * 2001
                    if (year == "2001") {
                        const suburbCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_suburb"];
                        const australiaCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_australia"];

                        // console.log(suburbCoupleWithChildren);

                        // >> Suburb
                        if (suburbCoupleWithChildren) {
                            newSuburbCoupleWithChildren[0] = suburbCoupleWithChildren;
                            setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                        } else if (!suburbCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbCoupleWithChildren[0] = null;
                            setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                        }

                        // >> State
                        // >> Data does not exist for 2001 & 2006
                        newStateCoupleWithChildren[0] = null;
                        setStateCoupleWithChildren(newStateCoupleWithChildren);

                        // >> Australia
                        if (australiaCoupleWithChildren) {
                            newAustraliaCoupleWithChildren[0] = australiaCoupleWithChildren;
                            setAustraliaCoupleWithChildren(newAustraliaCoupleWithChildren);
                        } else if (!australiaCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaCoupleWithChildren[0] = null;
                            setAustraliaCoupleWithChildren(newAustraliaCoupleWithChildren);
                        }
                    }

                    // * 2006
                    else if (year == "2006") {
                        const suburbCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_suburb"];
                        const australiaCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_australia"];

                        // >> Suburb
                        if (suburbCoupleWithChildren) {
                            newSuburbCoupleWithChildren[1] = suburbCoupleWithChildren;
                            setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                        } else if (!suburbCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbCoupleWithChildren[1] = null;
                            setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                        }

                        // >> State
                        // >> Data does not exist for 2001 & 2006
                        newStateCoupleWithChildren[1] = null;
                        setStateCoupleWithChildren(newStateCoupleWithChildren);

                        // >> Australia
                        if (australiaCoupleWithChildren) {
                            newAustraliaCoupleWithChildren[1] = australiaCoupleWithChildren;
                            setAustraliaCoupleWithChildren(newAustraliaCoupleWithChildren);
                        } else if (!australiaCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaCoupleWithChildren[1] = null;
                            setAustraliaCoupleWithChildren(newAustraliaCoupleWithChildren);
                        }

                        // * 2011
                    }
                    if (year == "2011") {
                        const suburbCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_suburb"];
                        const stateCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_state"];
                        const australiaCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_australia"];

                        // >> Suburb
                        if (suburbCoupleWithChildren) {
                            newSuburbCoupleWithChildren[2] = suburbCoupleWithChildren;
                            setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                        } else if (!suburbCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbCoupleWithChildren[2] = null;
                            setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                        }

                        // >> State
                        if (stateCoupleWithChildren) {
                            newStateCoupleWithChildren[2] = stateCoupleWithChildren;
                            setStateCoupleWithChildren(newStateCoupleWithChildren);
                        } else if (!stateCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateCoupleWithChildren[2] = null;
                            setStateCoupleWithChildren(newStateCoupleWithChildren);
                        }

                        // >> Australia
                        if (australiaCoupleWithChildren) {
                            newAustraliaCoupleWithChildren[2] = australiaCoupleWithChildren;
                            setAustraliaCoupleWithChildren(newAustraliaCoupleWithChildren);
                        } else if (!australiaCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaCoupleWithChildren[2] = null;
                            setAustraliaCoupleWithChildren(newAustraliaCoupleWithChildren);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        const suburbCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_suburb"];
                        const stateCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_state"];
                        const australiaCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_australia"];

                        // >> Suburb
                        if (suburbCoupleWithChildren) {
                            newSuburbCoupleWithChildren[3] = suburbCoupleWithChildren;
                            setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                        } else if (!suburbCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbCoupleWithChildren[3] = null;
                            setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                        }

                        // >> State
                        if (stateCoupleWithChildren) {
                            newStateCoupleWithChildren[3] = stateCoupleWithChildren;
                            setStateCoupleWithChildren(newStateCoupleWithChildren);
                        } else if (!stateCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateCoupleWithChildren[3] = null;
                            setStateCoupleWithChildren(newStateCoupleWithChildren);
                        }

                        // >> Australia
                        if (australiaCoupleWithChildren) {
                            newAustraliaCoupleWithChildren[3] = australiaCoupleWithChildren;
                            setAustraliaCoupleWithChildren(newAustraliaCoupleWithChildren);
                        } else if (!australiaCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaCoupleWithChildren[3] = null;
                            setAustraliaCoupleWithChildren(newAustraliaCoupleWithChildren);
                        }
                    }

                    // * 2021
                    else if (year === "2021") {
                        const suburbCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_suburb"];
                        const stateCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_state"];
                        const australiaCoupleWithChildren = data[0]["percentage_couple_family_with_children_in_australia"];

                        // >> Suburb
                        if (suburbCoupleWithChildren) {
                            newSuburbCoupleWithChildren[4] = suburbCoupleWithChildren;
                            setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                        } else if (!suburbCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbCoupleWithChildren[4] = null;
                            setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                        }

                        // >> State
                        if (stateCoupleWithChildren) {
                            newStateCoupleWithChildren[4] = stateCoupleWithChildren;
                            setStateCoupleWithChildren(newStateCoupleWithChildren);
                        } else if (!stateCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateCoupleWithChildren[4] = null;
                            setStateCoupleWithChildren(newStateCoupleWithChildren);
                        }

                        // >> Australia
                        if (australiaCoupleWithChildren) {
                            newAustraliaCoupleWithChildren[4] = australiaCoupleWithChildren;
                            setAustraliaCoupleWithChildren(newAustraliaCoupleWithChildren);
                        } else if (!australiaCoupleWithChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaCoupleWithChildren[4] = null;
                            setAustraliaCoupleWithChildren(newAustraliaCoupleWithChildren);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbCoupleWithChildren[0] = null;
                        setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                    } else if (year === "2006") {
                        console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbCoupleWithChildren[1] = null;
                        setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                    } else if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbCoupleWithChildren[2] = null;
                        setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbCoupleWithChildren[3] = null;
                        setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbCoupleWithChildren[4] = null;
                        setSuburbCoupleWithChildren(newSuburbCoupleWithChildren);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbCoupleWithChildren);
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

        minMax(suburbCoupleWithChildren, stateCoupleWithChildren, australiaCoupleWithChildren);
    }, [suburbCoupleWithChildren, stateCoupleWithChildren, australiaCoupleWithChildren]);

    // ! CONSOLE LOGS
    // console.log(suburbCoupleWithChildren);
    // console.log(stateCoupleWithChildren);
    // console.log(australiaCoupleWithChildren);
    // ! CONSOLE LOGS

    // * <Recharts />

    const data = [
        { name: "2001", Suburb: suburbCoupleWithChildren[0], State: stateCoupleWithChildren[0], Australia: australiaCoupleWithChildren[0] },
        { name: "2006", Suburb: suburbCoupleWithChildren[1], State: stateCoupleWithChildren[1], Australia: australiaCoupleWithChildren[1] },
        { name: "2011", Suburb: suburbCoupleWithChildren[2], State: stateCoupleWithChildren[2], Australia: australiaCoupleWithChildren[2] },
        { name: "2016", Suburb: suburbCoupleWithChildren[3], State: stateCoupleWithChildren[3], Australia: australiaCoupleWithChildren[3] },
        { name: "2021", Suburb: suburbCoupleWithChildren[4], State: stateCoupleWithChildren[4], Australia: australiaCoupleWithChildren[4] },
    ];

    const renderLineChart = (
        <div className="mobile-s:max-mobile-l:w-[260px] mobile-s:max-mobile-l:h-[440px] mobile-l:max-md:w-[360px] sm:max-md:h-[420px] md:max-md-l:w-[300px] md-l:h-[440px] md-l:w-[360px] sm:mt-2 mb-6">
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
                    <Line type="natural" dataKey="Suburb" stroke="#219C90" strokeWidth={2.4} />
                    <Line type="natural" dataKey="State" stroke="#068FFF" strokeWidth={1.4} />
                    <Line type="natural" dataKey="Australia" stroke="#A90076" strokeWidth={1.4} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name">
                        <Label value="year" position="bottom" />
                    </XAxis>
                    <YAxis tickCount={6} domain={[dataMin - 3, dataMax + 3]} padding={{ bottom: 30 }}>
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
        <div className="mobile-s:max-mobile-l:w-[260px] mobile-s:max-mobile-l:h-[440px] mobile-l:max-md:w-[360px] sm:max-md:h-[420px] md:max-md-l:w-[300px] md-l:h-[440px] md-l:w-[360px] sm:mt-2 mb-6">
            <ResponsiveContainer>
                <LineChart data={data} margin={{ right: 30, bottom: 30, left: 30 }}>
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
                <h1 className="mt-4 sm:max-lg-m:mt-8 mb-4 text-lg text-center font-bold">Couples With Children</h1>
                <div className="mx-auto -mt-4">
                    {insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">Insufficient data in suburb to populate trends.</span>
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
