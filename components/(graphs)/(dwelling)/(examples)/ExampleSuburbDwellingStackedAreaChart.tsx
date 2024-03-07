import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { PureComponent, useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label } from "recharts";

interface DwellingStackedAreaChartProps {
    selectedSuburb: string | null;
}

type DwellingData = {
    year: string;
    [key: string]: number | string;
};

export default function ExampleSuburbDwellingStackedAreaChart(props: DwellingStackedAreaChartProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");
    const [suburbDwelling, setSuburbDwelling] = useState<DwellingData[]>([
        {
            year: "2001",
            "Separate House": 31,
            "Semi-detached / Townhouse": 48.3,
            "Flat, unit or apartment": 17.9,
            "Other dwelling": 2.8,
        },
        {
            year: "2006",
            "Separate House": 25.4,
            "Semi-detached / Townhouse": 47.2,
            "Flat, unit or apartment": 26.6,
            "Other dwelling": 0.8,
        },
        {
            year: "2011",
            "Separate House": 28.6,
            "Semi-detached / Townhouse": 39.4,
            "Flat, unit or apartment": 31.3,
            "Other dwelling": 0.5,
        },
        {
            year: "2016",
            "Separate House": 13,
            "Semi-detached / Townhouse": 26.2,
            "Flat, unit or apartment": 59.6,
            "Other dwelling": 0.6,
        },
        {
            year: "2021",
            "Separate House": 10.2,
            "Semi-detached / Townhouse": 23.9,
            "Flat, unit or apartment": 62.8,
            "Other dwelling": 3,
        },
    ]);
    const [stateDwelling, setStateDwelling] = useState<DwellingData[]>([
        {
            year: "2011",
            "Separate House": 76.9,
            "Semi-detached / Townhouse": 9.6,
            "Flat, unit or apartment": 12.9,
            "Other dwelling": 0.6,
        },
        {
            year: "2016",
            "Separate House": 73.2,
            "Semi-detached / Townhouse": 14.2,
            "Flat, unit or apartment": 11.6,
            "Other dwelling": 0.5,
        },
        {
            year: "2021",
            "Separate House": 73.4,
            "Semi-detached / Townhouse": 13.9,
            "Flat, unit or apartment": 12.1,
            "Other dwelling": 0.4,
        },
    ]);
    const [australiaDwelling, setAustraliaDwelling] = useState<{ key: string; value: number }[]>([]);

    const [twoThousandAndOneDataAvailable, setTwoThousandAndOneDataAvailable] = useState(true);

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
    async function fetchDwellingDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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

    return (
        <>
            <div className="w-72 h-[360px] sm:w-[460px] sm:h-[400px] md:w-[560px] md:h-[440px] lg:w-[440px] mx-auto pr-6 select-none">
                <h1 className="mt-4 mx-4 px-2 text-base text-center font-bold">Types of Dwellings in Abbotsford</h1>
                <ResponsiveContainer>
                    <AreaChart
                        width={500}
                        height={500}
                        data={suburbDwelling}
                        margin={{
                            top: 20,
                            right: 25,
                            left: -1,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year"></XAxis>
                        <YAxis domain={[0, 100]} tickCount={10}>
                            <Label value="%" position="insideTopLeft"></Label>
                        </YAxis>
                        <Legend width={260} align={"center"} verticalAlign="bottom" layout={"vertical"} />
                        <Tooltip />
                        <Area type="monotone" dataKey="Separate House" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="Semi-detached / Townhouse" stackId="1" stroke="#B8621B" fill="#B8621B" />
                        <Area type="monotone" dataKey="Flat, unit or apartment" stackId="1" stroke="#ffc658" fill="#ffc658" />
                        <Area type="monotone" dataKey="Other dwelling" stackId="1" stroke="#28544B" fill="#28544B" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}
