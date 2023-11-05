import CoupleWithChildrenLineGraph from "./(graphs)/(family)/CoupleWithChildren";

interface FamilyCompositionProps {
    selectedSuburb: string | null;
}

export default function FamilyComposition(props: FamilyCompositionProps) {
    return (
        <div className="flex flex-col border-2 border-blue-400 my-4">
            <h1 className="text-2xl font-bold mx-auto">Family Composition</h1>
            <div className="flex flex-row flex-wrap">
                <CoupleWithChildrenLineGraph selectedSuburb={props.selectedSuburb} />
            </div>
        </div>
    );
}
