"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

interface DashboardSelectorProps {
    selectedView: string | null;
    onChangeView: (view: string | null) => void;
    selectedFilters: string[];
    handleFilters: any;
    handleAllFilters: any;
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
                                onCheckedChange={() => props.handleFilters("Family Composition")}
                                checked={props.selectedFilters.includes("Family Composition")}
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
                                onClick={() => props.handleFilters("Religion")}
                                checked={props.selectedFilters.includes("Religion")}
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
                                onClick={() => props.handleFilters("Marriage")}
                                checked={props.selectedFilters.includes("Marriage")}
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
                                onClick={() => props.handleFilters("Ancestry")}
                                checked={props.selectedFilters.includes("Ancestry")}
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
                                onClick={() => props.handleFilters("Population")}
                                checked={props.selectedFilters.includes("Population")}
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
                            <Checkbox id="Age" onClick={() => props.handleFilters("Age")} checked={props.selectedFilters.includes("Age")} />
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
                                onClick={() => props.handleFilters("Employment")}
                                checked={props.selectedFilters.includes("Employment")}
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
                                onClick={() => props.handleFilters("Income")}
                                checked={props.selectedFilters.includes("Income")}
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
                        <div className="ml-3 items-top flex space-x-2 my-0.5">
                            <Button onClick={props.handleAllFilters} variant={"secondary"} className="mt-4 font-semibold">
                                Select / Deselect All
                            </Button>
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
