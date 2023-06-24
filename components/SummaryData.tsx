"use client";

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

// Async function to complete send GET request to PB to check if suburbInURL exists in PB
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

export default function SummaryData() {
    const [suburbName, setSuburbName] = useState("");
    const [suburbData, setSuburbData] = useState<{ [key: string]: any }>([]);

    useEffect(() => {
        async function fetchSuburbData() {
            try {
                const suburb = await getSuburbName();
                const data = await getSuburbData();
                setSuburbName(suburb);
                console.log("Successfully fetched summary_data name");
                setSuburbData(data);
                console.log("Successfully fetched summary_data");
            } catch (error) {
                console.error("Failed to fetch summary_data:", error);
            }
        }
        fetchSuburbData();
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center border border-black rounded max-w-xl h-96 w-screen m-4">
                <div className="bg-hoverYellow w-full text-center">
                    <p className="text-4xl font-bold mb-4 bg-hoverYellow">{suburbName}</p>
                </div>
                <section id="people">
                    <div className="flex flex-row">
                        <p className="font-bold mr-2">Population: </p>
                        {suburbData["People"]} people live in {suburbName}
                    </div>
                    <div className="flex flex-row">
                        <p className="font-bold mr-2">Median age: </p> {suburbData["Median age"]}
                    </div>
                    <div className="flex flex-row">
                        <p className="font-bold mr-2">Male: </p> {suburbData["Male"]}
                    </div>
                    <div className="flex flex-row">
                        <p className="font-bold mr-2">Female: </p> {suburbData["Female"]}
                    </div>
                </section>
                <section id="owners">
                    <div></div>
                </section>
                <section id="rent"></section>
            </div>
        </div>
    );
}
