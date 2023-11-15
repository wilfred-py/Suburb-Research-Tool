"use client";

import NavBar from "@/app/NavBar";
import DemographicView from "@/components/(dashboardViews)/DemographicView";
import HousingDetailsView from "@/components/(dashboardViews)/HousingDetailsView";
import LifestyleView from "@/components/(dashboardViews)/Lifestyle";
import OverviewView from "@/components/(dashboardViews)/OverviewView";
import DashboardSelector from "@/components/DashboardSelector";
import RecentSales from "@/components/RecentSales";
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
            <div className="h-screen">
                <NavBar />
                {/* Initial layout*/}
                {!selectedSuburb && (
                    <div className="w-full h-full xl:px-32 lg:px-32 lg:mr-auto md:pl-32 md:mr-auto sm:pl-32 sm:mr-auto mt-4">
                        <div className="h-2/5 flex flex-col justify-end items-center pb-20">
                            <h1 className="text-xl font-semibold mb-4">Search a suburb or postcode below</h1>
                            <SearchBar setSelectedSuburb={setSelectedSuburb} />
                        </div>

                        <div className="h-3/5 "></div>
                    </div>
                )}

                {/* Post-search layout */}
                {selectedSuburb && (
                    <div className="w-full xl:px-56 lg:pl-px-56 lg:mr-auto md:pl-32 md:mr-auto sm:pl-32 sm:mr-auto mt-4">
                        <h1 className="text-4xl font-semibold">Dashboard</h1>
                        <div className="flex flex-col">
                            <div className="mt-6">
                                <SearchBar setSelectedSuburb={setSelectedSuburb} />
                            </div>

                            {/* Dashboard selector */}
                            <div className="my-4">
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
