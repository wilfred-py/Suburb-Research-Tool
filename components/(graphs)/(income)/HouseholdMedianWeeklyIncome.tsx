"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, CartesianAxis } from "recharts";

interface HouseholdIncomeProps {
    selectedSuburb: string | null;
}

interface IncomeDataItem {
    income_data: any;
}

export default function HouseholdMedianWeeklyIncome(props: HouseholdIncomeProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);
    const [incomeData, setIncomeData] = useState<IncomeDataItem[]>([]);

    const [suburbHouseholdIncome, setSuburbHouseholdIncome] = useState<(number | null)[]>([null, null, null, null, null]);
    const [stateHouseholdIncome, setStateHouseholdIncome] = useState<(number | null)[]>([null, null, null, null, null]);
    const australiaHouseholdIncome = [null, 1027, 1234, 1438, 1746];

    // States to manage instances where data does not exist
    const [insufficientSuburbData, setInsufficientSuburbData] = useState(false);

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

        console.log(`HouseholdIncome nullCount: ${nullCount} \n HouseholdIncome numberCount: ${numberCount}`);

        return (numberCount === 1 && nullCount === 4) || nullCount === 5;
    }

    useEffect(() => {
        async function fetchData() {
            // Clear suburbHouseholdIncome from previous search
            setSuburbHouseholdIncome([null, null, null, null, null]);
            setStateHouseholdIncome([null, null, null, null, null]);

            console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchEmploymentDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbHouseholdIncome = [...suburbHouseholdIncome];
            const newStateHouseholdIncome = [...stateHouseholdIncome];
            const newAustraliaHouseholdIncome = [...australiaHouseholdIncome];

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
                        newSuburbHouseholdIncome[0] = null;
                        setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                    }
                    // * 2006
                    else if (year == "2006") {
                        // Remove "$" and "," and convert into integar
                        const suburbHouseholdIncomeString = data[0]["employment_data"][
                            "Median weekly incomes People aged 15 years and over"
                        ]["Household"]["suburb"].replace(/\$|,/g, "");

                        const suburbHouseholdIncome = parseInt(suburbHouseholdIncomeString);

                        // console.log(suburbHouseholdIncome);

                        // Set suburbHouseholdIncome if it exists
                        if (suburbHouseholdIncome) {
                            newSuburbHouseholdIncome[1] = suburbHouseholdIncome;
                            setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                        } else if (!suburbHouseholdIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbHouseholdIncome[1] = null;
                            setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                        }

                        // ? State data not available for 2006 data set
                    }

                    // * 2011
                    else if (year == "2011") {
                        // Remove "$" and "," and convert into integar
                        const suburbHouseholdIncomeString = data[0]["employment_data"][
                            "Median weekly incomes People aged 15 years and over"
                        ]["Household"]["suburb"].replace(/\$|,/g, "");

                        const suburbHouseholdIncome = parseInt(suburbHouseholdIncomeString);

                        // Set suburbHouseholdIncome if it exists
                        if (suburbHouseholdIncome) {
                            newSuburbHouseholdIncome[2] = suburbHouseholdIncome;
                            setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                        } else if (!suburbHouseholdIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbHouseholdIncome[2] = null;
                            setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                        }

                        // Remove "$" and "," and convert into integar
                        const stateHouseholdIncomeString = data[0]["employment_data"][
                            "Median weekly incomes People aged 15 years and over"
                        ]["Household"]["state"].replace(/\$|,/g, "");

                        const stateHouseholdIncome = parseInt(stateHouseholdIncomeString);

                        // Set stateHouseholdIncome if it exists
                        if (stateHouseholdIncome) {
                            newStateHouseholdIncome[2] = stateHouseholdIncome;
                            setStateHouseholdIncome(newStateHouseholdIncome);
                        } else if (!stateHouseholdIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateHouseholdIncome[2] = null;
                            setStateHouseholdIncome(newStateHouseholdIncome);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        // Remove "$" and "," and convert into integar
                        const suburbHouseholdIncomeString = data[0]["employment_data"][
                            "Median weekly incomes People aged 15 years and over"
                        ]["Household"]["suburb"].replace(/\$|,/g, "");

                        const suburbHouseholdIncome = parseInt(suburbHouseholdIncomeString);

                        // Set suburbHouseholdIncome if it exists
                        if (suburbHouseholdIncome) {
                            newSuburbHouseholdIncome[3] = suburbHouseholdIncome;
                            setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                        } else if (!suburbHouseholdIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbHouseholdIncome[3] = null;
                            setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                        }

                        // Remove "$" and "," and convert into integar
                        const stateHouseholdIncomeString = data[0]["employment_data"][
                            "Median weekly incomes People aged 15 years and over"
                        ]["Household"]["state"].replace(/\$|,/g, "");

                        const stateHouseholdIncome = parseInt(stateHouseholdIncomeString);

                        // Set stateHouseholdIncome if it exists
                        if (stateHouseholdIncome) {
                            newStateHouseholdIncome[3] = stateHouseholdIncome;
                            setStateHouseholdIncome(newStateHouseholdIncome);
                        } else if (!stateHouseholdIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateHouseholdIncome[3] = null;
                            setStateHouseholdIncome(newStateHouseholdIncome);
                        }
                    }

                    // * 2021
                    else if (year == "2021") {
                        // console.log(data[0]["employment_data"]["Median weekly incomes (a)"]["Household (d)"]["suburb"]);

                        // Remove "$" and "," and convert into integar
                        const suburbHouseholdIncomeString = data[0]["employment_data"]["Median weekly incomes (a)"]["Household (d)"][
                            "suburb"
                        ].replace(/\$|,/g, "");
                        const suburbHouseholdIncome = parseInt(suburbHouseholdIncomeString);

                        // console.log(suburbHouseholdIncome);

                        // Set suburbHouseholdIncome if it exists
                        if (suburbHouseholdIncome) {
                            newSuburbHouseholdIncome[4] = suburbHouseholdIncome;
                            setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                        } else if (!suburbHouseholdIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbHouseholdIncome[4] = null;
                            setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                        }
                        // Remove "$" and "," and convert into integar
                        const stateHouseholdIncomeString = data[0]["employment_data"]["Median weekly incomes (a)"]["Household (d)"][
                            "state"
                        ].replace(/\$|,/g, "");
                        const stateHouseholdIncome = parseInt(stateHouseholdIncomeString);

                        // Set stateHouseholdIncome if it exists
                        if (stateHouseholdIncome) {
                            newStateHouseholdIncome[4] = stateHouseholdIncome;
                            setStateHouseholdIncome(newStateHouseholdIncome);
                        } else if (!stateHouseholdIncome) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateHouseholdIncome[4] = null;
                            setStateHouseholdIncome(newStateHouseholdIncome);
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbHouseholdIncome[0] = null;
                        setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                    } else if (year === "2006") {
                        console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbHouseholdIncome[1] = null;
                        setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                    } else if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbHouseholdIncome[2] = null;
                        setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbHouseholdIncome[3] = null;
                        setSuburbHouseholdIncome(newSuburbHouseholdIncome);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbHouseholdIncome[4] = null;
                        setSuburbHouseholdIncome(newSuburbHouseholdIncome);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbHouseholdIncome);
                    }
                }
            });
        }

        if (props.selectedSuburb) {
            fetchData();
        }
    }, [props.selectedSuburb]);

    // console.log(`suburbHouseholdIncome: ${suburbHouseholdIncome}`);
    // console.log(`stateHouseholdIncome: ${stateHouseholdIncome}`);
    // console.log(`australiaHouseholdIncome: ${australiaHouseholdIncome}`);

    // console.log(`insufficientData: ${insufficientSuburbData}`);

    // * <Recharts />

    const data = [
        { name: "2001", Suburb: suburbHouseholdIncome[0], State: stateHouseholdIncome[0], Australia: australiaHouseholdIncome[0] },
        { name: "2006", Suburb: suburbHouseholdIncome[1], State: stateHouseholdIncome[1], Australia: australiaHouseholdIncome[1] },
        { name: "2011", Suburb: suburbHouseholdIncome[2], State: stateHouseholdIncome[2], Australia: australiaHouseholdIncome[2] },
        { name: "2016", Suburb: suburbHouseholdIncome[3], State: stateHouseholdIncome[3], Australia: australiaHouseholdIncome[3] },
        { name: "2021", Suburb: suburbHouseholdIncome[4], State: stateHouseholdIncome[4], Australia: australiaHouseholdIncome[4] },
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
            <YAxis tickCount={6} domain={["auto", "auto"]}>
                <Label value="$" position="insideLeft" />
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
                <h1 className="mt-4 mb-4 text-lg text-center font-bold">Household Median Weekly Income</h1>
                <div className="mx-auto -mt-4">
                    {insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">
                                Insufficient data in suburb to populate full-time employment trends.
                            </span>
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
