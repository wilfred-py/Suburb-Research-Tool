"use client";

import NavBar from "@/app/NavBar";
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
    const [selectedView, setSelectedView] = useState<string | null>(null);

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
                    <div className="">
                        <DashboardSelector setSelectedView={setSelectedView} />
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="max-h-screen w-full ">
                            <SummaryData selectedSuburb={selectedSuburb} />
                            <div className="flex flex-row">
                                <div className="w-7/12">
                                    <Map selectedSuburb={selectedSuburb} />
                                </div>
                                <div className="w-5/12">
                                    <RecentSales selectedSuburb={selectedSuburb} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
