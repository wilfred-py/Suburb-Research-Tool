import BedroomsStackedAreaChart from "../(graphs)/(dwelling)/Bedrooms";
import DwellingStackedAreaChart from "../(graphs)/(dwelling)/DwellingStackedAreaChart";
import TenureStackedAreaChart from "../(graphs)/(dwelling)/Tenure";

interface HousingDetailsProps {
    selectedSuburb: string | null;
}

export default function HousingDetailsView(props: HousingDetailsProps) {
    console.log(`selectedSuburb: ${props.selectedSuburb}`);

    // ! props.selectedSuburb state is not being transferred between parent component DashboardView child components
    // Works for OverviewView. Possibly because it's showing data?

    return (
        <div className="max-w-screen max-h-screen flex flex-wrap">
            <DwellingStackedAreaChart selectedSuburb={props.selectedSuburb} />
            <BedroomsStackedAreaChart selectedSuburb={props.selectedSuburb} />
            <TenureStackedAreaChart selectedSuburb={props.selectedSuburb} />
        </div>
    );
}
