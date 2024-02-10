import CoupleWithChildrenLineGraph from "./(graphs)/(family)/CoupleWithChildren";
import CoupleWithoutChildrenLineGraph from "./(graphs)/(family)/CoupleWithoutChildren";
import OneParentFamilyLineGraph from "./(graphs)/(family)/OneParentFamily";
import OtherFamilyLineGraph from "./(graphs)/(family)/OtherFamily";

interface FamilyCompositionProps {
    selectedSuburb: string | null;
}

export default function FamilyComposition(props: FamilyCompositionProps) {
    return (
        <div className="flex flex-col my-4 w-full">
            <div>
                <h1 className="text-center text-2xl font-bold mx-auto">Family Composition</h1>
                <div className="flex flex-col lg:flex-row min-h-full 3xl:space-x-2">
                    <div className="lg:w-1/2 h-full flex flex-col">
                        <div className="flex-1">
                            <CoupleWithChildrenLineGraph selectedSuburb={props.selectedSuburb} />
                        </div>
                        <div className="flex-1">
                            <CoupleWithoutChildrenLineGraph selectedSuburb={props.selectedSuburb} />
                        </div>
                    </div>
                    <div className="lg:w-1/2 h-full flex flex-col">
                        <div className="flex-1">
                            <OneParentFamilyLineGraph selectedSuburb={props.selectedSuburb} />
                        </div>
                        <div className="flex-1">
                            <OtherFamilyLineGraph selectedSuburb={props.selectedSuburb} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
