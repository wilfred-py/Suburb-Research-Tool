"use client";

import DwellingStackedAreaChart from "./(graphs)/(dwelling)/DwellingStackedAreaChart";
import ExampleFTE from "./(graphs)/(employment)/ExampleFTE";

export default function Highlights() {
    return (
        <div className="mt-60 sm:mt-16 bg-buttonYellow">
            <div className="flex flex-col w-full mx-auto mt-52 sm:mt-32 px-5 sm:px-9 md:px-10 lg:px-12">
                <ExampleFTE selectedSuburb={""} />
            </div>
        </div>
    );
}
