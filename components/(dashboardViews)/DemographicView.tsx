"use client";

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
    selectedFilters: string[];
    handleFilters: any;
}

export default function DemographicView(props: DemographicProps) {
    return (
        <div className="w-[99%] flex flex-wrap">
            <div className="md:hidden">
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="secondary">Filter</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Filter</DrawerTitle>
                            <DrawerDescription>Select data to be shown/hidden</DrawerDescription>
                        </DrawerHeader>
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <div className="items-top flex space-x-2">
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
                        <DrawerFooter>
                            <Button>Confirm</Button>
                            <DrawerClose>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>

            <div className="flex flex-col w-full pb-10">
                {props.selectedFilters.length === 0 && <div className="flex-1 absolute mt-4 pl-1">Please select data from filter</div>}

                {props.selectedFilters.includes("Family Composition") ? (
                    <div className="flex-1 w-full mt-2 border rounded-md shadow-lg hover:shadow-xl">
                        <FamilyComposition selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {props.selectedFilters.includes("Religion") ? (
                    <div className="flex-1 w-full mt-2 border rounded-md shadow-lg hover:shadow-xl">
                        <ReligionChart selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {props.selectedFilters.includes("Marriage") ? (
                    <div className="flex-1 w-full mt-2 border rounded-md shadow-lg hover:shadow-xl">
                        <Marital selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {props.selectedFilters.includes("Ancestry") ? (
                    <div className="flex-1 w-full mt-2 border rounded-md shadow-lg hover:shadow-xl">
                        <AncestryChart selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {props.selectedFilters.includes("Population") ? (
                    <div className="flex-1 w-full mt-2 border rounded-md shadow-lg hover:shadow-xl">
                        <Population selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {props.selectedFilters.includes("Age") ? (
                    <div className="flex-1 w-full mt-2 border rounded-md shadow-lg hover:shadow-xl">
                        <Age selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {props.selectedFilters.includes("Employment") ? (
                    <div className="flex-1 w-full mt-2 border rounded-md shadow-lg hover:shadow-xl">
                        <Employment selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
                {props.selectedFilters.includes("Income") ? (
                    <div className="flex-1 w-full mt-2 border rounded-md shadow-lg hover:shadow-xl">
                        <Income selectedSuburb={props.selectedSuburb} />
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
