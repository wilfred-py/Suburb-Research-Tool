import main_data_Abbotsford from "../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../data/summary_data/summary_data_Abbotsford.json";

export default function Employment() {
    const summaryData = summary_data_Abbotsford;
    const mainData = main_data_Abbotsford;
    const keys = Object.keys(mainData["People"]["Male"]);

    // Name of Suburb
    const suburbName = keys[0];

    // Name of State
    const stateName = keys[2];

    // Labour participation rate within the suburb
    const suburbParticipationRate = parseFloat(mainData["Participation in the labour force"]["In the labour force"]["% of suburb"]);

    // Labour participation rate within the state
    const stateParticipationRate = parseFloat(mainData["Participation in the labour force"]["In the labour force"]["% of state"]);

    // width of div in pixels (w-52 = 208px)
    const suburbWidth = Math.round(Math.floor(((suburbParticipationRate / 100) * 208) / 4) / 4) * 4;

    const stateWidth = Math.round(Math.floor(((stateParticipationRate / 100) * 208) / 4) / 4) * 4;

    return (
        <div className="">
            <h1>Income and Work</h1>
            <div className="mb-4">
                <p className="text-xl">Participation Rate</p>
                <p className="text-xs">% of {suburbName} in the labour force</p>
                <div className="bg-gray-200 w-52 rounded relative h-6 mb-2">
                    <div className={`bg-customYellow rounded w-${suburbWidth == 0 ? 1.5 : suburbWidth} absolute top-0 left-0 h-6`}>
                        <span className="">{suburbParticipationRate}%</span>
                    </div>
                    <div className={`border border-dotted bg-black w-0.5 h-6 absolute rounded left-${stateWidth}`}>{stateWidth}</div>
                </div>
                <div className="text-xs flex">
                    <p className="mr-2">vs. {stateName}</p>
                    <p className="">({stateParticipationRate}%)</p>
                </div>
            </div>
        </div>
    );
}
