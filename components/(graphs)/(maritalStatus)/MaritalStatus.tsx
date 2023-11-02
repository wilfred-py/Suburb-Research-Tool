import MarriedLineGraph from "./MarriedLineGraph";

interface RegisteredMaritalStatusProps {
    selectedSuburb: string | null;
}

export default function RegisteredMaritalStatus(props: RegisteredMaritalStatusProps) {
    return (
        <div className="flex flex-col border-2 border-blue-400 my-4">
            <h1 className="text-2xl font-bold mx-auto">Employment</h1>
            <div className="flex flex-row flex-wrap">
                <MarriedLineGraph selectedSuburb={props.selectedSuburb} />
            </div>
        </div>
    );
}
