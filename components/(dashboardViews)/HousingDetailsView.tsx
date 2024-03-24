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
            <div className="flex flex-col w-full">
                <div className="flex flex-col 3xl:flex-row min-h-full 3xl:space-x-2">
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

                <div className="flex-1 max-w-[720px] w-full 3xl:max-w-full mt-2 mb-8 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                    <HouseholdCompositionChart selectedSuburb={props.selectedSuburb} />
                </div>
            </div>
        </>
    );
}
