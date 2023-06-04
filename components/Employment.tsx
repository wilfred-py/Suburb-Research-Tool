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
    const suburbParticipationRate = parseFloat(
        mainData["Participation in the labour force"]["In the labour force"][
            "% of suburb"
        ]
    );

    // Labour participation rate within the state
    const stateParticipationRate = parseFloat(
        mainData["Participation in the labour force"]["In the labour force"][
            "% of state"
        ]
    );

    // width of div in pixels (w-52 = 208px)
    const suburbWidth = Math.floor((suburbParticipationRate / 100) * 208);

    const stateWidth = Math.floor((stateParticipationRate / 100) * 208);

    return (
        <div
            className="rounded
        border border-black w-112"
        >
            <div className="mb-4">
                <h1 className="text-xl">Participation Rate</h1>
                <p className="text-xs">% of {suburbName} in the labour force</p>
                <div className="bg-gray-200 w-52 rounded">
                    <div
                        className={`bg-customYellow w-[${suburbWidth}px] rounded`}
                    >
                        <span>{suburbParticipationRate}%</span>
                    </div>
                </div>

                <p className="text-xs">% of {stateName} in the labour force</p>
                <div className="bg-gray-200 w-52 rounded">
                    <div
                        className={`bg-customYellow w-[${stateWidth}px] rounded`}
                    >
                        <span>{stateParticipationRate}%</span>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-xl">Median weekly incomes</h1>
                {/* Bar Chart */}
                <p>Personal</p>
                <p>Household</p>
            </div>
        </div>
    );
}
