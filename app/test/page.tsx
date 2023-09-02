"use client";

import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface CulturalDataItem {
    cultural_data: any;
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
    const [testData, setTestData] = useState<CulturalDataItem[]>([]); // Initialize state with an empty array
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch data from the "cultural diversity" table
                const { data, error } = await supabase.from("cultural_diversity").select("*");

                console.log(data);
                console.log(error);

                setTestData(data || []);
                if (error) {
                    console.error("Error fetching data:", error);
                } else {
                    // Extract and format the data dynamically
                    const formattedData = data?.map((item: CulturalDataItem) => {
                        const culturalData = item.cultural_data;
                        const formattedCulturalData: any = {};

                        for (const key in culturalData) {
                            if (culturalData.hasOwnProperty(key)) {
                                const innerData = culturalData[key];
                                const formattedInnerData: any = {};

                                for (const innerKey in innerData) {
                                    if (innerData.hasOwnProperty(innerKey)) {
                                        formattedInnerData[innerKey] = innerData[innerKey];
                                    }
                                }

                                formattedCulturalData[key] = formattedInnerData;
                            }
                        }

                        return {
                            cultural_data: formattedCulturalData,
                        };
                    });

                    setTestData(formattedData || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);
    return (
        <div>
            {testData ? (
                <div>
                    {/* Check if testData exists and if the "Country of birth, top responses" key is present */}
                    {testData[0]?.cultural_data && (
                        <div>
                            <h2>Country of Birth - England</h2>
                            <p>Victoria: {testData[0].cultural_data["Country of birth, top responses"]["England"]["Victoria"]}</p>
                            {/* Add additional data fields here */}
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
