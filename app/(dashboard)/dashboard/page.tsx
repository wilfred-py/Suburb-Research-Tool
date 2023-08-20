"use client";

import SearchBar from "@/components/SearchBar";
import SummaryData from "@/components/SummaryData";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);

    return (
        <>
            <div className="mx-28 mt-16 border border-black">
                <h1 className="p-4">Dashboard</h1>
                <span className="p-4">Selected suburb: {selectedSuburb}</span>
                <div className="flex flex-col">
                    <div>
                        <SearchBar setSelectedSuburb={setSelectedSuburb} />
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="h-[600px] w-full border border-black">
                            Summary Data
                            <SummaryData selectedSuburb={selectedSuburb} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
