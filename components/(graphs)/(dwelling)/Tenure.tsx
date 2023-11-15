import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { PureComponent, useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TenureStackedAreaChartProps {
    selectedSuburb: string | null;
}

export default function TenureStackedAreaChart(props: TenureStackedAreaChartProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");
    const [suburbTenure, setSuburbTenure] = useState<{ key: string; value: number }[]>([]);
    const [stateTenure, setStateTenure] = useState<{ key: string; value: number }[]>([]);
    const [australiaTenure, setAustraliaTenure] = useState<{ key: string; value: number }[]>([]);

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
    async function fetchTenureDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            const dataPromises = years.map((year) => fetchTenureDataByYear(year, `data_${year}`, props.selectedSuburb));

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
                            const newSuburbTenure: any[] = [];

                            // >> 5 categories of tenure
                            // Owned outright
                            const ownedOutrightInSuburb = parseFloat(data[0]["percentage_owned_outright_in_suburb"]);

                            // Owned with mortgage
                            const ownedWithMortgageInSuburb = parseFloat(data[0]["percentage_owned_with_a_mortgage_in_suburb"]);

                            // Rented
                            const rentedInSuburb = parseFloat(data[0]["percentage_rented_includes_rent_free_in_suburb"]);

                            // Other tenure type
                            const otherTenureTypeInSuburb = parseFloat(data[0]["percentage_other_tenure_type_in_suburb"]);

                            // Tenure not stated
                            const notStatedInSuburb = parseFloat(data[0]["percentage_tenure_type_not_stated_in_suburb"]);

                            const twoThousandAndOneSuburbObject = {
                                year: "2001",
                                "Owned Outright": ownedOutrightInSuburb,
                                "Owned with a mortgage": ownedWithMortgageInSuburb,
                                Rented: rentedInSuburb,
                                "Other tenure type": otherTenureTypeInSuburb,
                                "Tenure type not stated": notStatedInSuburb,
                            };

                            // console.log(twoThousandAndOneSuburbObject);

                            newSuburbTenure.push(twoThousandAndOneSuburbObject);
                            setSuburbTenure(newSuburbTenure);
                        }

                        // * 2006
                        else if (year == "2006") {
                            setSuburbTenure((prevSuburbTenure) => {
                                const newSuburbTenure: any[] = [...prevSuburbTenure];

                                // >> 5 categories of tenure
                                // Owned outright
                                const ownedOutrightInSuburb = parseFloat(data[0]["percentage_owned_outright_in_suburb"]);

                                // Owned with mortgage
                                const ownedWithMortgageInSuburb = parseFloat(data[0]["percentage_owned_with_a_mortgage_in_suburb"]);

                                // Rented
                                const rentedInSuburb = parseFloat(data[0]["percentage_rented_includes_rent_free_in_suburb"]);

                                // Other tenure type
                                const otherTenureTypeInSuburb = parseFloat(data[0]["percentage_other_tenure_type_in_suburb"]);

                                // Tenure not stated
                                const notStatedInSuburb = parseFloat(data[0]["percentage_tenure_type_not_stated_in_suburb"]);

                                const twoThousandAndSixSuburbObject = {
                                    year: "2006",
                                    "Owned Outright": ownedOutrightInSuburb,
                                    "Owned with a mortgage": ownedWithMortgageInSuburb,
                                    Rented: rentedInSuburb,
                                    "Other tenure type": otherTenureTypeInSuburb,
                                    "Tenure type not stated": notStatedInSuburb,
                                };

                                newSuburbTenure.push(twoThousandAndSixSuburbObject);
                                return newSuburbTenure;
                            });
                        }

                        // * 2011
                        else if (year == "2011") {
                            // >> Suburb
                            setSuburbTenure((prevSuburbTenure) => {
                                const newSuburbTenure: any[] = [...prevSuburbTenure];

                                // >> 5 categories of tenure
                                // Owned outright
                                const ownedOutrightInSuburb = parseFloat(data[0]["percentage_owned_outright_in_suburb"]);

                                // Owned with mortgage
                                const ownedWithMortgageInSuburb = parseFloat(data[0]["percentage_owned_with_a_mortgage_in_suburb"]);

                                // Rented
                                const rentedInSuburb = parseFloat(data[0]["percentage_rented_in_suburb"]);

                                // Other tenure type
                                const otherTenureTypeInSuburb = parseFloat(data[0]["percentage_other_tenure_type_in_suburb"]);

                                // Tenure not stated
                                const notStatedInSuburb = parseFloat(data[0]["percentage_tenure_type_not_stated_in_suburb"]);

                                const twoThousandAndElevenSuburbObject = {
                                    year: "2011",
                                    "Owned Outright": ownedOutrightInSuburb,
                                    "Owned with a mortgage": ownedWithMortgageInSuburb,
                                    Rented: rentedInSuburb,
                                    "Other tenure type": otherTenureTypeInSuburb,
                                    "Tenure type not stated": notStatedInSuburb,
                                };

                                newSuburbTenure.push(twoThousandAndElevenSuburbObject);
                                return newSuburbTenure;
                            });

                            // >> State

                            const newStateTenure: any[] = [];

                            // >> 5 categories of tenure
                            // Owned outright
                            const ownedOutrightInState = parseFloat(data[0]["percentage_owned_outright_in_state"]);

                            // Owned with mortgage
                            const ownedWithMortgageInState = parseFloat(data[0]["percentage_owned_with_a_mortgage_in_state"]);

                            // Rented
                            const rentedInState = parseFloat(data[0]["percentage_rented_in_state"]);

                            // Other tenure type
                            const otherTenureTypeInState = parseFloat(data[0]["percentage_other_tenure_type_in_state"]);

                            // Tenure not stated
                            const notStatedInState = parseFloat(data[0]["percentage_tenure_type_not_stated_in_state"]);

                            const twoThousandAndElevenStateObject = {
                                year: "2011",
                                "Owned Outright": ownedOutrightInState,
                                "Owned with a mortgage": ownedWithMortgageInState,
                                Rented: rentedInState,
                                "Other tenure type": otherTenureTypeInState,
                                "Tenure type not stated": notStatedInState,
                            };

                            newStateTenure.push(twoThousandAndElevenStateObject);
                            setStateTenure(newStateTenure);
                        }

                        // * 2016
                        else if (year == "2016") {
                            // >> Suburb
                            setSuburbTenure((prevSuburbTenure) => {
                                const newSuburbTenure: any[] = [...prevSuburbTenure];

                                // >> 5 categories of tenure
                                // Owned outright
                                const ownedOutrightInSuburb = parseFloat(data[0]["percentage_owned_outright_in_suburb"]);

                                // Owned with mortgage
                                const ownedWithMortgageInSuburb = parseFloat(data[0]["percentage_owned_with_a_mortgage_in_suburb"]);

                                // Rented
                                const rentedInSuburb = parseFloat(data[0]["percentage_rented_in_suburb"]);

                                // Other tenure type
                                const otherTenureTypeInSuburb = parseFloat(data[0]["percentage_other_tenure_type_in_suburb"]);

                                // Tenure not stated
                                const notStatedInSuburb = parseFloat(data[0]["percentage_tenure_type_not_stated_in_suburb"]);

                                const twentySixteenSuburbObject = {
                                    year: "2016",
                                    "Owned Outright": ownedOutrightInSuburb,
                                    "Owned with a mortgage": ownedWithMortgageInSuburb,
                                    Rented: rentedInSuburb,
                                    "Other tenure type": otherTenureTypeInSuburb,
                                    "Tenure type not stated": notStatedInSuburb,
                                };

                                newSuburbTenure.push(twentySixteenSuburbObject);
                                return newSuburbTenure;
                            });

                            // >> State
                            setStateTenure((prevStateTenure) => {
                                const newStateTenure: any[] = [...prevStateTenure];

                                // >> 5 categories of tenure
                                // Owned outright
                                const ownedOutrightInState = parseFloat(data[0]["percentage_owned_outright_in_state"]);

                                // Owned with mortgage
                                const ownedWithMortgageInState = parseFloat(data[0]["percentage_owned_with_a_mortgage_in_state"]);

                                // Rented
                                const rentedInState = parseFloat(data[0]["percentage_rented_in_state"]);

                                // Other tenure type
                                const otherTenureTypeInState = parseFloat(data[0]["percentage_other_tenure_type_in_state"]);

                                // Tenure not stated
                                const notStatedInState = parseFloat(data[0]["percentage_tenure_type_not_stated_in_state"]);

                                const twentySixteenStateObject = {
                                    year: "2016",
                                    "Owned Outright": ownedOutrightInState,
                                    "Owned with a mortgage": ownedWithMortgageInState,
                                    Rented: rentedInState,
                                    "Other tenure type": otherTenureTypeInState,
                                    "Tenure type not stated": notStatedInState,
                                };

                                newStateTenure.push(twentySixteenStateObject);
                                return newStateTenure;
                            });
                        }

                        // * 2021
                        else if (year == "2021") {
                            // >> Suburb
                            setSuburbTenure((prevSuburbTenure) => {
                                const newSuburbTenure: any[] = [...prevSuburbTenure];

                                // >> 5 categories of tenure
                                // Owned outright
                                const ownedOutrightInSuburb = parseFloat(data[0]["percentage_owned_outright_in_suburb"]);

                                // Owned with mortgage
                                const ownedWithMortgageInSuburb = parseFloat(data[0]["percentage_owned_with_a_mortgage_a_in_suburb"]);

                                // Rented
                                const rentedInSuburb = parseFloat(data[0]["percentage_rented_b_in_suburb"]);

                                // Other tenure type
                                const otherTenureTypeInSuburb = parseFloat(data[0]["percentage_other_tenure_type_c_in_suburb"]);

                                // Tenure not stated
                                const notStatedInSuburb = parseFloat(data[0]["percentage_tenure_type_not_stated_in_suburb"]);

                                const twentyTwentyOneSuburbObject = {
                                    year: "2021",
                                    "Owned Outright": ownedOutrightInSuburb,
                                    "Owned with a mortgage": ownedWithMortgageInSuburb,
                                    Rented: rentedInSuburb,
                                    "Other tenure type": otherTenureTypeInSuburb,
                                    "Tenure type not stated": notStatedInSuburb,
                                };

                                newSuburbTenure.push(twentyTwentyOneSuburbObject);
                                return newSuburbTenure;
                            });

                            // >> State
                            setStateTenure((prevStateTenure) => {
                                const newStateTenure: any[] = [...prevStateTenure];

                                // >> 5 categories of tenure
                                // Owned outright
                                const ownedOutrightInState = parseFloat(data[0]["percentage_owned_outright_in_state"]);

                                // Owned with mortgage
                                const ownedWithMortgageInState = parseFloat(data[0]["percentage_owned_with_a_mortgage_a_in_state"]);

                                // Rented
                                const rentedInState = parseFloat(data[0]["percentage_rented_b_in_state"]);

                                // Other tenure type
                                const otherTenureTypeInState = parseFloat(data[0]["percentage_other_tenure_type_c_in_state"]);

                                // Tenure not stated
                                const notStatedInState = parseFloat(data[0]["percentage_tenure_type_not_stated_in_state"]);

                                const twentyTwentyOneStateObject = {
                                    year: "2021",
                                    "Owned Outright": ownedOutrightInState,
                                    "Owned with a mortgage": ownedWithMortgageInState,
                                    Rented: rentedInState,
                                    "Other tenure type": otherTenureTypeInState,
                                    "Tenure type not stated": notStatedInState,
                                };

                                newStateTenure.push(twentyTwentyOneStateObject);
                                return newStateTenure;
                            });
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
            setSuburbTenure([]);
        }

        return () => {
            isMounted = false;
            setSuburbTenure([]);
        };
    }, [props.selectedSuburb]);

    // ! CONSOLE LOGS
    // console.log(suburbTenure);
    // console.log(stateTenure);
    // ! CONSOLE LOGS

    return (
        <>
            <div>
                <div className="flex flex-row justify-center">
                    <div className="mx-auto -mt-4">
                        <h1 className="mt-4 mb-4 text-lg text-center font-bold">Tenure in {selectedSuburb}</h1>
                        {/* Suburb Chart */}
                        <AreaChart
                            width={500}
                            height={500}
                            data={suburbTenure}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 20,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis label="%" domain={[0, 100]} tickCount={10} allowDecimals={false} />
                            <Legend />
                            <Tooltip offset={60} cursor={false} allowEscapeViewBox={{ x: true, y: true }} />
                            <Area type="monotone" dataKey="Owned Outright" stackId="1" stroke="#186F65" fill="#186F65" />
                            <Area type="monotone" dataKey="Owned with a mortgage" stackId="1" stroke="#B5CB99" fill="#B5CB99" />
                            <Area type="monotone" dataKey="Rented" stackId="1" stroke="#FCE09B" fill="#FCE09B" />
                            <Area type="monotone" dataKey="Other tenure type" stackId="1" stroke="#B2533E" fill="#B2533E" />
                            <Area type="monotone" dataKey="Tenure type not stated" stackId="1" stroke="#A27B5C" fill="#A27B5C" />
                        </AreaChart>
                    </div>

                    <div className="mx-auto -mt-4">
                        <h1 className="mt-4 mb-4 text-lg text-center font-bold">Tenure in {selectedState}</h1>
                        {/* State Chart */}
                        <AreaChart
                            width={500}
                            height={500}
                            data={stateTenure}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 20,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis label="%" domain={[0, 100]} tickCount={10} allowDecimals={false} />
                            <Legend />
                            <Tooltip offset={60} cursor={false} allowEscapeViewBox={{ x: true, y: true }} />
                            <Area type="monotone" dataKey="Owned Outright" stackId="1" stroke="#186F65" fill="#186F65" />
                            <Area type="monotone" dataKey="Owned with a mortgage" stackId="1" stroke="#B5CB99" fill="#B5CB99" />
                            <Area type="monotone" dataKey="Rented" stackId="1" stroke="#FCE09B" fill="#FCE09B" />
                            <Area type="monotone" dataKey="Other tenure type" stackId="1" stroke="#B2533E" fill="#B2533E" />
                            <Area type="monotone" dataKey="Tenure type not stated" stackId="1" stroke="#A27B5C" fill="#A27B5C" />
                        </AreaChart>
                    </div>
                </div>
            </div>
        </>
    );
}
