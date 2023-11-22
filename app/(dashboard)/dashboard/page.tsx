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
                        <div className="h-screen max-h-screen overflow-x-hidden overflow-y-hidden xl:px-24 lg:px-24 md:px-24">
                            <div className="h-2/5 flex flex-col justify-end items-center pb-20">
                                <h1 className="text-xl font-semibold mb-4">Search a suburb or postcode below</h1>
                                <SearchBar setSelectedSuburb={setSelectedSuburb} />
                            </div>
                        </div>
                        <div className="bg-dashboardSelectorBlue xl:px-24 lg:px-24 md:px-24">
                            <h1>Hello</h1>
                        </div>
                    </div>
                )}

                {/* Post-search layout */}
                {selectedSuburb && (
                    <div className="overflow-x-hidden xl:px-24 lg:px-24 md:px-24">
                        <h1 className="text-4xl font-semibold mt-4">Dashboard</h1>

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
