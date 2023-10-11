import Employment from "../Employment";
import Income from "../Income";

interface DemographicProps {
    selectedSuburb: string | null;
}

export default function DemographicView(props: DemographicProps) {
    // console.log(`selectedSuburb: ${props.selectedSuburb}`);

    return (
        <div className="max-w-screen max-h-screen flex flex-wrap">
            <Employment selectedSuburb={props.selectedSuburb} />
            <Income selectedSuburb={props.selectedSuburb} />
        </div>
    );
}
