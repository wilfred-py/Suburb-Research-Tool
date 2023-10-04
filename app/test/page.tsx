// "use client";

// import * as React from "react";
// import { LineChart } from "@mui/x-charts/LineChart";
// import NavBar from "../NavBar";

// const suburbFullTime = [50, 53.1, 52.5, 53.5, 53.2];
// const stateFullTime = [50, 50, 53.2, 57.2, 57.1];
// const australiaFullTime = [55.1, 55.3, 54.9, 57.2, 56.8];

// export default function FullTimeEmploymentLineGraph() {
//     return (
//         <div>
//             <NavBar />
//             <div className="flex flex-col justify-center">
//                 <h1 className="mt-4 text-lg text-center font-bold">Full-time employment</h1>
//                 <div className="mx-auto -mt-10">
//                     <LineChart
//                         xAxis={[
//                             {
//                                 data: ["2001", "2006", "2011", "2016", "2021"],
//                             },
//                         ]}
//                         series={[
//                             {
//                                 id: "suburb",
//                                 label: "Suburb",
//                                 data: suburbFullTime,
//                                 showMark: false,
//                                 curve: "natural",
//                             },
//                             {
//                                 id: "state",
//                                 label: "State",
//                                 data: stateFullTime,
//                                 showMark: false,
//                                 curve: "natural",
//                             },
//                             {
//                                 id: "australia",
//                                 label: "Australia",
//                                 data: australiaFullTime,
//                                 showMark: false,
//                                 curve: "natural",
//                             },
//                         ]}
//                         sx={{
//                             "--ChartsLegend-itemWidth": "70px",
//                             "--ChartsLegend-itemMarkSize": "10px",
//                             "--ChartsLegend-labelSpacing": "5px",
//                             "--ChartsLegend-rootSpacing": "20px",
//                         }}
//                         legend={{
//                             direction: "row",
//                             position: {
//                                 vertical: "top",
//                                 horizontal: "middle",
//                             },
//                         }}
//                         width={600}
//                         height={400}
//                         margin={{ left: 70 }}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, CartesianAxis } from "recharts";
const data = [
    { name: "2001", suburb: 67.2, state: null, australia: 64.1 },
    { name: "2006", suburb: 68.2, state: null, australia: 66.1 },
    { name: "2011", suburb: 64.3, state: 61.2, australia: 63.1 },
    { name: "2016", suburb: 65.6, state: 61.1, australia: 66.1 },
    { name: "2021", suburb: 68.2, state: 61.1, australia: 68.1 },
];
const renderLineChart = (
    <LineChart width={600} height={300} data={data} margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
        <Line type="natural" dataKey="suburb" stroke="#8884d8" />
        <Line type="natural" dataKey="state" stroke="#9184d8" />
        <Line type="natural" dataKey="australia" stroke="#0684d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name">
            <Label value="year" position="bottom" />
        </XAxis>
        <YAxis tickCount={3}>
            <Label value="%" position="insideLeft" />
        </YAxis>
        <Tooltip offset={50} cursor={false} />
        <Legend verticalAlign="top" height={36} />
        <CartesianGrid y={40}></CartesianGrid>
    </LineChart>
);

export default function Test() {
    return <div>{renderLineChart}</div>;
}
