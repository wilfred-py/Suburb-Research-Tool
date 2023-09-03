"use client";

import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";

interface IncomeDataItem {
    income_data: any;
}

// const { data, error } = await supabase.from("books").select(
//     `
//     title,
//     description:  metadata->description,
//     price:        metadata->price,
//     low_age:      metadata->ages->0,
//     high_age:     metadata->ages->1

//     `
// );

export default function Test() {
    const [incomeData, setIncomeData] = useState<IncomeDataItem[]>([]); // Initialize state with an empty array
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function fetchIncomeData() {
            try {
                const { data, error } = await supabase.from("income_and_work").select("*").range(0, 3);
                console.log(data);
                console.log(error);
                setIncomeData(data || []);

                if (error) {
                    console.error("Error fetching data:", error);
                } else {
                    const formattedData = data?.map((item: IncomeDataItem) => {
                        const incomeData = item?.income_data;
                        const formattedIncomeData: any = {};

                        // Key examples:
                        // 1. "Employment status"
                        // 2. "Employment, hours worked"
                        // 3. "Median weekly incomes (a)"
                        for (const key in incomeData) {
                            if (incomeData?.hasOwnProperty(key)) {
                                const innerData = incomeData[key];
                                // innerData example:
                                // {
                                //     "Unemployed": {
                                //       "NSW": "2,136,610",
                                //       "Australia": "7,095,103",
                                //       "% of state": "55.2",
                                //       "Abbotsbury": "1,110",
                                //       "% of suburb": "53.0",
                                //       "% of country": "55.9"
                                //     },
                                //     "Worked full-time": {
                                //       "NSW": "2,136,610",
                                //       "Australia": "7,095,103",
                                //       "% of state": "55.2",
                                //       "Abbotsbury": "1,110",
                                //       "% of suburb": "53.0",
                                //       "% of country": "55.9"
                                //     },
                                //     "Worked part-time": {
                                //       "NSW": "2,136,610",
                                //       "Australia": "7,095,103",
                                //       "% of state": "55.2",
                                //       "Abbotsbury": "1,110",
                                //       "% of suburb": "53.0",
                                //       "% of country": "55.9"
                                //     },
                                //     "Away from work (a)": {
                                //       "NSW": "2,136,610",
                                //       "Australia": "7,095,103",
                                //       "% of state": "55.2",
                                //       "Abbotsbury": "1,110",
                                //       "% of suburb": "53.0",
                                //       "% of country": "55.9"
                                //     }
                                //   }

                                const formattedInnerData: any = {};
                                for (const innerKey in innerData) {
                                    if (innerData?.hasOwnProperty(innerKey)) {
                                        formattedInnerData[innerKey] = innerData[innerKey];
                                        // formattedInnerData example
                                        // {
                                        //   "NSW": "2,136,610",
                                        //   "Australia": "7,095,103",
                                        //   "% of state": "55.2",
                                        //   "Abbotsbury": "1,110",
                                        //   "% of suburb": "53.0",
                                        //   "% of country": "55.9"
                                        // }
                                    }
                                }
                                formattedIncomeData[key] = formattedInnerData;
                            }
                        }
                        return {
                            incomeData: formattedIncomeData,
                        };
                    });
                }
                {
                    /* Closing curly brace for try */
                }
            } catch (error) {
                console.error("Data fetch unsuccessful", error);
            }
        }
        fetchIncomeData();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="max-w-full min-h-screen bg-Shakespeare">
                <h1 className="text-6xl">TEST PAGE LUL</h1>
                <div>
                    {incomeData ? (
                        <div>
                            {incomeData[1]?.income_data && (
                                <div>
                                    <h2>Income Data</h2>
                                    <p>
                                        Unemployment (% of australia):{" "}
                                        {incomeData[1].income_data["Employment status"]["Unemployed"]["Australia"]}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             // Fetch data from the "cultural diversity" table
    //             const { data, error } = await supabase.from("cultural_diversity").select("*");

    //             console.log(data);
    //             console.log(error);

    //             setTestData(data || []);
    //             if (error) {
    //                 console.error("Error fetching data:", error);
    //             } else {
    //                 // Extract and format the data dynamically
    //                 const formattedData = data?.map((item: CulturalDataItem) => {
    //                     const culturalData = item.cultural_data;
    //                     const formattedCulturalData: any = {};

    //                     for (const key in culturalData) {
    //                         if (culturalData.hasOwnProperty(key)) {
    //                             const innerData = culturalData[key];
    //                             const formattedInnerData: any = {};

    //                             for (const innerKey in innerData) {
    //                                 if (innerData.hasOwnProperty(innerKey)) {
    //                                     formattedInnerData[innerKey] = innerData[innerKey];
    //                                 }
    //                             }

    //                             formattedCulturalData[key] = formattedInnerData;
    //                         }
    //                     }

    //                     return {
    //                         cultural_data: formattedCulturalData,
    //                     };
    //                 });

    //                 setTestData(formattedData || []);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     }

    //     fetchData();
    // }, []);
    // return (
    //     <div>
    //         {testData ? (
    //             <div>
    //                 {/* Check if testData exists and if the "Country of birth, top responses" key is present */}
    //                 {testData[0]?.cultural_data && (
    //                     <div>
    //                         <h2>Country of Birth - England</h2>
    //                         <p>Victoria: {testData[0].cultural_data["Country of birth, top responses"]["England"]["Victoria"]}</p>
    //                         {/* Add additional data fields here */}
    //                     </div>
    //                 )}
    //             </div>
    //         ) : (
    //             <p>Loading...</p>
    //         )}
    //     </div>
    // );
}
