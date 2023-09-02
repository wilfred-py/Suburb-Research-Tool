import SummaryData from "@/components/SummaryData";

import Map from "@/components/Map";

export default async function Suburb() {
    return (
        <div className="flex flex-col xl:px-52 lg:px-52 md:px-32 sm:px-5">
            <div>
                <Map />
            </div>
            <div>
                <SummaryData />
            </div>
        </div>
    );
}
