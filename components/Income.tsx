"use client";

import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import main_data_Abbotsford from "../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../data/summary_data/summary_data_Abbotsford.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
const labels = [2016, 2021];

const personalMedianIncomeOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom" as const,
        },
        title: {
            display: true,
            text: "Personal Median Weekly Income",
        },
    },
};

const householdMedianIncomeOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom" as const,
        },
        title: {
            display: true,
            text: "Household Median Weekly Income",
        },
    },
};

const personalMedianIncomeData = {
    labels,
    datasets: [
        {
            label: suburbName,
            data: labels.map(() => faker.datatype.number({ min: 0, max: 3500 })),
            backgroundColor: "rgba(245, 195, 71, 0.5)",
        },
        {
            label: stateName,
            data: labels.map(() => faker.datatype.number({ min: 0, max: 3500 })),
            backgroundColor: "rgba(0, 203, 165, 0.5)",
        },
        {
            label: "Australia",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 3500 })),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

const householdMedianIncomeData = {
    labels,
    datasets: [
        {
            label: suburbName,
            data: labels.map(() => faker.datatype.number({ min: 0, max: 3500 })),
            backgroundColor: "rgba(245, 195, 71, 0.5)",
        },
        {
            label: stateName,
            data: labels.map(() => faker.datatype.number({ min: 0, max: 3500 })),
            backgroundColor: "rgba(0, 203, 165, 0.5)",
        },
        {
            label: "Australia",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 3500 })),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export default function Income() {
    return (
        <div className="m-4">
            <Bar
                options={personalMedianIncomeOptions}
                data={personalMedianIncomeData}
                className="max-w-lg max-h-[360px]"
            />
            <Bar
                options={householdMedianIncomeOptions}
                data={householdMedianIncomeData}
                className="max-w-lg max-h-[360px]"
            />
        </div>
    );
}
