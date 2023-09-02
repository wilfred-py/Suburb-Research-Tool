"use client";

import { GetSummarySuburbData } from "@/app/database.types";
import { supaClient } from "@/app/supa-client";
import { useEffect, useState } from "react";
import axios from "axios";
import cheerio from "cheerio";

interface RecentSalesProps {
    selectedSuburb: string | null;
}

function deconstructSuburb(suburb: string | null) {
    // State Regex
    const stateRegex = /^(.*?),\s*(VIC|NSW|ACT|WA|SA|TAS|NT)/;

    // ! Suburb Name
    // Create substrings based on stateRegex
    const suburbMatch = suburb?.match(stateRegex);

    // If it exists, return first match in suburbName
    const suburbName = suburbMatch ? suburbMatch[1] : null;

    // ! State Name
    const stateName = suburbMatch ? suburbMatch[2] : null;

    // ! Post Code
    const postcode = suburb?.slice(-4);

    return {
        suburbName,
        stateName,
        postcode,
    };
}

export default function RecentSales(props: RecentSalesProps) {
    const [suburbName, setSuburbName] = useState<String | null>("");
    const [stateName, setStateName] = useState("");
    const [postcode, setPostcode] = useState("");
    const [summaryData, setSummaryData] = useState<GetSummarySuburbData[]>([]);

    // * Filter through Supabase using suburbName, stateName, and postcode
    useEffect(() => {
        async function fetchSuburbData() {
            try {
                const { suburbName, stateName, postcode } = deconstructSuburb(props.selectedSuburb);
                const suburbNameQuery = String(suburbName);
                setSuburbName(suburbNameQuery);
                setStateName(stateName || "");
                setPostcode(postcode || "");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchSuburbData();
    }, [props.selectedSuburb]);

    // * Fetch recent sales from CoreLogic
    // useEffect(() => {
    //     async function fetchRecentSales() {
    //         try {
    //             const url = `https://www.corelogic.com.au/our-data/recent-sales?postcode=${postcode}`;
    //             const response = await axios.get(url);
    //             const html = response.data;

    //             const parser = new DOMParser();
    //             const doc = parser.parseFromString(html, "text/html");

    //             const salesData: any = [];

    //             // Parse the HTML and extract the relevant data
    //             const saleItems = doc.querySelectorAll(".sale-item");
    //             saleItems.forEach((item) => {
    //                 const date = item.querySelector(".date")?.textContent;
    //                 const address = item.querySelector(".address")?.textContent;
    //                 const price = item.querySelector(".price")?.textContent;

    //                 salesData.push({ date, address, price });
    //                 console.log(salesData);
    //             });
    //         } catch (error) {
    //             console.error("Error fetching recent sales data", error);
    //         }
    //     }
    //     fetchRecentSales();
    // }, [postcode]);

    return (
        <div className="">
            <div id="recent-sales" className="border border-gray-200 rounded-md shadow-lg">
                <div className="p-4 text-xl font-semibold">Recent Sales</div>
                <div id="sale-1" className="flex flex-col border-opacity-0 rounded-md p-4">
                    <div className="flex flex-row">
                        <div className="w-9/12 flex flex-row space-x-8">
                            <div>
                                <span className="font-normal">19-08-23</span>
                            </div>
                            <div className="flex flex-col text-sm">
                                <span className="font-semibold">2/24 ADELE AVENUE FERNTREE GULLY VIC 3156</span>
                                <span>Unit | 3 bedroom - 1 bath - 2 car</span>
                            </div>
                        </div>
                        <div className="w-3/12 flex justify-end text-lg font-semibold">
                            <span>$691,000</span>
                        </div>
                    </div>
                </div>
                <div id="sale-2" className="flex flex-col border-opacity-0 rounded-md p-4">
                    <div className="flex flex-row">
                        <div className="w-9/12 flex flex-row space-x-8">
                            <div>
                                <span className="font-normal">19-08-23</span>
                            </div>
                            <div className="flex flex-col text-sm">
                                <span className="font-semibold">49 BOND STREET FERNTREE GULLY VIC 3156</span>
                                <span>House | 4 bedroom - 2 bath - 2 car</span>
                            </div>
                        </div>
                        <div className="w-3/12 flex justify-end text-lg font-semibold">
                            <span>$1,375,000</span>
                        </div>
                    </div>
                </div>
                <div id="sale-3" className="flex flex-col border-opacity-0 rounded-md p-4">
                    <div className="flex flex-row">
                        <div className="w-9/12 flex flex-row space-x-8">
                            <div>
                                <span className="font-normal">19-08-23</span>
                            </div>
                            <div className="flex flex-col text-sm">
                                <span className="font-semibold">39 KIA-ORA PARADE FERNTREE GULLY VIC 3156</span>
                                <span>House | 4 bedroom - 2 bath - 1 car</span>
                            </div>
                        </div>
                        <div className="w-3/12 flex justify-end text-lg font-semibold">
                            <span>$1,092,000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
