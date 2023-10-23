import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

interface PopulationProps {
    selectedSuburb: string | null;
}

export default function Population(props: PopulationProps) {
    const [selectedSuburb, setSelectedSuburb] = useState<string | null>("");
    const [selectedState, setSelectedState] = useState<string | null>("");

    const [suburbPopulation, setSuburbPopulation] = useState<(number | null)[]>([null, null, null, null, null]);
    const [statePopulation, setStatePopulation] = useState<(number | null)[]>([null, null, null, null, null]);
    const [australiaPopulation, setAustraliaPopulation] = useState([18769249, 19855288, 21507717, 23401892, 26473055]);

    const [deconstructedSuburb, setDeconstructedSuburb] = useState<string | null>(null);
    const [deconstructedState, setDeconstructedState] = useState<string | null>(null);

    const [insufficientSuburbData, setInsufficientSuburbData] = useState(false);

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

        setDeconstructedSuburb(suburbName);
        setDeconstructedState(stateName);

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
            // Clear suburbHouseholdIncome from previous search
            setSuburbPopulation([null, null, null, null, null]);
            setStatePopulation([null, null, null, null, null]);

            console.log(`selectedSuburb: ${props.selectedSuburb}`);
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

                try {
                    // * 2001
                    if (year == "2001") {
                        const suburbPopulation = data[0]["people"];

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
                        const suburbPopulation = data[0]["people"];

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
                        const suburbPopulation = data[0]["people"];

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
                        const suburbPopulation = data[0]["people"];

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
                        const malesInSuburb = data[0]["male_in_suburb"];
                        const femalesInSuburb = data[0]["female_in_suburb"];

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
            });
        }

        if (props.selectedSuburb) {
            fetchData();
        }
    }, [props.selectedSuburb]);

    // * <Recharts />
    const data = [
        { name: "2001", Suburb: suburbPopulation[0] },
        { name: "2006", Suburb: suburbPopulation[1] },
        { name: "2011", Suburb: suburbPopulation[2] },
        { name: "2016", Suburb: suburbPopulation[3] },
        { name: "2021", Suburb: suburbPopulation[4] },
    ];

    const renderLineChart = (
        <LineChart width={600} height={400} data={data} margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
            <Line type="natural" dataKey="Suburb" stroke="#219C90" strokeWidth={2.4} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name">
                <Label value="year" position="bottom" />
            </XAxis>
            <YAxis tickCount={6} domain={[0, 15000]}>
                <Label value="" position="insideLeft" />
            </YAxis>
            <Tooltip offset={50} cursor={false} />
            <Legend verticalAlign="top" height={36} align="center" />
            <CartesianGrid y={40}></CartesianGrid>
        </LineChart>
    );

    const insufficientDataLineChart = (
        <LineChart width={600} height={400} data={data} margin={{ right: 30, bottom: 30, left: 30 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name">
                <Label value="year" position="bottom" />
            </XAxis>
            <YAxis tickCount={10} domain={[35, 75]}>
                <Label value="" position="insideLeft" />
            </YAxis>
            <Tooltip offset={50} cursor={false} />
            <Legend verticalAlign="top" height={36} align="center" />
            <CartesianGrid y={40}></CartesianGrid>
        </LineChart>
    );

    return (
        <>
            <div className="flex flex-col justify-center">
                <h1 className="mt-4 mb-4 text-lg text-center font-bold">Population</h1>
                <div className="mx-auto -mt-4">
                    {insufficientSuburbData ? (
                        <div className="flex flex-col justify-center">
                            <span className="mt-2 text-center italic">Insufficient data in suburb to populate population trends.</span>
                            {insufficientDataLineChart}
                        </div>
                    ) : (
                        // * <Recharts />
                        <div>{renderLineChart}</div>
                    )}
                </div>
            </div>
        </>
    );
}
