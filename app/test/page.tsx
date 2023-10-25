"use client";

import React, { PureComponent } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
    {
        age: "Children",
        suburb: 20.1,
        state: 18.9,
        fullMark: 100,
    },
    {
        age: "Teenagers",
        suburb: 15.7,
        state: 14.9,
        fullMark: 100,
    },
    {
        age: "Young Adults",
        suburb: 14.0,
        state: 12.0,
        fullMark: 100,
    },
    {
        age: "Middle Aged",
        suburb: 13.4,
        state: 14.7,
        fullMark: 100,
    },
    {
        age: "Seniors",
        suburb: 11.9,
        state: 10.0,
        fullMark: 100,
    },
];

export default function Test() {
    return (
        <>
            <h1>Hello</h1>
            <div>
                <RadarChart outerRadius="80%" width={730} height={450} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="age" />
                    <PolarRadiusAxis angle={30} />
                    <Radar name="suburb" dataKey="suburb" stroke="#8884d8" fill="#8884d8" fillOpacity={0.28} />
                    <Radar name="state" dataKey="state" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.28} />
                    <Legend />
                    <Tooltip offset={50} />
                </RadarChart>
            </div>
        </>
    );
}
