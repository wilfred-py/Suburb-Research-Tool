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
import SummaryData from "@/components/SummaryData";

export default async function Suburb() {
    return (
        <div>
            <SummaryData />;
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
