import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { PureComponent, useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadarTooltip, RadarTooltipTrigger, RadarTooltipContent, RadarTooltipProvider } from "@/components/ui/tooltip-radar";

interface ReligionChartProps {
    selectedSuburb: string | null;
}

export default function ReligionChart(props: ReligionChartProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [suburbReligion, setSuburbReligion] = useState<{ key: string; value: number }[]>([]);
    const [selectedYear, setSelectedYear] = useState<string | undefined>("2021");

    const [twoThousandAndOneData, setTwoThousandAndOneData] = useState<{ key: string; value: number }[]>([]);
    const [twoThousandAndSixData, setTwoThousandAndSixData] = useState<{ key: string; value: number }[]>([]);
    const [twentyElevenData, setTwentyElevenData] = useState<{ key: string; value: number }[]>([]);
    const [twentySixteenData, setTwentySixteenData] = useState<{ key: string; value: number }[]>([]);
    const [twentyTwentyOneData, setTwentyTwentyOneData] = useState<{ key: string; value: number }[]>([]);

    // use state to manage whether 2001 data exists or not
    const [twoThousandAndOneDataExist, setTwoThousandAndOneDataExist] = useState(false);

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
    async function fetchReligionDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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
            setSuburbReligion([]);

            // set selected year to 2021 from previous search
            setSelectedYear("2021");

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchReligionDataByYear(year, `data_${year}`, props.selectedSuburb));

            const newSuburbReligion: any[] = [];
            const newStateReligion: any[] = [];

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
                        const religionData = data[0]["cultural_data"]["Religious affiliation, top responses"];
                        // console.log(religionData);

                        Object.entries(religionData).forEach(([key, value]) => {
                            // console.log(`Key: ${key}, Value: ${value}`);

                            // >> Suburb Religion
                            const suburbReligionObject = {
                                religion: key,
                                suburb: parseFloat(religionData[key]["% of suburb"]),
                                state: parseFloat(religionData[key]["% of state"]),
                            };
                            newSuburbReligion.push(suburbReligionObject);

                            // >> State Religion
                            // >> does not exist for 2001
                        });

                        setSuburbReligion(newSuburbReligion);
                        setTwoThousandAndOneDataExist(true);
                    }

                    // * 2006
                    else if (year == "2006") {
                        const religionData = data[0]["cultural_data"]["Religious affiliation, top responses"];
                        // console.log(religionData);

                        Object.entries(religionData).forEach(([key, value]) => {
                            // console.log(`Key: ${key}, Value: ${value}`);

                            // >> Suburb Religion
                            const suburbReligionObject = {
                                religion: key,
                                suburb: parseFloat(religionData[key]["% of suburb"]),
                                state: parseFloat(religionData[key]["% of state"]),
                            };
                            newSuburbReligion.push(suburbReligionObject);

                            // >> State Religion
                            // >> does not exist for 2001
                        });

                        setSuburbReligion(newSuburbReligion);
                    }

                    // * 2011
                    else if (year == "2011") {
                        const religionData = data[0]["cultural_data"]["Religious affiliation, top responses"];
                        // console.log(religionData);

                        Object.entries(religionData).forEach(([key, value]) => {
                            // console.log(`Key: ${key}, Value: ${value}`);

                            // >> Suburb Religion
                            const suburbReligionObject = {
                                religion: key,
                                suburb: parseFloat(religionData[key]["% of suburb"]),
                                state: parseFloat(religionData[key]["% of state"]),
                            };
                            newSuburbReligion.push(suburbReligionObject);

                            // >> State Religion
                            const stateReligionObject = { key: key, value: parseFloat(religionData[key]["% of state"]) };
                            newStateReligion.push(stateReligionObject);
                        });

                        setSuburbReligion(newSuburbReligion);
                    }

                    // * 2016
                    else if (year == "2016") {
                        const religionData = data[0]["cultural_data"]["Religious affiliation, top responses"];
                        // console.log(religionData);

                        Object.entries(religionData).forEach(([key, value]) => {
                            // console.log(`Key: ${key}, Value: ${value}`);

                            // >> Suburb Religion
                            const suburbReligionObject = {
                                religion: key,
                                suburb: parseFloat(religionData[key]["% of suburb"]),
                                state: parseFloat(religionData[key]["% of state"]),
                            };
                            newSuburbReligion.push(suburbReligionObject);

                            // >> State Religion
                            const stateReligionObject = { key: key, value: parseFloat(religionData[key]["% of state"]) };
                            newStateReligion.push(stateReligionObject);
                        });

                        setSuburbReligion(newSuburbReligion);
                    }

                    // * 2021
                    else if (year == "2021") {
                        const religionData = data[0]["cultural_data"]["Religious affiliation, top responses"];
                        console.log(religionData);

                        Object.entries(religionData).forEach(([key, value]) => {
                            // console.log(`Key: ${key}, Value: ${value}`);

                            // >> Suburb Religion
                            const suburbReligionObject = {
                                religion: key,
                                suburb: parseFloat(religionData[key]["% of suburb"]),
                                state: parseFloat(religionData[key]["% of state"]),
                            };
                            newSuburbReligion.push(suburbReligionObject);

                            // >> State Religion
                            const stateReligionObject = { key: key, value: parseFloat(religionData[key]["% of state"]) };
                            newStateReligion.push(stateReligionObject);
                        });

                        setSuburbReligion(newSuburbReligion);
                    }
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);

                    if (year === "2001") {
                        console.log(`2001 data not available for ${selectedSuburb}`);
                        setTwoThousandAndOneDataExist(false);
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
            setSuburbReligion([]);
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

            // * If only 20 data points, then data for one year must not be available. If the data is not available for that suburb, it must mean the suburb didn't exist.
            // >> For there to be only 20 data points must mean 2001 is the year when the suburb didn't exist.

            if (suburbReligion.length == 20) {
                // >> 2006
                for (let i = 0; i < 5; i++) {
                    newTwoThousandAndSixData.push(suburbReligion[i]);
                }
                setTwoThousandAndSixData(newTwoThousandAndSixData);

                // >> 2011
                for (let i = 5; i < 10; i++) {
                    newTwentyElevenData.push(suburbReligion[i]);
                }
                setTwentyElevenData(newTwentyElevenData);

                // >> 2016
                for (let i = 10; i < 15; i++) {
                    newTwentySixteenData.push(suburbReligion[i]);
                }
                setTwentySixteenData(newTwentySixteenData);

                // >> 2021
                for (let i = 15; i < 20; i++) {
                    newTwentyTwentyOneData.push(suburbReligion[i]);
                }
                setTwentyTwentyOneData(newTwentyTwentyOneData);
            }
            // * If 25 data points, then data for all 5 years exists
            else if (suburbReligion.length == 25) {
                // >> 2001
                for (let i = 0; i < 5; i++) {
                    newTwoThousandAndOneData.push(suburbReligion[i]);
                }
                setTwoThousandAndOneData(newTwoThousandAndOneData);

                // >> 2006
                for (let i = 5; i < 10; i++) {
                    newTwoThousandAndSixData.push(suburbReligion[i]);
                }
                setTwoThousandAndSixData(newTwoThousandAndSixData);

                // >> 2011
                for (let i = 10; i < 15; i++) {
                    newTwentyElevenData.push(suburbReligion[i]);
                }
                setTwentyElevenData(newTwentyElevenData);

                // >> 2016
                for (let i = 15; i < 20; i++) {
                    newTwentySixteenData.push(suburbReligion[i]);
                }
                setTwentySixteenData(newTwentySixteenData);

                // >> 2021
                for (let i = 20; i < 25; i++) {
                    newTwentyTwentyOneData.push(suburbReligion[i]);
                }
                setTwentyTwentyOneData(newTwentyTwentyOneData);
            }
        }
        createRadarObjects();
    }, [suburbReligion]);

    function handleYearChange(value: string) {
        setSelectedYear(value);
    }

    // ! CONSOLE LOGS
    // console.log(suburbReligion);
    // console.log(selectedYear);
    // ! CONSOLE LOGS

    return (
        <>
            <div className="w-full h-full select-none">
                {/* Heading and Tooltip */}
                <div className="flex flex-col place-items-center w-full my-4">
                    <div className="flex flex-row justify-center">
                        <h1 className="text-2xl font-bold mx-auto mr-2">Religion</h1>

                        {/* Tooltip with info on chart */}
                        <RadarTooltipProvider delayDuration={350}>
                            <RadarTooltip>
                                <RadarTooltipTrigger>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                        />
                                    </svg>
                                </RadarTooltipTrigger>
                                <RadarTooltipContent
                                    side="bottom"
                                    className="mobile-s:max-mobile-l:max-w-[260px] mobile-l:max-md:max-w-[360px] md:max-w-[400px] max-h-30"
                                >
                                    <h3 className="break-words">
                                        Note: all religions will not sum to 100% as these are the top responses from census respondents
                                    </h3>
                                </RadarTooltipContent>
                            </RadarTooltip>
                        </RadarTooltipProvider>
                    </div>
                </div>

                {/* Year selector */}
                <div className="flex flex-col items-center lg:items-start mobile-l:ml-6 pt-6">
                    <Select value={selectedYear} onValueChange={handleYearChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="2021" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2021">2021</SelectItem>
                            <SelectItem value="2016">2016</SelectItem>
                            <SelectItem value="2011">2011</SelectItem>
                            <SelectItem value="2006">2006</SelectItem>
                            {twoThousandAndOneDataExist ? <SelectItem value="2001">2001</SelectItem> : ""}
                        </SelectContent>
                    </Select>
                </div>

                {selectedYear === "2001" && (
                    <div className="w-full mobile-s:max-sm:h-[240px] sm:max-md:h-[280px] md:max-lg:h-[240px] lg:h-[280px] mt-8 sm:mt-12 select-none pb-10">
                        <ResponsiveContainer>
                            <RadarChart outerRadius="80%" data={twoThousandAndOneData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="religion" width="50" />
                                <PolarRadiusAxis angle={30} />
                                <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                                <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                                <Legend />
                                <Tooltip offset={50} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {selectedYear === "2006" && (
                    <div className="w-full mobile-s:max-sm:h-[240px] sm:max-md:h-[280px] md:max-lg:h-[240px] lg:h-[280px] mt-8 sm:mt-12 select-none pb-10">
                        <ResponsiveContainer>
                            <RadarChart outerRadius="80%" data={twoThousandAndSixData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="religion" width="50" />
                                <PolarRadiusAxis angle={30} />
                                <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                                <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                                <Legend />
                                <Tooltip offset={50} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {selectedYear === "2011" && (
                    <div className="w-full mobile-s:max-sm:h-[240px] sm:max-md:h-[280px] md:max-lg:h-[240px] lg:h-[280px] mt-8 sm:mt-12 select-none pb-10">
                        <ResponsiveContainer>
                            <RadarChart outerRadius="80%" data={twentyElevenData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="religion" width="50" />
                                <PolarRadiusAxis angle={30} />
                                <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                                <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                                <Legend />
                                <Tooltip offset={50} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {selectedYear === "2016" && (
                    <div className="w-full mobile-s:max-sm:h-[240px] sm:max-md:h-[280px] md:max-lg:h-[240px] lg:h-[280px] mt-8 sm:mt-12 select-none pb-10">
                        <ResponsiveContainer>
                            <RadarChart outerRadius="80%" data={twentySixteenData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="religion" width="50" />
                                <PolarRadiusAxis angle={30} />
                                <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                                <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                                <Legend />
                                <Tooltip offset={50} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {selectedYear === "2021" && (
                    <div className="w-full mobile-s:max-sm:h-[240px] sm:max-md:h-[280px] md:max-lg:h-[240px] lg:h-[280px] mt-8 select-none pb-10">
                        <ResponsiveContainer>
                            <RadarChart outerRadius="80%" data={twentyTwentyOneData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="religion" width="50" />
                                <PolarRadiusAxis angle={30} />
                                <Radar name="% of suburb" dataKey="suburb" stroke="#219C90" fill="#219C90" fillOpacity={0.28} />
                                <Radar name="% of state" dataKey="state" stroke="#068FFF" fill="#068FFF" fillOpacity={0.28} />
                                <Legend />
                                <Tooltip offset={50} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </>
    );
}
