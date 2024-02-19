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
        <div className="flex flex-col my-4 w-[99%]">
            <h1 className="text-center text-2xl font-bold mx-auto">Age</h1>
            <div className="flex flex-col lg:flex-row flex-wrap min-h-full ">
                <div className="flex flex-col lg:w-1/2 h-full">
                    <div className="flex-1">
                        <Children selectedSuburb={props.selectedSuburb} />
                    </div>
                    <div className="flex-1">
                        <Adolescents selectedSuburb={props.selectedSuburb} />
                    </div>
                </div>
                <div className="flex flex-col lg:w-1/2 h-full">
                    <div className="flex-1">
                        <YoungAdults selectedSuburb={props.selectedSuburb} />
                    </div>
                    <div className="flex-1">
                        <MiddleAged selectedSuburb={props.selectedSuburb} />
                    </div>
                </div>
                <div className="flex flex-col lg:w-1/2">
                    <div className="flex-1">
                        <Seniors selectedSuburb={props.selectedSuburb} />
                    </div>
                </div>
            </div>
        </div>
    );
}
