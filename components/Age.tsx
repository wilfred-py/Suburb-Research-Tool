import Adolescents from "./(graphs)/(age)/Adolescents";
import Children from "./(graphs)/(age)/Children";
import MiddleAged from "./(graphs)/(age)/MiddleAged";
import Seniors from "./(graphs)/(age)/Seniors";
import YoungAdults from "./(graphs)/(age)/YoungAdults";

interface AgeProps {
    selectedSuburb: string | null;
}

export default function Age(props: AgeProps) {
    return (
        <div className="flex flex-col border-2 border-blue-400 my-4">
            <h1 className="text-2xl font-bold mx-auto">Age Groups</h1>
            <div className="flex flex-row flex-wrap">
                <Children selectedSuburb={props.selectedSuburb} />
                <Adolescents selectedSuburb={props.selectedSuburb} />
                <YoungAdults selectedSuburb={props.selectedSuburb} />
                <MiddleAged selectedSuburb={props.selectedSuburb} />
                <Seniors selectedSuburb={props.selectedSuburb} />
            </div>
        </div>
    );
}
