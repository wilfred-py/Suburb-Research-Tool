"use client";

import ExampleStateDwellingStackedAreaChart from "./(graphs)/(dwelling)/(examples)/ExampleStateDwellingStackedAreaChart";
import ExampleSuburbDwellingStackedAreaChart from "./(graphs)/(dwelling)/(examples)/ExampleSuburbDwellingStackedAreaChart";
import ExampleDwellingStackedAreaChart from "./(graphs)/(dwelling)/(examples)/ExampleSuburbDwellingStackedAreaChart";
import DwellingStackedAreaChart from "./(graphs)/(dwelling)/DwellingStackedAreaChart";
import ExampleFTE from "./(graphs)/(employment)/(examples)/ExampleFTE";
import ExamplePartTimeEmploymentLineGraph from "./(graphs)/(employment)/(examples)/ExamplePartTimeEmploymentLineGraph";
import ExampleUnemploymentLineGraph from "./(graphs)/(employment)/(examples)/ExampleUnemploymentLineGraph";

export default function About() {
    return (
        <div className="pt-16 mb-10 ">
            <div className="flex flex-col place-items-center w-full max-h-96 mx-auto px-5 sm:px-9 md:px-10 lg:px-12">
                <div className="w-full mx-auto max-w-8xl pt-16 md:pb-8  md:pt-24 ">
                    <div className="flex flex-col w-full">
                        <h1 className="w-full max-w-[95%] mr-auto mb-6 font-inter600 tracking-tighter text-5xl leading-tight">
                            Visualising demographic trends across Australian suburbs
                        </h1>
                        <h2 className="min-w-min max-w-[85%] mb-6 font-inter font-normal sm:text-lg tracking-normal ">
                            Providing investors historical socioeconomic data in digestable graphs
                        </h2>
                    </div>
                    <hr></hr>
                    <div className="flex flex-col md:justify-center">
                        <h1 className="mt-4 mb-1 font-inter700 text-2xl text-center lg:text-left">Employment</h1>
                        <h3 className="mb-4 font-inter400 text-center lg:text-left">
                            Compare suburb employment rates to a suburb's state and Australia
                        </h3>
                    </div>
                    <div className="flex lg:flex-row flex-col my-2 lg:space-x-4">
                        <div className="lg:w-1/3 border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                            <ExampleFTE selectedSuburb={""}></ExampleFTE>
                        </div>
                        <div className="lg:w-1/3 border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                            <ExamplePartTimeEmploymentLineGraph selectedSuburb={""}></ExamplePartTimeEmploymentLineGraph>
                        </div>
                        <div className="lg:w-1/3 border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                            <ExampleUnemploymentLineGraph selectedSuburb={""}></ExampleUnemploymentLineGraph>
                        </div>
                    </div>

                    <hr className="mt-10"></hr>
                    <div className="flex flex-col md:justify-center">
                        <h1 className="mt-4 mb-1 font-inter700 text-2xl text-center lg:text-left">Dwelling Structure</h1>
                        <h3 className="mb-4 font-inter400 text-center lg:text-left">Discover the types of homes that exist over time</h3>
                    </div>
                    <div className="flex lg:flex-row flex-col my-2 lg:space-x-4 ">
                        <div className="lg:w-1/2 h-[420px] border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                            <ExampleSuburbDwellingStackedAreaChart selectedSuburb={""}></ExampleSuburbDwellingStackedAreaChart>
                        </div>
                        <div className="lg:w-1/2 h-[420px] border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                            <ExampleStateDwellingStackedAreaChart selectedSuburb={""}></ExampleStateDwellingStackedAreaChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
