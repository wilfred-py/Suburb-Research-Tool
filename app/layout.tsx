import Footer from "@/components/Footer";
import "./globals.css";
import { Roboto, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({
    weight: ["100", "300", "500", "700"],
    variable: "--font-roboto",
    subsets: ["latin"],
});

const inter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata = {
    title: "Suburb IQ",
    description: "Suburb Research for Australian Properties",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable}`}>
            <head>
                <meta charSet="UTF-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </head>

            <body>
                {}

                {children}
                <Analytics />
                <footer>
                    <Footer />
                </footer>
            </body>
        </html>
    );
}
