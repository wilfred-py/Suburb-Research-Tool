import PocketBase from "pocketbase";
import { useState, useEffect } from "react";

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

export default function Employment() {
    const [suburbName, setSuburbName] = useState("");
    const [suburbData, setSuburbData] = useState<{ [key: string]: { [key: string]: { [key: string]: string } } }>({});

    // Participation Rate
    const [participationInSuburb, setParticipationInSuburb] = useState("");
    const [participationInState, setParticipationInState] = useState("");
    const participationSuburbWidth = Math.round(Math.floor(((parseFloat(participationInSuburb) / 100) * 208) / 4) / 4) * 4;
    const participationStateWidth = Math.round(Math.floor(((parseFloat(participationInState) / 100) * 208) / 4) / 4) * 4;

    useEffect(() => {
        async function fetchSuburbData() {
            try {
                const suburb = await getSuburbName();
                const data = await getSuburbData();
                setSuburbName(suburb);
                setSuburbData(data);

                // Participation Rate
                setParticipationInSuburb(data["Participation in the labour force"]["In the labour force"]["% of suburb"]);
                setParticipationInState(data["Participation in the labour force"]["In the labour force"]["% of suburb"]);

                console.log("successfully fetched employment data");
            } catch (error) {
                console.error("Failed to fetch main_data:", error);
            }
        }
        fetchSuburbData();
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center border border-black rounded max-w-xl h-96 w-screen m-4 p-4">
                <h1 className="font-bold">Participation Rate</h1>
                <p className="text-xs">% of {suburbName} in the labour force</p>
                <p>{participationSuburbWidth}</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            participationSuburbWidth == 0 ? 1 : participationSuburbWidth
                        } absolute top-0 h-6`}
                    >
                        {participationInSuburb}%
                    </div>
                    <div className={`border border-dotted bg-black w-0.5 h-6 relative rounded left-${participationStateWidth}`}></div>
                </div>
            </div>
        </div>
    );
}
