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

export default function SummaryData() {
    console.log("HELLO WORKING");
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
