import main_data_Abbotsford from "../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../data/summary_data/summary_data_Abbotsford.json";

const summaryData = summary_data_Abbotsford;
const mainData = main_data_Abbotsford;
const keys = Object.keys(mainData["People"]["Male"]);
// Name of Suburb
const suburbName = keys[0].toString();

// Name of State
const stateName = keys[2];

// Diploma
const diplomaInSuburb = parseFloat(
    mainData["Level of highest educational attainment"]["Advanced Diploma and Diploma level"]["% of suburb"]
);

const diplomaInState = parseFloat(mainData["Level of highest educational attainment"]["Advanced Diploma and Diploma level"]["% of suburb"]);

// Diploma Width
const diplomaWidth = Math.round(Math.floor(((diplomaInSuburb / 100) * 208) / 4) / 4) * 4;

// Certificate
const certificateOneInSuburb = parseFloat(mainData["Level of highest educational attainment"]["Certificate level I"]["% of suburb"]);
const certificateTwoInSuburb = parseFloat(mainData["Level of highest educational attainment"]["Certificate level II"]["% of suburb"]);
const certificateThreeInSuburb = parseFloat(mainData["Level of highest educational attainment"]["Certificate level III"]["% of suburb"]);
const certificateFourInSuburb = parseFloat(mainData["Level of highest educational attainment"]["Certificate level IV"]["% of suburb"]);

const certificatesInSuburb = certificateOneInSuburb + certificateTwoInSuburb + certificateThreeInSuburb + certificateFourInSuburb;

const roundedCertificatesInSubrub = certificatesInSuburb.toFixed(1);

// Certificate Width
const certificatesWidth = Math.round(Math.floor(((certificatesInSuburb / 100) * 208) / 4) / 4) * 4;

// High School
const yearTwelveInSuburb = parseFloat(mainData["Level of highest educational attainment"]["Year 12"]["% of suburb"]);

// High School Width
const highSchoolWidth = Math.round(Math.floor(((yearTwelveInSuburb / 100) * 208) / 4) / 4) * 4;

// No Education
const noEducationInSuburb = parseFloat(mainData["Level of highest educational attainment"]["No educational attainment"]["% of suburb"]);

// No Education Width
const noEducationWidth = Math.round(Math.floor(((noEducationInSuburb / 100) * 208) / 4) / 4) * 4;

// Not stated
const notStatedInSuburb = parseFloat(mainData["Level of highest educational attainment"]["Not stated"]["% of suburb"]);

// Not Stated Width
const notStatedWidth = Math.round(Math.floor(((notStatedInSuburb / 100) * 208) / 4) / 4) * 4;

const bachelorInState = parseFloat(mainData["Level of highest educational attainment"]["Bachelor Degree level and above"]["% of state"]);

// Bachelor Width
const bachelorWidth = Math.round(Math.floor(((bachelorInSuburb / 100) * 208) / 4) / 4) * 4;

<div className="">
    <h1>Education</h1>
    <p>Highest level of education attained</p>

    <p className="text-xs">Bachelor Degree or Higher</p>
    <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
        <div className={`bg-customYellow rounded w-${bachelorWidth == 0 ? 1.5 : bachelorWidth} absolute top-0 left-0 h-6`}>
            <span>{bachelorInSuburb}%</span>
        </div>
    </div>

    <p className="text-xs">Advanced Diploma and Diploma Level</p>
    <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
        <div className={`bg-customYellow rounded w-${diplomaWidth == 0 ? 1.5 : diplomaWidth} absolute top-0 left-0 h-6`}>
            <span>{diplomaInSuburb}%</span>
        </div>
    </div>

    <p className="text-xs">Certificate Level I - IV</p>
    <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
        <div className={`bg-customYellow rounded w-${certificatesWidth == 0 ? 1.5 : certificatesWidth} absolute top-0 left-0 h-6`}>
            <span>{roundedCertificatesInSubrub}%</span>
        </div>
    </div>

    <p className="text-xs">High School</p>
    <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
        <div className={`bg-customYellow rounded w-${highSchoolWidth == 0 ? 1.5 : highSchoolWidth} absolute top-0 left-0 h-6`}>
            <span>{yearTwelveInSuburb}%</span>
        </div>
    </div>

    <p className="text-xs">No Education</p>
    <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
        <div className={`bg-customYellow rounded w-${noEducationWidth == 0 ? 1.5 : noEducationWidth} absolute top-0 left-0 h-6`}>
            <span>{noEducationInSuburb}%</span>
        </div>
    </div>

    <p className="text-xs">Not Stated</p>
    <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
        <div className={`bg-customYellow rounded w-${notStatedWidth == 0 ? 1.5 : notStatedWidth} absolute top-0 left-0 h-6`}>
            <span>{notStatedInSuburb}%</span>
        </div>
    </div>
</div>;
