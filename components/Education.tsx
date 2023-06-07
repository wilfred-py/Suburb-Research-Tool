import main_data_Abbotsford from "../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../data/summary_data/summary_data_Abbotsford.json";

export default function Education() {
    const summaryData = summary_data_Abbotsford;
    const mainData = main_data_Abbotsford;
    const keys = Object.keys(mainData["People"]["Male"]);
    // Name of Suburb
    const suburbName = keys[0].toString();

    // Name of State
    const stateName = keys[2];

    // Bachelor
    const bachelorInSuburb =
        mainData["Level of highest educational attainment"][
            "Bachelor Degree level and above"
        ]["% of suburb"];

    const bachelorInState =
        mainData["Level of highest educational attainment"][
            "Bachelor Degree level and above"
        ]["% of state"];

    // Diploma
    const diplomaInSuburb =
        mainData["Level of highest educational attainment"][
            "Advanced Diploma and Diploma level"
        ]["% of suburb"];

    const diplomaInState =
        mainData["Level of highest educational attainment"][
            "Advanced Diploma and Diploma level"
        ]["% of suburb"];

    // Certificate
    const certificateOneInSuburb =
        mainData["Level of highest educational attainment"][
            "Certificate level I"
        ]["% of suburb"];
    const certificateTwoInSuburb =
        mainData["Level of highest educational attainment"][
            "Certificate level II"
        ]["% of suburb"];
    const certificateThreeInSuburb =
        mainData["Level of highest educational attainment"][
            "Certificate level III"
        ]["% of suburb"];
    const certificateFourInSuburb =
        mainData["Level of highest educational attainment"][
            "Certificate level IV"
        ]["% of suburb"];

    const certificatesInSuburb =
        parseFloat(certificateOneInSuburb) +
        parseFloat(certificateTwoInSuburb) +
        parseFloat(certificateThreeInSuburb) +
        parseFloat(certificateFourInSuburb);

    const roundedCertificatesInSubrub = certificatesInSuburb.toFixed(1);

    // High School
    const yearTwelveInSuburb =
        mainData["Level of highest educational attainment"]["Year 12"][
            "% of suburb"
        ];

    // No education
    const noEducationInSuburb =
        mainData["Level of highest educational attainment"][
            "No educational attainment"
        ]["% of suburb"];

    // Not stated
    const notStatedInSuburb =
        mainData["Level of highest educational attainment"]["Not stated"][
            "% of suburb"
        ];

    return (
        <div className="rounded border border-black w-112 m-4">
            <h1>Education</h1>
            <p>Highest level of education attained</p>

            <p className="text-xs">Bachelor Degree or Higher</p>
            <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                <div
                    className={`bg-customYellow rounded w-24 absolute top-0 left-0 h-6`}
                >
                    <span>{bachelorInSuburb}%</span>
                </div>
            </div>

            <p className="text-xs">Advanced Diploma and Diploma Level</p>
            <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                <div
                    className={`bg-customYellow rounded w-24 absolute top-0 left-0 h-6`}
                >
                    <span>{bachelorInState}%</span>
                </div>
            </div>
            <p className="text-xs">Certificate Level I - IV</p>
            <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                <div
                    className={`bg-customYellow rounded w-24 absolute top-0 left-0 h-6`}
                >
                    <span>{roundedCertificatesInSubrub}%</span>
                </div>
            </div>
            <p className="text-xs">High School</p>
            <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                <div
                    className={`bg-customYellow rounded w-24 absolute top-0 left-0 h-6`}
                >
                    <span>{yearTwelveInSuburb}%</span>
                </div>
            </div>
            <p className="text-xs">No Education</p>
            <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                <div
                    className={`bg-customYellow rounded w-24 absolute top-0 left-0 h-6`}
                >
                    <span>{noEducationInSuburb}%</span>
                </div>
            </div>
            <p className="text-xs">Not Stated</p>
            <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                <div
                    className={`bg-customYellow rounded w-24 absolute top-0 left-0 h-6`}
                >
                    <span>{notStatedInSuburb}%</span>
                </div>
            </div>
        </div>
    );
}
