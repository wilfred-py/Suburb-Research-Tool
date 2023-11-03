import Ancestry from "../(graphs)/(ancestry)/Ancestry";
import Population from "../(graphs)/{population}/Population";
import Age from "../Age";

import Employment from "../Employment";
import Income from "../Income";
import Marital from "../MaritalStatus";

interface DemographicProps {
    selectedSuburb: string | null;
}

export default function DemographicView(props: DemographicProps) {
    // console.log(`selectedSuburb: ${props.selectedSuburb}`);

    return (
        <div className="max-w-screen max-h-screen flex flex-wrap">
            <Marital selectedSuburb={props.selectedSuburb} />
            <Ancestry selectedSuburb={props.selectedSuburb} />
            <Population selectedSuburb={props.selectedSuburb} />
            <Age selectedSuburb={props.selectedSuburb} />
            <Employment selectedSuburb={props.selectedSuburb} />
            <Income selectedSuburb={props.selectedSuburb} />
        </div>
    );
}
