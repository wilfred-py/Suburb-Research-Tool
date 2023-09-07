import FullTimeEmploymentLineGraph from "./(graphs)/(employment)/FullTimeEmploymentLineGraph";

interface EmploymentProps {
    selectedSuburb: string | null;
}

export default function Employment(props: EmploymentProps) {
    return (
        <div className="flex flex-col border-2 border-blue-400">
            <h1 className="text-2xl font-bold mx-auto">Employment</h1>
            <div className="flex flex-row flex-wrap">
                <FullTimeEmploymentLineGraph selectedSuburb={props.selectedSuburb} />
            </div>
        </div>
    );
}
