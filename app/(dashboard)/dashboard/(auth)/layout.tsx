import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="min-h-screen flex-1 flex flex-row overflow-hidden">
            <div id="left-panel" className="flex flex-col xl:w-1/3 w-full">
                <div id="logo" className="xl:px-auto p-10">
                    <Link className="text-2xl font-bold" href={"/"}>
                        SuburbIQ
                    </Link>
                </div>

                {/* Auth Form */}
                <div className="flex-1 flex flex-col justify-center place-items-center px-7">
                    <div className="w-96">{children}</div>
                </div>
            </div>

            <div
                id="right-panel"
                className="flex flex-col flex-1 xl:flex sm:max-xl:hidden max-sm:hidden bg-navigationBarBlue justify-center items-center"
            >
                <div>
                    <h1 className="px-10 text-offWhite text-3xl font-inter600">Discover demographic trends in Australia's suburbs</h1>
                    <h2 className="w-full pt-6 px-10 text-offWhite">
                        Join the growing community of buyers and renters using Suburb IQ to help them make more informed decisions before
                        buying a home or investment.
                    </h2>
                </div>
            </div>
        </section>
    );
}
