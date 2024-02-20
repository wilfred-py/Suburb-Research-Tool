import FullTimeEmploymentLineGraph from "./(graphs)/(employment)/FullTimeEmploymentLineGraph";
import PartTimeEmploymentLineGraph from "./(graphs)/(employment)/PartTimeEmploymentLineGraph";
import UnemploymentLineGraph from "./(graphs)/(employment)/UnemploymentLineGraph";

interface EmploymentProps {
    selectedSuburb: string | null;
}

export default function Employment(props: EmploymentProps) {
    return (
        <div className="flex flex-col my-4 w-[99%]">
            <h1 className="text-center text-2xl font-bold mx-auto">Employment</h1>
            <div className="flex flex-col lg:flex-row flex-wrap min-h-full ">
                <div className="flex flex-col lg:w-1/2 h-full">
                    <div className="flex-1">
                        <FullTimeEmploymentLineGraph selectedSuburb={props.selectedSuburb} />
                    </div>
                    <div className="flex-1">
                        <PartTimeEmploymentLineGraph selectedSuburb={props.selectedSuburb} />
                    </div>
                </div>
                <div className="flex flex-col lg:w-1/2 h-full">
                    <div className="flex-1">
                        <UnemploymentLineGraph selectedSuburb={props.selectedSuburb} />
                    </div>
                </div>
            </div>
        </div>
    );
}
