import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { PureComponent, useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AncestryChartProps {
    selectedSuburb: string | null;
}

export default function AncestryChart(props: AncestryChartProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [suburbAncestry, setSuburbAncestry] = useState<{ key: string; value: number }[]>([]);
    const [selectedYear, setSelectedYear] = useState<string | null>("2021");

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

            console.log(`selectedSuburb: ${props.selectedSuburb}`);
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
                    // Ancestry not recorded 2011, 2016, 2021
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

                            // >> State Ancestry
                            const stateAncestryObject = { key: key, value: parseFloat(ancestryData[key]["% of state"]) };
                            newStateAncestry.push(stateAncestryObject);
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

                            // >> State Ancestry
                            const stateAncestryObject = { key: key, value: parseFloat(ancestryData[key]["% of state"]) };
                            newStateAncestry.push(stateAncestryObject);
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

                            // >> State Ancestry
                            const stateAncestryObject = { key: key, value: parseFloat(ancestryData[key]["% of state"]) };
                            newStateAncestry.push(stateAncestryObject);
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

    // * Create arrays for each year
    const twentyElevenData: any = [];
    const twentySixteenData: any = [];
    const twentyTwentyOneData: any = [];
    for (let i = 0; i < 5; i++) {
        twentyElevenData.push(suburbAncestry[i]);
    }

    for (let i = 5; i < 10; i++) {
        twentySixteenData.push(suburbAncestry[i]);
    }

    for (let i = 10; i < 15; i++) {
        twentyTwentyOneData.push(suburbAncestry[i]);
    }

    function handleYearChange(value: string) {
        setSelectedYear(value);
    }

    // ! CONSOLE LOGS
    // console.log(selectedYear);
    // ! CONSOLE LOGS

    return (
        <>
            <div>
                <Select onValueChange={handleYearChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="2021" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2016">2016</SelectItem>
                        <SelectItem value="2011">2011</SelectItem>
                    </SelectContent>
                </Select>

                {selectedYear === "2011" && (
                    <div>
                        <RadarChart outerRadius="80%" width={730} height={450} data={twentyElevenData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="ancestry" />
                            <PolarRadiusAxis angle={30} />
                            <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                            <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                            <Legend />
                            <Tooltip offset={50} />
                        </RadarChart>
                    </div>
                )}

                {selectedYear === "2016" && (
                    <div>
                        <RadarChart outerRadius="80%" width={730} height={450} data={twentySixteenData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="ancestry" />
                            <PolarRadiusAxis angle={30} />
                            <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                            <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                            <Legend />
                            <Tooltip offset={50} />
                        </RadarChart>
                    </div>
                )}

                {selectedYear === "2021" && (
                    <div>
                        <RadarChart outerRadius="80%" width={730} height={450} data={twentyTwentyOneData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="ancestry" />
                            <PolarRadiusAxis angle={30} />
                            <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                            <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                            <Legend />
                            <Tooltip offset={50} />
                        </RadarChart>
                    </div>
                )}
            </div>
        </>
    );
}
