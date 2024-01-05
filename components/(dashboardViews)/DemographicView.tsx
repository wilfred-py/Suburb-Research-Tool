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
    // state to manage selected filters
    const [selectedFilters, setSelectedFilters] = useState<String>([]);

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

    console.log(selectedFilters);

    return (
        <div className="max-w-screen max-h-screen flex flex-wrap">
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
                        <Checkbox id="FamilyComposition" onClick={() => handleCheckboxClick("Family Composition")} />
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
                        <Checkbox id="Religion" onClick={() => handleCheckboxClick("Religion")} />
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
                        <Checkbox id="Marriage" onClick={() => handleCheckboxClick("Marriage")} />
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
                        <Checkbox id="Ancestry" onClick={() => handleCheckboxClick("Ancestry")} />
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
                        <Checkbox id="Population" onClick={() => handleCheckboxClick("Population")} />
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
                        <Checkbox id="Age" onClick={() => handleCheckboxClick("Age")} />
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
                        <Checkbox id="Employment" onClick={() => handleCheckboxClick("Employment")} />
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
                        <Checkbox id="Income" onClick={() => handleCheckboxClick("Income")} />
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

            <div className="w-full">
                {selectedFilters.includes("Family Composition") ? <FamilyComposition selectedSuburb={props.selectedSuburb} /> : ""}
                {selectedFilters.includes("Religion") ? <ReligionChart selectedSuburb={props.selectedSuburb} /> : ""}
                {selectedFilters.includes("Marriage") ? <Marital selectedSuburb={props.selectedSuburb} /> : ""}
                {selectedFilters.includes("Ancestry") ? <AncestryChart selectedSuburb={props.selectedSuburb} /> : ""}
                {selectedFilters.includes("Population") ? <Population selectedSuburb={props.selectedSuburb} /> : ""}
                {selectedFilters.includes("Age") ? <Age selectedSuburb={props.selectedSuburb} /> : ""}
                {selectedFilters.includes("Employment") ? <Employment selectedSuburb={props.selectedSuburb} /> : ""}
                {selectedFilters.includes("Income") ? <Income selectedSuburb={props.selectedSuburb} /> : ""}
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
