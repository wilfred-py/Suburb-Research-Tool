"use client";

import DwellingStackedAreaChart from "./(graphs)/(dwelling)/DwellingStackedAreaChart";
import ExampleFTE from "./(graphs)/(employment)/ExampleFTE";

export default function Highlights() {
    return (
        <div className="flex flex-col h-[812px] ">
            <h1 className="font-bold tracking-wide">Information about the website and data</h1>
            <div className="h-[600px] w-8/12 my-auto border-white border-2">Dashboard Highlights</div>
            <div className="">
                <ExampleFTE selectedSuburb={""} />
                <DwellingStackedAreaChart selectedSuburb={"Abbotsford, VIC, 3067"} />
            </div>
        </div>
    );
}
