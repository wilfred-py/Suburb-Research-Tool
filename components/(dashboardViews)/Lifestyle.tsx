import { Progress } from "@/components/ui/progress";

interface LifestyleProps {
    selectedSuburb: string | null;
}

export default function LifestyleView(props: LifestyleProps) {
    console.log(`selectedSuburb: ${props.selectedSuburb}`);

    // ! props.selectedSuburb state is not being transferred between parent component DashboardView child components
    // Works for OverviewView. Possibly because it's showing data?

    return (
        <>
            <div className="max-h-screen">
                <div>
                    <h1 className="text-lg">Coming soon...</h1>
                </div>
            </div>
            <div className="w-1/4">
                <Progress value={33} className="" />
            </div>
        </>
    );
}
