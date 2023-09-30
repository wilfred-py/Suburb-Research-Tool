import FullTimeEmploymentLineGraph from "./(graphs)/(employment)/FullTimeEmploymentLineGraph";
import PartTimeEmploymentLineGraph from "./(graphs)/(employment)/PartTimeEmploymentLineGraph";
import UnemploymentLineGraph from "./(graphs)/(employment)/UnemploymentLineGraph";

interface EmploymentProps {
    selectedSuburb: string | null;
}

export default function Employment(props: EmploymentProps) {
    return (
        <div className="flex flex-col border-2 border-blue-400">
            <h1 className="text-2xl font-bold mx-auto">Employment</h1>
            <div className="flex flex-row flex-wrap">
                <FullTimeEmploymentLineGraph selectedSuburb={props.selectedSuburb} />
                <PartTimeEmploymentLineGraph selectedSuburb={props.selectedSuburb} />
                <UnemploymentLineGraph selectedSuburb={props.selectedSuburb} />
            </div>
        </div>
    );
}
