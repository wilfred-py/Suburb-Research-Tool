"use client";

import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import NavBar from "../NavBar";

const suburbFullTime = [50, 53.1, 52.5, 53.5, 53.2];
const stateFullTime = [50, 50, 53.2, 57.2, 57.1];
const australiaFullTime = [55.1, 55.3, 54.9, 57.2, 56.8];

export default function FullTimeEmploymentLineGraph() {
    return (
        <div>
            <NavBar />
            <div className="flex flex-col justify-center">
                <h1 className="mt-4 text-lg text-center font-bold">Full-time employment</h1>
                <div className="mx-auto -mt-10">
                    <LineChart
                        xAxis={[
                            {
                                data: ["2001", "2006", "2011", "2016", "2021"],
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
                        width={600}
                        height={400}
                        margin={{ left: 70 }}
                    />
                </div>
            </div>
        </div>
    );
}
