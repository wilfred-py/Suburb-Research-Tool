"use client";

import NavBar from "@/app/NavBar";
import DemographicView from "@/components/(dashboardViews)/DemographicView";
import HousingDetailsView from "@/components/(dashboardViews)/HousingDetailsView";
import LifestyleView from "@/components/(dashboardViews)/Lifestyle";
import OverviewView from "@/components/(dashboardViews)/OverviewView";
import AncestryChart from "@/components/(graphs)/(ancestry)/AncestryRadar";
import FullTimeEmploymentLineGraph from "@/components/(graphs)/(employment)/FullTimeEmploymentLineGraph";
import Population from "@/components/(graphs)/{population}/Population";
import DashboardSelector from "@/components/DashboardSelector";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

export default function Dashboard() {
    // Suburb being queried
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);

    // Dashboard view
    const [selectedView, setSelectedView] = useState<string | null>("Overview");

    const handleViewChange = (newView: string | null) => {
        setSelectedView(newView);
    };

    return (
        <>
            {/* <div className="h-screen max-h-screen overflow-hidden"> */}
            <div className="h-screen max-h-screen overflow-x-hidden">
                <NavBar />
                {/* Initial layout*/}
                {!selectedSuburb && (
                    <div>
                        <div className="h-screen max-h-screen overflow-x-hidden overflow-y-hidden px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px]">
                            <div className="h-2/5 flex flex-col justify-end items-center pb-20">
                                <h1 className="mb-4 text-xl font-semibold text-center">Search a suburb or postcode below</h1>
                                <div className="w-10/12">
                                    <SearchBar setSelectedSuburb={setSelectedSuburb} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Post-search layout */}
                {selectedSuburb && (
                    <div className="overflow-x-hidden px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px]">
                        <h1 className="mt-20 text-4xl font-semibold">Dashboard</h1>

                        <div className="flex flex-col">
                            <div className="my-6 z-40">
                                <SearchBar setSelectedSuburb={setSelectedSuburb} />
                            </div>

                            <div>
                                <h1 className="font-bold pl-1">{selectedSuburb}</h1>
                            </div>

                            {/* Dashboard selector */}
                            <div className="my-4 w-6/12">
                                <DashboardSelector selectedView={selectedView} onChangeView={handleViewChange} />
                            </div>

                            {/* Dashboard <div> */}
                            {/* Conditionally render Overview/Housing Details/Demographic/Lifestyle depending on selectedView state */}
                            {selectedView == "Overview" ? <OverviewView selectedSuburb={selectedSuburb} /> : ""}
                            {selectedView == "Demographic" ? <DemographicView selectedSuburb={selectedSuburb} /> : ""}
                            {selectedView == "Housing Details" ? <HousingDetailsView selectedSuburb={selectedSuburb} /> : ""}
                            {selectedView == "Lifestyle" ? <LifestyleView selectedSuburb={selectedSuburb} /> : ""}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
