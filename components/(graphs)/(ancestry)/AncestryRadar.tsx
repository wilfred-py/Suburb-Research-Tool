import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { PureComponent, useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

interface AncestryChartProps {
    selectedSuburb: string | null;
}

const data = [
    {
        subject: "Italian",
        suburb: 18.6,
        state: 2.8,
    },
    {
        subject: "Australian",
        suburb: 14.6,
        state: 25.0,
    },
    {
        subject: "English",
        suburb: 8.9,
        state: 24.2,
    },
    {
        subject: "Assyrian",
        suburb: 5.6,
        state: 0.2,
    },
    {
        subject: "Croatian",
        suburb: 4.8,
        state: 0.5,
    },
];

export default function AncestryChart(props: AncestryChartProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [suburbAncestry, setSuburbAncestry] = useState<{ key: string; value: number }[]>([]);
    const [stateAncestry, setStateAncestry] = useState<string | null[]>([]);

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
            console.log("test");
            setStateAncestry([]);

            console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchAncestryDataByYear(year, `data_${year}`, props.selectedSuburb));

            const newSuburbAncestry = [...suburbAncestry];
            console.log(newSuburbAncestry);
            const newStateAncestry = [...stateAncestry];

            //  Wait for data to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;

                try {
                    // Age brackets different to 2011, 2016, 2021
                    // * 2001
                    // * 2006

                    // * 2011
                    if (year == "2011") {
                        const ancestryData = data[0]["cultural_data"]["Ancestry, top responses"];
                        console.log(ancestryData);

                        Object.entries(ancestryData).forEach(([key, value]) => {
                            console.log(`Key: ${key}, Value: ${value}`);

                            const ancestryObject = { key: key, value: parseFloat(ancestryData[key]["% of suburb"]) };
                            newSuburbAncestry.push(ancestryObject);
                        });

                        setSuburbAncestry(newSuburbAncestry);
                    }

                    // * 2016
                    else if (year == "2016") {
                    }

                    // * 2021
                    else if (year == "2021") {
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
        }
    }, [props.selectedSuburb]);

    // ! CONSOLE LOGS
    console.log(suburbAncestry);
    // ! CONSOLE LOGS

    return (
        <>
            <div>
                <RadarChart outerRadius="80%" width={730} height={450} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} />
                    <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                    <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                    <Legend />
                    <Tooltip offset={50} />
                </RadarChart>
            </div>
        </>
    );
}
