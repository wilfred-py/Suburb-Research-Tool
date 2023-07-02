import SummaryData from "@/components/SummaryData";
import FreemiumData from "@/components/FreemiumData";

export default async function Suburb() {
    return (
        <div className="flex flex-col items-center">
            <div>
                <SummaryData />
            </div>
            <div>
                <FreemiumData />
            </div>
        </div>
    );
}
