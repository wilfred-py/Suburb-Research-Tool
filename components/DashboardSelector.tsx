"use client";

interface DashboardSelectorProps {
    setSelectedView: (view: string | null) => void;
    selectedView: string | null;
}

export default function DashboardSelector(props: DashboardSelectorProps) {
    console.log(props.selectedView);

    // * onClick event handler for selected view
    const handleViewClick = (newView: string | null) => {
        console.log("clicked");
        props.setSelectedView(newView);
    };

    return (
        <div>
            {props.selectedView == "Overview" ? (
                <div className="flex flex-row justify-evenly items-center w-[400px] h-10 font-roboto border-0 border-gray-200 rounded-md bg-gray-200">
                    <span onClick={handleViewClick("Overview")} className="text-center hover:cursor-pointer">
                        Overview
                    </span>
                    <span onClick={handleViewClick} className="hover:cursor-pointer">
                        Housing Details
                    </span>
                    <span onClick={handleViewClick} className="hover:cursor-pointer">
                        Demographic
                    </span>
                    <span onClick={handleViewClick} className="hover:cursor-pointer">
                        Lifestyle
                    </span>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
