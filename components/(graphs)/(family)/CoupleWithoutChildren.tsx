"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, CartesianAxis } from "recharts";

interface CoupleWithoutChildrenProps {
    selectedSuburb: string | null;
}

export default function CoupleWithoutChildrenLineGraph(props: CoupleWithoutChildrenProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);

    const [suburbCoupleWithoutChildren, setSuburbCoupleWithoutChildren] = useState<(number | null)[]>([null, null, null]);
    const [stateCoupleWithoutChildren, setStateCoupleWithoutChildren] = useState<(number | null)[]>([null, null, null]);
    const [australiaCoupleWithoutChildren, setAustraliaCoupleWithoutChildren] = useState<(number | null)[]>([null, null, null]);

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
    async function fetchCoupleWithoutChildrenDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            setSuburbCoupleWithoutChildren([null, null, null, null, null]);
            setStateCoupleWithoutChildren([null, null, null, null, null]);
            setAustraliaCoupleWithoutChildren([null, null, null, null, null]);

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchCoupleWithoutChildrenDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbCoupleWithoutChildren = [...suburbCoupleWithoutChildren];
            const newStateCoupleWithoutChildren = [...stateCoupleWithoutChildren];
            const newAustraliaCoupleWithoutChildren = [...australiaCoupleWithoutChildren];

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
                        const suburbCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_suburb"];
                        const australiaCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_australia"];

                        // >> Suburb
                        if (suburbCoupleWithoutChildren) {
                            newSuburbCoupleWithoutChildren[0] = suburbCoupleWithoutChildren;
                            setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                        } else if (!suburbCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbCoupleWithoutChildren[0] = null;
                            setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                        }

                        // >> State
                        // >> Data does not exist for 2001 & 2006
                        newStateCoupleWithoutChildren[0] = null;
                        setStateCoupleWithoutChildren(newStateCoupleWithoutChildren);

                        // >> Australia
                        if (australiaCoupleWithoutChildren) {
                            newAustraliaCoupleWithoutChildren[0] = australiaCoupleWithoutChildren;
                            setAustraliaCoupleWithoutChildren(newAustraliaCoupleWithoutChildren);
                        } else if (!australiaCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaCoupleWithoutChildren[0] = null;
                            setAustraliaCoupleWithoutChildren(newAustraliaCoupleWithoutChildren);
                        }
                    }

                    // * 2006
                    else if (year == "2006") {
                        const suburbCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_suburb"];
                        const australiaCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_australia"];

                        // >> Suburb
                        if (suburbCoupleWithoutChildren) {
                            newSuburbCoupleWithoutChildren[1] = suburbCoupleWithoutChildren;
                            setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                        } else if (!suburbCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbCoupleWithoutChildren[1] = null;
                            setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                        }

                        // >> State
                        // >> Data does not exist for 2001 & 2006
                        newStateCoupleWithoutChildren[1] = null;
                        setStateCoupleWithoutChildren(newStateCoupleWithoutChildren);

                        // >> Australia
                        if (australiaCoupleWithoutChildren) {
                            newAustraliaCoupleWithoutChildren[1] = australiaCoupleWithoutChildren;
                            setAustraliaCoupleWithoutChildren(newAustraliaCoupleWithoutChildren);
                        } else if (!australiaCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaCoupleWithoutChildren[1] = null;
                            setAustraliaCoupleWithoutChildren(newAustraliaCoupleWithoutChildren);
                        }

                        // * 2011
                    }
                    if (year == "2011") {
                        const suburbCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_suburb"];
                        const stateCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_state"];
                        const australiaCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_australia"];

                        // >> Suburb
                        if (suburbCoupleWithoutChildren) {
                            newSuburbCoupleWithoutChildren[2] = suburbCoupleWithoutChildren;
                            setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                        } else if (!suburbCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbCoupleWithoutChildren[2] = null;
                            setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                        }

                        // >> State
                        if (stateCoupleWithoutChildren) {
                            newStateCoupleWithoutChildren[2] = stateCoupleWithoutChildren;
                            setStateCoupleWithoutChildren(newStateCoupleWithoutChildren);
                        } else if (!stateCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateCoupleWithoutChildren[2] = null;
                            setStateCoupleWithoutChildren(newStateCoupleWithoutChildren);
                        }

                        // >> Australia
                        if (australiaCoupleWithoutChildren) {
                            newAustraliaCoupleWithoutChildren[2] = australiaCoupleWithoutChildren;
                            setAustraliaCoupleWithoutChildren(newAustraliaCoupleWithoutChildren);
                        } else if (!australiaCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaCoupleWithoutChildren[2] = null;
                            setAustraliaCoupleWithoutChildren(newAustraliaCoupleWithoutChildren);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        const suburbCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_suburb"];
                        const stateCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_state"];
                        const australiaCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_australia"];

                        // >> Suburb
                        if (suburbCoupleWithoutChildren) {
                            newSuburbCoupleWithoutChildren[3] = suburbCoupleWithoutChildren;
                            setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                        } else if (!suburbCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbCoupleWithoutChildren[3] = null;
                            setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                        }

                        // >> State
                        if (stateCoupleWithoutChildren) {
                            newStateCoupleWithoutChildren[3] = stateCoupleWithoutChildren;
                            setStateCoupleWithoutChildren(newStateCoupleWithoutChildren);
                        } else if (!stateCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateCoupleWithoutChildren[3] = null;
                            setStateCoupleWithoutChildren(newStateCoupleWithoutChildren);
                        }

                        // >> Australia
                        if (australiaCoupleWithoutChildren) {
                            newAustraliaCoupleWithoutChildren[3] = australiaCoupleWithoutChildren;
                            setAustraliaCoupleWithoutChildren(newAustraliaCoupleWithoutChildren);
                        } else if (!australiaCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaCoupleWithoutChildren[3] = null;
                            setAustraliaCoupleWithoutChildren(newAustraliaCoupleWithoutChildren);
                        }
                    }

                    // * 2021
                    else if (year === "2021") {
                        const suburbCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_suburb"];
                        const stateCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_state"];
                        const australiaCoupleWithoutChildren = data[0]["percentage_couple_family_without_children_in_australia"];

                        // >> Suburb
                        if (suburbCoupleWithoutChildren) {
                            newSuburbCoupleWithoutChildren[4] = suburbCoupleWithoutChildren;
                            setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                        } else if (!suburbCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbCoupleWithoutChildren[4] = null;
                            setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                        }

                        // >> State
                        if (stateCoupleWithoutChildren) {
                            newStateCoupleWithoutChildren[4] = stateCoupleWithoutChildren;
                            setStateCoupleWithoutChildren(newStateCoupleWithoutChildren);
                        } else if (!stateCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateCoupleWithoutChildren[4] = null;
                            setStateCoupleWithoutChildren(newStateCoupleWithoutChildren);
                        }

                        // >> Australia
                        if (australiaCoupleWithoutChildren) {
                            newAustraliaCoupleWithoutChildren[4] = australiaCoupleWithoutChildren;
                            setAustraliaCoupleWithoutChildren(newAustraliaCoupleWithoutChildren);
                        } else if (!australiaCoupleWithoutChildren) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaCoupleWithoutChildren[4] = null;
                            setAustraliaCoupleWithoutChildren(newAustraliaCoupleWithoutChildren);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbCoupleWithoutChildren[0] = null;
                        setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                    } else if (year === "2006") {
                        console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbCoupleWithoutChildren[1] = null;
                        setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                    } else if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbCoupleWithoutChildren[2] = null;
                        setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbCoupleWithoutChildren[3] = null;
                        setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbCoupleWithoutChildren[4] = null;
                        setSuburbCoupleWithoutChildren(newSuburbCoupleWithoutChildren);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbCoupleWithoutChildren);
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

        minMax(suburbCoupleWithoutChildren, stateCoupleWithoutChildren, australiaCoupleWithoutChildren);
    }, [suburbCoupleWithoutChildren, stateCoupleWithoutChildren, australiaCoupleWithoutChildren]);

    // ! CONSOLE LOGS
    // console.log(suburbCoupleWithoutChildren);
    // console.log(stateCoupleWithoutChildren);
    // console.log(australiaCoupleWithoutChildren);
    // ! CONSOLE LOGS

    // * <Recharts />

    const data = [
        {
            name: "2001",
            Suburb: suburbCoupleWithoutChildren[0],
            State: stateCoupleWithoutChildren[0],
            Australia: australiaCoupleWithoutChildren[0],
        },
        {
            name: "2006",
            Suburb: suburbCoupleWithoutChildren[1],
            State: stateCoupleWithoutChildren[1],
            Australia: australiaCoupleWithoutChildren[1],
        },
        {
            name: "2011",
            Suburb: suburbCoupleWithoutChildren[2],
            State: stateCoupleWithoutChildren[2],
            Australia: australiaCoupleWithoutChildren[2],
        },
        {
            name: "2016",
            Suburb: suburbCoupleWithoutChildren[3],
            State: stateCoupleWithoutChildren[3],
            Australia: australiaCoupleWithoutChildren[3],
        },
        {
            name: "2021",
            Suburb: suburbCoupleWithoutChildren[4],
            State: stateCoupleWithoutChildren[4],
            Australia: australiaCoupleWithoutChildren[4],
        },
    ];

    const renderLineChart = (
        <div className="mobile-s:max-mobile-l:w-[260px] mobile-s:max-mobile-l:h-[440px] mobile-l:max-md:w-[360px] sm:max-md:h-[420px] md:max-md-l:w-[300px] md-l:h-[440px] md-l:w-[360px] mobile-s:max-sm:mt-10 sm:max-md:mt-12 md:mt-6">
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
        <div className="mobile-s:max-mobile-l:w-[260px] mobile-s:max-mobile-l:h-[440px] mobile-l:max-md:w-[360px] sm:max-md:h-[420px] md:max-md-l:w-[300px] md-l:h-[440px] md-l:w-[360px] mobile-s:max-sm:mt-10 sm:max-md:mt-12 md:mt-6">
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
                <h1 className="mt-4 mb-4 text-lg text-center font-bold">Couples Without Children</h1>
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
