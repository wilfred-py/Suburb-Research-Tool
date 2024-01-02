"use client";

interface DashboardSelectorProps {
    selectedView: string | null;
    onChangeView: (view: string | null) => void;
}

export default function DashboardSelector(props: DashboardSelectorProps) {
    // * Build className conditionally
    const getButtonCSS = (viewName: string) => {
        if (viewName === props.selectedView) {
            return `relative focus:outline-none focus:ring-0 whitespace-nowrap mr-2 md:mr-0 md:ml-2.5 px-4 py-1 md:py-2 hover:bg-hoverBlue text-left leading-6 text-black font-normal border-1 border-navigationBarBlue rounded rounded-sm hover:cursor-pointer select-none`;
        } else {
            return `relative focus:outline-none focus:ring-0 whitespace-nowrap mr-2 md:mr-0 md:ml-2.5 px-4 py-1 md:py-2 hover:bg-hoverBlue text-left hover:text-gray-900 leading-6 text-black font-normal border-1 border-navigationBarBlue rounded rounded-sm hover:cursor-pointer select-none`;
        }
    };

    // * onClick event handler for selected view
    const handleViewClick = (newView: string | null) => {
        props.onChangeView(newView);
    };

    return (
        <div className="flex flex-row md:flex-col min-w-[10rem] h-1/4 md:space-y-1 md:py-2.5 md:mx-0 mb-6 md:mb-0 md:top-[4.5rem] md:sticky justify-evenly">
            <button className={getButtonCSS("Overview")} onClick={() => handleViewClick("Overview")}>
                {props.selectedView == "Overview" ? (
                    <span className="hidden md:block absolute w-0.5 h-full -left-2.5 top-0 bg-buttonBlue"></span>
                ) : (
                    ""
                )}
                Overview
            </button>
            <button className={getButtonCSS("Housing Details")} onClick={() => handleViewClick("Housing Details")}>
                {props.selectedView == "Housing Details" ? (
                    <span className="hidden md:block absolute w-0.5 h-full -left-2.5 top-0 bg-buttonBlue"></span>
                ) : (
                    ""
                )}
                Housing Details
            </button>
            <button className={getButtonCSS("Demographic")} onClick={() => handleViewClick("Demographic")}>
                {props.selectedView == "Demographic" ? (
                    <span className="hidden md:block absolute w-0.5 h-full -left-2.5 top-0 bg-buttonBlue"></span>
                ) : (
                    ""
                )}
                Demographic
            </button>
            <button className={getButtonCSS("Lifestyle")} onClick={() => handleViewClick("Lifestyle")}>
                {props.selectedView == "Lifestyle" ? (
                    <span className="hidden md:block absolute w-0.5 h-full -left-2.5 top-0 bg-buttonBlue"></span>
                ) : (
                    ""
                )}
                Lifestyle
            </button>
        </div>
    );
}
