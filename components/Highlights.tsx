"use client";

import DwellingStackedAreaChart from "./(graphs)/(dwelling)/DwellingStackedAreaChart";
import ExampleFTE from "./(graphs)/(employment)/(examples)/ExampleFTE";
import ExamplePartTimeEmploymentLineGraph from "./(graphs)/(employment)/(examples)/ExamplePartTimeEmploymentLineGraph";
import ExampleUnemploymentLineGraph from "./(graphs)/(employment)/(examples)/ExampleUnemploymentLineGraph";

export default function Highlights() {
    return (
        <>
            <div className="flex flex-col w-full mx-auto mt-40 sm:mt-2 px-5 sm:px-9 md:px-10 lg:px-12">
                <div className="flex md:flex-row flex-col my-2">
                    <hr></hr>
                    <div className="flex flex-col md:mx-4 md:justify-center">
                        <h1 className="mt-6 mb-4 font-inter700 text-center">Discover and compare employment trends in a suburb</h1>
                    </div>

                    <div className="border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                        <ExampleFTE selectedSuburb={""}></ExampleFTE>
                    </div>
                    <div className="border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                        <ExamplePartTimeEmploymentLineGraph selectedSuburb={""}></ExamplePartTimeEmploymentLineGraph>
                    </div>
                    <div className="border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                        <ExampleUnemploymentLineGraph selectedSuburb={""}></ExampleUnemploymentLineGraph>
                    </div>
                </div>
            </div>
        </>
    );
}
