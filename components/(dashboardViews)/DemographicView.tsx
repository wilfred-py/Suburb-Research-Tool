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

interface DemographicProps {
    selectedSuburb: string | null;
}

export default function DemographicView(props: DemographicProps) {
    // state to manage selected filters
    const [selectedFilters, setSelectedFilters] = useState<String>([]);

    const handleFilterSelection = (filter: string) => {
        // Toggle selected filters
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((f) => f !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const renderFilteredComponents = () => {
        // Return components based on selected filters
        return (
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
        );
    };

    return (
        <div className="max-w-screen max-h-screen flex flex-wrap">
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Filter</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <FamilyComposition selectedSuburb={props.selectedSuburb} />
            <ReligionChart selectedSuburb={props.selectedSuburb} />
            <Marital selectedSuburb={props.selectedSuburb} />
            <AncestryChart selectedSuburb={props.selectedSuburb} />
            <Population selectedSuburb={props.selectedSuburb} />
            <Age selectedSuburb={props.selectedSuburb} />
            <Employment selectedSuburb={props.selectedSuburb} />
            <Income selectedSuburb={props.selectedSuburb} />
        </div>
    );
}
