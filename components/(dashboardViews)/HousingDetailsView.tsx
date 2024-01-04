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
            <div className="w-full min-h-full flex flex-col 3xl:flex-row 3xl:space-x-2">
                <div className="flex-1 max-w-[720px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                    <DwellingStackedAreaChart selectedSuburb={props.selectedSuburb} />
                </div>
                <div className="flex-1 max-w-[720px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                    <BedroomsStackedAreaChart selectedSuburb={props.selectedSuburb} />
                </div>
                <div className="flex-1 max-w-[720px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                    <TenureStackedAreaChart selectedSuburb={props.selectedSuburb} />
                </div>
            </div>
            {/* <div className="">
                <HouseholdCompositionChart selectedSuburb={props.selectedSuburb} />
            </div> */}
        </>
    );
}
