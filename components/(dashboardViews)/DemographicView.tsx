import Employment from "../Employment";
import Income from "../Income";

interface DemographicProps {
    selectedSuburb: string | null;
}

export default function DemographicView(props: DemographicProps) {
    // console.log(`selectedSuburb: ${props.selectedSuburb}`);

    return (
        <div className="max-w-screen max-h-screen">
            {/* <div>
                <span>{props.selectedSuburb}</span>
            </div> */}
            <Income selectedSuburb={props.selectedSuburb} />
            <Employment />
        </div>
    );
}
