import Map from "../Map";
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
                <div className="flex flex-row"></div>
            </div>
        </div>
    );
}
