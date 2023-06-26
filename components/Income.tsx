import PocketBase from "pocketbase";
import { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
    console.log(`Suburb Name = ${suburbInURL}`);

    // GET request using suburbInURL
    const res = await pb.collection("summary_data").getFirstListItem(`suburb_name="${suburbInURL}"`, {
        expand: "relField1,relField2.subRelField",
    });

    console.log(res);
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

export default function Income() {
    const [suburbName, setSuburbName] = useState("");
    const [stateName, setStateName] = useState("");
    const [suburbData, setSuburbData] = useState<{ [key: string]: { [key: string]: { [key: string]: string } } }>({});

    // Personal Income
    const [personalIncomeInSuburb, setPersonalIncomeInSuburb] = useState(0);
    const [personalIncomeInState, setPersonalIncomeInState] = useState(0);
    const [personalIncomeInAustralia, setPersonalIncomeInAustralia] = useState(0);
    const personalIncomeSuburbWidth = Math.round(Math.floor(((personalIncomeInSuburb / 100) * 208) / 4) / 4) * 4;
    const personalIncomeStateWidth = Math.round(Math.floor(((personalIncomeInState / 100) * 208) / 4) / 4) * 4;
    const personalIncomeAustraliaWidth = Math.round(Math.floor(((personalIncomeInAustralia / 100) * 208) / 4) / 4) * 4;

    // Household Income
    const [householdIncomeInSuburb, sethouseholdIncomeInSuburb] = useState(0);
    const [householdIncomeInState, sethouseholdIncomeInState] = useState(0);
    const [householdIncomeInAustralia, sethouseholdIncomeInAustralia] = useState(0);
    const householdIncomeSuburbWidth = Math.round(Math.floor(((householdIncomeInSuburb / 100) * 208) / 4) / 4) * 4;
    const householdIncomeStateWidth = Math.round(Math.floor(((householdIncomeInState / 100) * 208) / 4) / 4) * 4;
    const householdIncomeAustraliaWidth = Math.round(Math.floor(((householdIncomeInAustralia / 100) * 208) / 4) / 4) * 4;

    useEffect(() => {
        async function fetchSuburbData() {
            try {
                const suburb = await getSuburbName();
                const data = await getSuburbData();
                setSuburbName(suburb);
                setSuburbData(data);

                // State Name
                const firstObject = data["Age"]["0-4 years"];
                const keys = Object.keys(firstObject);
                const stateName = keys[keys.length - 1];
                setStateName(stateName);

                console.log("successfully fetched income data");

                // Can't parse income data because value has $ sign

                // Personal Income
                setPersonalIncomeInSuburb(parseFloat(data["Median weekly incomes (a)"]["Personal (b)"][suburb].replace(/[$,]/g, "")));
                setPersonalIncomeInState(parseFloat(data["Median weekly incomes (a)"]["Personal (b)"][stateName].replace(/[$,]/g, "")));
                setPersonalIncomeInAustralia(
                    parseFloat(data["Median weekly incomes (a)"]["Personal (b)"]["Australia"].replace(/[$,]/g, ""))
                );

                // Household Income
                sethouseholdIncomeInSuburb(parseFloat(data["Median weekly incomes (a)"]["Household (d)"][suburb].replace(/[$,]/g, "")));
                sethouseholdIncomeInState(parseFloat(data["Median weekly incomes (a)"]["Household (d)"][stateName].replace(/[$,]/g, "")));
                sethouseholdIncomeInAustralia(
                    parseFloat(data["Median weekly incomes (a)"]["Household (d)"]["Australia"].replace(/[$,]/g, ""))
                );
            } catch (error) {
                console.error("Failed to fetch main_data:", error);
            }
        }
        fetchSuburbData();
    }, []);

    // Chart.js
    const labels = [2016, 2021];

    const personalMedianIncomeData = {
        labels,
        datasets: [
            {
                label: suburbName,
                data: labels.map(() => personalIncomeInSuburb),
                backgroundColor: "rgba(245, 195, 71, 0.5)",
            },
            {
                label: stateName,
                data: labels.map(() => personalIncomeInState),
                backgroundColor: "rgba(0, 203, 165, 0.5)",
            },
            {
                label: "Australia",
                data: labels.map(() => personalIncomeInAustralia),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    const householdMedianIncomeData = {
        labels,
        datasets: [
            {
                label: suburbName,
                data: labels.map(() => householdIncomeInSuburb),
                backgroundColor: "rgba(245, 195, 71, 0.5)",
            },
            {
                label: stateName,
                data: labels.map(() => householdIncomeInState),
                backgroundColor: "rgba(0, 203, 165, 0.5)",
            },
            {
                label: "Australia",
                data: labels.map(() => householdIncomeInAustralia),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    const personalMedianIncomeOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "right" as const,
            },
            title: {
                display: true,
                text: "Personal Median Weekly Income",
            },
        },
    };

    const householdMedianIncomeOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "right" as const,
            },
            title: {
                display: true,
                text: "Household Median Weekly Income",
            },
        },
    };

    return (
        <div>
            <div className="m-4">
                <Bar options={personalMedianIncomeOptions} data={personalMedianIncomeData} className="max-w-lg max-h-[360px]" />
                <Bar options={householdMedianIncomeOptions} data={householdMedianIncomeData} className="max-w-lg max-h-[360px]" />
            </div>
        </div>
    );
}
