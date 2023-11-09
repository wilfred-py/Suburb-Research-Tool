import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { PureComponent, useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DwellingStackedAreaChartProps {
    selectedSuburb: string | null;
}

export default function DwellingStackedAreaChart(props: DwellingStackedAreaChartProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");
    const [suburbDwelling, setSuburbDwelling] = useState<{ key: string; value: number }[]>([]);
    const [stateDwelling, setStateDwelling] = useState<{ key: string; value: number }[]>([]);
    const [australiaDwelling, setAustraliaDwelling] = useState<{ key: string; value: number }[]>([]);

    const [twoThousandAndOneDataAvailable, setTwoThousandAndOneDataAvailable] = useState(true);

    const supabase = createClientComponentClient();

    // * Function that deconstructs the passed down props.selectedSuburb
    function deconstructSuburb(selectedSuburb: string | null) {
        // State Regex
        const stateRegex = /^(.*?),\s*(VIC|NSW|ACT|WA|SA|TAS|NT|QLD|Other Territories)/;

        // ! Suburb Name
        // Create substrings based on stateRegex
        const suburbMatch = selectedSuburb?.match(stateRegex);

        // If it exists, return first match in suburbName
        const suburbName = suburbMatch ? suburbMatch[1] : null;

        // ! State Name
        const stateName = suburbMatch ? suburbMatch[2] : null;

        // ! Post Code
        const postcode = selectedSuburb?.slice(-4);

        // console.log(`suburbName: ${suburbName}`);
        // console.log(`stateName: ${stateName}`);

        return {
            suburbName,
            stateName,
            postcode,
        };
    }

    // * Function that fetches age data for a specific year
    async function fetchDwellingDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
        try {
            const { suburbName, stateName } = deconstructSuburb(selectedSuburb);
            setSelectedSuburb(suburbName);
            setSelectedState(stateName);

            const { data, error } = await supabase
                .from(tableName)
                .select("*")
                .like("suburb_name", `%${suburbName}%`)
                .eq("state_name", stateName);

            if (error) {
                console.error("Error fetching data:", error);
                return null;
            }

            return { year, data };
        } catch (error) {
            console.error("Data fetch unsuccessful", error);
            return null;
        }
    }

    // * Suburb dataFetch
    useEffect(() => {
        // Handle useEffect cleanup
        let isMounted = true;

        async function fetchData() {
            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchDwellingDataByYear(year, `data_${year}`, props.selectedSuburb));

            //  Wait for data to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;

                if (isMounted) {
                    try {
                        // * 2001
                        if (year == "2001") {
                            const newSuburbDwelling: any[] = [];

                            // >> 5 categories of dwelling structures
                            // Separate House
                            const separateHouseInSuburb = parseFloat(data[0]["percentage_separate_house_in_suburb"]);

                            // Semi-detached, row or terrace house, townhouse etc
                            const semiDetachedInSuburb = parseFloat(data[0]["percentage_semi_detached_in_suburb"]);

                            // Flat, unit or apartment
                            const flatUnitApartmentInSuburb = parseFloat(data[0]["percentage_flat_unit_or_apartment_in_suburb"]);

                            // Other dwelling / not stated
                            const otherDwellingInSuburb = parseFloat(data[0]["percentage_other_dwelling_in_suburb"]);
                            const dwellingNotStatedInSuburb = parseFloat(data[0]["percentage_dwelling_type_not_stated_in_suburb"]);

                            const separateHouseInAustralia = parseFloat(data[0]["percentage_separate_house_in_australia"]);

                            const semiDetachedInAustralia = parseFloat(data[0]["percentage_semi_detached_in_australia"]);

                            const flatUnitApartmentInAustralia = parseFloat(data[0]["percentage_flat_unit_or_apartment_in_australia"]);

                            const otherDwellingInAustralia = parseFloat(data[0]["percentage_other_dwelling_in_australia"]);

                            const dwellingNotStatedInAustralia = parseFloat(data[0]["percentage_dwelling_type_not_stated_in_australia"]);

                            // Push 2001 object
                            if (
                                separateHouseInSuburb &&
                                semiDetachedInSuburb &&
                                flatUnitApartmentInSuburb &&
                                otherDwellingInSuburb &&
                                dwellingNotStatedInSuburb
                            ) {
                            }
                            const twoThousandAndOneSuburbObject = {
                                year: "2001",
                                "Separate House": separateHouseInSuburb,
                                "Semi-detached / Townhouse": semiDetachedInSuburb,
                                "Flat, unit or apartment": flatUnitApartmentInSuburb,
                                "Other dwelling": otherDwellingInSuburb + dwellingNotStatedInSuburb,
                            };

                            // console.log(twoThousandAndOneSuburbObject);

                            newSuburbDwelling.push(twoThousandAndOneSuburbObject);

                            setSuburbDwelling(newSuburbDwelling);
                        }

                        // * 2006
                        else if (year == "2006") {
                            setSuburbDwelling((prevSuburbDwelling) => {
                                const newSuburbDwelling: any[] = [...prevSuburbDwelling];

                                // >> 5 categories of dwelling structures
                                // Separate House
                                const separateHouseInSuburb = parseFloat(data[0]["percentage_separate_house_in_suburb"]);

                                // Semi-detached, row or terrace house, townhouse etc
                                const semiDetachedInSuburb = parseFloat(data[0]["percentage_semi_detached_in_suburb"]);

                                // Flat, unit or apartment
                                const flatUnitApartmentInSuburb = parseFloat(data[0]["percentage_flat_unit_or_apartment_in_suburb"]);

                                // Other dwelling / not stated
                                const otherDwellingInSuburb = parseFloat(data[0]["percentage_other_dwelling_in_suburb"]);
                                const dwellingNotStatedInSuburb = parseFloat(data[0]["percentage_dwelling_type_not_stated_in_suburb"]);

                                // Push 2006 object
                                const twoThousandAndSixSuburbObject = {
                                    year: "2006",
                                    "Separate House": separateHouseInSuburb,
                                    "Semi-detached / Townhouse": semiDetachedInSuburb,
                                    "Flat, unit or apartment": flatUnitApartmentInSuburb,
                                    "Other dwelling": otherDwellingInSuburb + dwellingNotStatedInSuburb,
                                };

                                // console.log(twoThousandAndSixSuburbObject);

                                newSuburbDwelling.push(twoThousandAndSixSuburbObject);

                                return newSuburbDwelling;
                            });

                            const separateHouseInAustralia = parseFloat(data[0]["percentage_separate_house_in_australia"]);

                            const semiDetachedInAustralia = parseFloat(data[0]["percentage_semi_detached_in_australia"]);

                            const flatUnitApartmentInAustralia = parseFloat(data[0]["percentage_flat_unit_or_apartment_in_australia"]);

                            const otherDwellingInAustralia = parseFloat(data[0]["percentage_other_dwelling_in_australia"]);

                            const dwellingNotStatedInAustralia = parseFloat(data[0]["percentage_dwelling_type_not_stated_in_australia"]);

                            const newStateDwelling: any[] = [...stateDwelling];
                        }

                        // * 2011
                        else if (year == "2011") {
                            // >> Suburb
                            setSuburbDwelling((prevSuburbDwelling) => {
                                const newSuburbDwelling: any[] = [...prevSuburbDwelling];

                                // >> 5 categories of dwelling structures
                                // Separate House
                                const separateHouseInSuburb = parseFloat(data[0]["percentage_separate_house_in_suburb"]);

                                // Semi-detached, row or terrace house, townhouse etc
                                const semiDetachedInSuburb = parseFloat(data[0]["percentage_semi_detached_in_suburb"]);

                                // Flat, unit or apartment
                                const flatUnitApartmentInSuburb = parseFloat(data[0]["percentage_flat_unit_or_apartment_in_suburb"]);

                                // Other dwelling
                                const otherDwellingInSuburb = parseFloat(data[0]["percentage_other_dwelling_in_suburb"]);

                                // Push 2011 object
                                const twentyElevenSuburbObject = {
                                    year: "2011",
                                    "Separate House": separateHouseInSuburb,
                                    "Semi-detached / Townhouse": semiDetachedInSuburb,
                                    "Flat, unit or apartment": flatUnitApartmentInSuburb,
                                    "Other dwelling": otherDwellingInSuburb,
                                };

                                // console.log(twentyElevenSuburbObject);

                                newSuburbDwelling.push(twentyElevenSuburbObject);

                                return newSuburbDwelling;
                            });

                            // >> State
                            setStateDwelling((prevStateDwelling) => {
                                const newStateDwelling: any[] = [];

                                const separateHouseInState = parseFloat(data[0]["percentage_separate_house_in_state"]);
                                const semiDetachedInState = parseFloat(data[0]["percentage_semi_detached_in_state"]);
                                const flatUnitApartmentInState = parseFloat(data[0]["percentage_flat_unit_or_apartment_in_state"]);
                                const otherDwellingInState = parseFloat(data[0]["percentage_other_dwelling_in_state"]);

                                // >> State
                                const twentyElevenStateObject = {
                                    year: "2011",
                                    "Separate House": separateHouseInState,
                                    "Semi-detached / Townhouse": semiDetachedInState,
                                    "Flat, unit or apartment": flatUnitApartmentInState,
                                    "Other dwelling": otherDwellingInState,
                                };

                                newStateDwelling.push(twentyElevenStateObject);

                                return newStateDwelling;
                            });
                            const separateHouseInAustralia = parseFloat(data[0]["percentage_separate_house_in_australia"]);
                            const semiDetachedInAustralia = parseFloat(data[0]["percentage_semi_detached_in_australia"]);
                            const flatUnitApartmentInAustralia = parseFloat(data[0]["percentage_flat_unit_or_apartment_in_australia"]);
                            const otherDwellingInAustralia = parseFloat(data[0]["percentage_other_dwelling_in_australia"]);
                        }

                        // * 2016
                        else if (year == "2016") {
                            setSuburbDwelling((prevSuburbDwelling) => {
                                const newSuburbDwelling: any[] = [...prevSuburbDwelling];

                                // >> 5 categories of dwelling structures
                                // Separate House
                                const separateHouseInSuburb = parseFloat(data[0]["percentage_separate_house_in_suburb"]);

                                // Semi-detached, row or terrace house, townhouse etc
                                const semiDetachedInSuburb = parseFloat(data[0]["percentage_semi_detached_in_suburb"]);

                                // Flat, unit or apartment
                                const flatUnitApartmentInSuburb = parseFloat(data[0]["percentage_flat_or_apartment_in_suburb"]);

                                // console.log(`2016: flat, unit, apartment ${flatUnitApartmentInSuburb}`);

                                // Other dwelling
                                const otherDwellingInSuburb = parseFloat(data[0]["percentage_other_dwelling_in_suburb"]);

                                // Push 2016 object
                                const twentySixteenSuburbObject = {
                                    year: "2016",
                                    "Separate House": separateHouseInSuburb,
                                    "Semi-detached / Townhouse": semiDetachedInSuburb,
                                    "Flat, unit or apartment": flatUnitApartmentInSuburb,
                                    "Other dwelling": otherDwellingInSuburb,
                                };

                                // console.log(twentySixteenSuburbObject);

                                newSuburbDwelling.push(twentySixteenSuburbObject);

                                return newSuburbDwelling;
                            });

                            // >> State
                            setStateDwelling((prevStateDwelling) => {
                                const newStateDwelling: any[] = [...prevStateDwelling];

                                const separateHouseInState = parseFloat(data[0]["percentage_separate_house_in_state"]);
                                const semiDetachedInState = parseFloat(data[0]["percentage_semi_detached_in_state"]);
                                const flatUnitApartmentInState = parseFloat(data[0]["percentage_flat_or_apartment_in_state"]);
                                const otherDwellingInState = parseFloat(data[0]["percentage_other_dwelling_in_state"]);

                                // >> State
                                const twentySixteenStateObject = {
                                    year: "2016",
                                    "Separate House": separateHouseInState,
                                    "Semi-detached / Townhouse": semiDetachedInState,
                                    "Flat, unit or apartment": flatUnitApartmentInState,
                                    "Other dwelling": otherDwellingInState,
                                };

                                newStateDwelling.push(twentySixteenStateObject);

                                return newStateDwelling;
                            });

                            const separateHouseInAustralia = parseFloat(data[0]["percentage_separate_house_in_australia"]);
                            const semiDetachedInAustralia = parseFloat(data[0]["percentage_semi_detached_in_australia"]);
                            const flatUnitApartmentInAustralia = parseFloat(data[0]["percentage_flat_or_apartment_in_australia"]);
                            const otherDwellingInAustralia = parseFloat(data[0]["percentage_other_dwelling_in_australia"]);
                        }

                        // * 2021
                        else if (year == "2021") {
                            setSuburbDwelling((prevSuburbDwelling) => {
                                const newSuburbDwelling: any[] = [...prevSuburbDwelling];

                                // >> 5 categories of dwelling structures
                                // Separate House
                                const separateHouseInSuburb = parseFloat(data[0]["percentage_separate_house_in_suburb"]);

                                // Semi-detached, row or terrace house, townhouse etc
                                const semiDetachedInSuburb = parseFloat(data[0]["percentage_semi_detached_in_suburb"]);

                                // Flat, unit or apartment
                                const flatUnitApartmentInSuburb = parseFloat(data[0]["percentage_flat_or_apartment_in_suburb"]);

                                // console.log(`2021: flat, unit, apartment ${flatUnitApartmentInSuburb}`);

                                // Other dwelling
                                const otherDwellingInSuburb = parseFloat(data[0]["percentage_other_dwelling_in_suburb"]);

                                // Push 2021 object
                                const twentyTwentyOneSuburbObject = {
                                    year: "2021",
                                    "Separate House": separateHouseInSuburb,
                                    "Semi-detached / Townhouse": semiDetachedInSuburb,
                                    "Flat, unit or apartment": flatUnitApartmentInSuburb,
                                    "Other dwelling": otherDwellingInSuburb,
                                };

                                // console.log(twentyTwentyOneSuburbObject);

                                newSuburbDwelling.push(twentyTwentyOneSuburbObject);

                                return newSuburbDwelling;
                            });

                            // >> State
                            setStateDwelling((prevStateDwelling) => {
                                const newStateDwelling: any[] = [...prevStateDwelling];

                                const separateHouseInState = parseFloat(data[0]["percentage_separate_house_in_state"]);
                                const semiDetachedInState = parseFloat(data[0]["percentage_semi_detached_in_state"]);
                                const flatUnitApartmentInState = parseFloat(data[0]["percentage_flat_or_apartment_in_state"]);
                                const otherDwellingInState = parseFloat(data[0]["percentage_other_dwelling_in_state"]);

                                // >> State
                                const twentyTwentyOneStateObject = {
                                    year: "2021",
                                    "Separate House": separateHouseInState,
                                    "Semi-detached / Townhouse": semiDetachedInState,
                                    "Flat, unit or apartment": flatUnitApartmentInState,
                                    "Other dwelling": otherDwellingInState,
                                };

                                newStateDwelling.push(twentyTwentyOneStateObject);

                                return newStateDwelling;
                            });
                            const separateHouseInAustralia = parseFloat(data[0]["percentage_separate_house_in_australia"]);
                            const semiDetachedInAustralia = parseFloat(data[0]["percentage_semi_detached_in_australia"]);
                            const flatUnitApartmentInAustralia = parseFloat(data[0]["percentage_flat_or_apartment_in_australia"]);
                            const otherDwellingInAustralia = parseFloat(data[0]["percentage_other_dwelling_in_australia"]);
                        }
                    } catch (error) {
                        console.error(`Error processing data for ${year}`, error);

                        if (year === "2001") {
                            console.log(`2001 data not available for ${selectedSuburb}`);
                            setTwoThousandAndOneDataAvailable(false);
                        } else if (year === "2006") {
                            console.log(`2006 data not available for ${selectedSuburb}`);
                        } else if (year === "2011") {
                            console.log(`2011 data not available for ${selectedSuburb}`);
                        } else if (year === "2016") {
                            console.log(`2016 data not available for ${selectedSuburb}`);
                        } else if (year === "2021") {
                            console.log(`2021 data not available for ${selectedSuburb}`);
                        }
                    }
                }
            });
        }

        if (props.selectedSuburb) {
            // Clear old array values from previous search
            fetchData();
        } else {
            setSuburbDwelling([]);
        }

        return () => {
            isMounted = false;
            setSuburbDwelling([]);
        };
    }, [props.selectedSuburb]);

    // ! CONSOLE LOGS
    console.log(suburbDwelling);
    console.log(stateDwelling);
    // ! CONSOLE LOGS

    return (
        <>
            <div>
                <div className="flex flex-col justify-center">
                    <h1 className="mt-4 mb-4 text-lg text-center font-bold">Types of Dwellings in {selectedSuburb}</h1>
                    <div className="mx-auto -mt-4">
                        <AreaChart
                            width={500}
                            height={500}
                            data={suburbDwelling}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 20,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis domain={[0, 100]} tickCount={10} />
                            <Legend />
                            <Tooltip />
                            <Area type="monotone" dataKey="Separate House" stackId="1" stroke="#8884d8" fill="#8884d8" />
                            <Area type="monotone" dataKey="Semi-detached / Townhouse" stackId="1" stroke="#B8621B" fill="#B8621B" />
                            <Area type="monotone" dataKey="Flat, unit or apartment" stackId="1" stroke="#ffc658" fill="#ffc658" />
                            <Area type="monotone" dataKey="Other dwelling" stackId="1" stroke="#28544B" fill="#28544B" />
                        </AreaChart>
                    </div>

                    <h1 className="mt-4 mb-4 text-lg text-center font-bold">Types of Dwellings in {selectedState}</h1>
                    <div className="mx-auto -mt-4">
                        <AreaChart
                            width={500}
                            height={500}
                            data={stateDwelling}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 20,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis domain={[0, 100]} tickCount={10} />
                            <Legend />
                            <Tooltip />
                            <Area type="monotone" dataKey="Separate House" stackId="1" stroke="#8884d8" fill="#8884d8" />
                            <Area type="monotone" dataKey="Semi-detached / Townhouse" stackId="1" stroke="#B8621B" fill="#B8621B" />
                            <Area type="monotone" dataKey="Flat, unit or apartment" stackId="1" stroke="#ffc658" fill="#ffc658" />
                            <Area type="monotone" dataKey="Other dwelling" stackId="1" stroke="#28544B" fill="#28544B" />
                        </AreaChart>
                    </div>
                </div>
            </div>
        </>
    );
}
