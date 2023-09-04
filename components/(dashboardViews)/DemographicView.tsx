import Income from "../Income";

interface DemographicProps {
    selectedSuburb: string | null;
}

export default function DemographicView(props: DemographicProps) {
    // console.log(`selectedSuburb: ${props.selectedSuburb}`);

    return (
        <div className="bg-green-500 max-w-screen max-h-screen">
            {/* <div>
                <span>{props.selectedSuburb}</span>
            </div> */}
            <div>
                <Income selectedSuburb={props.selectedSuburb} />
            </div>
        </div>
    );
}
