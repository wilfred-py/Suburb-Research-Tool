import DivorcedLineGraph from "./(graphs)/(maritalStatus)/DivorcedLineGraph";
import MarriedLineGraph from "./(graphs)/(maritalStatus)/MarriedLineGraph";
import NeverMarriedLineGraph from "./(graphs)/(maritalStatus)/NeverMarriedLineGraph";
import SeparatedLineGraph from "./(graphs)/(maritalStatus)/SeparatedLineGraph";
import WidowedLineGraph from "./(graphs)/(maritalStatus)/WidowedLineGraph";

interface MaritalProps {
    selectedSuburb: string | null;
}

export default function Marital(props: MaritalProps) {
    return (
        <div className="flex flex-col my-4 w-[99%]">
            <h1 className="mx-auto my-4 text-center text-2xl font-bold">Registered Marital Status</h1>
            <div className="flex flex-col lg:flex-row flex-wrap min-h-full ">
                <div className="flex flex-col lg:w-1/2 h-full">
                    <div className="flex-1">
                        <MarriedLineGraph selectedSuburb={props.selectedSuburb} />
                    </div>
                    <div className="flex-1">
                        <DivorcedLineGraph selectedSuburb={props.selectedSuburb} />
                    </div>
                </div>
                <div className="flex flex-col lg:w-1/2 h-full">
                    <div className="flex-1">
                        <SeparatedLineGraph selectedSuburb={props.selectedSuburb} />
                    </div>
                    <div className="flex-1">
                        <WidowedLineGraph selectedSuburb={props.selectedSuburb} />
                    </div>
                </div>
                <div className="flex flex-col lg:w-1/2">
                    <div className="flex-1">
                        <NeverMarriedLineGraph selectedSuburb={props.selectedSuburb} />
                    </div>
                </div>
            </div>
        </div>
    );
}
