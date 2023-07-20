import SummaryData from "@/components/SummaryData";

import FreemiumData from "@/components/FreemiumData";
import GetSummaryData from "@/components/SummaryData_Supabase";

export default async function Suburb() {
    return (
        <div className="flex flex-col items-center">
            <div>
                <GetSummaryData />
            </div>
            <div>{/* <FreemiumData /> */}</div>
        </div>
    );
}
