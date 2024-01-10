"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
    Label,
    CartesianAxis,
} from "recharts";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface OtherFamilyProps {
    selectedSuburb: string | null;
}

export default function OtherFamilyLineGraph(props: OtherFamilyProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);

    const [suburbOtherFamily, setSuburbOtherFamily] = useState<(number | null)[]>([null, null, null]);
    const [stateOtherFamily, setStateOtherFamily] = useState<(number | null)[]>([null, null, null]);
    const [australiaOtherFamily, setAustraliaOtherFamily] = useState<(number | null)[]>([null, null, null]);

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
    async function fetchOtherFamilyDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            setSuburbOtherFamily([null, null, null, null, null]);
            setStateOtherFamily([null, null, null, null, null]);
            setAustraliaOtherFamily([null, null, null, null, null]);

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchOtherFamilyDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbOtherFamily = [...suburbOtherFamily];
            const newStateOtherFamily = [...stateOtherFamily];
            const newAustraliaOtherFamily = [...australiaOtherFamily];

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
                        const suburbOtherFamily = data[0]["percentage_other_family_in_suburb"];
                        const australiaOtherFamily = data[0]["percentage_other_family_in_australia"];

                        // >> Suburb
                        if (suburbOtherFamily) {
                            newSuburbOtherFamily[0] = suburbOtherFamily;
                            setSuburbOtherFamily(newSuburbOtherFamily);
                        } else if (!suburbOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbOtherFamily[0] = null;
                            setSuburbOtherFamily(newSuburbOtherFamily);
                        }

                        // >> State
                        // >> Data does not exist for 2001 & 2006
                        newStateOtherFamily[0] = null;
                        setStateOtherFamily(newStateOtherFamily);

                        // >> Australia
                        if (australiaOtherFamily) {
                            newAustraliaOtherFamily[0] = australiaOtherFamily;
                            setAustraliaOtherFamily(newAustraliaOtherFamily);
                        } else if (!australiaOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaOtherFamily[0] = null;
                            setAustraliaOtherFamily(newAustraliaOtherFamily);
                        }
                    }

                    // * 2006
                    else if (year == "2006") {
                        const suburbOtherFamily = data[0]["percentage_other_family_in_suburb"];
                        const australiaOtherFamily = data[0]["percentage_other_family_in_australia"];

                        // >> Suburb
                        if (suburbOtherFamily) {
                            newSuburbOtherFamily[1] = suburbOtherFamily;
                            setSuburbOtherFamily(newSuburbOtherFamily);
                        } else if (!suburbOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbOtherFamily[1] = null;
                            setSuburbOtherFamily(newSuburbOtherFamily);
                        }

                        // >> State
                        // >> Data does not exist for 2001 & 2006
                        newStateOtherFamily[1] = null;
                        setStateOtherFamily(newStateOtherFamily);

                        // >> Australia
                        if (australiaOtherFamily) {
                            newAustraliaOtherFamily[1] = australiaOtherFamily;
                            setAustraliaOtherFamily(newAustraliaOtherFamily);
                        } else if (!australiaOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaOtherFamily[1] = null;
                            setAustraliaOtherFamily(newAustraliaOtherFamily);
                        }

                        // * 2011
                    }
                    if (year == "2011") {
                        const suburbOtherFamily = data[0]["percentage_other_family_in_suburb"];
                        const stateOtherFamily = data[0]["percentage_other_family_in_state"];
                        const australiaOtherFamily = data[0]["percentage_other_family_in_australia"];

                        // >> Suburb
                        if (suburbOtherFamily) {
                            newSuburbOtherFamily[2] = suburbOtherFamily;
                            setSuburbOtherFamily(newSuburbOtherFamily);
                        } else if (!suburbOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbOtherFamily[2] = null;
                            setSuburbOtherFamily(newSuburbOtherFamily);
                        }

                        // >> State
                        if (stateOtherFamily) {
                            newStateOtherFamily[2] = stateOtherFamily;
                            setStateOtherFamily(newStateOtherFamily);
                        } else if (!stateOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateOtherFamily[2] = null;
                            setStateOtherFamily(newStateOtherFamily);
                        }

                        // >> Australia
                        if (australiaOtherFamily) {
                            newAustraliaOtherFamily[2] = australiaOtherFamily;
                            setAustraliaOtherFamily(newAustraliaOtherFamily);
                        } else if (!australiaOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaOtherFamily[2] = null;
                            setAustraliaOtherFamily(newAustraliaOtherFamily);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        const suburbOtherFamily = data[0]["percentage_other_family_in_suburb"];
                        const stateOtherFamily = data[0]["percentage_other_family_in_state"];
                        const australiaOtherFamily = data[0]["percentage_other_family_in_australia"];

                        // >> Suburb
                        if (suburbOtherFamily) {
                            newSuburbOtherFamily[3] = suburbOtherFamily;
                            setSuburbOtherFamily(newSuburbOtherFamily);
                        } else if (!suburbOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbOtherFamily[3] = null;
                            setSuburbOtherFamily(newSuburbOtherFamily);
                        }

                        // >> State
                        if (stateOtherFamily) {
                            newStateOtherFamily[3] = stateOtherFamily;
                            setStateOtherFamily(newStateOtherFamily);
                        } else if (!stateOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateOtherFamily[3] = null;
                            setStateOtherFamily(newStateOtherFamily);
                        }

                        // >> Australia
                        if (australiaOtherFamily) {
                            newAustraliaOtherFamily[3] = australiaOtherFamily;
                            setAustraliaOtherFamily(newAustraliaOtherFamily);
                        } else if (!australiaOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaOtherFamily[3] = null;
                            setAustraliaOtherFamily(newAustraliaOtherFamily);
                        }
                    }

                    // * 2021
                    else if (year === "2021") {
                        const suburbOtherFamily = data[0]["percentage_other_family_in_suburb"];
                        const stateOtherFamily = data[0]["percentage_other_family_in_state"];
                        const australiaOtherFamily = data[0]["percentage_other_family_in_australia"];

                        // >> Suburb
                        if (suburbOtherFamily) {
                            newSuburbOtherFamily[4] = suburbOtherFamily;
                            setSuburbOtherFamily(newSuburbOtherFamily);
                        } else if (!suburbOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbOtherFamily[4] = null;
                            setSuburbOtherFamily(newSuburbOtherFamily);
                        }

                        // >> State
                        if (stateOtherFamily) {
                            newStateOtherFamily[4] = stateOtherFamily;
                            setStateOtherFamily(newStateOtherFamily);
                        } else if (!stateOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateOtherFamily[4] = null;
                            setStateOtherFamily(newStateOtherFamily);
                        }

                        // >> Australia
                        if (australiaOtherFamily) {
                            newAustraliaOtherFamily[4] = australiaOtherFamily;
                            setAustraliaOtherFamily(newAustraliaOtherFamily);
                        } else if (!australiaOtherFamily) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaOtherFamily[4] = null;
                            setAustraliaOtherFamily(newAustraliaOtherFamily);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbOtherFamily[0] = null;
                        setSuburbOtherFamily(newSuburbOtherFamily);
                    } else if (year === "2006") {
                        console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbOtherFamily[1] = null;
                        setSuburbOtherFamily(newSuburbOtherFamily);
                    } else if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbOtherFamily[2] = null;
                        setSuburbOtherFamily(newSuburbOtherFamily);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbOtherFamily[3] = null;
                        setSuburbOtherFamily(newSuburbOtherFamily);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbOtherFamily[4] = null;
                        setSuburbOtherFamily(newSuburbOtherFamily);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbOtherFamily);
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

        minMax(suburbOtherFamily, stateOtherFamily, australiaOtherFamily);
    }, [suburbOtherFamily, stateOtherFamily, australiaOtherFamily]);

    // ! CONSOLE LOGS
    // console.log(suburbOtherFamily);
    // console.log(stateOtherFamily);
    // console.log(australiaOtherFamily);
    // ! CONSOLE LOGS

    // * <Recharts />

    const data = [
        {
            name: "2001",
            Suburb: suburbOtherFamily[0],
            State: stateOtherFamily[0],
            Australia: australiaOtherFamily[0],
        },
        {
            name: "2006",
            Suburb: suburbOtherFamily[1],
            State: stateOtherFamily[1],
            Australia: australiaOtherFamily[1],
        },
        {
            name: "2011",
            Suburb: suburbOtherFamily[2],
            State: stateOtherFamily[2],
            Australia: australiaOtherFamily[2],
        },
        {
            name: "2016",
            Suburb: suburbOtherFamily[3],
            State: stateOtherFamily[3],
            Australia: australiaOtherFamily[3],
        },
        {
            name: "2021",
            Suburb: suburbOtherFamily[4],
            State: stateOtherFamily[4],
            Australia: australiaOtherFamily[4],
        },
    ];

    const renderLineChart = (
        <div className="mobile-s:max-mobile-l:w-[260px] mobile-s:max-mobile-l:h-[440px] mobile-l:max-md:w-[360px] sm:max-md:h-[420px] md:max-md-l:w-[300px] md-l:h-[440px] md-l:w-[360px] sm:mt-2 mb-6">
            <ResponsiveContainer>
                <LineChart width={600} height={400} data={data} margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
                    <Line type="natural" dataKey="Suburb" stroke="#219C90" strokeWidth={2.4} />
                    <Line type="natural" dataKey="State" stroke="#068FFF" strokeWidth={1.4} />
                    <Line type="natural" dataKey="Australia" stroke="#A90076" strokeWidth={1.4} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name">
                        <Label value="year" position="bottom" />
                    </XAxis>
                    <YAxis tickCount={6} domain={[dataMin, dataMax + 0.25]} padding={{ bottom: 30 }}>
                        <Label value="%" position="insideLeft" />
                    </YAxis>
                    <RechartsTooltip offset={50} cursor={false} />
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
                <LineChart width={600} height={400} data={data} margin={{ right: 30, bottom: 30, left: 30 }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name">
                        <Label value="year" position="bottom" />
                    </XAxis>
                    <YAxis tickCount={10} domain={[35, 75]}>
                        <Label value="$" position="insideLeft" />
                    </YAxis>
                    <RechartsTooltip offset={50} cursor={false} />
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
                <div className="flex flex-row justify-center">
                    <h1 className="mt-4 mb-4 text-lg text-center font-bold mr-2">Other Family</h1>
                    <TooltipProvider delayDuration={350}>
                        <Tooltip>
                            <TooltipTrigger>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                    />
                                </svg>
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
                                className="mobile-s:max-mobile-l:max-w-[260px] mobile-l:max-md:max-w-[360px] md:max-w-[400px] max-h-30"
                            >
                                <h3 className="break-words">
                                    Other family is defined as a group of related individuals residing in the same household who cannot be
                                    categorised as belonging to a couple or one parent family.
                                </h3>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
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
        </>
    );
}
