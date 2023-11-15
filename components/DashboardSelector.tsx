"use client";

interface DashboardSelectorProps {
    selectedView: string | null;
    onChangeView: (view: string | null) => void;
}

export default function DashboardSelector(props: DashboardSelectorProps) {
    // * Build className conditionally
    const getButtonCSS = (viewName: string) => {
        if (viewName === props.selectedView) {
            return `font-semibold p-0.5 border-2 bg-white rounded rounded-md hover:cursor-pointer select-none shadow-lg`;
        } else {
            return `border-2 border-gray-200 rounded rounded-md p-1 hover:bg-gray-300 hover:font-semibold hover:cursor-pointer select-none`;
        }
    };

    // * onClick event handler for selected view
    const handleViewClick = (newView: string | null) => {
        props.onChangeView(newView);
    };

    return (
        <div className="flex flex-row justify-evenly items-center w-[400px] h-10 font-roboto border-2 border-gray-200 rounded-md bg-gray-200 ">
            <div className={getButtonCSS("Overview")}>
                <button onClick={() => handleViewClick("Overview")}>Overview</button>
            </div>
            <div className={getButtonCSS("Housing Details")}>
                <button onClick={() => handleViewClick("Housing Details")}>Housing Details</button>
            </div>

            <div className={getButtonCSS("Demographic")}>
                <button onClick={() => handleViewClick("Demographic")}>Demographic</button>
            </div>
            <div className={getButtonCSS("Lifestyle")}>
                <button onClick={() => handleViewClick("Lifestyle")}>Lifestyle</button>
            </div>
        </div>
    );
}
