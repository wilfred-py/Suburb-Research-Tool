"use client";

import React, { PureComponent } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import NavBar from "../NavBar";

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const data = [
    {
        year: "2011",
        separateHouse: 28.6,
        semiDetached: 39.5,
        flatUnitApartment: 31.2,
        otherDwelling: 0.5,
    },
    {
        year: "2016",
        separateHouse: 13.0,
        semiDetached: 26.2,
        flatUnitApartment: 59.6,
        otherDwelling: 0.6,
    },
    {
        year: "2021",
        separateHouse: 10.2,
        semiDetached: 23.9,
        flatUnitApartment: 62.8,
        otherDwelling: 3.0,
    },
];

const toPercent = (decimal: number, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value: number, total: number) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
};

const renderTooltipContent = (o: any) => {
    const { payload, label } = o;
    const total = payload.reduce((result: any, entry: any) => result + entry.value, 0);

    return (
        <div className="customized-tooltip-content">
            <p className="total">{`${label} (Total: ${total})`}</p>
            <ul className="list">
                {payload.map((entry: any, index: any) => (
                    <li key={`item-${index}`} style={{ color: entry.color }}>
                        {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function Test() {
    return (
        <>
            <NavBar />
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 30,
                    right: 30,
                    left: 30,
                    bottom: 30,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="separateHouse" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="semiDetached" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="flatUnitApartment" stackId="1" stroke="#ffc658" fill="#ffc658" />
                <Area type="monotone" dataKey="otherDwelling" stackId="1" stroke="#39A7FF" fill="#39A7FF" />
            </AreaChart>
        </>
    );
}
