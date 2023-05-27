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
    return (
        <div>
            <h1>Suburb A</h1>
        </div>
    );
}
