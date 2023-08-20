"use client";

import Map from "@/components/Map";
import SearchBar from "@/components/SearchBar";
import SummaryData from "@/components/SummaryData";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>(null);

    return (
        <>
            <div className="xl:px-40 lg:pl-40 lg:mr-auto md:pl-32 md:mr-auto sm:pl-32 sm:mr-auto mt-4 border border-black">
                <h1 className="text-4xl font-semibold">Dashboard</h1>
                <div className="flex flex-col">
                    <div className="mt-6">
                        <SearchBar setSelectedSuburb={setSelectedSuburb} />
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="h-[600px] w-full ">
                            <SummaryData selectedSuburb={selectedSuburb} />
                            <Map />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
