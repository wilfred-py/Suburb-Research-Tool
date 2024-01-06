import CoupleWithChildrenLineGraph from "./(graphs)/(family)/CoupleWithChildren";
import CoupleWithoutChildrenLineGraph from "./(graphs)/(family)/CoupleWithoutChildren";
import OneParentFamilyLineGraph from "./(graphs)/(family)/OneParentFamily";
import OtherFamilyLineGraph from "./(graphs)/(family)/OtherFamily";

interface FamilyCompositionProps {
    selectedSuburb: string | null;
}

export default function FamilyComposition(props: FamilyCompositionProps) {
    return (
        <div className="flex flex-col my-4">
            <h1 className="text-2xl font-bold mx-auto">Family Composition</h1>
            <div className="flex flex-row flex-wrap">
                <CoupleWithChildrenLineGraph selectedSuburb={props.selectedSuburb} />
                <CoupleWithoutChildrenLineGraph selectedSuburb={props.selectedSuburb} />
                <OneParentFamilyLineGraph selectedSuburb={props.selectedSuburb} />
                <OtherFamilyLineGraph selectedSuburb={props.selectedSuburb} />
            </div>
        </div>
    );
}
