"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, CartesianAxis } from "recharts";
import { RadarTooltip, RadarTooltipContent, RadarTooltipProvider, RadarTooltipTrigger } from "@/components/ui/tooltip-radar";

interface PersonalIncomeProps {
    selectedSuburb: string | null;
}

export default function PersonalMedianWeeklyIncome(props: PersonalIncomeProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);

    const [suburbPersonalIncome, setSuburbPersonalIncome] = useState<(number | null)[]>([null, null, null, null, null]);
    const [statePersonalIncome, setStatePersonalIncome] = useState<(number | null)[]>([null, null, null, null, null]);
    const australiaPersonalIncome = [null, 466, 577, 662, 805];

    // States to manage instances where data does not exist
    const [insufficientSuburbData, setInsufficientSuburbData] = useState(false);
    const [insufficientStateData, setInsufficientStateData] = useState(false);
    const [insufficientAustraliaData, setInsufficientAustraliaData] = useState(false);

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
    async function fetchEmploymentDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            // Clear suburbPersonalIncome from previous search
            setSuburbPersonalIncome([null, null, null, null, null]);
            setStatePersonalIncome([null, null, null, null, null]);

            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchEmploymentDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbPersonalIncome = [...suburbPersonalIncome];
            const newStatePersonalIncome = [...statePersonalIncome];
            const newAustraliaPersonalIncome = [...australiaPersonalIncome];

            //  Wait for data to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;

                // Process and update state based on year and data
                // (Similar to what you were doing in your fetchEmploymentDataA function)
                // console.log(`result: ${JSON.stringify(result, null, 2)}`);
                // console.log(`data: ${data}`);

                try {
                    // * 2001 - no median weekly income data recorded on ABS
                    if (year == "2001") {
                        newSuburbPersonalIncome[0] = null;
                        setSuburbPersonalIncome(newSuburbPersonalIncome);
                    }

                    // * 2006
                    else if (year == "2006") {
                        // console.log(data[0]["employment_data"]);

                        // Remove "$" and "," and convert into integar
                        const suburbPersonalIncomeString =
                            data[0]["employment_data"]["Median weekly incomes People aged 15 years and over"]["Personal"]["suburb"];

                        const suburbPersonalIncome = parseInt(suburbPersonalIncomeString);

                        // console.log(suburbPersonalIncome);

                        // Remove "$" and "," and convert into integar
                        const statePersonalIncomeString =
                            data[0]["employment_data"]["Median weekly incomes People aged 15 years and over"]["Personal"]["state"];

                        const statePersonalIncome = parseInt(statePersonalIncomeString);

                        // Set suburbPersonalIncome if it exists
                        if (suburbPersonalIncome) {
                            newSuburbPersonalIncome[1] = suburbPersonalIncome;
                            setSuburbPersonalIncome(newSuburbPersonalIncome);
                        } else if (!suburbPersonalIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbPersonalIncome[1] = null;
                            setSuburbPersonalIncome(newSuburbPersonalIncome);
                        }

                        // Set statePersonalIncome if it exists
                        if (statePersonalIncome) {
                            newStatePersonalIncome[1] = statePersonalIncome;
                            setStatePersonalIncome(newStatePersonalIncome);
                        } else if (!statePersonalIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStatePersonalIncome[1] = null;
                            setStatePersonalIncome(newStatePersonalIncome);
                        }
                    }

                    // * 2011
                    else if (year == "2011") {
                        // Remove "$" and "," and convert into integar
                        const suburbPersonalIncomeString = data[0]["employment_data"][
                            "Median weekly incomes People aged 15 years and over"
                        ]["Personal"]["suburb"].replace(/\$|,/g, "");

                        const suburbPersonalIncome = parseInt(suburbPersonalIncomeString);

                        // Remove "$" and "," and convert into integar
                        const statePersonalIncomeString = data[0]["employment_data"]["Median weekly incomes People aged 15 years and over"][
                            "Personal"
                        ]["state"].replace(/\$|,/g, "");

                        const statePersonalIncome = parseInt(statePersonalIncomeString);

                        // Set suburbPersonalIncome if it exists
                        if (suburbPersonalIncome) {
                            newSuburbPersonalIncome[2] = suburbPersonalIncome;
                            setSuburbPersonalIncome(newSuburbPersonalIncome);
                        } else if (!suburbPersonalIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbPersonalIncome[2] = null;
                            setSuburbPersonalIncome(newSuburbPersonalIncome);
                        }

                        // Set statePersonalIncome if it exists
                        if (statePersonalIncome) {
                            newStatePersonalIncome[2] = statePersonalIncome;
                            setStatePersonalIncome(newStatePersonalIncome);
                        } else if (!statePersonalIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStatePersonalIncome[2] = null;
                            setStatePersonalIncome(newStatePersonalIncome);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        // Remove "$" and "," and convert into integar
                        const suburbPersonalIncomeString = data[0]["employment_data"][
                            "Median weekly incomes People aged 15 years and over"
                        ]["Personal"]["suburb"].replace(/\$|,/g, "");

                        const suburbPersonalIncome = parseInt(suburbPersonalIncomeString);

                        // Remove "$" and "," and convert into integar
                        const statePersonalIncomeString = data[0]["employment_data"]["Median weekly incomes People aged 15 years and over"][
                            "Personal"
                        ]["state"].replace(/\$|,/g, "");

                        const statePersonalIncome = parseInt(statePersonalIncomeString);

                        // Set suburbPersonalIncome if it exists
                        if (suburbPersonalIncome) {
                            newSuburbPersonalIncome[3] = suburbPersonalIncome;
                            setSuburbPersonalIncome(newSuburbPersonalIncome);
                        } else if (!suburbPersonalIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbPersonalIncome[3] = null;
                            setSuburbPersonalIncome(newSuburbPersonalIncome);
                        }

                        // Set statePersonalIncome if it exists
                        if (statePersonalIncome) {
                            newStatePersonalIncome[3] = statePersonalIncome;
                            setStatePersonalIncome(newStatePersonalIncome);
                        } else if (!statePersonalIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStatePersonalIncome[3] = null;
                            setStatePersonalIncome(newStatePersonalIncome);
                        }
                    }

                    // * 2021
                    else if (year == "2021") {
                        // console.log(data[0]["employment_data"]["Median weekly incomes (a)"]["Personal (b)"]["suburb"]);

                        // Remove "$" and "," and convert into integar
                        const suburbPersonalIncomeString = data[0]["employment_data"]["Median weekly incomes (a)"]["Personal (b)"][
                            "suburb"
                        ].replace(/\$|,/g, "");
                        const suburbPersonalIncome = parseInt(suburbPersonalIncomeString);

                        // Remove "$" and "," and convert into integar
                        const statePersonalIncomeString = data[0]["employment_data"]["Median weekly incomes (a)"]["Personal (b)"][
                            "state"
                        ].replace(/\$|,/g, "");
                        const statePersonalIncome = parseInt(statePersonalIncomeString);

                        // Set suburbPersonalIncome if it exists
                        if (suburbPersonalIncome) {
                            newSuburbPersonalIncome[4] = suburbPersonalIncome;
                            setSuburbPersonalIncome(newSuburbPersonalIncome);
                        } else if (!suburbPersonalIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbPersonalIncome[4] = null;
                            setSuburbPersonalIncome(newSuburbPersonalIncome);
                        }

                        // Set statePersonalIncome if it exists
                        if (statePersonalIncome) {
                            newStatePersonalIncome[4] = statePersonalIncome;
                            setStatePersonalIncome(newStatePersonalIncome);
                        } else if (!statePersonalIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStatePersonalIncome[4] = null;
                            setStatePersonalIncome(newStatePersonalIncome);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbPersonalIncome[0] = null;
                        setSuburbPersonalIncome(newSuburbPersonalIncome);
                    } else if (year === "2006") {
                        console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbPersonalIncome[1] = null;
                        setSuburbPersonalIncome(newSuburbPersonalIncome);
                    } else if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbPersonalIncome[2] = null;
                        setSuburbPersonalIncome(newSuburbPersonalIncome);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbPersonalIncome[3] = null;
                        setSuburbPersonalIncome(newSuburbPersonalIncome);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbPersonalIncome[4] = null;
                        setSuburbPersonalIncome(newSuburbPersonalIncome);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbPersonalIncome);
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

        minMax(suburbPersonalIncome, statePersonalIncome, australiaPersonalIncome);
    }, [suburbPersonalIncome, statePersonalIncome, australiaPersonalIncome]);

    // console.log(`suburbPersonalIncome: ${suburbPersonalIncome}`);
    // console.log(`statePersonalIncome: ${statePersonalIncome}`);
    // console.log(`australiaPersonalIncome: ${australiaPersonalIncome}`);

    // console.log(dataMin);
    // console.log(dataMax);

    // * <Recharts />

    const data = [
        { name: "2001", Suburb: suburbPersonalIncome[0], State: statePersonalIncome[0], Australia: australiaPersonalIncome[0] },
        { name: "2006", Suburb: suburbPersonalIncome[1], State: statePersonalIncome[1], Australia: australiaPersonalIncome[1] },
        { name: "2011", Suburb: suburbPersonalIncome[2], State: statePersonalIncome[2], Australia: australiaPersonalIncome[2] },
        { name: "2016", Suburb: suburbPersonalIncome[3], State: statePersonalIncome[3], Australia: australiaPersonalIncome[3] },
        { name: "2021", Suburb: suburbPersonalIncome[4], State: statePersonalIncome[4], Australia: australiaPersonalIncome[4] },
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
                        <Label value="$" position="insideLeft" offset={-5} />
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
                        <Label value="$" position="insideLeft" offset={-5} />
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
                <div className="flex flex-col place-items-center w-full my-4">
                    <div className="flex flex-row justify-center">
                        <h1 className="text-lg font-bold mx-auto mr-2 mobile-s:max-mobile-l:max-w-[160px] mobile-s:max-mobile-l:text-center">
                            Personal Median Weekly Income
                        </h1>

                        {/* Tooltip with info on chart */}
                        <RadarTooltipProvider delayDuration={350}>
                            <RadarTooltip>
                                <RadarTooltipTrigger>
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
                                </RadarTooltipTrigger>
                                <RadarTooltipContent
                                    side="bottom"
                                    className="mobile-s:max-mobile-l:max-w-[260px] mobile-l:max-md:max-w-[360px] md:max-w-[400px] max-h-30"
                                >
                                    <h3 className="break-words">Note: income values are gross</h3>
                                </RadarTooltipContent>
                            </RadarTooltip>
                        </RadarTooltipProvider>
                    </div>
                </div>

                <div className="mx-auto -mt-4">
                    {insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">
                                Insufficient data in suburb to populate personal median weekly income trends.
                            </span>
                            {insufficientDataLineChart}
                        </div>
                    ) : (
                        // * <Recharts />
                        <div className="select-none">{renderLineChart}</div>
                    )}
                </div>
            </div>
        </>
    );
}
