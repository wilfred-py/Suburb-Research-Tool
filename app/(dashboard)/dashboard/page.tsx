import SearchBar from "@/components/SearchBar";
import SummaryData from "@/components/SummaryData";

export default function Dashboard() {
    return (
        <>
            <div className="mx-28 mt-16 border border-black">
                <h1 className="p-4">Dashboard</h1>
                <div className="flex flex-col">
                    <div>
                        <SearchBar />
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="h-[600px] w-8/12  border border-black">
                            Summary Data
                            <SummaryData />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
