"use client";

import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import main_data_Abbotsford from "../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../data/summary_data/summary_data_Abbotsford.json";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Income() {
    const summaryData = summary_data_Abbotsford;
    const mainData = main_data_Abbotsford;
    const keys = Object.keys(mainData["People"]["Male"]);

    // Name of Suburb
    const suburbName = keys[0].toString();

    // Name of State
    const stateName = keys[2];

    const personalIncome =
        mainData["Median weekly incomes (a)"]["Personal (b)"][
            suburbName as keyof (typeof main_data_Abbotsford)["Median weekly incomes (a)"]["Personal (b)"]
        ];

    const statePersonalIncome =
        mainData["Median weekly incomes (a)"]["Personal (b)"][
            stateName as keyof (typeof main_data_Abbotsford)["Median weekly incomes (a)"]["Personal (b)"]
        ];

    // Chart.js

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Chart.js Bar Chart",
            },
        },
    };

    const labels = [2016, 2021];

    const data = {
        labels,
        datasets: [
            {
                label: suburbName,
                data: Number(personalIncome),
                backgroundColor: "rgba(245, 195, 71, 0.5)",
            },
            {
                label: stateName,
                data: labels.map(() =>
                    faker.datatype.number({ min: 0, max: 3500 })
                ),
                backgroundColor: "rgba(0, 203, 165, 0.5)",
            },
            {
                label: "Australia",
                data: labels.map(() =>
                    faker.datatype.number({ min: 0, max: 3500 })
                ),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return (
        <div className="">
            <h1 className="text-xl">Median weekly incomes</h1>
            <p className="text-xs">Personal</p>
            <div className="bg-gray-200 w-52 rounded">
                <div>
                    <span>{personalIncome}</span>
                </div>
            </div>
            <div className="bg-gray-200 w-52 rounded">
                <div>
                    <span></span>
                </div>
            </div>
            <p className="text-xs">Household</p>
            <Bar options={options} data={data} />
        </div>
    );
}
