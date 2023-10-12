import HouseholdMedianWeeklyIncome from "./(graphs)/(income)/HouseholdMedianWeeklyIncome";
import PersonalMedianWeeklyIncome from "./(graphs)/(income)/PersonalMedianWeeklyIncome";

interface IncomeProps {
    selectedSuburb: string | null;
}

export default function Income(props: IncomeProps) {
    return (
        <div className="flex flex-col border-2 border-blue-400 my-4">
            <h1 className="text-2xl font-bold mx-auto">Income</h1>
            <div className="flex flex-row flex-wrap">
                <PersonalMedianWeeklyIncome selectedSuburb={props.selectedSuburb} />
                <HouseholdMedianWeeklyIncome selectedSuburb={props.selectedSuburb} />
            </div>
        </div>
    );
}
