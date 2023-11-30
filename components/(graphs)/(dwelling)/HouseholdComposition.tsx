import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { PureComponent, useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HouseholdCompositionChartProps {
    selectedSuburb: string | null;
}

export default function HouseholdCompositionChart(props: HouseholdCompositionChartProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [suburbHouseholdComposition, setSuburbHouseholdComposition] = useState<{ key: string; value: number }[]>([]);
    const [selectedYear, setSelectedYear] = useState<string | undefined>("2021");

    const [twoThousandAndSixData, setTwoThousandAndSixData] = useState<{ key: string; value: number }[]>([]);
    const [twentyElevenData, setTwentyElevenData] = useState<{ key: string; value: number }[]>([]);
    const [twentySixteenData, setTwentySixteenData] = useState<{ key: string; value: number }[]>([]);
    const [twentyTwentyOneData, setTwentyTwentyOneData] = useState<{ key: string; value: number }[]>([]);

    const supabase = createClientComponentClient();

    // * Function that deconstructs the passed down props.selectedSuburb
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

        return {
            suburbName,
            stateName,
            postcode,
        };
    }

    // * Function that fetches age data for a specific year
    async function fetchHouseholdCompositionDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
        try {
            const { suburbName, stateName } = deconstructSuburb(selectedSuburb);
            setSelectedSuburb(suburbName);

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
            // Clear old array values from previous search
            setSuburbHouseholdComposition([]);

            // set selected year to 2021 from previous search
            setSelectedYear("2021");

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchHouseholdCompositionDataByYear(year, `data_${year}`, props.selectedSuburb));

            const newSuburbHouseholdComposition: any[] = [];
            const newStateHouseholdComposition: any[] = [];

            //  Wait for data to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;

                try {
                    // HouseholdComposition not recorded 2011, 2016, 2021
                    // * 2001
                    // >> Household composition data not recorded in 2001

                    // * 2006
                    if (year == "2006") {
                        // >> Suburb HouseholdComposition
                        // >> State HouseholdComposition data not recorded for 2006

                        const suburbFamilyHouseholds = {
                            label: "Family households",
                            suburb: parseFloat(data[0]["percentage_family_households_in_suburb"]),
                        };
                        const suburbSingleHouseholds = {
                            label: "Single person households",
                            suburb: parseFloat(data[0]["percentage_single_or_lone_person_households_in_suburb"]),
                        };
                        const suburbGroupHouseholds = {
                            label: "Group households",
                            suburb: parseFloat(data[0]["percentage_group_households_in_suburb"]),
                        };

                        newSuburbHouseholdComposition.push(suburbFamilyHouseholds, suburbSingleHouseholds, suburbGroupHouseholds);
                        setSuburbHouseholdComposition(newSuburbHouseholdComposition);
                    }

                    // * 2011
                    else if (year == "2011") {
                        // >> Suburb HouseholdComposition
                        // >> State HouseholdComposition data not recorded for 2006

                        const suburbFamilyHouseholds = {
                            label: "Family households",
                            suburb: parseFloat(data[0]["percentage_family_households_in_suburb"]),
                            state: parseFloat(data[0]["percentage_family_households_in_state"]),
                        };
                        const suburbSingleHouseholds = {
                            label: "Single person households",
                            suburb: parseFloat(data[0]["percentage_single_or_lone_person_households_in_suburb"]),
                            state: parseFloat(data[0]["percentage_single_or_lone_person_households_in_state"]),
                        };
                        const suburbGroupHouseholds = {
                            label: "Group households",
                            suburb: parseFloat(data[0]["percentage_group_households_in_state"]),
                            state: parseFloat(data[0]["percentage_group_households_in_state"]),
                        };

                        newSuburbHouseholdComposition.push(suburbFamilyHouseholds, suburbSingleHouseholds, suburbGroupHouseholds);
                        setSuburbHouseholdComposition(newSuburbHouseholdComposition);
                    }

                    // * 2016
                    else if (year == "2016") {
                        // >> Suburb HouseholdComposition
                        // >> State HouseholdComposition data not recorded for 2006

                        const suburbFamilyHouseholds = {
                            label: "Family households",
                            suburb: parseFloat(data[0]["percentage_family_households_in_suburb"]),
                            state: parseFloat(data[0]["percentage_family_households_in_state"]),
                        };
                        const suburbSingleHouseholds = {
                            label: "Single person households",
                            suburb: parseFloat(data[0]["percentage_single_or_lone_person_households_in_suburb"]),
                            state: parseFloat(data[0]["percentage_single_or_lone_person_households_in_state"]),
                        };
                        const suburbGroupHouseholds = {
                            label: "Group households",
                            suburb: parseFloat(data[0]["percentage_group_households_in_state"]),
                            state: parseFloat(data[0]["percentage_group_households_in_state"]),
                        };

                        newSuburbHouseholdComposition.push(suburbFamilyHouseholds, suburbSingleHouseholds, suburbGroupHouseholds);
                        setSuburbHouseholdComposition(newSuburbHouseholdComposition);
                    }

                    // * 2021
                    else if (year == "2021") {
                        // >> Suburb HouseholdComposition
                        // >> State HouseholdComposition data not recorded for 2006

                        const suburbFamilyHouseholds = {
                            label: "Family households",
                            suburb: parseFloat(data[0]["percentage_family_households_in_suburb"]),
                            state: parseFloat(data[0]["percentage_family_households_in_state"]),
                        };
                        const suburbSingleHouseholds = {
                            label: "Single person households",
                            suburb: parseFloat(data[0]["percentage_single_or_lone_person_households_in_suburb"]),
                            state: parseFloat(data[0]["percentage_single_or_lone_person_households_in_state"]),
                        };
                        const suburbGroupHouseholds = {
                            label: "Group households",
                            suburb: parseFloat(data[0]["percentage_group_households_in_state"]),
                            state: parseFloat(data[0]["percentage_group_households_in_state"]),
                        };

                        newSuburbHouseholdComposition.push(suburbFamilyHouseholds, suburbSingleHouseholds, suburbGroupHouseholds);
                        setSuburbHouseholdComposition(newSuburbHouseholdComposition);
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);

                    if (year === "2006") {
                        console.log(`2006 data not available for ${selectedSuburb}`);
                    } else if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                    }
                }
            });
        }

        if (props.selectedSuburb) {
            fetchData();
        } else {
            setSuburbHouseholdComposition([]);
        }
    }, [props.selectedSuburb]);

    // * Create Radar Chart objects whenever suburbHouseholdComposition state changes
    useEffect(() => {
        async function createRadarObjects() {
            // * Create arrays for each year
            const newTwoThousandAndSixData: any = [];
            const newTwentyElevenData: any = [];
            const newTwentySixteenData: any = [];
            const newTwentyTwentyOneData: any = [];

            // >> 2006
            for (let i = 0; i < 3; i++) {
                newTwoThousandAndSixData.push(suburbHouseholdComposition[i]);
            }
            setTwoThousandAndSixData(newTwoThousandAndSixData);

            // >> 2011
            for (let i = 3; i < 6; i++) {
                newTwentyElevenData.push(suburbHouseholdComposition[i]);
            }
            setTwentyElevenData(newTwentyElevenData);

            // >> 2016
            for (let i = 6; i < 9; i++) {
                newTwentySixteenData.push(suburbHouseholdComposition[i]);
            }
            setTwentySixteenData(newTwentySixteenData);

            // >> 2021
            for (let i = 9; i < 12; i++) {
                newTwentyTwentyOneData.push(suburbHouseholdComposition[i]);
            }
            setTwentyTwentyOneData(newTwentyTwentyOneData);
        }
        createRadarObjects();
    }, [suburbHouseholdComposition]);

    function handleYearChange(value: string) {
        setSelectedYear(value);
    }

    // ! CONSOLE LOGS
    // console.log(suburbHouseholdComposition);
    // console.log(twoThousandAndSixData);
    // ! CONSOLE LOGS

    return (
        <>
            <div className="flex flex-col border border-gray-200 rounded-md shadow-lg hover:shadow-xl my-4">
                <h1 className="text-2xl font-bold mx-auto mt-4">Household Composition</h1>

                <div className="w-full flex flex-col justify-center mx-auto">
                    <div className="content-start">
                        <Select value={selectedYear} onValueChange={handleYearChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="2021" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2021">2021</SelectItem>
                                <SelectItem value="2016">2016</SelectItem>
                                <SelectItem value="2011">2011</SelectItem>
                                <SelectItem value="2006">2006</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedYear === "2006" && (
                        <div className="w-[800px] h-[600px] select-none">
                            <ResponsiveContainer>
                                <RadarChart
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    width={1000}
                                    height={1000}
                                    margin={{ top: 0, right: 20, bottom: 100, left: 20 }}
                                    data={twoThousandAndSixData}
                                >
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="label" />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                    <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.5} />
                                    <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.15} />
                                    <Legend align="center" margin={{ top: 10, left: 0, right: 0, bottom: 0 }} />
                                    <Tooltip offset={50} />
                                </RadarChart>
                            </ResponsiveContainer>
                            <p className="text-center">Note: group households consist of two or more unrelated people aged 15 and older</p>
                        </div>
                    )}

                    {selectedYear === "2011" && (
                        <div className="w-[800px] h-[600px] select-none">
                            <ResponsiveContainer>
                                <RadarChart
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    width={1000}
                                    height={1000}
                                    margin={{ top: 0, right: 20, bottom: 100, left: 20 }}
                                    data={twentyElevenData}
                                >
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="label" />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                    <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.5} />
                                    <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.15} />
                                    <Legend align="center" margin={{ top: 10, left: 0, right: 0, bottom: 0 }} />
                                    <Tooltip offset={50} />
                                </RadarChart>
                            </ResponsiveContainer>
                            <p className="text-center">Note: group households consist of two or more unrelated people aged 15 and older</p>
                        </div>
                    )}

                    {selectedYear === "2016" && (
                        <div className="w-[800px] h-[600px] select-none">
                            <ResponsiveContainer>
                                <RadarChart
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    width={1000}
                                    height={1000}
                                    margin={{ top: 0, right: 20, bottom: 100, left: 20 }}
                                    data={twentySixteenData}
                                >
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="label" />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                    <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.5} />
                                    <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.15} />
                                    <Legend align="center" margin={{ top: 10, left: 0, right: 0, bottom: 0 }} />
                                    <Tooltip offset={50} />
                                </RadarChart>
                            </ResponsiveContainer>
                            <p className="text-center">Note: group households consist of two or more unrelated people aged 15 and older</p>
                        </div>
                    )}

                    {selectedYear === "2021" && (
                        <div className="w-full max-w-screen-2xl h-[600px] select-none content-center">
                            <ResponsiveContainer>
                                <RadarChart
                                    cx="50%"
                                    cy="60%"
                                    outerRadius="80%"
                                    margin={{ top: -180, right: 20, bottom: 50, left: 20 }}
                                    data={twentyTwentyOneData}
                                >
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="label" />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                    <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.5} />
                                    <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.15} />
                                    <Legend align="center" margin={{ top: 10, left: 0, right: 0, bottom: 0 }} />
                                    <Tooltip offset={50} />
                                </RadarChart>
                            </ResponsiveContainer>
                            <p className="mb-2 text-center">
                                Note: group households consist of two or more unrelated people aged 15 and older
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
