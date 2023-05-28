import { Metadata } from "next";

interface Props {
    params: {
        id: string;
    };
}

export async function generateMetaData({ params }: Props): Promise<Metadata> {
    return { title: "" };
}

export default async function SuburbData({ params }: Props) {
    const abbotsfordData = {
        People: "9,088",
        Male: "51.0%",
        Female: "49.0%",
        "Median age": "33",
        Families: "2,127",
        "Average number of children per family": "null",
        "for families with children": "1.5",
        "for all households (a)": "0.2",
        "All private dwellings": "5,673",
        "Average number of people per household": "1.9",
        "Median weekly household income": "$2,197",
        "Median monthly mortgage repayments": "$2,167",
        "Median weekly rent (b)": "$425",
        "Average number of motor vehicles per dwelling": "1.1",
    };
    return (
        <div>
            <h1>Suburb A</h1>
            <h1 className="text-3xl">All suburbs</h1>
            <p className="text-base font-bold">Abbotsford</p>
            <ul className="text-xs">
                <li>People: {abbotsfordData.People} </li>
                <li>Male: {abbotsfordData.Male}</li>
                <li>Female: {abbotsfordData.Female}</li>
                <li>Test list item</li>
            </ul>
        </div>
    );
}
