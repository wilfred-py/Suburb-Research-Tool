interface DashboardSelectorProps {
    setSelectedView: string | null;
}

export default function DashboardSelector(props: DashboardSelectorProps) {
    return (
        <div className="flex flex-row justify-evenly items-center w-[400px] h-10 font-roboto border-0 border-gray-200 rounded-md bg-gray-200">
            <span className="text-center">Overview</span>
            <span className="">Housing Details</span>
            <span className="">Demographic</span>
            <span className="">Lifestyle</span>
        </div>
    );
}
