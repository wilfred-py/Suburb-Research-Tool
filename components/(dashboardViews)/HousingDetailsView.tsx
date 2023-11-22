import BedroomsStackedAreaChart from "../(graphs)/(dwelling)/Bedrooms";
import DwellingStackedAreaChart from "../(graphs)/(dwelling)/DwellingStackedAreaChart";
import HouseholdCompositionChart from "../(graphs)/(dwelling)/HouseholdComposition";
import TenureStackedAreaChart from "../(graphs)/(dwelling)/Tenure";

interface HousingDetailsProps {
    selectedSuburb: string | null;
}

export default function HousingDetailsView(props: HousingDetailsProps) {
    return (
        <>
            <div className="max-w-full flex flex-row justify-evenly mt-4">
                <DwellingStackedAreaChart selectedSuburb={props.selectedSuburb} />
                <BedroomsStackedAreaChart selectedSuburb={props.selectedSuburb} />
                <TenureStackedAreaChart selectedSuburb={props.selectedSuburb} />
            </div>
            <div>
                <HouseholdCompositionChart selectedSuburb={props.selectedSuburb} />
            </div>
        </>
    );
}
