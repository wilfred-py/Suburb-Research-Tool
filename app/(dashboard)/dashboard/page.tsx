"use client";

import NavBar from "@/app/NavBar";
import Overview from "@/components/(dashboardViews)/Overview";
import DashboardSelector from "@/components/DashboardSelector";
import Map from "@/components/Map";
import RecentSales from "@/components/RecentSales";
import SearchBar from "@/components/SearchBar";
import SummaryData from "@/components/SummaryData";
import { useState } from "react";

export default function Dashboard() {
    // Suburb being queried
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);

    // Dashboard view
    const [selectedView, setSelectedView] = useState<string | null>("Overview");

    console.log(`selectedSuburb: ${selectedSuburb}`);

    return (
        <>
            <NavBar />
            <div className="max-h-screen w-full xl:px-40 lg:pl-40 lg:mr-auto md:pl-32 md:mr-auto sm:pl-32 sm:mr-auto mt-4">
                <h1 className="text-4xl font-semibold">Dashboard</h1>
                <div className="flex flex-col">
                    <div className="mt-6">
                        <SearchBar setSelectedSuburb={setSelectedSuburb} />
                    </div>

                    {/* Dashboard selector */}
                    <div className="">
                        <DashboardSelector setSelectedView={setSelectedView} />
                    </div>

                    {/* Dashboard <div> */}
                    {/* Conditionally render Overview/Housing Details/Demographic/Lifestyle depending on selectedView state */}

                    {selectedView == "Overview" ? <Overview selectedSuburb={selectedSuburb} /> : ""}
                </div>
            </div>
        </>
    );
}
