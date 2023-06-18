import "./globals.css";
import NavMenu from "./NavMenu";
import SearchBar from "@/components/SearchBar";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div>
                    <NavMenu />
                </div>
                {children}
                <SearchBar />
            </body>
        </html>
    );
}
