import "./globals.css";
import NavMenu from "./NavMenu";
import AuthProvider from "./AuthProvider";

import { Roboto, Inter } from "@next/font/google";

const roboto = Roboto({
    weight: ["100", "300", "500", "700"],
    variable: "--font-roboto",
});

const inter = Inter({
    weight: ["100", "300", "500", "700"],
    variable: "--font-inter",
});

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <html lang="en">
                <head></head>

                <body className={`${roboto.variable}`}>
                    <NavMenu />
                    {children}
                </body>
            </html>
        </AuthProvider>
    );
}
