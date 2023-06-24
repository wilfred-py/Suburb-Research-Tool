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
    console.log(`Suburb Name = ${suburbInURL}`);

    // GET request using suburbInURL
    const res = await pb.collection("main_data").getFirstListItem(`suburb_name="${suburbInURL}"`, {
        expand: "relField1,relField2.subRelField",
    });

    console.log(res);
    return res?.suburb_name;
}

// Async function to get suburb data from PB
async function getSuburbData() {
    const suburbInURL = getSuburbNameFromURL();
    const pb = new PocketBase("http://127.0.0.1:8090");
    console.log(`Suburb Name = ${suburbInURL}`);

    // GET request using suburbInURL
    const res = await pb.collection("main_data").getFirstListItem(`suburb_name="${suburbInURL}"`, {
        expand: "relField1,relField2.subRelField",
    });

    console.log(res);
    return res?.main_data;
}

export default function Education() {
    const [suburbName, setSuburbName] = useState("");
    const [suburbData, setSuburbData] = useState<{ [key: string]: { [key: string]: { [key: string]: string } } }>({});

    // Bachelor Degree data
    const [bachelorInSuburb, setBachelorInSuburb] = useState("");
    const [bachelorInState, setBachelorInState] = useState("");
    const bachelorSuburbWidth = Math.round(Math.floor(((parseFloat(bachelorInSuburb) / 100) * 208) / 4) / 4) * 4;
    const bachelorStateWidth = Math.round(Math.floor(((parseFloat(bachelorInState) / 100) * 208) / 4) / 4) * 4;

    // Diploma data
    const [diplomaInSuburb, setDiplomaInSuburb] = useState("");
    const [diplomaInState, setDiplomaInState] = useState("");
    const diplomaSuburbWidth = Math.round(Math.floor(((parseFloat(diplomaInSuburb) / 100) * 208) / 4) / 4) * 4;
    const diplomaStateWidth = Math.round(Math.floor(((parseFloat(diplomaInSuburb) / 100) * 208) / 4) / 4) * 4;

    // Certificate data
    const [certificatesInSuburb, setCertificatesInSuburb] = useState("");
    const [certificatesInState, setCertificatesInState] = useState("");
    const certificatesSuburbWidth = Math.round(Math.floor(((parseFloat(certificatesInSuburb) / 100) * 208) / 4) / 4) * 4;
    const certificatesStateWidth = Math.round(Math.floor(((parseFloat(certificatesInSuburb) / 100) * 208) / 4) / 4) * 4;

    // Highschool data
    const [highschoolInSuburb, setHighschoolInSuburb] = useState("");
    const [highschoolInState, setHighschoolInState] = useState("");
    const highschoolSuburbWidth = Math.round(Math.floor(((parseFloat(highschoolInSuburb) / 100) * 208) / 4) / 4) * 4;
    const highschoolStateWidth = Math.round(Math.floor(((parseFloat(highschoolInSuburb) / 100) * 208) / 4) / 4) * 4;

    // No education
    const [noEducationInSuburb, setNoEducationInSuburb] = useState("");
    const [noEducationInState, setNoEducationInState] = useState("");
    const noEducationSuburbWidth = Math.round(Math.floor(((parseFloat(noEducationInSuburb) / 100) * 208) / 4) / 4) * 4;
    const noEducationStateWidth = Math.round(Math.floor(((parseFloat(noEducationInSuburb) / 100) * 208) / 4) / 4) * 4;

    // Not stated
    const [notStatedInSuburb, setNotStatedInSuburb] = useState("");
    const [notStatedInState, setNotStatedInState] = useState("");
    const notStatedSuburbWidth = Math.round(Math.floor(((parseFloat(noEducationInSuburb) / 100) * 208) / 4) / 4) * 4;
    const notStatedStateWidth = Math.round(Math.floor(((parseFloat(noEducationInSuburb) / 100) * 208) / 4) / 4) * 4;

    useEffect(() => {
        async function fetchSuburbData() {
            try {
                const suburb = await getSuburbName();
                const data = await getSuburbData();
                setSuburbName(suburb);
                setSuburbData(data);
                console.log(data);
                // Bachelor
                setBachelorInSuburb(data["Level of highest educational attainment"]["Bachelor Degree level and above"]["% of suburb"]);
                setBachelorInState(data["Level of highest educational attainment"]["Bachelor Degree level and above"]["% of state"]);

                // Diploma
                setDiplomaInSuburb(data["Level of highest educational attainment"]["Advanced Diploma and Diploma level"]["% of suburb"]);
                setDiplomaInState(data["Level of highest educational attainment"]["Advanced Diploma and Diploma level"]["% of state"]);

                // Certificate
                const certificatesInSuburb = (
                    parseFloat(data["Level of highest educational attainment"]["Certificate level IV"]["% of suburb"]) +
                    parseFloat(data["Level of highest educational attainment"]["Certificate level III"]["% of suburb"]) +
                    parseFloat(data["Level of highest educational attainment"]["Certificate level II"]["% of suburb"]) +
                    parseFloat(data["Level of highest educational attainment"]["Certificate level I"]["% of suburb"])
                ).toFixed(1);
                setCertificatesInSuburb(certificatesInSuburb);

                // Highschool
                setHighschoolInSuburb(data["Level of highest educational attainment"]["Year 12"]["% of suburb"]);
                setHighschoolInState(data["Level of highest educational attainment"]["Year 12"]["% of state"]);

                // No Education
                setNoEducationInSuburb(data["Level of highest educational attainment"]["No educational attainment"]["% of suburb"]);
                setNoEducationInState(data["Level of highest educational attainment"]["No educational attainment"]["% of state"]);

                // Not stated
                setNotStatedInSuburb(data["Level of highest educational attainment"]["Not stated"]["% of suburb"]);
                setNotStatedInState(data["Level of highest educational attainment"]["Not stated"]["% of state"]);

                console.log("successfully fetched suburb data");
            } catch (error) {
                console.error("Failed to fetch main_data:", error);
            }
        }
        fetchSuburbData();
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center border border-black rounded max-w-xl h-96 w-screen m-4 p-4">
                <h1 className="font-bold">Highest level of education attained</h1>
                <p className="text-xs">Bachelor Degree or Higher</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            bachelorSuburbWidth == 0 ? 1 : bachelorSuburbWidth
                        } absolute top-0 left-0 h-6`}
                    >
                        {bachelorInSuburb}%
                    </div>
                    <div className={`border border-dotted bg-black w-0.5 h-6 relative rounded left-${bachelorStateWidth}`}></div>
                </div>
                {/* <p>Bachelor Degrees in state: {bachelorInState}%</p>
            <p>suburb width: {bachelorSuburbWidth}</p>
            <p>state width: {bachelorStateWidth}</p> */}
                <p className="text-xs">Diplomas</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            diplomaSuburbWidth == 0 ? 1 : diplomaSuburbWidth
                        } absolute top-0 left-0 h-6`}
                    >
                        {diplomaInSuburb}%
                    </div>
                </div>
                <p className="text-xs">Highschool</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            highschoolSuburbWidth == 0 ? 1 : highschoolSuburbWidth
                        } absolute top-0 left-0 h-6`}
                    >
                        {highschoolInSuburb}%
                    </div>
                </div>
                <p className="text-xs">Certificates Level I - IV</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            certificatesSuburbWidth == 0 ? 1 : certificatesSuburbWidth
                        } absolute top-0 left-0 h-6`}
                    >
                        {certificatesInSuburb}%
                    </div>
                </div>
                <p className="text-xs">No Education</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            noEducationSuburbWidth == 0 ? 1 : noEducationSuburbWidth
                        } absolute top-0 left-0 h-6`}
                    >
                        {noEducationInSuburb}%
                    </div>
                </div>
                <p className="text-xs">No Stated</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div
                        className={`bg-customYellow rounded w-${
                            notStatedSuburbWidth == 0 ? 1 : notStatedSuburbWidth
                        } absolute top-0 left-0 h-6`}
                    >
                        {notStatedInSuburb}%
                    </div>
                </div>
            </div>
        </div>
    );
}
