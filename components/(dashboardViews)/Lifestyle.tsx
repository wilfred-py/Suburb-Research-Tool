interface LifestyleProps {
    selectedSuburb: string | null;
}

export default function LifestyleView(props: LifestyleProps) {
    console.log(`selectedSuburb: ${props.selectedSuburb}`);

    // ! props.selectedSuburb state is not being transferred between parent component DashboardView child components
    // Works for OverviewView. Possibly because it's showing data?

    return (
        <div className="bg-green-500 max-w-screen max-h-screen">
            <div>
                <h1>Lifestyle View</h1>

                <span>{props.selectedSuburb}</span>
            </div>
        </div>
    );
}
