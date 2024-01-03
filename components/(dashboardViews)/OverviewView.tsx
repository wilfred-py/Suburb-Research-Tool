import SummaryData from "../SummaryData";

interface OverviewProps {
    selectedSuburb: string | null;
}

export default function OverviewView(props: OverviewProps) {
    return (
        <div className="min-h-full w-full">
            <SummaryData selectedSuburb={props.selectedSuburb} />
        </div>
    );
}
