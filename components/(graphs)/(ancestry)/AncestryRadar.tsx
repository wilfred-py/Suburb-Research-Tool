import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { PureComponent, useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AncestryChartProps {
    selectedSuburb: string | null;
}

export default function AncestryChart(props: AncestryChartProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [suburbAncestry, setSuburbAncestry] = useState<{ key: string; value: number }[]>([]);
    const [selectedYear, setSelectedYear] = useState<string | undefined>("2021");

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
    async function fetchAncestryDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            setSuburbAncestry([]);

            // set selected year to 2021 from previous search
            setSelectedYear("2021");

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchAncestryDataByYear(year, `data_${year}`, props.selectedSuburb));

            const newSuburbAncestry: any[] = [];
            const newStateAncestry: any[] = [];

            //  Wait for data to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;

                try {
                    // Ancestry not recorded 2001, 2006
                    // * 2001
                    // * 2006

                    // * 2011
                    if (year == "2011") {
                        const ancestryData = data[0]["cultural_data"]["Ancestry, top responses"];
                        // console.log(ancestryData);

                        Object.entries(ancestryData).forEach(([key, value]) => {
                            // console.log(`Key: ${key}, Value: ${value}`);

                            // >> Suburb Ancestry
                            const suburbAncestryObject = {
                                ancestry: key,
                                suburb: parseFloat(ancestryData[key]["% of suburb"]),
                                state: parseFloat(ancestryData[key]["% of state"]),
                            };
                            newSuburbAncestry.push(suburbAncestryObject);
                        });

                        setSuburbAncestry(newSuburbAncestry);
                    }

                    // * 2016
                    else if (year == "2016") {
                        const ancestryData = data[0]["cultural_data"]["Ancestry, top responses"];
                        // console.log(ancestryData);

                        Object.entries(ancestryData).forEach(([key, value]) => {
                            // console.log(`Key: ${key}, Value: ${value}`);

                            // >> Suburb Ancestry
                            const suburbAncestryObject = {
                                ancestry: key,
                                suburb: parseFloat(ancestryData[key]["% of suburb"]),
                                state: parseFloat(ancestryData[key]["% of state"]),
                            };
                            newSuburbAncestry.push(suburbAncestryObject);
                        });

                        setSuburbAncestry(newSuburbAncestry);
                    }

                    // * 2021
                    else if (year == "2021") {
                        const ancestryData = data[0]["cultural_data"]["Ancestry, top responses"];
                        // console.log(ancestryData);

                        Object.entries(ancestryData).forEach(([key, value]) => {
                            // console.log(`Key: ${key}, Value: ${value}`);

                            // >> Suburb Ancestry
                            const suburbAncestryObject = {
                                ancestry: key,
                                suburb: parseFloat(ancestryData[key]["% of suburb"]),
                                state: parseFloat(ancestryData[key]["% of state"]),
                            };
                            newSuburbAncestry.push(suburbAncestryObject);
                        });

                        setSuburbAncestry(newSuburbAncestry);
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);

                    if (year === "2011") {
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
            setSuburbAncestry([]);
        }
    }, [props.selectedSuburb]);

    // * Create Radar Chart objects whenever suburbReligion state changes
    useEffect(() => {
        async function createRadarObjects() {
            // * Create arrays for each year
            const newTwentyElevenData: any = [];
            const newTwentySixteenData: any = [];
            const newTwentyTwentyOneData: any = [];

            // >> 2011
            for (let i = 0; i < 5; i++) {
                newTwentyElevenData.push(suburbAncestry[i]);
            }
            setTwentyElevenData(newTwentyElevenData);

            // >> 2016
            for (let i = 5; i < 10; i++) {
                newTwentySixteenData.push(suburbAncestry[i]);
            }
            setTwentySixteenData(newTwentySixteenData);

            // >> 2021
            for (let i = 10; i < 15; i++) {
                newTwentyTwentyOneData.push(suburbAncestry[i]);
            }
            setTwentyTwentyOneData(newTwentyTwentyOneData);
        }

        createRadarObjects();
    }, [suburbAncestry]);

    function handleYearChange(value: string) {
        setSelectedYear(value);
    }

    // ! CONSOLE LOGS
    // console.log(selectedYear);
    // ! CONSOLE LOGS

    return (
        <>
            <div className="select-none">
                <h1 className="mt-4 mb-4 text-lg text-center font-bold select-none">Ancestry</h1>
                <div className="ml-6">
                    <Select value={selectedYear} onValueChange={handleYearChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="2021" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2021">2021</SelectItem>
                            <SelectItem value="2016">2016</SelectItem>
                            <SelectItem value="2011">2011</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {selectedYear === "2011" && (
                    <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
                        <ResponsiveContainer>
                            <RadarChart outerRadius="80%" data={twentyElevenData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="ancestry" />
                                <PolarRadiusAxis angle={30} />
                                <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                                <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                                <Legend />
                                <Tooltip offset={50} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {selectedYear === "2016" && (
                    <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
                        <ResponsiveContainer>
                            <RadarChart outerRadius="80%" data={twentySixteenData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="ancestry" />
                                <PolarRadiusAxis angle={30} />
                                <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                                <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                                <Legend />
                                <Tooltip offset={50} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {selectedYear === "2021" && (
                    <div className="w-full h-full">
                        <ResponsiveContainer>
                            <RadarChart outerRadius="80%" data={twentyTwentyOneData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="ancestry" />
                                <PolarRadiusAxis angle={30} />
                                <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                                <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                                <Legend />
                                <Tooltip offset={50} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </>
    );
}
