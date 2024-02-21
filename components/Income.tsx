import HouseholdMedianWeeklyIncome from "./(graphs)/(income)/HouseholdMedianWeeklyIncome";
import PersonalMedianWeeklyIncome from "./(graphs)/(income)/PersonalMedianWeeklyIncome";

interface IncomeProps {
    selectedSuburb: string | null;
}

export default function Income(props: IncomeProps) {
    return (
        <div className="flex flex-col my-4 w-[99%]">
            <h1 className="text-center text-2xl font-bold mx-auto">Income</h1>
            <div className="flex flex-col lg:flex-row min-h-full ">
                <div className="flex-1 lg:w-1/2">
                    <PersonalMedianWeeklyIncome selectedSuburb={props.selectedSuburb} />
                </div>
                <div className="flex-1 lg:w-1/2">
                    <HouseholdMedianWeeklyIncome selectedSuburb={props.selectedSuburb} />
                </div>
            </div>
        </div>
    );
}
