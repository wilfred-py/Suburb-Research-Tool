import SummaryData from "@/components/SummaryData";

import FreemiumData from "@/components/FreemiumData";
import GetSummaryData from "@/components/SummaryData_Supabase";

export default async function Suburb() {
    return (
        <div className="flex flex-col xl:px-52 lg:px-52 md:px-32 sm:px-5">
            <div>
                <GetSummaryData />
            </div>
            <div>{/* <FreemiumData /> */}</div>
        </div>
    );
}
