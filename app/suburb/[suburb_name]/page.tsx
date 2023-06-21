"use client";

import main_data_Abbotsford from "../../../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../../../data/summary_data/summary_data_Abbotsford.json";
import Employment from "@/components/Employment";
import Income from "@/components/Income";
import AddSuburbButton from "@/components/AddSuburbButton";
import Education from "@/components/Education";
import Demographic from "@/components/Demographic";
import Family from "@/components/FamilyComposition";
import Ancestry from "@/components/Ancestry";
import Religion from "@/components/Religion";
import Dwellings from "@/components/Dwellings";
import Bedrooms from "@/components/Bedrooms";
import PocketBase from "pocketbase";
import { useState, useEffect } from "react";

// Function to get suburb name from URL
// If suburb is more than one word, spaces are replaced with "&" between words.
// Retrieve string in URL after /suburb/ and then replace "&" with " "
function getSuburbNameFromURL() {
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const stringInURL = pathname.replace("/suburb/", "");
    const suburbInURL = stringInURL.replace(/&/g, " ");
    return suburbInURL;
}

// Pocketbase GET request; async function to look up suburb data based on suburb name in searchQuery
async function getSuburbName() {
    const suburbInURL = getSuburbNameFromURL();
    const pb = new PocketBase("http://127.0.0.1:8090");
    console.log(`Suburb Name = ${suburbInURL}`);

    // GET request using suburbInURL
    const res = await pb.collection("summary_data").getFirstListItem(`suburb_name="${suburbInURL}"`, {
        expand: "relField1,relField2.subRelField",
    });

    console.log(res);
    return res?.suburb_name;
}

async function getSuburbData() {
    const suburbInURL = getSuburbNameFromURL();
    const pb = new PocketBase("http://127.0.0.1:8090");
    console.log(`Suburb Name = ${suburbInURL}`);

    // GET request using suburbInURL
    const res = await pb.collection("summary_data").getFirstListItem(`suburb_name="${suburbInURL}"`, {
        expand: "relField1,relField2.subRelField",
    });

    console.log(res);
    return res?.summary_data;
}

export default function SuburbData() {
    const [suburbName, setSuburbName] = useState("");
    const [suburbData, setSuburbData] = useState([]);

    useEffect(() => {
        async function fetchSuburbData() {
            try {
                const suburb = await getSuburbName();
                const data = await getSuburbData();
                setSuburbName(suburb);
                console.log("Successfully fetched data");
                setSuburbData(data);
                console.log("Successfully fetched data");
            } catch (error) {
                console.error("Failed to fetch suburb data:", error);
            }
        }
        fetchSuburbData();
    }, []);

    return (
        <div>
            <div>Suburb name: {suburbName}</div>
            <div>
                Suburb Data:
                <ul>
                    {Object.entries(suburbData).map(([key, value]) => (
                        <li key={key}>
                            {key}: {value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// export default async function SuburbData() {
//     try {
//         const suburbData = await getData();
//         console.log(`Suburb Data: ${suburbData}`);
//         // const suburbName = suburbData["items"][0]["suburb_name"];
//         suburbData.map((data) => {
//             return <div>{data}</div>;
//         });
//         return <div>Hello</div>;
//     } catch (error) {
//         console.error("Failed to fetch suburb data:", error);
//         return <div>Error fetching suburb data</div>;
//     }
// }
//     // Name of Suburb

//     // Name of State

//     return (
//         <div>
//             <h1>Hello World</h1>
//         </div>
//     );
// }

// {
/* <AddSuburbButton />

<div className="flex flex-wrap justify-center h-screen w-screen">
    <div className="max-w-xl h-screen w-screen">
        <p className="text-base font-bold">{suburbName}</p>
        <ul className="text-xs">
            <li>{/* People in {suburbName}: {suburbSummaryData.Abbotsford.People} */
// }
//             </li>
//         </ul>

//         <section id="education" className="rounded border border-black m-4 p-4">
//             <Education />
//         </section>

//         <section id="income-and-work" className="rounded border border-black m-4 p-4">
//             <Employment />
//             <Income />
//         </section>

//         <section id="demographic" className="rounded border border-black m-4 p-4">
//             <Demographic />

//             <div className="">
//                 <p className="text-xl">Religious affiliation of people living in {suburbName}</p>
//                 <Religion />
//             </div>

//             <div className="">
//                 <p className="text-xl">Ancestry of people living in {suburbName}</p>
//                 <Ancestry />
//             </div>
//         </section>

//         <section id="family" className="rounded border border-black m-4 p-4">
//             <p className="text-xl">Family composition of households in {suburbName}</p>
//             <Family />
//         </section>

//         <section id="family" className="rounded border border-black m-4 p-4">
//             <div>
//                 <p className="text-xl">Housing in {suburbName}</p>
//                 <Dwellings />
//             </div>
//             <div>
//                 <p className="text-xl">Number of bedrooms in {suburbName} housing</p>
//                 <Bedrooms />
//             </div>
//         </section>
//     </div>
// </div> */}
