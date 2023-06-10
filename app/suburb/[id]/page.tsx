import main_data_Abbotsford from "../../../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../../../data/summary_data/summary_data_Abbotsford.json";
import Employment from "@/components/Employment";
import Income from "@/components/Income";
import AddSuburbButton from "@/components/AddSuburbButton";
import Education from "@/components/Education";
import Demographic from "@/components/Demographic";
import Family from "@/components/FamilyComposition";
import Ancestry from "@/components/Ancestry";
import Religion from "@/components/Religion";
import Dwellings from "@/components/Dwellings";
import Bedrooms from "@/components/Bedrooms";

export default async function SuburbData() {
    const suburb = main_data_Abbotsford;
    const suburbSummaryData = summary_data_Abbotsford;

    const suburbKeys = Object.keys(suburb["People"]["Male"]);

    // Name of Suburb
    const suburbName = suburbKeys[0].toString();

    // Name of State
    const stateName = suburbKeys[2];

    return (
        <div>
            <AddSuburbButton />
            <div className="flex flex-wrap">
                <section className="rounded border border-black m-4 p-4 max-w-xl">
                    <p className="text-base font-bold">{suburbName}</p>
                    <ul className="text-xs">
                        <li>
                            People in {suburbName}: {suburbSummaryData.Abbotsford.People}{" "}
                        </li>
                    </ul>
                    <div className="flex flex-wrap flex-col">
                        <section id="education">
                            <Education />
                        </section>

                        <section id="income-and-work">
                            <Employment />
                            <Income />
                        </section>

                        <section id="demographic" className="rounded border border-black m-4 p-4">
                            <Demographic />

                            <div className="">
                                <p className="text-xl">Ancestry of people living in {suburbName}</p>
                                <Ancestry />
                            </div>

                            <div className="">
                                <p className="text-xl">Religious Affiliation of people living in {suburbName}</p>
                                <Religion />
                            </div>
                        </section>

                        <section id="family" className="rounded border border-black m-4 p-4">
                            <p className="text-xl">Family composition of households in {suburbName}</p>
                            <Family />
                        </section>

                        <section id="family" className="rounded border border-black m-4 p-4">
                            <div>
                                <p className="text-xl">Housing in {suburbName}</p>
                                <Dwellings />
                            </div>
                            <div>
                                <p className="text-xl">Number of bedrooms in {suburbName} housing</p>
                                <Bedrooms />
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    );
}
