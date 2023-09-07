import FullTimeEmploymentLineGraph from "./(graphs)/EmploymentLineGraph";

export default function Employment() {
    return (
        <div className="flex flex-row flex-wrap border-2 border-blue-400">
            <h1>Employment</h1>
            <FullTimeEmploymentLineGraph />
            <FullTimeEmploymentLineGraph />
            <FullTimeEmploymentLineGraph />
        </div>
    );
}
