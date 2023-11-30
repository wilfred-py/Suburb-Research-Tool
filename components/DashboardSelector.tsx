"use client";

interface DashboardSelectorProps {
    selectedView: string | null;
    onChangeView: (view: string | null) => void;
}

export default function DashboardSelector(props: DashboardSelectorProps) {
    // * Build className conditionally
    const getButtonCSS = (viewName: string) => {
        if (viewName === props.selectedView) {
            return `bg-navigationBarBlue text-white font-medium p-0.5 my-2 border-1 border-navigationBarBlue rounded rounded-md hover:cursor-pointer select-none shadow-sm shadow-navigationBarBlue transition hover:delay-200`;
        } else {
            return `bg-white  rounded rounded-md p-0.5 my-2 hover:bg-navigationBarBlue hover:text-white hover:font-medium hover:cursor-pointer select-none transition hover:delay-200`;
        }
    };

    // * onClick event handler for selected view
    const handleViewClick = (newView: string | null) => {
        props.onChangeView(newView);
    };

    return (
        <div className="flex flex-row justify-evenly items-center w-[400px] h-10 border-2 border-gray-300 rounded-md shadow-md bg-white">
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
