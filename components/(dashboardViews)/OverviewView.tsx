import AncestryChart from "../(graphs)/(ancestry)/AncestryRadar";
import FullTimeEmploymentLineGraph from "../(graphs)/(employment)/FullTimeEmploymentLineGraph";
import Population from "../(graphs)/{population}/Population";
import Map from "../Map";

interface OverviewProps {
    selectedSuburb: string | null;
}

export default function OverviewView(props: OverviewProps) {
    return (
        <>
            <div className="w-full h-full flex flex-row mobile-s:max-lg:flex-col">
                <div className="lg:w-6/12 h-full flex flex-col mb-10 px-1 pb-1 md:max-lg:max-w-[99%]">
                    <div className="w-full h-[520px] border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                        <Map selectedSuburb={props.selectedSuburb} />
                    </div>

                    <div className="w-full h-[520px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                        <Population selectedSuburb={props.selectedSuburb} />
                    </div>
                </div>

                <div className="lg:w-6/12 w-full h-full flex flex-col mobile-s:max-md:mt-2 mb-10 pr-1 pb-1 md:max-lg:max-w-[99%]">
                    <div className="w-full h-[520px] border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                        <FullTimeEmploymentLineGraph selectedSuburb={props.selectedSuburb} />
                    </div>

                    <div className="w-full h-[520px] mt-2 border border-gray-200 rounded-md shadow-lg hover:shadow-xl">
                        <AncestryChart selectedSuburb={props.selectedSuburb} />
                    </div>
                </div>
            </div>
        </>
    );
}
