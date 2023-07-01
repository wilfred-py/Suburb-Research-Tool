import SecondaryNavMenu from "@/components/SecondaryNavMenu";

export default function SuburbLayout({ children }: { children: React.ReactNode; params: { suburb_name: string } }) {
    return (
        <html>
            <body>
                <div className="flex items-center">
                    <SecondaryNavMenu />
                </div>
                {children}
            </body>
        </html>
    );
}
