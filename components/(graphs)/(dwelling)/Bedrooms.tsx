import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { PureComponent, useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label } from "recharts";

interface BedroomsStackedAreaChartProps {
    selectedSuburb: string | null;
}

export default function BedroomsStackedAreaChart(props: BedroomsStackedAreaChartProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");
    const [suburbBedrooms, setSuburbBedrooms] = useState<{ key: string; value: number }[]>([]);
    const [stateBedrooms, setStateBedrooms] = useState<{ key: string; value: number }[]>([]);
    const [australiaBedrooms, setAustraliaBedrooms] = useState<{ key: string; value: number }[]>([]);

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
    async function fetchBedroomsDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            const dataPromises = years.map((year) => fetchBedroomsDataByYear(year, `data_${year}`, props.selectedSuburb));

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
                        // >> Number of bedrooms not recorded

                        // * 2006
                        // >> Number of bedrooms not recorded

                        // * 2011
                        if (year == "2011") {
                            // >> Suburb
                            const newSuburbBedrooms: any[] = [];

                            // >> 6 categories of number of bedrooms

                            // None
                            const noBedroomsInSuburb = parseFloat(data[0]["percentage_none_includes_bedsitters_in_suburb"]);

                            // 1 BR
                            const oneBedroomInSuburb = parseFloat(data[0]["percentage_1_bedroom_in_suburb"]);

                            // 2 BR
                            const twoBedroomsInSuburb = parseFloat(data[0]["percentage_2_bedrooms_in_suburb"]);

                            // 3 BR
                            const threeBedroomsInSuburb = parseFloat(data[0]["percentage_3_bedrooms_in_suburb"]);

                            // 4+ BR
                            const fourPlusBedroomsInSuburb = parseFloat(data[0]["percentage_4_or_more_bedrooms_in_suburb"]);

                            // Not stated
                            const bedroomsNotStatedInSuburb = parseFloat(data[0]["percentage_number_of_bedrooms_not_stated_in_suburb"]);

                            const twentyElevenSuburbObject = {
                                year: "2011",
                                "No BR": noBedroomsInSuburb,
                                "1 BR": oneBedroomInSuburb,
                                "2 BR": twoBedroomsInSuburb,
                                "3 BR": threeBedroomsInSuburb,
                                "4+ BR": fourPlusBedroomsInSuburb,
                                "Number of BR not stated": bedroomsNotStatedInSuburb,
                            };

                            // console.log(twentyElevenSuburbObject);

                            newSuburbBedrooms.push(twentyElevenSuburbObject);
                            setSuburbBedrooms(newSuburbBedrooms);

                            // >> State
                            const newStateBedrooms: any[] = [];

                            const noBedroomsInState = parseFloat(data[0]["percentage_none_includes_bedsitters_in_state"]);
                            const oneBedroomInState = parseFloat(data[0]["percentage_1_bedroom_in_state"]);
                            const twoBedroomsInState = parseFloat(data[0]["percentage_2_bedrooms_in_state"]);
                            const threeBedroomsInState = parseFloat(data[0]["percentage_3_bedrooms_in_state"]);
                            const fourPlusBedroomsInState = parseFloat(data[0]["percentage_4_or_more_bedrooms_in_state"]);
                            const bedroomsNotStatedInState = parseFloat(data[0]["percentage_number_of_bedrooms_not_stated_in_state"]);

                            // >> State
                            const twentyElevenStateObject = {
                                year: "2011",
                                "No BR": noBedroomsInState,
                                "1 BR": oneBedroomInState,
                                "2 BR": twoBedroomsInState,
                                "3 BR": threeBedroomsInState,
                                "4+ BR": fourPlusBedroomsInState,
                                "Number of BR not stated": bedroomsNotStatedInState,
                            };

                            // console.log(twentyElevenStateObject);

                            newStateBedrooms.push(twentyElevenStateObject);
                            setStateBedrooms(newStateBedrooms);

                            const noBedroomsInAustralia = parseFloat(data[0]["percentage_none_includes_bedsitters_in_australia"]);
                            const oneBedroomInAustralia = parseFloat(data[0]["percentage_1_bedroom_in_australia"]);
                            const twoBedroomsInAustralia = parseFloat(data[0]["percentage_2_bedrooms_in_australia"]);
                            const threeBedroomsInAustralia = parseFloat(data[0]["percentage_3_bedrooms_in_australia"]);
                            const fourBedroomsInAustralia = parseFloat(data[0]["percentage_4_or_more_bedrooms_in_australia"]);
                            const bedroomsNotStatedInAustralia = parseFloat(
                                data[0]["percentage_number_of_bedrooms_not_stated_in_australia"]
                            );
                        }

                        // * 2016
                        else if (year == "2016") {
                            setSuburbBedrooms((prevSuburbBedrooms) => {
                                const newSuburbBedrooms: any[] = [...prevSuburbBedrooms];

                                // >> 6 categories of number of bedrooms
                                // None
                                const noBedroomsInSuburb = parseFloat(data[0]["percentage_none_includes_bedsitters_in_suburb"]);

                                // 1 BR
                                const oneBedroomInSuburb = parseFloat(data[0]["percentage_1_bedroom_in_suburb"]);

                                // 2 BR
                                const twoBedroomsInSuburb = parseFloat(data[0]["percentage_2_bedrooms_in_suburb"]);

                                // 3 BR
                                const threeBedroomsInSuburb = parseFloat(data[0]["percentage_3_bedrooms_in_suburb"]);

                                // 4+ BR
                                const fourPlusBedroomsInSuburb = parseFloat(data[0]["percentage_4_or_more_bedrooms_in_suburb"]);

                                // Not stated
                                const bedroomsNotStatedInSuburb = parseFloat(data[0]["percentage_number_of_bedrooms_not_stated_in_suburb"]);

                                const twentySixteenSuburbObject = {
                                    year: "2016",
                                    "No BR": noBedroomsInSuburb,
                                    "1 BR": oneBedroomInSuburb,
                                    "2 BR": twoBedroomsInSuburb,
                                    "3 BR": threeBedroomsInSuburb,
                                    "4+ BR": fourPlusBedroomsInSuburb,
                                    "Number of BR not stated": bedroomsNotStatedInSuburb,
                                };

                                // console.log(twentySixteenSuburbObject);

                                newSuburbBedrooms.push(twentySixteenSuburbObject);
                                return newSuburbBedrooms;
                            });

                            setStateBedrooms((prevStateBedrooms) => {
                                // >> 6 categories of number of bedrooms
                                const newStateBedrooms: any[] = [...prevStateBedrooms];

                                const noBedroomsInState = parseFloat(data[0]["percentage_none_includes_bedsitters_in_state"]);
                                const oneBedroomInState = parseFloat(data[0]["percentage_1_bedroom_in_state"]);
                                const twoBedroomsInState = parseFloat(data[0]["percentage_2_bedrooms_in_state"]);
                                const threeBedroomsInState = parseFloat(data[0]["percentage_3_bedrooms_in_state"]);
                                const fourPlusBedroomsInState = parseFloat(data[0]["percentage_4_or_more_bedrooms_in_state"]);
                                const bedroomsNotStatedInState = parseFloat(data[0]["percentage_number_of_bedrooms_not_stated_in_state"]);

                                // >> State
                                const twentySixteenStateObject = {
                                    year: "2016",
                                    "No BR": noBedroomsInState,
                                    "1 BR": oneBedroomInState,
                                    "2 BR": twoBedroomsInState,
                                    "3 BR": threeBedroomsInState,
                                    "4+ BR": fourPlusBedroomsInState,
                                    "Number of BR not stated": bedroomsNotStatedInState,
                                };

                                // console.log(twentySixteenStateObject);

                                newStateBedrooms.push(twentySixteenStateObject);

                                return newStateBedrooms;

                                const noBedroomsInAustralia = parseFloat(data[0]["percentage_none_includes_bedsitters_in_australia"]);
                                const oneBedroomInAustralia = parseFloat(data[0]["percentage_1_bedroom_in_australia"]);
                                const twoBedroomsInAustralia = parseFloat(data[0]["percentage_2_bedrooms_in_australia"]);
                                const threeBedroomsInAustralia = parseFloat(data[0]["percentage_3_bedrooms_in_australia"]);
                                const fourBedroomsInAustralia = parseFloat(data[0]["percentage_4_or_more_bedrooms_in_australia"]);
                                const bedroomsNotStatedInAustralia = parseFloat(
                                    data[0]["percentage_number_of_bedrooms_not_stated_in_australia"]
                                );
                            });
                        }

                        // * 2021
                        else if (year == "2021") {
                            setSuburbBedrooms((prevSuburbBedrooms) => {
                                const newSuburbBedrooms: any[] = [...prevSuburbBedrooms];

                                // >> 6 categories of number of bedrooms
                                // None
                                const noBedroomsInSuburb = parseFloat(data[0]["percentage_no_bedrooms_in_suburb"]);

                                // 1 BR
                                const oneBedroomInSuburb = parseFloat(data[0]["percentage_1_bedroom_in_suburb"]);

                                // 2 BR
                                const twoBedroomsInSuburb = parseFloat(data[0]["percentage_2_bedrooms_in_suburb"]);

                                // 3 BR
                                const threeBedroomsInSuburb = parseFloat(data[0]["percentage_3_bedrooms_in_suburb"]);

                                // 4+ BR
                                const fourPlusBedroomsInSuburb = parseFloat(data[0]["percentage_4_or_more_bedrooms_in_suburb"]);

                                // Not stated
                                const bedroomsNotStatedInSuburb = parseFloat(data[0]["percentage_number_of_bedrooms_not_stated_in_suburb"]);

                                const twentyTwentyOneSuburbObject = {
                                    year: "2021",
                                    "No BR": noBedroomsInSuburb,
                                    "1 BR": oneBedroomInSuburb,
                                    "2 BR": twoBedroomsInSuburb,
                                    "3 BR": threeBedroomsInSuburb,
                                    "4+ BR": fourPlusBedroomsInSuburb,
                                    "Number of BR not stated": bedroomsNotStatedInSuburb,
                                };

                                // console.log(twentyTwentyOneSuburbObject);

                                newSuburbBedrooms.push(twentyTwentyOneSuburbObject);
                                return newSuburbBedrooms;
                            });

                            setStateBedrooms((prevStateBedrooms) => {
                                // >> 6 categories of number of bedrooms
                                const newStateBedrooms: any[] = [...prevStateBedrooms];

                                const noBedroomsInState = parseFloat(data[0]["percentage_no_bedrooms_in_state"]);
                                const oneBedroomInState = parseFloat(data[0]["percentage_1_bedroom_in_state"]);
                                const twoBedroomsInState = parseFloat(data[0]["percentage_2_bedrooms_in_state"]);
                                const threeBedroomsInState = parseFloat(data[0]["percentage_3_bedrooms_in_state"]);
                                const fourPlusBedroomsInState = parseFloat(data[0]["percentage_4_or_more_bedrooms_in_state"]);
                                const bedroomsNotStatedInState = parseFloat(data[0]["percentage_number_of_bedrooms_not_stated_in_state"]);

                                // >> State
                                const twentyTwentyOneStateObject = {
                                    year: "2021",
                                    "No BR": noBedroomsInState,
                                    "1 BR": oneBedroomInState,
                                    "2 BR": twoBedroomsInState,
                                    "3 BR": threeBedroomsInState,
                                    "4+ BR": fourPlusBedroomsInState,
                                    "Number of BR not stated": bedroomsNotStatedInState,
                                };

                                // console.log(twentyTwentyOneStateObject);

                                newStateBedrooms.push(twentyTwentyOneStateObject);
                                return newStateBedrooms;
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
            setSuburbBedrooms([]);
        }

        return () => {
            isMounted = false;
            setSuburbBedrooms([]);
        };
    }, [props.selectedSuburb]);

    // ! CONSOLE LOGS
    // console.log(suburbBedrooms);
    // console.log(stateBedrooms);
    // ! CONSOLE LOGS

    return (
        <div className="flex flex-col place-items-center">
            <div className="flex flex-col mobile-s:max-mobile-l:w-[260px] mobile-s:h-[440px] md-l:w-[426px] mobile-s:max-mobile-l:mb-6 mb-2">
                <h1 className="mt-10 mb-4 text-lg text-center font-bold">Number of Bedrooms in {selectedSuburb} dwellings</h1>
                {/* Suburb Chart */}
                <ResponsiveContainer>
                    <AreaChart
                        data={suburbBedrooms}
                        margin={{
                            top: 20,
                            right: 25,
                            left: 20,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis domain={[0, 100]} tickCount={10} allowDecimals={true}>
                            <Label value="%" position="insideLeft"></Label>
                        </YAxis>
                        <Legend
                            height={80}
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        />
                        <Tooltip offset={60} cursor={false} allowEscapeViewBox={{ x: true, y: true }} />
                        <Area type="monotone" dataKey="No BR" stackId="1" stroke="#186F65" fill="#186F65" />
                        <Area type="monotone" dataKey="1 BR" stackId="1" stroke="#B5CB99" fill="#B5CB99" />
                        <Area type="monotone" dataKey="2 BR" stackId="1" stroke="#2A528A" fill="#2A528A" />
                        <Area type="monotone" dataKey="3 BR" stackId="1" stroke="#B2533E" fill="#B2533E" />
                        <Area type="monotone" dataKey="4+ BR" stackId="1" stroke="#A27B5C" fill="#A27B5C" />
                        <Area type="monotone" dataKey="Number of BR not stated" stackId="1" stroke="#2C3639" fill="#2C3639" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-col mobile-s:max-mobile-l:w-[260px] mobile-s:h-[440px] md-l:w-[384px] mobile-s:max-mobile-l:mt-4 mt-2 mobile-s:max-mobile-l:mb-20 sm:mb-10">
                <h1 className="mt-4 mb-4 text-lg text-center font-bold">Number of Bedrooms in {selectedState} dwellings</h1>
                {/* State Chart */}
                <ResponsiveContainer>
                    <AreaChart
                        width={500}
                        height={500}
                        data={stateBedrooms}
                        margin={{
                            top: 20,
                            right: 25,
                            left: -15,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis label="%" domain={[0, 100]} tickCount={10} allowDecimals={false} />
                        <Legend
                            height={80}
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        />
                        <Tooltip offset={60} cursor={false} allowEscapeViewBox={{ x: true, y: true }} />
                        <Area type="monotone" dataKey="No BR" stackId="1" stroke="#186F65" fill="#186F65" />
                        <Area type="monotone" dataKey="1 BR" stackId="1" stroke="#B5CB99" fill="#B5CB99" />
                        <Area type="monotone" dataKey="2 BR" stackId="1" stroke="#2A528A" fill="#2A528A" />
                        <Area type="monotone" dataKey="3 BR" stackId="1" stroke="#B2533E" fill="#B2533E" />
                        <Area type="monotone" dataKey="4+ BR" stackId="1" stroke="#A27B5C" fill="#A27B5C" />
                        <Area type="monotone" dataKey="Number of BR not stated" stackId="1" stroke="#2C3639" fill="#2C3639" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
