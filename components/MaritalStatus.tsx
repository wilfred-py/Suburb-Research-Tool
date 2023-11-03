import DivorcedLineGraph from "./(graphs)/(maritalStatus)/DivorcedLineGraph";
import MarriedLineGraph from "./(graphs)/(maritalStatus)/MarriedLineGraph";
import SeparatedLineGraph from "./(graphs)/(maritalStatus)/SeparatedLineGraph";

interface MaritalProps {
    selectedSuburb: string | null;
}

export default function Marital(props: MaritalProps) {
    return (
        <div className="flex flex-col border-2 border-blue-400 my-4">
            <h1 className="text-2xl font-bold mx-auto">Registered Marital Status</h1>
            <div className="flex flex-row flex-wrap">
                <MarriedLineGraph selectedSuburb={props.selectedSuburb} />
                <SeparatedLineGraph selectedSuburb={props.selectedSuburb} />
                <DivorcedLineGraph selectedSuburb={props.selectedSuburb} />
                {/* <WidowedLineGraph selectedSuburb={props.selectedSuburb} />
                <NeverMarriedLineGraph selectedSuburb={props.selectedSuburb} /> */}
            </div>
        </div>
    );
}
