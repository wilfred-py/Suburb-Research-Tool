"use client";

import main_data_Abbotsford from "../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../data/summary_data/summary_data_Abbotsford.json";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Ancestry from "./Ancestry";
import Religion from "./Religion";

const summaryData = summary_data_Abbotsford;
const mainData = main_data_Abbotsford;
const keys = Object.keys(mainData["People"]["Male"]);

// Name of Suburb
const suburbName = keys[0];

// Name of State
const stateName = keys[2];

// Median Age
const medianAge = Math.floor(parseFloat(mainData["Age"]["Median age"][suburbName as keyof (typeof mainData)["Age"]["Median age"]]));

// 0 - 9 years
const underNine =
    parseFloat(mainData["Age"]["0-4 years"][suburbName as keyof (typeof mainData)["Age"]["0-4 years"]]) +
    parseFloat(mainData["Age"]["5-9 years"][suburbName as keyof (typeof mainData)["Age"]["5-9 years"]]);

const teenagers =
    parseFloat(mainData["Age"]["10-14 years"][suburbName as keyof (typeof mainData)["Age"]["10-14 years"]]) +
    parseFloat(mainData["Age"]["15-19 years"][suburbName as keyof (typeof mainData)["Age"]["15-19 years"]]);

const youngAdults =
    parseFloat(mainData["Age"]["20-24 years"][suburbName as keyof (typeof mainData)["Age"]["20-24 years"]]) +
    parseFloat(mainData["Age"]["25-29 years"][suburbName as keyof (typeof mainData)["Age"]["25-29 years"]]) +
    parseFloat(mainData["Age"]["30-34 years"][suburbName as keyof (typeof mainData)["Age"]["30-34 years"]]);

const middleAge =
    parseFloat(mainData["Age"]["35-39 years"][suburbName as keyof (typeof mainData)["Age"]["35-39 years"]]) +
    parseFloat(mainData["Age"]["40-44 years"][suburbName as keyof (typeof mainData)["Age"]["40-44 years"]]) +
    parseFloat(mainData["Age"]["45-49 years"][suburbName as keyof (typeof mainData)["Age"]["45-49 years"]]);

const almostRetirees =
    parseFloat(mainData["Age"]["50-54 years"][suburbName as keyof (typeof mainData)["Age"]["50-54 years"]]) +
    parseFloat(mainData["Age"]["55-59 years"][suburbName as keyof (typeof mainData)["Age"]["55-59 years"]]) +
    parseFloat(mainData["Age"]["60-64 years"][suburbName as keyof (typeof mainData)["Age"]["60-64 years"]]);

const retirees =
    parseFloat(mainData["Age"]["65-69 years"][suburbName as keyof (typeof mainData)["Age"]["65-69 years"]]) +
    parseFloat(mainData["Age"]["65-69 years"][suburbName as keyof (typeof mainData)["Age"]["65-69 years"]]) +
    parseFloat(mainData["Age"]["70-74 years"][suburbName as keyof (typeof mainData)["Age"]["70-74 years"]]);
parseFloat(mainData["Age"]["75-79 years"][suburbName as keyof (typeof mainData)["Age"]["75-79 years"]]) +
    parseFloat(mainData["Age"]["80-84 years"][suburbName as keyof (typeof mainData)["Age"]["80-84 years"]]) +
    parseFloat(mainData["Age"]["85 years and over"][suburbName as keyof (typeof mainData)["Age"]["85 years and over"]]);

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ["0 - 9 years", "10 - 19 years", "20 - 34 years", "35 - 49 years", "50 - 64 years", "65+ years"],
    datasets: [
        {
            label: "Number of People",
            data: [underNine, teenagers, youngAdults, middleAge, almostRetirees, retirees],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 0.5,
        },
    ],
};

export default function Demographic() {
    return (
        <div>
            <div className="mb-10">
                <p>Median Age: {medianAge}</p>
                <div className="max-w-md max-h-96">
                    <Doughnut
                        data={data}
                        redraw={false}
                        fallbackContent={`Not enough data in this ${suburbName} to populate demographic data.`}
                    />
                    <p className="mb-4">Based off 2021 data</p>
                </div>
            </div>

            <div className="">
                <p className="text-xl">Ancestry of people living in {suburbName}</p>
                <Ancestry />
            </div>
            <div className="">
                <p className="text-xl">Religious Affiliation of people living in {suburbName}</p>
                <Religion />
            </div>
        </div>
    );
}
