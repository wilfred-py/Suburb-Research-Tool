"use client";

import SearchBar from "@/components/SearchBar";
import SummaryData from "@/components/SummaryData";
import { useState } from "react";

export default function Dashboard() {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);

    const handleSuburbClick = (suburb: string) => {
        setSelectedSuburb(suburb);
    };

    return (
        <>
            <div className="mx-28 mt-16 border border-black">
                <h1 className="p-4">Dashboard</h1>
                <span>Selected suburb: {selectedSuburb}</span>
                <div className="flex flex-col">
                    <div>
                        <SearchBar setSelectedSuburb={setSelectedSuburb} />
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="h-[600px] w-8/12  border border-black">
                            Summary Data
                            <SummaryData />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
