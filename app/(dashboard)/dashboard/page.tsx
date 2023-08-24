"use client";

import NavBar from "@/app/NavBar";
import Map from "@/components/Map";
import SearchBar from "@/components/SearchBar";
import SummaryData from "@/components/SummaryData";
import { useState } from "react";

export default function Dashboard() {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);

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
                    <div className="flex flex-row justify-center">
                        <div className="max-h-screen w-full ">
                            <SummaryData selectedSuburb={selectedSuburb} />
                            <Map selectedSuburb={selectedSuburb} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
