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
            <div className="w-full min-h-full flex flex-col">
                <div className="w-full mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                    <DwellingStackedAreaChart selectedSuburb={props.selectedSuburb} />
                </div>
                {/* <BedroomsStackedAreaChart selectedSuburb={props.selectedSuburb} />
                <TenureStackedAreaChart selectedSuburb={props.selectedSuburb} /> */}
            </div>
            {/* <div className="max-h-full overflow-y-hidden">
                <HouseholdCompositionChart selectedSuburb={props.selectedSuburb} />
            </div> */}
        </>
    );
}
