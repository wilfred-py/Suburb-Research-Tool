"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";

interface DashboardSelectorProps {
    selectedView: string | null;
    onChangeView: (view: string | null) => void;
}

export default function DashboardSelector(props: DashboardSelectorProps) {
    // * Build className conditionally
    const getButtonCSS = (viewName: string) => {
        if (viewName === props.selectedView) {
            return `relative focus:outline-none focus:ring-0 whitespace-nowrap mr-2 md:mr-0 md:ml-2.5 p-2 py-1 mb-2 md:py-2 bg-buttonBlue hover:bg-buttonBlue text-left leading-6 text-white font-normal border-1 border-navigationBarBlue rounded rounded-md hover:cursor-pointer select-none shadow-md`;
        } else {
            return `relative focus:outline-none focus:ring-0 whitespace-nowrap mr-2 md:mr-0 md:ml-2.5 p-2 py-1 mb-2 md:py-2 hover:bg-buttonBlue text-left leading-6 text-black hover:text-white font-normal mobile-s:max-md:border-[1.5px] mobile-s:max-md:border-gray rounded rounded-md hover:cursor-pointer select-none`;
        }
    };

    // * onClick event handler for selected view
    const handleViewClick = (newView: string | null) => {
        props.onChangeView(newView);
    };

    // Retrieve previously selected filters from local storage
    const storedFilters = localStorage.getItem("selectedFilters");

    // Default filters
    const defaultFilters = ["Family Composition", "Religion", "Marriage", "Ancestry", "Population", "Age", "Employment", "Income"];

    // State to manage selected filters
    const [selectedFilters, setSelectedFilters] = useState<String[]>(defaultFilters);

    // Use a single handler for checkbox clicks
    const handleCheckboxClick = (filter: any) => {
        setSelectedFilters((prevFilters) => {
            // Toggle selected filters
            if (prevFilters.includes(filter)) {
                return prevFilters.filter((f) => f !== filter);
            } else {
                return [...prevFilters, filter];
            }
        });
    };

    // Update the selected filters in the local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
    }, [selectedFilters]);

    console.log(selectedFilters);

    return (
        <div className="flex flex-row flex-wrap md:flex-col min-w-[10rem] h-1/4 md:py-2.5 md:mx-0 mb-6 md:mb-0 md:top-[4.5rem] md:sticky">
            <button className={getButtonCSS("Overview")} onClick={() => handleViewClick("Overview")}>
                {props.selectedView == "Overview" ? (
                    <span className="hidden md:block absolute w-[3px] h-full -left-2.5 top-0 bg-buttonBlue"></span>
                ) : (
                    ""
                )}
                Overview
            </button>
            <button className={getButtonCSS("Housing Details")} onClick={() => handleViewClick("Housing Details")}>
                {props.selectedView == "Housing Details" ? (
                    <span className="hidden md:block absolute w-[3px] h-full -left-2.5 top-0 bg-buttonBlue"></span>
                ) : (
                    ""
                )}
                Housing Details
            </button>
            <div className="flex flex-col">
                <button className={getButtonCSS("Demographic")} onClick={() => handleViewClick("Demographic")}>
                    {props.selectedView == "Demographic" ? (
                        <span className="hidden md:block absolute w-[3px] h-full -left-2.5 top-0 bg-buttonBlue"></span>
                    ) : (
                        ""
                    )}
                    Demographic
                </button>

                {props.selectedView == "Demographic" ? (
                    <div className="flex flex-col space-y-0.5 mobile-s:max-md:hidden">
                        <div className="items-top flex space-x-2 md:ml-3">
                            <Checkbox
                                id="FamilyComposition"
                                onCheckedChange={() => handleCheckboxClick("Family Composition")}
                                checked={selectedFilters.includes("Family Composition")}
                            />

                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="FamilyComposition"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Family Composition
                                </label>
                            </div>
                        </div>
                        <div className="items-top flex space-x-2 md:ml-3">
                            <Checkbox
                                id="Religion"
                                onClick={() => handleCheckboxClick("Religion")}
                                checked={selectedFilters.includes("Religion")}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="Religion"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Religion
                                </label>
                            </div>
                        </div>
                        <div className="items-top flex space-x-2 md:ml-3">
                            <Checkbox
                                id="Marriage"
                                onClick={() => handleCheckboxClick("Marriage")}
                                checked={selectedFilters.includes("Marriage")}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="Marriage"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Marriage
                                </label>
                            </div>
                        </div>
                        <div className="items-top flex space-x-2 md:ml-3">
                            <Checkbox
                                id="Ancestry"
                                onClick={() => handleCheckboxClick("Ancestry")}
                                checked={selectedFilters.includes("Ancestry")}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="Ancestry"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Ancestry
                                </label>
                            </div>
                        </div>
                        <div className="items-top flex space-x-2 md:ml-3">
                            <Checkbox
                                id="Population"
                                onClick={() => handleCheckboxClick("Population")}
                                checked={selectedFilters.includes("Population")}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="Population"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Population
                                </label>
                            </div>
                        </div>
                        <div className="items-top flex space-x-2 md:ml-3">
                            <Checkbox id="Age" onClick={() => handleCheckboxClick("Age")} checked={selectedFilters.includes("Age")} />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="Age"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Age
                                </label>
                            </div>
                        </div>
                        <div className="items-top flex space-x-2 md:ml-3">
                            <Checkbox
                                id="Employment"
                                onClick={() => handleCheckboxClick("Employment")}
                                checked={selectedFilters.includes("Employment")}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="Employment"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Employment
                                </label>
                            </div>
                        </div>
                        <div className="items-top flex space-x-2 md:ml-3">
                            <Checkbox
                                id="Income"
                                onClick={() => handleCheckboxClick("Income")}
                                checked={selectedFilters.includes("Income")}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="Income"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Income
                                </label>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>

            {/* <button className={getButtonCSS("Lifestyle")} onClick={() => handleViewClick("Lifestyle")}>
                {props.selectedView == "Lifestyle" ? (
                    <span className="hidden md:block absolute w-[3px] h-full -left-2.5 top-0 bg-buttonBlue"></span>
                ) : (
                    ""
                )}
                Lifestyle
            </button> */}
        </div>
    );
}
