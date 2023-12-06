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

export default function ExampleStateDwellingStackedAreaChart(props: DwellingStackedAreaChartProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");
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

    return (
        <>
            <div>
                <div className="w-72 h-[360px] sm:w-[460px] sm:h-[400px] md:w-[560px] md:h-[440px] lg:w-[440px] mx-auto pr-6">
                    <h1 className="mt-4 mx-4 px-2 text-base text-center font-bold">Types of Dwellings in Victoria</h1>
                    <ResponsiveContainer>
                        <AreaChart
                            width={500}
                            height={500}
                            data={stateDwelling}
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
            </div>
        </>
    );
}
