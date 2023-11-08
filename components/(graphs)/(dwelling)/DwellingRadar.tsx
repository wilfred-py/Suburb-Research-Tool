import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { PureComponent, useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DwellingChartProps {
    selectedSuburb: string | null;
}

export default function DwellingChart(props: DwellingChartProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [suburbDwelling, setSuburbDwelling] = useState<{ key: string; value: number }[]>([]);
    const [selectedYear, setSelectedYear] = useState<string | undefined>("2021");

    const [twoThousandAndOneData, setTwoThousandAndOneData] = useState<{ key: string; value: number }[]>([]);
    const [twoThousandAndSixData, setTwoThousandAndSixData] = useState<{ key: string; value: number }[]>([]);
    const [twentyElevenData, setTwentyElevenData] = useState<{ key: string; value: number }[]>([]);
    const [twentySixteenData, setTwentySixteenData] = useState<{ key: string; value: number }[]>([]);
    const [twentyTwentyOneData, setTwentyTwentyOneData] = useState<{ key: string; value: number }[]>([]);

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

    useEffect(() => {
        async function fetchData() {
            // Clear old array values from previous search
            setSuburbDwelling([]);

            // set selected year to 2021 from previous search
            setSelectedYear("2021");

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchDwellingDataByYear(year, `data_${year}`, props.selectedSuburb));

            const newSuburbDwelling: any[] = [];
            const newStateDwelling: any[] = [];
            const newStateAustralia: any[] = [];

            //  Wait for data to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;

                try {
                    // * 2001
                    if (year == "2001") {
                        // >> 5 categories of dwelling structures
                        const separateHouseInSuburbObject = {
                            dwelling: "Separate house",
                            suburb: parseFloat(data[0]["percentage_separate_house_in_suburb"]),
                            Australia: parseFloat(data[0]["percentage_separate_house_in_australia"]),
                        };

                        const semiDetachedInSuburbObject = {
                            dwelling: "Semi-detatched, row or terrace house, townhouse",
                            suburb: parseFloat(data[0]["percentage_semi_detached_in_suburb"]),
                            Australia: parseFloat(data[0]["percentage_semi_detached_in_australia"]),
                        };

                        const flatUnitApartmentInSuburbObject = {
                            dwelling: "Flat, unit or apartment",
                            suburb: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_suburb"]),
                            Australia: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_australia"]),
                        };

                        const otherDwellingInSuburbObject = {
                            dwelling: "Other dwelling",
                            suburb: parseFloat(data[0]["percentage_other_dwelling_in_suburb"]),
                            Australia: parseFloat(data[0]["percentage_other_dwelling_in_australia"]),
                        };

                        const dwellingNotStatedInSuburbObject = {
                            dwelling: "Dwelling type not stated",
                            suburb: parseFloat(data[0]["percentage_dwelling_type_not_stated_in_suburb"]),
                            Australia: parseFloat(data[0]["percentage_dwelling_type_not_stated_in_australia"]),
                        };

                        newSuburbDwelling.push(
                            separateHouseInSuburbObject,
                            semiDetachedInSuburbObject,
                            flatUnitApartmentInSuburbObject,
                            otherDwellingInSuburbObject,
                            dwellingNotStatedInSuburbObject
                        );
                        setSuburbDwelling(newSuburbDwelling);
                    }

                    // * 2006
                    else if (year == "2011") {
                        // >> 5 categories of dwelling structures
                        const separateHouseInSuburbObject = {
                            dwelling: "Separate house",
                            suburb: parseFloat(data[0]["percentage_separate_house_in_suburb"]),
                            Australia: parseFloat(data[0]["percentage_separate_house_in_australia"]),
                        };

                        const semiDetachedInSuburbObject = {
                            dwelling: "Semi-detatched, row or terrace house, townhouse",
                            suburb: parseFloat(data[0]["percentage_semi_detached_in_suburb"]),
                            Australia: parseFloat(data[0]["percentage_semi_detached_in_australia"]),
                        };

                        const flatUnitApartmentInSuburbObject = {
                            dwelling: "Flat, unit or apartment",
                            suburb: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_suburb"]),
                            Australia: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_australia"]),
                        };

                        const otherDwellingInSuburbObject = {
                            dwelling: "Other dwelling",
                            suburb: parseFloat(data[0]["percentage_other_dwelling_in_suburb"]),
                            Australia: parseFloat(data[0]["percentage_other_dwelling_in_australia"]),
                        };

                        const dwellingNotStatedInSuburbObject = {
                            dwelling: "Dwelling type not stated",
                            suburb: parseFloat(data[0]["percentage_dwelling_type_not_stated_in_suburb"]),
                            Australia: parseFloat(data[0]["percentage_dwelling_type_not_stated_in_australia"]),
                        };

                        newSuburbDwelling.push(
                            separateHouseInSuburbObject,
                            semiDetachedInSuburbObject,
                            flatUnitApartmentInSuburbObject,
                            otherDwellingInSuburbObject,
                            dwellingNotStatedInSuburbObject
                        );
                        setSuburbDwelling(newSuburbDwelling);
                    }

                    // * 2011
                    else if (year == "2011") {
                        // >> 4 categories of dwelling structures
                        const separateHouseInSuburbObject = {
                            dwelling: "Separate house",
                            suburb: parseFloat(data[0]["percentage_separate_house_in_suburb"]),
                            state: parseFloat(data[0]["percentage_separate_house_in_state"]),
                            Australia: parseFloat(data[0]["percentage_separate_house_in_australia"]),
                        };

                        const semiDetachedInSuburbObject = {
                            dwelling: "Semi-detatched, row or terrace house, townhouse",
                            suburb: parseFloat(data[0]["percentage_semi_detached_in_suburb"]),
                            state: parseFloat(data[0]["percentage_semi_detached_in_state"]),
                            Australia: parseFloat(data[0]["percentage_semi_detached_in_australia"]),
                        };

                        const flatUnitApartmentInSuburbObject = {
                            dwelling: "Flat, unit or apartment",
                            suburb: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_suburb"]),
                            state: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_state"]),
                            Australia: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_australia"]),
                        };

                        const otherDwellingInSuburbObject = {
                            dwelling: "Other dwelling",
                            suburb: parseFloat(data[0]["percentage_other_dwelling_in_suburb"]),
                            state: parseFloat(data[0]["percentage_other_dwelling_in_state"]),
                            Australia: parseFloat(data[0]["percentage_other_dwelling_in_australia"]),
                        };

                        newSuburbDwelling.push(
                            separateHouseInSuburbObject,
                            semiDetachedInSuburbObject,
                            flatUnitApartmentInSuburbObject,
                            otherDwellingInSuburbObject
                        );
                        setSuburbDwelling(newSuburbDwelling);
                    }

                    // * 2016
                    else if (year == "2016") {
                        // >> 4 categories of dwelling structures
                        const separateHouseInSuburbObject = {
                            dwelling: "Separate house",
                            suburb: parseFloat(data[0]["percentage_separate_house_in_suburb"]),
                            state: parseFloat(data[0]["percentage_separate_house_in_state"]),
                            Australia: parseFloat(data[0]["percentage_separate_house_in_australia"]),
                        };

                        const semiDetachedInSuburbObject = {
                            dwelling: "Semi-detatched, row or terrace house, townhouse",
                            suburb: parseFloat(data[0]["percentage_semi_detached_in_suburb"]),
                            state: parseFloat(data[0]["percentage_semi_detached_in_state"]),
                            Australia: parseFloat(data[0]["percentage_semi_detached_in_australia"]),
                        };

                        const flatUnitApartmentInSuburbObject = {
                            dwelling: "Flat, unit or apartment",
                            suburb: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_suburb"]),
                            state: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_state"]),
                            Australia: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_australia"]),
                        };

                        const otherDwellingInSuburbObject = {
                            dwelling: "Other dwelling",
                            suburb: parseFloat(data[0]["percentage_other_dwelling_in_suburb"]),
                            state: parseFloat(data[0]["percentage_other_dwelling_in_state"]),
                            Australia: parseFloat(data[0]["percentage_other_dwelling_in_australia"]),
                        };

                        newSuburbDwelling.push(
                            separateHouseInSuburbObject,
                            semiDetachedInSuburbObject,
                            flatUnitApartmentInSuburbObject,
                            otherDwellingInSuburbObject
                        );
                        setSuburbDwelling(newSuburbDwelling);
                    }

                    // * 2021
                    else if (year == "2021") {
                        // >> 4 categories of dwelling structures
                        const separateHouseInSuburbObject = {
                            dwelling: "Separate house",
                            suburb: parseFloat(data[0]["percentage_separate_house_in_suburb"]),
                            state: parseFloat(data[0]["percentage_separate_house_in_state"]),
                            Australia: parseFloat(data[0]["percentage_separate_house_in_australia"]),
                        };

                        const semiDetachedInSuburbObject = {
                            dwelling: "Semi-detatched, row or terrace house, townhouse",
                            suburb: parseFloat(data[0]["percentage_semi_detached_in_suburb"]),
                            state: parseFloat(data[0]["percentage_semi_detached_in_state"]),
                            Australia: parseFloat(data[0]["percentage_semi_detached_in_australia"]),
                        };

                        const flatUnitApartmentInSuburbObject = {
                            dwelling: "Flat, unit or apartment",
                            suburb: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_suburb"]),
                            state: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_state"]),
                            Australia: parseFloat(data[0]["percentage_flat_unit_or_apartment_in_australia"]),
                        };

                        const otherDwellingInSuburbObject = {
                            dwelling: "Other dwelling",
                            suburb: parseFloat(data[0]["percentage_other_dwelling_in_suburb"]),
                            state: parseFloat(data[0]["percentage_other_dwelling_in_state"]),
                            Australia: parseFloat(data[0]["percentage_other_dwelling_in_australia"]),
                        };

                        newSuburbDwelling.push(
                            separateHouseInSuburbObject,
                            semiDetachedInSuburbObject,
                            flatUnitApartmentInSuburbObject,
                            otherDwellingInSuburbObject
                        );
                        setSuburbDwelling(newSuburbDwelling);
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);

                    if (year === "2001") {
                        console.log(`2001 data not available for ${selectedSuburb}`);
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
            });
        }

        if (props.selectedSuburb) {
            fetchData();
        } else {
            setSuburbDwelling([]);
        }
    }, [props.selectedSuburb]);

    // * Create Radar Chart objects whenever suburbReligion state changes
    useEffect(() => {
        async function createRadarObjects() {
            // * Create arrays for each year
            const newTwoThousandAndOneData: any = [];
            const newTwoThousandAndSixData: any = [];
            const newTwentyElevenData: any = [];
            const newTwentySixteenData: any = [];
            const newTwentyTwentyOneData: any = [];

            // >> 2001
            for (let i = 0; i < 5; i++) {
                newTwoThousandAndOneData.push(suburbDwelling[i]);
            }
            setTwoThousandAndOneData(newTwoThousandAndOneData);

            // >> 2006
            for (let i = 5; i < 10; i++) {
                newTwoThousandAndSixData.push(suburbDwelling[i]);
            }
            setTwoThousandAndSixData(newTwoThousandAndSixData);

            // >> 2011
            for (let i = 10; i < 14; i++) {
                newTwentyElevenData.push(suburbDwelling[i]);
            }
            setTwentyElevenData(newTwentyElevenData);

            // >> 2016
            for (let i = 14; i < 18; i++) {
                newTwentySixteenData.push(suburbDwelling[i]);
            }
            setTwentySixteenData(newTwentySixteenData);

            // >> 2021
            for (let i = 18; i < 22; i++) {
                newTwentyTwentyOneData.push(suburbDwelling[i]);
            }
            setTwentyTwentyOneData(newTwentyTwentyOneData);
        }

        createRadarObjects();
    }, [suburbDwelling]);

    function handleYearChange(value: string) {
        setSelectedYear(value);
    }

    // ! CONSOLE LOGS
    // console.log(selectedYear);
    // console.log(suburbDwelling);
    // console.log(twoThousandAndOneData);
    // ! CONSOLE LOGS

    return (
        <>
            <div>
                <Select value={selectedYear} onValueChange={handleYearChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="2021" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2016">2016</SelectItem>
                        <SelectItem value="2011">2011</SelectItem>
                        <SelectItem value="2006">2006</SelectItem>
                        <SelectItem value="2001">2001</SelectItem>
                    </SelectContent>
                </Select>

                {selectedYear === "2001" && (
                    <div>
                        <RadarChart outerRadius="80%" width={730} height={450} data={twoThousandAndOneData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="dwelling" />
                            <PolarRadiusAxis angle={30} />
                            <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                            <Radar name="% of Australia" dataKey="Australia" stroke="#A90076" fill="#A90076" fillOpacity={0.28} />
                            <Legend />
                            <Tooltip offset={50} />
                        </RadarChart>
                    </div>
                )}

                {selectedYear === "2006" && (
                    <div>
                        <RadarChart outerRadius="80%" width={730} height={450} data={twoThousandAndSixData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="dwelling" />
                            <PolarRadiusAxis angle={30} />
                            <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                            <Radar name="% of Australia" dataKey="Australia" stroke="#A90076" fill="#A90076" fillOpacity={0.28} />
                            <Legend />
                            <Tooltip offset={50} />
                        </RadarChart>
                    </div>
                )}

                {selectedYear === "2011" && (
                    <div>
                        <RadarChart outerRadius="80%" width={730} height={450} data={twentyElevenData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="dwelling" />
                            <PolarRadiusAxis angle={30} />
                            <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                            <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                            <Radar name="% of Australia" dataKey="Australia" stroke="#A90076" fill="#A90076" fillOpacity={0.28} />
                            <Legend />
                            <Tooltip offset={50} />
                        </RadarChart>
                    </div>
                )}

                {selectedYear === "2016" && (
                    <div>
                        <RadarChart outerRadius="80%" width={730} height={450} data={twentySixteenData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="dwelling" />
                            <PolarRadiusAxis angle={30} />
                            <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                            <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                            <Radar name="% of Australia" dataKey="Australia" stroke="#A90076" fill="#A90076" fillOpacity={0.28} />
                            <Legend />
                            <Tooltip offset={50} />
                        </RadarChart>
                    </div>
                )}

                {selectedYear === "2021" && (
                    <div>
                        <RadarChart outerRadius="80%" width={730} height={450} data={twentyTwentyOneData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="dwelling" />
                            <PolarRadiusAxis angle={30} />
                            <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                            <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                            <Radar name="% of Australia" dataKey="Australia" stroke="#A90076" fill="#A90076" fillOpacity={0.28} />
                            <Legend />
                            <Tooltip offset={50} />
                        </RadarChart>
                    </div>
                )}
            </div>
        </>
    );
}
