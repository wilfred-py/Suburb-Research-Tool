import AncestryChart from "./AncestryRadar";

interface AncestryProps {
    selectedSuburb: string | null;
}

export default function Ancestry(props: AncestryProps) {
    return (
        <>
            <div className="flex flex-col border-2 border-blue-400 my-4">
                <h1 className="text-2xl font-bold mx-auto">Ancestry</h1>
                <div className="flex flex-row flex-wrap">
                    <h1>2011</h1>
                    <AncestryChart selectedSuburb={props.selectedSuburb} />
                </div>
            </div>
        </>
    );
}
