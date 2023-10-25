import Adolescents from "../(graphs)/(age)/Adolescents";
import Children from "../(graphs)/(age)/Children";
import Population from "../(graphs)/{population}/Population";
import Employment from "../Employment";
import Income from "../Income";

interface DemographicProps {
    selectedSuburb: string | null;
}

export default function DemographicView(props: DemographicProps) {
    // console.log(`selectedSuburb: ${props.selectedSuburb}`);

    return (
        <div className="max-w-screen max-h-screen flex flex-wrap">
            <Population selectedSuburb={props.selectedSuburb} />
            <Children selectedSuburb={props.selectedSuburb} />
            <Adolescents selectedSuburb={props.selectedSuburb} />
            <Employment selectedSuburb={props.selectedSuburb} />
            <Income selectedSuburb={props.selectedSuburb} />
        </div>
    );
}
