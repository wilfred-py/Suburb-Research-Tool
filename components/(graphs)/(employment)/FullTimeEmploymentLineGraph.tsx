"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);
    const [incomeData, setIncomeData] = useState<IncomeDataItem[]>([]);
    const [employmentData, setEmploymentData] = useState<EmploymentDataItem[]>([]);
    const [suburbFullTime, setSuburbFullTime] = useState<number[]>([55, 55, 55, 55, 55]);
    const [stateFullTime, setStateFullTime] = useState<number[]>([55, 55, 55, 55, 55]);
    const [australiaFullTime, setAustraliaFullTime] = useState<number[]>([55, 55, 55, 55, 55]);

    const supabase = createClientComponentClient();

    // const suburbFullTime = [51.1, 53.1, 52.5, 53.5, 53.2];
    // const stateFullTime = [54.2, 54.9, 53.2, 57.2, 57.1];
    // const australiaFullTime = [55.1, 55.3, 54.9, 57.2, 56.8];

    function deconstructSuburb(selectedSuburb: string | null) {
        // State Regex
        const stateRegex = /^(.*?),\s*(VIC|NSW|ACT|WA|SA|TAS|NT)/;

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

        setDeconstructedSuburb(suburbName);
        setDeconstructedState(stateName);

        return {
            suburbName,
            stateName,
            postcode,
        };
    }

    // useEffect(() => {
    //     // * Fetch 2021 income data
    //     async function fetchIncomeData(tableName: string, selectedSuburb: string | null) {
    //         try {
    //             // * Deconstruct selectedSuburb prop
    //             const { suburbName, stateName } = deconstructSuburb(selectedSuburb);

    //             // * Filter through income_and_work_2021 table on Supabase using suburb_name & state_name
    //             const { data, error } = await supabase
    //                 .from(tableName)
    //                 .select("*")
    //                 .eq("suburb_name", suburbName)
    //                 .eq("state_name", stateName);

    //             console.log(`data: ${data}`);
    //             console.log(error);
    //             setIncomeData(data || []);

    //             if (error) {
    //                 console.error("Error fetching data:", error);
    //             } else {
    //                 const formattedData = data?.map((item: IncomeDataItem) => {
    //                     const incomeData = item?.income_data;
    //                     const formattedIncomeData: any = {};

    //                     // Key examples:
    //                     // 1. "Employment status"
    //                     // 2. "Employment, hours worked"
    //                     // 3. "Median weekly incomes (a)"

    //                     // Loop through keys in income_data
    //                     for (const key in incomeData) {
    //                         if (incomeData?.hasOwnProperty(key)) {
    //                             const innerData = incomeData[key];

    //                             // innerData example:
    //                             // {
    //                             //     "Unemployed": {
    //                             //       "NSW": "2,136,610",
    //                             //       "Australia": "7,095,103",
    //                             //       "% of state": "55.2",
    //                             //       "Abbotsbury": "1,110",
    //                             //       "% of suburb": "53.0",
    //                             //       "% of country": "55.9"
    //                             //     },
    //                             //     "Worked full-time": {
    //                             //       "NSW": "2,136,610",
    //                             //       "Australia": "7,095,103",
    //                             //       "% of state": "55.2",
    //                             //       "Abbotsbury": "1,110",
    //                             //       "% of suburb": "53.0",
    //                             //       "% of country": "55.9"
    //                             //     },
    //                             //     "Worked part-time": {
    //                             //       "NSW": "2,136,610",
    //                             //       "Australia": "7,095,103",
    //                             //       "% of state": "55.2",
    //                             //       "Abbotsbury": "1,110",
    //                             //       "% of suburb": "53.0",
    //                             //       "% of country": "55.9"
    //                             //     },
    //                             //     "Away from work (a)": {
    //                             //       "NSW": "2,136,610",
    //                             //       "Australia": "7,095,103",
    //                             //       "% of state": "55.2",
    //                             //       "Abbotsbury": "1,110",
    //                             //       "% of suburb": "53.0",
    //                             //       "% of country": "55.9"
    //                             //     }
    //                             //   }

    //                             const formattedInnerData: any = {};

    //                             // Loop through keys in innerData
    //                             for (const innerKey in innerData) {
    //                                 if (innerData?.hasOwnProperty(innerKey)) {
    //                                     formattedInnerData[innerKey] = innerData[innerKey];
    //                                     // formattedInnerData example
    //                                     // {
    //                                     //   "NSW": "2,136,610",
    //                                     //   "Australia": "7,095,103",
    //                                     //   "% of state": "55.2",
    //                                     //   "Abbotsbury": "1,110",
    //                                     //   "% of suburb": "53.0",
    //                                     //   "% of country": "55.9"
    //                                     // }
    //                                 }
    //                             }

    //                             // Assign the formattedInnerData to corresponding key in formattedFullTImeData
    //                             formattedIncomeData[key] = formattedInnerData;
    //                         }
    //                     }

    //                     // Return an object containing the formatted data

    //                     console.log(`incomeData: ${incomeData}`);

    //                     setIncomeData(incomeData);

    //                     // * Read FT employment % of suburb from incomeData and set to state
    //                     const suburbFullTime = [0, 0, 0, 0, parseFloat(incomeData["Employment status"]["Worked full-time"]["% of suburb"])];
    //                     setSuburbFullTime(suburbFullTime);

    //                     // * Read FT employment % of suburb from incomeData and set to state
    //                     const stateFullTime = [0, 0, 0, 0, parseFloat(incomeData["Employment status"]["Worked full-time"]["% of state"])];
    //                     setStateFullTime(stateFullTime);

    //                     // * Read FT employment % of suburb from incomeData and set to state
    //                     const australiaFullTime = [
    //                         0,
    //                         0,
    //                         0,
    //                         0,
    //                         parseFloat(incomeData["Employment status"]["Worked full-time"]["% of Australia"]),
    //                     ];
    //                     setAustraliaFullTime(australiaFullTime);

    //                     return {
    //                         incomeData: formattedIncomeData,
    //                     };
    //                 });
    //             }
    //         } catch (error) {
    //             console.error("Data fetch unsuccessful", error);
    //         }
    //     }

    // // * Fetch employment data from "employment_data" jsonb column (2001, 2006, 2016 - these years share common employment HTML structure)
    // async function fetchEmploymentDataA(tableName: string, selectedSuburb: string | null) {
    //     try {
    //         // * Deconstruct selectedSuburb prop
    //         const { suburbName, stateName } = deconstructSuburb(selectedSuburb);

    //         // * Filter through income_and_work_2021 table on Supabase using suburb_name & state_name
    //         const { data, error } = await supabase
    //             .from(tableName)
    //             .select("*")
    //             .eq("suburb_name", suburbName)
    //             .eq("state_name", stateName);

    //         console.log(data);
    //         console.log(`error: ${error}`);
    //         setEmploymentData(data || []);

    //         if (error) {
    //             console.error("Error fetching data:", error);
    //         } else {
    //             const formattedData = data?.map((item: EmploymentDataItem) => {
    //                 const employmentData = item?.employment_data;
    //                 const formattedEmploymentData: any = {};

    //                 // Loop through keys in income_data
    //                 for (const key in employmentData) {
    //                     if (employmentData?.hasOwnProperty(key)) {
    //                         const innerData = employmentData[key];

    //                         const formattedInnerData: any = {};

    //                         // Loop through keys in innerData
    //                         for (const innerKey in innerData) {
    //                             if (innerData?.hasOwnProperty(innerKey)) {
    //                                 formattedInnerData[innerKey] = innerData[innerKey];
    //                             }
    //                         }

    //                         // Assign the formattedInnerData to corresponding key in formattedFullTImeData
    //                         formattedEmploymentData[key] = formattedInnerData;
    //                     }
    //                 }

    //                 // Return an object containing the formatted data

    //                 console.log(employmentData);
    //                 console.log(employmentData[0]);
    //                 setEmploymentData(employmentData);

    //                 const newSuburbFullTime = [...suburbFullTime];
    //                 const newStateFullTime = [...stateFullTime];
    //                 const newAustraliaFullTime = [...australiaFullTime];

    //                 if (tableName == "data_2001") {
    //                     newSuburbFullTime[0] = parseFloat(
    //                         employmentData["Employment People aged 15 years and over"]["Worked full-time"]["% of suburb"]
    //                     );
    //                     setSuburbFullTime(newSuburbFullTime);
    //                     // newStateFullTime[0] = parseFloat(
    //                     //     employmentData["Employment People aged 15 years and over"]["Worked full-time"]["% of state"]
    //                     // );
    //                     // setStateFullTime(newStateFullTime);
    //                     // newAustraliaFullTime[0] = parseFloat(
    //                     //     employmentData["Employment People aged 15 years and over"]["Worked full-time"]["% of Australia"]
    //                     // );
    //                     // setAustraliaFullTime(newAustraliaFullTime);
    //                 } else if (tableName == "data_2006") {
    //                     newSuburbFullTime[1] = parseFloat(
    //                         employmentData["Employment People aged 15 years and over"]["Worked full-time"]["% of suburb"]
    //                     );
    //                     setSuburbFullTime(newSuburbFullTime);
    //                 } else if (tableName == "data_2016") {
    //                     newSuburbFullTime[3] = parseFloat(
    //                         employmentData["Employment People aged 15 years and over"]["Worked full-time"]["% of suburb"]
    //                     );
    //                     setSuburbFullTime(newSuburbFullTime);
    //                 }

    //                 // else if (tableName == "data_2011") {
    //                 //     newSuburbFullTime[2] = parseFloat(
    //                 //         employmentData["Employment People who reported being in the labour force, aged 15 years and over"][
    //                 //             "Worked full-time"
    //                 //         ]["% of suburb"]
    //                 //     );
    //                 //     setSuburbFullTime(newSuburbFullTime);
    //                 // } else if (tableName == "income_and_work_2021") {
    //                 //     newSuburbFullTime[4] = parseFloat(employmentData["Employment status"]["Worked full-time"]["% of suburb"]);
    //                 //     setSuburbFullTime(newSuburbFullTime);
    //                 // }

    //                 return {
    //                     employmentData: formattedEmploymentData,
    //                 };
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Data fetch unsuccessful", error);
    //     }
    // }

    //     // !!
    //     // ? (employmentDataFetchA)
    //     // - 2001: ["Employment People aged 15 years and over"]["Worked full-time"][% of xyz]
    //     // - 2006: ["Employment People aged 15 years and over"]["Worked full-time"][% of xyz]
    //     // - 2016: ["Employment People aged 15 years and over"]["Worked full-time"][% of xyz]

    //     // - 2011: ["Employment People who reported being in the labour force, aged 15 years and over"]["Worked full-time"][% of xyz]

    //     // - 2021: ["Employment status"]["Worked full-time"][% of xyz]

    //     // * Call async data fetch functions for each year
    //     fetchEmploymentDataA("data_2001", props.selectedSuburb);
    //     fetchEmploymentDataA("data_2006", props.selectedSuburb);
    //     // fetchEmploymentData("data_2011", props.selectedSuburb);
    //     fetchEmploymentDataA("data_2016", props.selectedSuburb);
    //     // fetchIncomeData("income_and_work_2021", props.selectedSuburb);
    //     // !!!
    // }, [props.selectedSuburb]);

    // console.log(suburbFullTime);
    // console.log(stateFullTime);
    // console.log(australiaFullTime);

    // * Function that fetches data for a specific year
    async function fetchEmploymentDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
        try {
            const { suburbName, stateName } = deconstructSuburb(selectedSuburb);
            console.log(`suburbName: ${suburbName}`);
            const { data, error } = await supabase.from(tableName).select("*").eq("suburb_name", suburbName).eq("state_name", stateName);

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
            const years = ["2001", "2006", "2011", "2016", ""];
            const dataPromises = years.map((year) => fetchEmploymentDataByYear(year, `data_${year}`, props.selectedSuburb));

            const newSuburbFullTime = [...suburbFullTime];
            const newStateFullTime = [...stateFullTime];
            const newAustraliaFullTime = [...australiaFullTime];

            //  Wait for datat to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;

                // Process and update state based on year and data
                // (Similar to what you were doing in your fetchEmploymentDataA function)
                console.log(`result: ${JSON.stringify(result, null, 2)}`);
                console.log(`data: ${data}`);

                // * 2001
                if (year == "2001") {
                    const percentageSuburbFullTime =
                        data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of suburb"];

                    if (percentageSuburbFullTime) {
                        newSuburbFullTime[0] = percentageSuburbFullTime;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (!percentageSuburbFullTime) {
                        // ! If data is not available, remove element from array so line graph does not display it
                        newSuburbFullTime[0] = 0;
                    }
                }
                // * 2006
                else if (year == "2006") {
                    const percentageSuburbFullTime =
                        data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of suburb"];

                    if (percentageSuburbFullTime) {
                        newSuburbFullTime[1] = percentageSuburbFullTime;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (!percentageSuburbFullTime) {
                        // ! If data is not available, remove element from array so line graph does not display it
                        newSuburbFullTime[1] = 0;
                    }
                }

                // * 2011
                else if (year == "2011") {
                    const percentageSuburbFullTime =
                        data[0]["employment_data"]["Employment People who reported being in the labour force, aged 15 years and over"][
                            "Worked full-time"
                        ]["% of suburb"];

                    if (percentageSuburbFullTime) {
                        newSuburbFullTime[2] = percentageSuburbFullTime;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (!percentageSuburbFullTime) {
                        // ! If data is not available, remove element from array so line graph does not display it
                        newSuburbFullTime[2] = 0;
                    }
                }

                // * 2016
                else if (year == "2016") {
                    try {
                        const percentageSuburbFullTime =
                            data[0]["employment_data"]["Employment People aged 15 years and over"]["Worked full-time"]["% of suburb"];
                        if (percentageSuburbFullTime) {
                            newSuburbFullTime[3] = percentageSuburbFullTime;
                            setSuburbFullTime(newSuburbFullTime);
                        }
                    } catch (error) {
                        console.error("Error: data does not exist", error);
                        // ! If data is not available, remove element from array so line graph does not display it
                        newSuburbFullTime[3] = 0;
                    }
                }

                // * 2021
                else if (year == "2021") {
                    const percentageSuburbFullTime = data[0]["Employment status"]["Worked full-time"]["% of suburb"];

                    if (percentageSuburbFullTime) {
                        newSuburbFullTime[4] = percentageSuburbFullTime;
                        setSuburbFullTime(newSuburbFullTime);
                    } else if (!percentageSuburbFullTime) {
                        // ! If data is not available, remove element from array so line graph does not display it
                        newSuburbFullTime[4] = 0;
                    }
                }
            });
        }

        if (props.selectedSuburb) {
            fetchData();
        }
    }, [props.selectedSuburb]);

    console.log(`suburbFullTime: ${suburbFullTime}`);

    return (
        <div>
            <div className="flex flex-col justify-center">
                <h1 className="mt-4 text-lg text-center font-bold">Full-time employment</h1>
                <div className="mx-auto -mt-10">
                    {incomeData ? (
                        <LineChart
                            xAxis={[
                                {
                                    data: ["2001", "2006", "2011", "2016", "2021"],
                                },
                            ]}
                            yAxis={[
                                {
                                    min: 30,
                                    max: 80,
                                },
                            ]}
                            series={[
                                {
                                    id: "suburb",
                                    label: "Suburb",
                                    data: suburbFullTime,
                                    showMark: false,
                                    curve: "natural",
                                },
                                {
                                    id: "state",
                                    label: "State",
                                    data: stateFullTime,
                                    showMark: false,
                                    curve: "natural",
                                },
                                {
                                    id: "australia",
                                    label: "Australia",
                                    data: australiaFullTime,
                                    showMark: false,
                                    curve: "natural",
                                },
                            ]}
                            sx={{
                                "--ChartsLegend-itemWidth": "70px",
                                "--ChartsLegend-itemMarkSize": "10px",
                                "--ChartsLegend-labelSpacing": "5px",
                                "--ChartsLegend-rootSpacing": "20px",
                            }}
                            legend={{
                                direction: "row",
                                position: {
                                    vertical: "top",
                                    horizontal: "middle",
                                },
                            }}
                            width={550}
                            height={400}
                            margin={{ left: 70 }}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
