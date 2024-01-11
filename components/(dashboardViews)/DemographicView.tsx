"use client";

import { useEffect, useState } from "react";
import AncestryChart from "../(graphs)/(ancestry)/AncestryRadar";
import ReligionChart from "../(graphs)/(religion)/ReligionRadar";
import Population from "../(graphs)/{population}/Population";
import Age from "../Age";
import Employment from "../Employment";
import FamilyComposition from "../FamilyComposition";
import Income from "../Income";
import Marital from "../MaritalStatus";
import * as React from "react";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

interface DemographicProps {
    selectedSuburb: string | null;
}

export default function DemographicView(props: DemographicProps) {
    // Retrieve previously selected filters from local storage
    const storedFilters = localStorage.getItem("selectedFilters");

    // Default filters
    const defaultFilters = ["Family Composition", "Religion", "Marriage", "Ancestry", "Population", "Age", "Employment", "Income"];

    // State to manage selected filters
    const [selectedFilters, setSelectedFilters] = useState<String>(defaultFilters);

    // Use a single handler for checkbox clicks
    const handleCheckboxClick = (filter) => {
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
        <div className="w-full flex flex-wrap">
            <div>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline">Filter</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Filter</DrawerTitle>
                            <DrawerDescription>Select data to be shown/hidden</DrawerDescription>
                        </DrawerHeader>
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <DrawerFooter>
                            <Button>Confirm</Button>
                            <DrawerClose>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>

            <div className="flex flex-col w-full">
                {selectedFilters.includes("Family Composition") ? (
                    <div className="flex-1 max-w-[420px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                        <FamilyComposition selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {selectedFilters.includes("Religion") ? (
                    <div className="flex-1 max-w-[420px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                        <ReligionChart selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {selectedFilters.includes("Marriage") ? (
                    <div className="flex-1 max-w-[420px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                        <Marital selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {selectedFilters.includes("Ancestry") ? (
                    <div className="flex-1 max-w-[420px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                        <AncestryChart selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {selectedFilters.includes("Population") ? (
                    <div className="flex-1 max-w-[420px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                        <Population selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {selectedFilters.includes("Age") ? (
                    <div className="flex-1 max-w-[420px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                        <Age selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {selectedFilters.includes("Employment") ? (
                    <div className="flex-1 max-w-[420px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                        <Employment selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {selectedFilters.includes("Income") ? (
                    <div className="flex-1 max-w-[420px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                        <Income selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
            </div>

            {/* <FamilyComposition selectedSuburb={props.selectedSuburb} />
            <ReligionChart selectedSuburb={props.selectedSuburb} />
            <Marital selectedSuburb={props.selectedSuburb} />
            <AncestryChart selectedSuburb={props.selectedSuburb} />
            <Population selectedSuburb={props.selectedSuburb} />
            <Age selectedSuburb={props.selectedSuburb} />
            <Employment selectedSuburb={props.selectedSuburb} />
            <Income selectedSuburb={props.selectedSuburb} /> */}
        </div>
    );
}
