"use client";

import ExampleStateDwellingStackedAreaChart from "./(graphs)/(dwelling)/(examples)/ExampleStateDwellingStackedAreaChart";
import ExampleSuburbDwellingStackedAreaChart from "./(graphs)/(dwelling)/(examples)/ExampleSuburbDwellingStackedAreaChart";
import ExampleFTE from "./(graphs)/(employment)/(examples)/ExampleFTE";
import ExamplePartTimeEmploymentLineGraph from "./(graphs)/(employment)/(examples)/ExamplePartTimeEmploymentLineGraph";
import ExampleUnemploymentLineGraph from "./(graphs)/(employment)/(examples)/ExampleUnemploymentLineGraph";
import ExampleHouseholdMedianWeeklyIncome from "./(graphs)/(income)/(example)/ExampleHouseholdMedianWeeklyIncome";
import ExamplePersonalMedianWeeklyIncome from "./(graphs)/(income)/(example)/ExamplePersonalMedianWeeklyIncome";

export default function Highlights() {
    return (
        <>
            {/* Employment */}
            <div className="flex flex-col md:justify-center w-full h-full mx-auto px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px]">
                <div className="flex flex-row justify-center lg:justify-start">
                    <h1 className="mb-1 font-inter700 text-2xl text-center lg:text-left">Employment</h1>
                    <div className="flex flex-col justify-center mt-2 ml-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                            />
                        </svg>
                    </div>
                </div>

                <h3 className="mb-4 font-inter400 text-center lg:text-left">
                    Compare suburb employment rates to a suburb's state and Australia
                </h3>
            </div>

            <div className="flex lg:flex-row flex-col my-2 lg:space-x-4 mx-auto px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px]">
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

            {/* Dwelling */}
            <hr className="mt-10 mx-6 sm:mx-10 lg:mx-12 xl:mx-24 2xl:mx-40 3xl:mx-52 4xl:mx-72"></hr>
            <div className="flex flex-col md:justify-center w-full h-full mx-auto px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px]">
                <div className="flex flex-row justify-center lg:justify-start">
                    <h1 className="mt-4 mb-1 font-inter700 text-2xl text-center lg:text-left">Dwelling Structure</h1>
                    <div className="flex flex-col justify-center mt-2 ml-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                            />
                        </svg>
                    </div>
                </div>

                <h3 className="mb-4 font-inter400 text-center lg:text-left">
                    Discover the types of homes that exist in a suburb and its state over time
                </h3>
            </div>
            <div className="flex lg:flex-row flex-col my-2 lg:space-x-4 mx-auto px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px]">
                <div className="lg:w-1/2 h-[430px] sm:h-[450px] md:h-[480px] border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                    <ExampleSuburbDwellingStackedAreaChart selectedSuburb={""}></ExampleSuburbDwellingStackedAreaChart>
                </div>
                <div className="lg:w-1/2 h-[430px] sm:h-[450px] md:h-[480px] border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                    <ExampleStateDwellingStackedAreaChart selectedSuburb={""}></ExampleStateDwellingStackedAreaChart>
                </div>
            </div>

            {/* Income */}
            <hr className="mt-10 mx-6 sm:mx-10 lg:mx-12 xl:mx-24 2xl:mx-40 3xl:mx-52 4xl:mx-72"></hr>
            <div className="flex flex-col md:justify-center w-full h-full mx-auto px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px]">
                <div className="flex flex-row justify-center lg:justify-start">
                    <h1 className="mt-4 mb-1 font-inter700 text-2xl text-center lg:text-left">Income</h1>
                    <div className="flex flex-col justify-center mt-2 ml-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                            />
                        </svg>
                    </div>
                </div>

                <h3 className="mb-4 font-inter400 text-center lg:text-left">Analyse personal and household income trends</h3>
            </div>

            <div className="flex lg:flex-row flex-col my-2 lg:space-x-4 mx-auto px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px]">
                <div className="lg:w-1/2 sm:h-[350px] md:h-[380px] border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                    <ExamplePersonalMedianWeeklyIncome selectedSuburb={""}></ExamplePersonalMedianWeeklyIncome>
                </div>
                <div className="lg:w-1/2 sm:h-[350px] md:h-[380px] border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                    <ExampleHouseholdMedianWeeklyIncome selectedSuburb={""}></ExampleHouseholdMedianWeeklyIncome>
                </div>
            </div>
        </>
    );
}
