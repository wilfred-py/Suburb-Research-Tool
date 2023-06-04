import main_data_Abbotsford from "../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../data/summary_data/summary_data_Abbotsford.json";

export default function EmploymentBarChart() {
    const summaryData = summary_data_Abbotsford;
    const mainData = main_data_Abbotsford;
    const suburbRatio = "% of suburb";
    let participationRate = parseFloat(
        mainData["Participation in the labour force"]["In the labour force"][
            `${suburbRatio}`
        ]
    );

    // width of div in pixels (w-52 = 208px)
    const calculatedWidth = Math.floor((participationRate / 100) * 208);

    return (
        <div className="bg-gray-200 w-52 rounded m-4">
            <div className={`bg-customYellow w-[${calculatedWidth}px] rounded`}>
                <span>{participationRate}%</span>
            </div>
        </div>
    );
}
