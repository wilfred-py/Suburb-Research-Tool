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

export default function Ancestry() {
    const [suburbName, setSuburbName] = useState("");
    const [suburbData, setSuburbData] = useState<{ [key: string]: { [key: string]: { [key: string]: string } } }>({});
    const [stateName, setStateName] = useState("");
    const [ancestryKeys, setAncestryKeys] = useState<string[]>([]);
    const [ancestryData, setAncestryData] = useState();

    useEffect(() => {
        async function fetchSuburbData() {
            try {
                // Get suburb name and suburb data
                const suburb = await getSuburbName();
                const data = await getSuburbData();
                setSuburbName(suburb);
                setSuburbData(data);

                // State Name
                const firstObject = data["Age"]["0-4 years"];
                const keys = Object.keys(firstObject);
                const stateName = keys[keys.length - 1];
                setStateName(stateName);

                // Keys of ["Ancestry, top responses"]
                const ancestryKeys = Object.keys(data["Ancestry, top responses"]);
                setAncestryKeys(ancestryKeys);
                console.log(ancestryKeys);
                // (5) ['Anglican', 'Buddhism', 'Catholic', 'No Ancestry, so described', 'Not stated']
                console.log("successfully fetched ancestry data");
            } catch (error) {
                console.error("Failed to fetch main_data:", error);
            }
        }
        fetchSuburbData();
    }, []);

    return (
        <div className="flex flex-col items-center border border-black rounded max-w-xl h-112 w-screen m-4 p-4">
            {ancestryKeys.map((key, index) => {
                // suburb and state %'s
                const suburbAncestryValue = suburbData["Ancestry, top responses"][key]["% of suburb"];
                const stateAncestryValue = suburbData["Ancestry, top responses"][key]["% of state"];

                // suburb and state width values for Tailwind CSS
                const suburbAncestryWidth = Math.round(Math.floor(((parseInt(suburbAncestryValue) / 100) * 208) / 4) / 4) * 4;
                const stateAncestryWidth = Math.round(Math.floor(((parseInt(stateAncestryValue) / 100) * 208) / 4) / 4) * 4;

                return (
                    <div>
                        <div key={index}>
                            <span className="text-xs">{key}</span>

                            <p>Ancestry Width {suburbAncestryWidth}</p>
                            <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                                <div
                                    className={`bg-customYellow rounded w-${
                                        suburbAncestryWidth == 0 ? 1.5 : suburbAncestryWidth
                                    } absolute left-0 h-6`}
                                >
                                    <span className="">{suburbAncestryValue}%</span>
                                </div>
                                {/* <div
                                            className={`border border-dotted bg-black w-0.5 h-6 absolute rounded left-${stateAncestryWidth}`}
                                        >
                                            {stateAncestryWidth}
                                        </div> */}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
