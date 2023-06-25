import PocketBase from "pocketbase";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Function to get suburb name from URL
function getSuburbNameFromURL() {
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const stringInURL = pathname.replace("/suburb/", "");
    const suburbInURL = stringInURL.replace(/&/g, " ");
    return suburbInURL;
}

// Async function to complete send GET request to PB to check if suburbInURL exists in PB
async function getSuburbName() {
    const suburbInURL = getSuburbNameFromURL();
    const pb = new PocketBase("http://127.0.0.1:8090");

    // GET request using suburbInURL
    const res = await pb.collection("main_data").getFirstListItem(`suburb_name="${suburbInURL}"`, {
        expand: "relField1,relField2.subRelField",
    });

    return res?.suburb_name;
}

// Async function to get suburb data from PB
async function getSuburbData() {
    const suburbInURL = getSuburbNameFromURL();
    const pb = new PocketBase("http://127.0.0.1:8090");

    // GET request using suburbInURL
    const res = await pb.collection("main_data").getFirstListItem(`suburb_name="${suburbInURL}"`, {
        expand: "relField1,relField2.subRelField",
    });

    return res?.main_data;
}

export default function Demographic() {
    const [suburbName, setSuburbName] = useState("");
    const [suburbData, setSuburbData] = useState<{ [key: string]: { [key: string]: { [key: string]: string } } }>({});

    // 0 - 9 years
    const [underNineInSuburb, setUnderNineInSuburb] = useState("");
    const [underNineInState, setUnderNineInState] = useState("");
    const underNineSuburbWidth = Math.round(Math.floor(((parseFloat(underNineInSuburb) / 100) * 208) / 4) / 4) * 4;
    const underNineStateWidth = Math.round(Math.floor(((parseFloat(underNineInState) / 100) * 208) / 4) / 4) * 4;

    // Teenagers
    const [teenagersInSuburb, setTeenagersInSuburb] = useState("");
    const [teenagersInState, setTeenagersInState] = useState("");
    const teenagersSuburbWidth = Math.round(Math.floor(((parseFloat(teenagersInSuburb) / 100) * 208) / 4) / 4) * 4;
    const teenagersStateWidth = Math.round(Math.floor(((parseFloat(teenagersInSuburb) / 100) * 208) / 4) / 4) * 4;

    // Young Adults
    const [youngAdultsInSuburb, setYoungAdultsInSuburb] = useState("");
    const [youngAdultsInState, setYoungAdultsInState] = useState("");
    const youngAdultsSuburbWidth = Math.round(Math.floor(((parseFloat(youngAdultsInSuburb) / 100) * 208) / 4) / 4) * 4;
    const youngAdultsStateWidth = Math.round(Math.floor(((parseFloat(youngAdultsInSuburb) / 100) * 208) / 4) / 4) * 4;

    // Middle Age
    const [middleAgeInSuburb, setMiddleAgeInSuburb] = useState("");
    const [middleAgeInState, setMiddleAgeInState] = useState("");
    const middleAgeSuburbWidth = Math.round(Math.floor(((parseFloat(middleAgeInSuburb) / 100) * 208) / 4) / 4) * 4;
    const middleAgeStateWidth = Math.round(Math.floor(((parseFloat(middleAgeInSuburb) / 100) * 208) / 4) / 4) * 4;

    // Almost Retirees
    const [almostRetireesInSuburb, setAlmostRetireesInSuburb] = useState("");
    const [almostRetireesInState, setAlmostRetireesInState] = useState("");
    const almostRetireesSuburbWidth = Math.round(Math.floor(((parseFloat(almostRetireesInSuburb) / 100) * 208) / 4) / 4) * 4;
    const almostRetireesStateWidth = Math.round(Math.floor(((parseFloat(almostRetireesInSuburb) / 100) * 208) / 4) / 4) * 4;

    // Retirees
    const [retireesInSuburb, setRetireesInSuburb] = useState("");
    const [retireesInState, setRetireesInState] = useState("");
    const retireesSuburbWidth = Math.round(Math.floor(((parseFloat(retireesInSuburb) / 100) * 208) / 4) / 4) * 4;
    const retireesStateWidth = Math.round(Math.floor(((parseFloat(retireesInSuburb) / 100) * 208) / 4) / 4) * 4;

    useEffect(() => {
        async function fetchSuburbData() {
            try {
                const suburb = await getSuburbName();
                const data = await getSuburbData();
                setSuburbName(suburb);
                setSuburbData(data);

                // 0 - 9 years
                const underNineInSuburb = (
                    parseFloat(data["Age"]["0-4 years"]["% of suburb"]) + parseFloat(data["Age"]["5-9 years"]["% of suburb"])
                ).toFixed(1);
                setUnderNineInSuburb(underNineInSuburb);
                const underNineInState = (
                    parseFloat(data["Age"]["0-4 years"]["% of state"]) + parseFloat(data["Age"]["5-9 years"]["% of state"])
                ).toFixed(1);
                setUnderNineInSuburb(underNineInSuburb);
                setUnderNineInState(underNineInState);

                // Teenagers
                const teenagersInSuburb = (
                    parseFloat(data["Age"]["10-14 years"]["% of suburb"]) + parseFloat(data["Age"]["15-19 years"]["% of suburb"])
                ).toFixed(1);
                const teenagersInState = (
                    parseFloat(data["Age"]["10-14 years"]["% of state"]) + parseFloat(data["Age"]["15-19 years"]["% of state"])
                ).toFixed(1);
                setTeenagersInSuburb(teenagersInSuburb);
                setTeenagersInState(teenagersInState);

                // Young Adults
                const youngAdultsInSuburb = (
                    parseFloat(data["Age"]["20-24 years"]["% of suburb"]) +
                    parseFloat(data["Age"]["25-29 years"]["% of suburb"]) +
                    parseFloat(data["Age"]["30-34 years"]["% of suburb"])
                ).toFixed(1);
                const youngAdultsInState = (
                    parseFloat(data["Age"]["20-24 years"]["% of state"]) +
                    parseFloat(data["Age"]["25-29 years"]["% of state"]) +
                    parseFloat(data["Age"]["30-34 years"]["% of state"])
                ).toFixed(1);
                setYoungAdultsInSuburb(youngAdultsInSuburb);
                setYoungAdultsInState(youngAdultsInState);

                // Middle Age
                const middleAgeInSuburb = (
                    parseFloat(data["Age"]["35-39 years"]["% of suburb"]) +
                    parseFloat(data["Age"]["40-44 years"]["% of suburb"]) +
                    parseFloat(data["Age"]["45-49 years"]["% of suburb"])
                ).toFixed(1);
                const middleAgeInState = (
                    parseFloat(data["Age"]["35-39 years"]["% of state"]) +
                    parseFloat(data["Age"]["40-44 years"]["% of state"]) +
                    parseFloat(data["Age"]["45-49 years"]["% of state"])
                ).toFixed(1);
                setMiddleAgeInSuburb(middleAgeInSuburb);
                setMiddleAgeInState(middleAgeInState);

                // Almost Retirees
                const almostRetireesInSuburb = (
                    parseFloat(data["Age"]["50-54 years"]["% of suburb"]) +
                    parseFloat(data["Age"]["55-59 years"]["% of suburb"]) +
                    parseFloat(data["Age"]["60-64 years"]["% of suburb"])
                ).toFixed(1);
                const almostRetireesInState = (
                    parseFloat(data["Age"]["50-54 years"]["% of state"]) +
                    parseFloat(data["Age"]["55-59 years"]["% of state"]) +
                    parseFloat(data["Age"]["60-64 years"]["% of state"])
                ).toFixed(1);
                setAlmostRetireesInSuburb(almostRetireesInSuburb);
                setAlmostRetireesInState(almostRetireesInState);

                // Retirees
                const retireesInSuburb = (
                    parseFloat(data["Age"]["65-69 years"]["% of suburb"]) +
                    parseFloat(data["Age"]["70-74 years"]["% of suburb"]) +
                    parseFloat(data["Age"]["75-79 years"]["% of suburb"]) +
                    parseFloat(data["Age"]["80-84 years"]["% of suburb"]) +
                    parseFloat(data["Age"]["85 years and over"]["% of suburb"])
                ).toFixed(1);
                const retireesInState = (
                    parseFloat(data["Age"]["65-69 years"]["% of state"]) +
                    parseFloat(data["Age"]["70-74 years"]["% of state"]) +
                    parseFloat(data["Age"]["75-79 years"]["% of state"]) +
                    parseFloat(data["Age"]["80-84 years"]["% of state"]) +
                    parseFloat(data["Age"]["85 years and over"]["% of state"])
                ).toFixed(1);

                setRetireesInSuburb(retireesInSuburb);
                setRetireesInState(retireesInState);
                console.log(`Reitrees in Suburb: ${retireesInSuburb}`);

                console.log("successfully fetched suburb data");
            } catch (error) {
                console.error("Failed to fetch main_data:", error);
            }
        }
        fetchSuburbData();
    }, []);

    // ChartJS.register(ArcElement, Tooltip, Legend);

    // const data = {
    //     labels: ["0 - 9 years", "10 - 19 years", "20 - 34 years", "35 - 49 years", "50 - 64 years", "65+ years"],
    //     datasets: [
    //         {
    //             label: "Number of People",
    //             data: [
    //                 underNineInSuburb,
    //                 teenagersInSuburb,
    //                 youngAdultsInSuburb,
    //                 middleAgeInSuburb,
    //                 almostRetireesInSuburb,
    //                 retireesInSuburb,
    //             ],
    //             backgroundColor: [
    //                 "rgba(255, 99, 132, 0.2)",
    //                 "rgba(54, 162, 235, 0.2)",
    //                 "rgba(255, 206, 86, 0.2)",
    //                 "rgba(75, 192, 192, 0.2)",
    //                 "rgba(153, 102, 255, 0.2)",
    //                 "rgba(255, 159, 64, 0.2)",
    //             ],
    //             borderColor: [
    //                 "rgba(255, 99, 132, 1)",
    //                 "rgba(54, 162, 235, 1)",
    //                 "rgba(255, 206, 86, 1)",
    //                 "rgba(75, 192, 192, 1)",
    //                 "rgba(153, 102, 255, 1)",
    //                 "rgba(255, 159, 64, 1)",
    //             ],
    //             borderWidth: 0.5,
    //         },
    //     ],
    // };

    // return (
    //     <div>
    //         <div className="mb-10">
    //             <p>Median Age: {}</p>
    //             <div className="max-w-md max-h-96">
    //                 <Doughnut
    //                     data={data}
    //                     redraw={false}
    //                     fallbackContent={`Not enough data in this ${suburbName} to populate demographic data.`}
    //                 />
    //                 <p className="mb-4">Based off 2021 data</p>
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <div>
            <div className="flex flex-col items-center border border-black rounded max-w-xl h-96 w-screen m-4 p-4">
                <h1 className="font-bold">Age in {suburbName}</h1>
                <p className="text-xs">Under nine years old</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            underNineSuburbWidth == 0 ? 1 : underNineSuburbWidth
                        } absolute top-0 left-0 h-6`}
                    >
                        {underNineInSuburb}%
                    </div>
                    <div className={`border border-dotted bg-black w-0.5 h-6 relative rounded left-${underNineStateWidth}`}></div>
                </div>
                {/* <p>Bachelor Degrees in state: {bachelorInState}%</p>
            <p>suburb width: {bachelorSuburbWidth}</p>
            <p>state width: {bachelorStateWidth}</p> */}
                <p className="text-xs">Teenagers 10-19 years old</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            teenagersSuburbWidth == 0 ? 1 : teenagersSuburbWidth
                        } absolute top-0 left-0 h-6`}
                    >
                        {teenagersInSuburb}%
                    </div>
                </div>
                <p className="text-xs">Young Adults 20-35 years old</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            youngAdultsSuburbWidth == 0 ? 1 : youngAdultsSuburbWidth
                        } absolute top-0 left-0 h-6`}
                    >
                        {youngAdultsInSuburb}%
                    </div>
                </div>
                <p className="text-xs">Middle Age 35-49 years old</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            middleAgeSuburbWidth == 0 ? 1 : middleAgeSuburbWidth
                        } absolute top-0 left-0 h-6`}
                    >
                        {middleAgeInSuburb}%
                    </div>
                </div>
                <p className="text-xs">Older Adults 50-64 years old</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            almostRetireesSuburbWidth == 0 ? 1 : almostRetireesSuburbWidth
                        } absolute top-0 left-0 h-6`}
                    >
                        {almostRetireesInSuburb}%
                    </div>
                </div>
                <p className="text-xs">Retirees</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            retireesSuburbWidth == 0 ? 1 : retireesSuburbWidth
                        } absolute top-0 left-0 h-6`}
                    >
                        {retireesInSuburb}%
                    </div>
                </div>
            </div>
        </div>
    );
}
