import Map from "../Map";
import RecentSales from "../RecentSales";
import SummaryData from "../SummaryData";

interface OverviewProps {
    selectedSuburb: string | null;
}

export default function OverviewView(props: OverviewProps) {
    // console.log(`selectedSuburb: ${props.selectedSuburb}`);

    return (
        <div className="flex flex-row justify-center">
            <div className="max-h-screen w-full ">
                <SummaryData selectedSuburb={props.selectedSuburb} />
                <div className="flex flex-row">
                    <div className="w-7/12">
                        <Map selectedSuburb={props.selectedSuburb} />
                    </div>
                    <div className="w-5/12">
                        <RecentSales selectedSuburb={props.selectedSuburb} />
                    </div>
                </div>
            </div>
        </div>
    );
}
