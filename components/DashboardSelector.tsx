"use client";

interface DashboardSelectorProps {
    selectedView: string | null;
    onChangeView: (view: string | null) => void;
}

export default function DashboardSelector(props: DashboardSelectorProps) {
    console.log(props.selectedView);

    // * onClick event handler for selected view
    const handleViewClick = (newView: string | null) => {
        console.log(newView);
        props.onChangeView(newView);
    };

    return (
        <div className="flex flex-row justify-evenly items-center w-[400px] h-10 font-roboto border-0 border-gray-200 rounded-md bg-gray-200">
            <div className="space-x-3">
                <button onClick={() => handleViewClick("Overview")} className="text-center hover:cursor-pointer">
                    Overview
                </button>
                <button onClick={() => handleViewClick("Housing Details")} className=" hover:cursor-pointer">
                    Housing Details
                </button>
                <button onClick={() => handleViewClick("Demographic")} className=" hover:cursor-pointer">
                    Demographic
                </button>
                <button onClick={() => handleViewClick("Lifestyle")} className=" hover:cursor-pointer">
                    Lifestyle
                </button>
            </div>
        </div>
    );
}
