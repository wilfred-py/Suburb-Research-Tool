"use client";

import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
    xAxis: [
        {
            label: "% of population working full-time hours",
        },
    ],
    width: 700,
    height: 700,
};
const dataset = [
    {
        suburb: 61.1,
        state: 54.2,
        australia: 55.1,
        year: "2001",
    },
    {
        suburb: 63.1,
        state: 54.9,
        australia: 55.3,
        year: "2006",
    },
    {
        suburb: 62.5,
        state: 53.2,
        australia: 54.9,
        year: "2011",
    },
    {
        suburb: 63.5,
        state: 57.2,
        australia: 57.2,
        year: "2016",
    },
    {
        suburb: 63.2,
        state: 57.1,
        australia: 56.8,
        year: "2021",
    },
];

const valueFormatter = (value: number) => `${value}%`;

export default function EmploymentHorizontalBar() {
    return (
        <div>
            <div className="flex flex-col justify-center">
                <h1 className="mt-4 text-lg text-center font-bold">Full-time employment</h1>
                <div className="mx-auto -mt-10">
                    <BarChart
                        dataset={dataset}
                        yAxis={[{ scaleType: "band", dataKey: "year" }]}
                        series={[
                            { dataKey: "suburb", label: "Suburb", valueFormatter, color: "#4e79a7" },
                            { dataKey: "state", label: "State", valueFormatter, color: "#f28e2c" },
                            { dataKey: "australia", label: "Australia", valueFormatter, color: "#59a14f" },
                        ]}
                        legend={{
                            direction: "row",
                            position: {
                                vertical: "top",
                                horizontal: "middle",
                            },
                        }}
                        sx={{
                            "--ChartsLegend-itemWidth": "70px",
                            "--ChartsLegend-itemMarkSize": "10px",
                            "--ChartsLegend-labelSpacing": "5px",
                            "--ChartsLegend-rootSpacing": "20px",
                        }}
                        layout="horizontal"
                        {...chartSetting}
                    />
                </div>
            </div>
        </div>
    );
}
