import SummaryData from "@/components/SummaryData";

import FreemiumData from "@/components/FreemiumData";
import GetSummaryData from "@/components/SummaryData_Supabase";
import Map from "@/components/Map";

export default async function Suburb() {
    return (
        <div className="flex flex-col xl:px-52 lg:px-52 md:px-32 sm:px-5">
            <div>
                <Map />
            </div>
            <div>
                <GetSummaryData />
            </div>
        </div>
    );
}
