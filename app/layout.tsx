import "./globals.css";
import NavBar from "./NavBar";
import { Roboto, Inter } from "@next/font/google";

const roboto = Roboto({
    weight: ["100", "300", "500", "700"],
    variable: "--font-roboto",
    subsets: ["latin"],
});

const inter = Inter({
    weight: ["100", "300", "500", "700"],
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata = {
    title: "Suburbly",
    description: "Suburb Research for Australian Properties",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head></head>

            <body className={`${roboto.variable}`}>
                {}

                {children}
            </body>
        </html>
    );
}
