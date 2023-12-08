import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="min-h-screen flex-1 flex flex-row overflow-hidden font-roboto text-gray-100">
            <div id="left-panel" className="flex flex-col xl:w-1/3 w-full border-r border-gray-500">
                <div id="logo" className="xl:px-auto bg-authLeftGreen p-10">
                    <Link className="text-2xl font-bold" href={"/"}>
                        SuburbIQ
                    </Link>
                </div>

                {/* Auth Form */}
                <div className="flex-1 flex flex-col bg-authLeftGreen justify-center place-items-center px-7">
                    <div className="w-96">{children}</div>
                </div>
            </div>
            <div
                id="right-panel"
                className="flex flex-col flex-1 xl:flex sm:max-xl:hidden max-sm:hidden bg-authRightGreen justify-center items-center"
            >
                <h1 className="px-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h1>
                <h2 className="pt-6 px-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h2>
            </div>
        </section>
    );
}
