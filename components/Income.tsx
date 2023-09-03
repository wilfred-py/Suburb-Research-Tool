"use client";

import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface IncomeDataItem {
    income_data: any;
}

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
            } catch (error) {
                console.error("Data fetch unsuccessful", error);
            }
        }
        fetchIncomeData();
    }, []);

    return (
        <div>
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
}
