import main_data_Abbotsford from "../../../data/main_data/main_data_Abbotsford.json";
import summary_data_Abbotsford from "../../../data/summary_data/summary_data_Abbotsford.json";

export default async function SuburbData() {
    const mainData = main_data_Abbotsford;
    const summaryData = summary_data_Abbotsford;
    return (
        <div>
            <section id="people">
                <p className="text-base font-bold">Abbotsford</p>
                <ul className="text-xs">
                    <li>
                        People in "SUBURB": {summaryData.Abbotsford.People}{" "}
                    </li>
                    <li>Average people per suburb in "STATE": {} </li>
                </ul>
            </section>

            <section id="income-and-work">
                <ul>
                    <li>In the labor force</li>
                </ul>
            </section>
        </div>
    );
}
