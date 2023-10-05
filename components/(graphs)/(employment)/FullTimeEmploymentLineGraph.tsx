"use client";

import * as React from "react";
import { useEffect, useState } from "react";
// import { LineChart } from "@mui/x-charts/LineChart";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, CartesianAxis } from "recharts";

interface FullTimeEmploymentProps {
    selectedSuburb: string | null;
}

interface IncomeDataItem {
    income_data: any;
}

interface EmploymentDataItem {
    employment_data: any;
}

export default function FullTimeEmploymentLineGraph(props: FullTimeEmploymentProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);
    const [incomeData, setIncomeData] = useState<IncomeDataItem[]>([]);
    const [employmentData, setEmploymentData] = useState<EmploymentDataItem[]>([]);

    const [suburbFullTime, setSuburbFullTime] = useState<(number | null)[]>([null, null, null, null, null]);
    const [stateFullTime, setStateFullTime] = useState<(number | null)[]>([null, null, null, null, null]);
    const [australiaFullTime, setAustraliaFullTime] = useState<(number | null)[]>([null, null, null, null, null]);

    // States to manage instances where data does not exist
    const [noStateData, setNoStateData] = useState(false);
    const [noAustraliaData, setNoAustraliaData] = useState(false);

    const supabase = createClientComponentClient();

    // const suburbFullTime = [51.1, 53.1, 52.5, 53.5, 53.2];
    // const stateFullTime = [54.2, 54.9, 53.2, 57.2, 57.1];
    // const australiaFullTime = [55.1, 55.3, 54.9, 57.2, 56.8];

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

        console.log(`suburbName: ${suburbName}`);
        console.log(`stateName: ${stateName}`);

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

    useEffect(() => {
        async function fetchData() {
            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchEmploymentDataByYear(year, `data_${year}`, props.selectedSuburb));

            const newSuburbFullTime = [...suburbFullTime];
            const newStateFullTime = [...stateFullTime];
            const newAustraliaFullTime = [...australiaFullTime];

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
                    // * 2001
                    if (year == "2001") {
                        // Clear suburbFullTime from previous search
                        setSuburbFullTime([null, null, null, null, null]);
                        setStateFullTime([null, null, null, null, null]);
                        setAustraliaFullTime([null, null, null, null, null]);

                        const percentageSuburbFullTime =
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of suburb"];

                        const percentageStateFullTime =
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of state"];

                        const percentageAustraliaFullTime =
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of Australia"];

                        // Set suburbFullTime if it exists
                        if (percentageSuburbFullTime) {
                            newSuburbFullTime[0] = percentageSuburbFullTime;
                            setSuburbFullTime(newSuburbFullTime);
                        } else if (!percentageSuburbFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            console.log(`2001 data not available for ${selectedSuburb}`);
                            newSuburbFullTime[0] = null;
                            // newSuburbFullTime.splice(0, 1);
                            setSuburbFullTime(newSuburbFullTime);
                        }

                        // Set stateFullTime if it exists
                        if (percentageStateFullTime) {
                            newStateFullTime[0] = percentageStateFullTime;
                            setStateFullTime(newStateFullTime);
                        } else if (!percentageStateFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            // newStateFullTime[0] = null;
                            console.log("state data not available for 2001");
                            newStateFullTime.splice(0, 1);
                            setStateFullTime(newStateFullTime);
                        }

                        // Set australiaFullTime if it exists
                        if (percentageAustraliaFullTime) {
                            newAustraliaFullTime[0] = percentageAustraliaFullTime;
                            setAustraliaFullTime(newAustraliaFullTime);
                        } else if (!percentageAustraliaFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaFullTime[0] = null;
                        }
                    }
                    // * 2006
                    else if (year == "2006") {
                        const percentageSuburbFullTime =
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of suburb"];
                        const percentageStateFullTime =
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of state"];
                        const percentageAustraliaFullTime =
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of Australia"];

                        // Set suburbFullTime if it exists
                        if (percentageSuburbFullTime) {
                            newSuburbFullTime[1] = percentageSuburbFullTime;
                            setSuburbFullTime(newSuburbFullTime);
                        } else if (!percentageSuburbFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbFullTime[1] = null;
                        }

                        // Set stateFullTime if it exists
                        if (percentageStateFullTime) {
                            newStateFullTime[1] = percentageStateFullTime;
                            setStateFullTime(newStateFullTime);
                        } else if (!percentageStateFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateFullTime[1] = null;
                        }

                        // Set australiaFullTime if it exists
                        if (percentageAustraliaFullTime) {
                            newAustraliaFullTime[1] = percentageAustraliaFullTime;
                            setAustraliaFullTime(newAustraliaFullTime);
                        } else if (!percentageAustraliaFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaFullTime[1] = null;
                        }
                    }

                    // * 2011
                    else if (year == "2011") {
                        const percentageSuburbFullTime =
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked full-time"
                            ]["% of suburb"];
                        const percentageStateFullTime =
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked full-time"
                            ]["% of state"];
                        const percentageAustraliaFullTime =
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked full-time"
                            ]["% of Australia"];

                        // Set suburbFullTime if it exists
                        if (percentageSuburbFullTime) {
                            newSuburbFullTime[2] = percentageSuburbFullTime;
                            setSuburbFullTime(newSuburbFullTime);
                        } else if (!percentageSuburbFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbFullTime[2] = null;
                        }

                        // Set stateFullTime if it exists
                        if (percentageStateFullTime) {
                            newStateFullTime[2] = percentageStateFullTime;
                            setStateFullTime(newStateFullTime);
                        } else if (!percentageStateFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateFullTime[2] = null;
                        }

                        // Set australiaFullTime if it exists
                        if (percentageAustraliaFullTime) {
                            newAustraliaFullTime[2] = percentageAustraliaFullTime;
                            setAustraliaFullTime(newAustraliaFullTime);
                        } else if (!percentageAustraliaFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaFullTime[2] = null;
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        const percentageSuburbFullTime =
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked full-time"
                            ]["% of suburb"];
                        const percentageStateFullTime =
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked full-time"
                            ]["% of state"];
                        const percentageAustraliaFullTime =
                            data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                                "Worked full-time"
                            ]["% of Australia"];

                        // Set suburbFullTime if it exists
                        if (percentageSuburbFullTime) {
                            newSuburbFullTime[3] = percentageSuburbFullTime;
                            setSuburbFullTime(newSuburbFullTime);
                        } else if (!percentageSuburbFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbFullTime[3] = null;
                        }

                        // Set stateFullTime if it exists
                        if (percentageStateFullTime) {
                            newStateFullTime[3] = percentageStateFullTime;
                            setStateFullTime(newStateFullTime);
                        } else if (!percentageStateFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateFullTime[3] = null;
                        }

                        // Set australiaFullTime if it exists
                        if (percentageAustraliaFullTime) {
                            newAustraliaFullTime[3] = percentageAustraliaFullTime;
                            setAustraliaFullTime(newAustraliaFullTime);
                        } else if (!percentageAustraliaFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaFullTime[3] = null;
                        }
                    }

                    // * 2021
                    else if (year == "2021") {
                        const percentageSuburbFullTime = data[0]["employment_data"]["Employment status"]["Worked full-time"]["% of suburb"];
                        const percentageStateFullTime = data[0]["employment_data"]["Employment status"]["Worked full-time"]["% of state"];
                        const percentageAustraliaFullTime =
                            data[0]["employment_data"]["Employment status"]["Worked full-time"]["% of country"];

                        // Set suburbFullTime if it exists
                        if (percentageSuburbFullTime) {
                            newSuburbFullTime[4] = percentageSuburbFullTime;
                            setSuburbFullTime(newSuburbFullTime);
                        } else if (!percentageSuburbFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbFullTime[4] = null;
                        }

                        // Set stateFullTime if it exists
                        if (percentageStateFullTime) {
                            newStateFullTime[4] = percentageStateFullTime;
                            setStateFullTime(newStateFullTime);
                        } else if (!percentageStateFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newStateFullTime[4] = null;
                        }

                        // Set australiaFullTime if it exists
                        if (percentageAustraliaFullTime) {
                            newAustraliaFullTime[4] = percentageAustraliaFullTime;
                            setAustraliaFullTime(newAustraliaFullTime);
                        } else if (!percentageAustraliaFullTime) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newAustraliaFullTime[4] = null;
                        }
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbFullTime[0] = null;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (year === "2006") {
                        console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbFullTime[1] = null;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbFullTime[2] = null;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbFullTime[3] = null;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbFullTime[4] = null;
                        setSuburbFullTime(newSuburbFullTime);
                    }
                }
            });
        }

        if (props.selectedSuburb) {
            fetchData();
        }
    }, [props.selectedSuburb]);

    console.log(`suburbFullTime: ${suburbFullTime}`);
    console.log(`stateFullTime: ${stateFullTime}`);
    console.log(`australiaFullTime: ${australiaFullTime}`);

    // * <Recharts />

    const data = [
        { name: "2001", Suburb: suburbFullTime[0], State: stateFullTime[0], Australia: australiaFullTime[0] },
        { name: "2006", Suburb: suburbFullTime[1], State: stateFullTime[1], Australia: australiaFullTime[1] },
        { name: "2011", Suburb: suburbFullTime[2], State: stateFullTime[2], Australia: australiaFullTime[2] },
        { name: "2016", Suburb: suburbFullTime[3], State: stateFullTime[3], Australia: australiaFullTime[3] },
        { name: "2021", Suburb: suburbFullTime[4], State: stateFullTime[4], Australia: australiaFullTime[4] },
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
            <YAxis tickCount={10} domain={[35, 75]}>
                <Label value="%" position="insideLeft" />
            </YAxis>
            <Tooltip offset={50} cursor={false} />
            <Legend verticalAlign="top" height={36} align="center" />
            <CartesianGrid y={40}></CartesianGrid>
        </LineChart>
    );

    return (
        <div>
            <div className="flex flex-col justify-center">
                <h1 className="mt-4 text-lg text-center font-bold">Full-time employment</h1>
                <div className="mx-auto -mt-4">
                    {incomeData ? (
                        // <LineChart
                        //     xAxis={[
                        //         {
                        //             data: ["2001", "2006", "2011", "2016", "2021"],
                        //         },
                        //     ]}
                        //     yAxis={[
                        //         {
                        //             min: 40,
                        //             max: 75,
                        //         },
                        //     ]}
                        //     series={[
                        //         {
                        //             id: "suburb",
                        //             label: `${selectedSuburb}`,
                        //             data: suburbFullTime,
                        //             showMark: true,
                        //             curve: "natural",
                        //         },
                        //         {
                        //             id: "state",
                        //             label: `${selectedState}`,
                        //             data: stateFullTime,
                        //             showMark: true,
                        //             curve: "natural",
                        //         },
                        //         {
                        //             id: "australia",
                        //             label: "Australia",
                        //             data: australiaFullTime,
                        //             showMark: true,
                        //             curve: "natural",
                        //         },
                        //     ]}
                        //     sx={{
                        //         "--ChartsLegend-itemWidth": "70px",
                        //         "--ChartsLegend-itemMarkSize": "10px",
                        //         "--ChartsLegend-labelSpacing": "5px",
                        //         "--ChartsLegend-rootSpacing": "50px",
                        //     }}
                        //     legend={{
                        //         direction: "row",
                        //         position: {
                        //             vertical: "top",
                        //             horizontal: "middle",
                        //         },
                        //     }}
                        //     width={550}
                        //     height={400}
                        //     margin={{ left: 70 }}
                        // />
                        // * <Recharts />
                        <div>{renderLineChart}</div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
