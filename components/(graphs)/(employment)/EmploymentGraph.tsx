import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

interface EmploymentGraphProps {
    selectedSuburb: string | null;
}

export default function EmploymentGraph(props: EmploymentGraphProps) {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const options = {
        plugins: {
            title: {
                display: true,
                text: `Employment Status in ${props.selectedSuburb}`,
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const labels = ["2001", "2006", "2011", "2016", "2021"];

    const fullTime = [61.1, 63.1, 62.9, 65.9, 58.2];
    const partTime = [29.9, 27.2, 28.1, 25.1, 31.9];
    const awayFromWork = [4.9, 5.5, 4.1, 4.9, 5.5];
    const unemployed = [3.9, 4.1, 4.5, 4.1, 4.4];

    let fullTimeIndex = -1;
    let partTimeIndex = -1;
    let awayFromWorkIndex = -1;
    let unemployedIndex = -1;

    const data = {
        labels,
        datasets: [
            {
                label: "Full-time (35+ hours)",
                data: labels.map(() => {
                    fullTimeIndex += 1;
                    return fullTime[fullTimeIndex];
                }),
                backgroundColor: "rgb(255, 99, 132)",
                stack: "Stack 0",
            },
            {
                label: "Part-time (<35 hours)",
                data: labels.map(() => {
                    partTimeIndex += 1;
                    return partTime[partTimeIndex];
                }),
                backgroundColor: "rgb(75, 192, 192)",
                stack: "Stack 0",
            },
            {
                label: "Employed (hours not stated)",
                data: labels.map(() => {
                    awayFromWorkIndex += 1;
                    return awayFromWork[awayFromWorkIndex];
                }),
                backgroundColor: "rgb(53, 162, 235)",
                stack: "Stack 0",
            },
            {
                label: "Unemployed",
                data: labels.map(() => {
                    unemployedIndex += 1;
                    return unemployed[unemployedIndex];
                }),
                backgroundColor: "rgb(100, 162, 235)",
                stack: "Stack 0",
            },
            {
                label: "State Median",
                data: labels.map(() => {
                    return 70;
                }),
                backgroundColor: "rgb(0, 0, 235)",
                stack: "Stack 1",
            },
            {
                label: "Australian Median",
                data: labels.map(() => {
                    return 68.1;
                }),
                backgroundColor: "rgb(50, 201, 100)",
                stack: "Stack 2",
            },
        ],
    };
    return (
        <div>
            <Bar options={options} data={data} fallbackContent={`Not enough data in this suburb to populate demographic data.`} />
        </div>
    );
}
