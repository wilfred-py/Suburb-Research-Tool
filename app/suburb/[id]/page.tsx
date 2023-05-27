import { Metadata } from "next";

interface Props {
    params: {
        id: string;
    };
}

export async function generateMetaData({ params }: Props): Promise<Metadata> {
    return { title: "" };
}
