import Loading from "@/app/(dashboard)/dashboard/loading";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface PopulationProps {
    selectedSuburb: string | null;
}

export default function Population(props: PopulationProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [suburbPopulation, setSuburbPopulation] = useState<(number | null)[]>([]);
    const [statePopulation, setStatePopulation] = useState<(number | null)[]>([]);
    const [australiaPopulation, setAustraliaPopulation] = useState([18769249, 19855288, 21507717, 23401892, 26473055]);

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);

    const [insufficientSuburbData, setInsufficientSuburbData] = useState(false);

    // loading state management
    const [isLoading, setIsLoading] = useState(false);

    // State to manage minimum and maximum data points for y-axis
    const [dataMin, setDataMin] = useState(0);
    const [dataMax, setDataMax] = useState(0);

    const supabase = createClientComponentClient();

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

    // * Function that fetches data for a specific year
    async function fetchEmploymentDataByYear(year: string, tableName: string, selectedSuburb: string | null) {
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

    // * Function that checks if there is insufficient data in suburb to populate on line graphs
    async function checkIfInsufficientData(arr: (number | null)[]) {
        let numberCount = 0;
        let nullCount = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === null) {
                nullCount++;
            } else if (typeof arr[i] === "number") {
                numberCount++;
            }
        }

        // If only one year of data available or no data available at all
        if ((numberCount === 1 && nullCount === 4) || nullCount === 5) {
            console.log("insufficient data");
            setInsufficientSuburbData(true);
        }

        return (numberCount === 1 && nullCount === 4) || nullCount === 5;
    }

    useEffect(() => {
        async function fetchData() {
            // Clear population from previous search
            setSuburbPopulation([null, null, null, null, null]);
            setStatePopulation([null, null, null, null, null]);

            // console.log(`selectedSuburb: ${props.selectedSuburb}`);
            const years = ["2001", "2006", "2011", "2016", "2021"];
            const dataPromises = years.map((year) => fetchEmploymentDataByYear(year, `data_${year}`, props.selectedSuburb));

            // Reset insufficient useState to false
            setInsufficientSuburbData(false);

            const newSuburbPopulation = [...suburbPopulation];

            //  Wait for data to be fetched
            const dataResults = await Promise.all(dataPromises);

            // Filter out any null results (errors)
            const validData = dataResults.filter((result): result is { year: string; data: any[] } => result !== null);

            // Process the valid data and update state accordingly
            validData.forEach((result) => {
                const { year, data } = result;
                setIsLoading(true);

                try {
                    // * 2001
                    if (year == "2001") {
                        const suburbPopulation = parseInt(data[0]["people"]);

                        if (suburbPopulation) {
                            newSuburbPopulation[0] = suburbPopulation;
                            setSuburbPopulation(newSuburbPopulation);
                        } else if (!suburbPopulation) {
                            newSuburbPopulation[0] = null;
                            setSuburbPopulation(newSuburbPopulation);
                        }
                    }
                    // * 2006
                    else if (year == "2006") {
                        const suburbPopulation = parseInt(data[0]["people"]);

                        if (suburbPopulation) {
                            newSuburbPopulation[1] = suburbPopulation;
                            setSuburbPopulation(newSuburbPopulation);
                        } else if (!suburbPopulation) {
                            newSuburbPopulation[1] = null;
                            setSuburbPopulation(newSuburbPopulation);
                        }
                    }

                    // * 2011
                    else if (year == "2011") {
                        const suburbPopulation = parseInt(data[0]["people"]);

                        if (suburbPopulation) {
                            newSuburbPopulation[2] = suburbPopulation;
                            setSuburbPopulation(newSuburbPopulation);
                        } else if (!suburbPopulation) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbPopulation[2] = null;
                            setSuburbPopulation(newSuburbPopulation);
                        }
                    }

                    // * 2016
                    else if (year == "2016") {
                        const suburbPopulation = parseInt(data[0]["people"]);

                        if (suburbPopulation) {
                            newSuburbPopulation[3] = suburbPopulation;
                            setSuburbPopulation(newSuburbPopulation);
                        } else if (!suburbPopulation) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbPopulation[3] = null;
                            setSuburbPopulation(newSuburbPopulation);
                        }
                    }

                    // * 2021
                    else if (year == "2021") {
                        const malesInSuburb = parseInt(data[0]["male_in_suburb"]);
                        const femalesInSuburb = parseInt(data[0]["female_in_suburb"]);

                        const suburbPopulation = malesInSuburb + femalesInSuburb;

                        if (suburbPopulation) {
                            newSuburbPopulation[4] = suburbPopulation;
                            setSuburbPopulation(newSuburbPopulation);
                        } else if (!suburbPopulation) {
                            // ! If data is not available, remove element from array so line graph does not display it
                            newSuburbPopulation[4] = null;
                            setSuburbPopulation(newSuburbPopulation);
                        }
                    }
                    console.log("test");
                } catch (error) {
                    console.error(`Error processing data for ${year}`, error);
                    if (year === "2001") {
                        console.log(`${year} data not available for ${selectedSuburb}`);
                        newSuburbPopulation[0] = null;
                        setSuburbPopulation(newSuburbPopulation);
                    } else if (year === "2006") {
                        console.log(`2006 data not available for ${selectedSuburb}`);
                        newSuburbPopulation[1] = null;
                        setSuburbPopulation(newSuburbPopulation);
                    } else if (year === "2011") {
                        console.log(`2011 data not available for ${selectedSuburb}`);
                        newSuburbPopulation[2] = null;
                        setSuburbPopulation(newSuburbPopulation);
                    } else if (year === "2016") {
                        console.log(`2016 data not available for ${selectedSuburb}`);
                        newSuburbPopulation[3] = null;
                        setSuburbPopulation(newSuburbPopulation);
                    } else if (year === "2021") {
                        console.log(`2021 data not available for ${selectedSuburb}`);
                        newSuburbPopulation[4] = null;
                        setSuburbPopulation(newSuburbPopulation);

                        // Check if there is insufficient data
                        checkIfInsufficientData(suburbPopulation);
                    }
                }
                setIsLoading(false);
            });
        }

        if (props.selectedSuburb) {
            fetchData();
        }
    }, [props.selectedSuburb]);

    // * useEffect hook to determine min and max for y-axis
    useEffect(() => {
        async function minMax(suburbPopulation: (number | null)[]) {
            // Define minimum and maximum variables
            let dataMin: number = 999999;
            let dataMax: number = 0;

            // Remove null values from combinedList
            const cleanedList = suburbPopulation.filter((value) => value !== null) as number[];
            // console.log(cleanedList);

            // Iterate over items in arrays and determine lowest number for dataMin and highest number for dataMax
            for (let i = 0; i < cleanedList.length; i++) {
                if (cleanedList[i] !== null && cleanedList[i] < dataMin) {
                    dataMin = cleanedList[i];
                }
                if (cleanedList[i] !== null && cleanedList[i] > dataMax) {
                    dataMax = cleanedList[i];
                }
            }

            // Add buffer to dataMin
            // If 4 digits, +/- 100
            // If 5 digits, +/- 3000
            if (dataMin.toString().length <= 4) {
                dataMin -= 100;
            } else {
                dataMin -= 1000;
            }

            // Add buffer to dataMax
            // If 4 digits, +/- 100
            // If 5 digits, +/- 3000
            if (dataMax.toString().length <= 4) {
                dataMax += 100;
            } else {
                dataMax += 1000;
            }

            setDataMin(dataMin);
            setDataMax(dataMax);
        }

        minMax(suburbPopulation);
    }, [suburbPopulation]);

    // console.log(dataMin);
    // console.log(dataMax);

    // * <Recharts />
    const data = [
        { name: "2001", Suburb: suburbPopulation[0] },
        { name: "2006", Suburb: suburbPopulation[1] },
        { name: "2011", Suburb: suburbPopulation[2] },
        { name: "2016", Suburb: suburbPopulation[3] },
        { name: "2021", Suburb: suburbPopulation[4] },
    ];

    const renderLineChart = (
        <div className="mobile-s:max-mobile-l:w-[260px] mobile-s:max-mobile-l:h-[440px] sm:max-md:h-[280px] md:max-lg:h-[240px] lg:h-[280px] mobile-s:max-sm:mt-10 sm:max-md:mt-12 md:mt-6">
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 0, right: 30, bottom: 60, left: 5 }}>
                    <Line type="natural" dataKey="Suburb" stroke="#219C90" strokeWidth={2.4} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name">
                        <Label value="year" position="bottom" />
                    </XAxis>
                    <YAxis tickCount={6} domain={[dataMin, dataMax]} padding={{ bottom: 30 }}>
                        <Label value="" position="insideLeft" />
                    </YAxis>
                    <Tooltip offset={50} cursor={false} />
                    <Legend
                        height={70}
                        layout="horizontal"
                        verticalAlign="top"
                        align="center"
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    />
                    <CartesianGrid y={40}></CartesianGrid>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    const insufficientDataLineChart = (
        <div className="mobile-s:max-mobile-l:w-[260px] mobile-s:max-mobile-l:h-[440px] mobile-l:max-md:w-[360px] sm:max-md:h-[420px] md:max-md-l:w-[300px] md-l:h-[440px] md-l:w-[360px] mobile-s:max-sm:mt-10 sm:max-md:mt-12 md:mt-6">
            <ResponsiveContainer>
                <LineChart data={data} margin={{ right: 30, bottom: 30, left: 30 }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name">
                        <Label value="year" position="bottom" />
                    </XAxis>
                    <YAxis tickCount={10} domain={[35, 75]} padding={{ bottom: 30 }}>
                        <Label value="number of people" position="insideLeft" />
                    </YAxis>
                    <Tooltip offset={50} cursor={false} />
                    <Legend
                        height={70}
                        layout="horizontal"
                        verticalAlign="top"
                        align="center"
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    />
                    <CartesianGrid y={40}></CartesianGrid>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    // console.log(`isLoading: ${isLoading}`);
    // console.log(suburbPopulation);

    return (
        <>
            <div className="flex flex-col justify-center">
                <h1 className="my-4 text-lg text-center font-bold select-none">Population</h1>
                <div className="mx-auto -mt-4">
                    {/* {insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">Insufficient data in suburb to populate population trends.</span>
                            {insufficientDataLineChart}
                        </div>
                    ) : (
                        // * <Recharts />
                        <div className="select-none">{renderLineChart}</div>
                    )}
 */}
                    {isLoading ? (
                        <Loading />
                    ) : insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">Insufficient data in suburb to populate population trends.</span>
                            {insufficientDataLineChart}
                        </div>
                    ) : (
                        <div className="select-none">{renderLineChart}</div>
                    )}
                </div>
            </div>
        </>
    );
}
