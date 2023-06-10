import main_data_Abbotsford from "../../../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../../../data/summary_data/summary_data_Abbotsford.json";
import Employment from "@/components/Employment";
import Income from "@/components/Income";
import AddSuburbButton from "@/components/AddSuburbButton";
import Education from "@/components/Education";
import Demographic from "@/components/Demographic";
import Family from "@/components/FamilyComposition";

export default async function SuburbData() {
    const mainData = main_data_Abbotsford;
    const summaryData = summary_data_Abbotsford;

    const keys = Object.keys(mainData["People"]["Male"]);

    // Name of Suburb
    const suburbName = keys[0].toString();

    // Name of State
    const stateName = keys[2];

    return (
        <div>
            <AddSuburbButton />
            <p className="text-base font-bold">{suburbName}</p>
            <ul className="text-xs">
                <li>
                    People in {suburbName}: {summaryData.Abbotsford.People}{" "}
                </li>
            </ul>
            <div className="flex flex-wrap">
                <section id="education">
                    <Education />
                </section>

                <section id="income-and-work">
                    <Employment />
                    <Income />
                </section>

                <section id="demographic" className="rounded border border-black m-4 p-4">
                    <Demographic />
                </section>

                <section id="family" className="rounded border border-black m-4 p-4">
                    <p className="text-xl">Family composition of households in {suburbName}</p>
                    <Family />
                </section>
            </div>
        </div>
    );
}
