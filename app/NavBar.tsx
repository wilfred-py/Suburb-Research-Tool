"use client";

import Link from "next/link";
import AuthCheck from "@/components/AuthCheck";
import { SignInButton, SignOutButton } from "@/components/AuthButtons";
import { Twirl as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NavBar() {
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        let resizeTimer: any;

        function handleResize() {
            cancelAnimationFrame(resizeTimer);
            resizeTimer = requestAnimationFrame(() => {
                if (window.innerWidth > 1024 && isOpen) {
                    setOpen(false);
                }
            });
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isOpen]);

    return (
        <>
            <nav className="fixed w-full top-0 left-0 z-40">
                <div
                    className={`mx-auto w-full px-5 sm:px-9 md:px-10 xl:px-12 h-16 border-b ${
                        isOpen ? "bg-white" : "bg-navigationBarBlue"
                    }`}
                >
                    <div className={`h-16 mx-auto max-w-8xl flex items-center justify-between ${isOpen ? "text-black" : "text-offWhite"}`}>
                        <div className="flex flex-1 gap-8 font-semibold ">
                            <Link className="text-2xl font-bold m-2" href={"/"}>
                                SuburbIQ
                            </Link>
                            {/* <li>
                        <Link href={"/test"} className="text-purple-500 font-bold text-2xl">
                            Test
                        </Link>
                    </li> */}
                        </div>

                        <div className="my-auto  mr-2 text-offWhite">
                            <ul className="flex flex-row place-items-center font-semibold list-none space-x-4">
                                <li className="hidden lg:block">
                                    <AuthCheck>
                                        <Link href={"/dashboard"}>Dashboard</Link>
                                    </AuthCheck>
                                </li>

                                <li className="hidden lg:block">
                                    <SignInButton />
                                </li>

                                <li className="hidden lg:block">
                                    <Button className="rounded-sm py-2 px-5 bg-white text-navigationBarBlue hover:bg-hoverBlue hover:shadow-sm hover:text-black">
                                        Get Started
                                        <Link href={"/dashboard/sign-up"}></Link>
                                    </Button>
                                </li>

                                <li className="hidden lg:block">
                                    <AuthCheck>
                                        <SignOutButton />
                                    </AuthCheck>
                                </li>
                            </ul>
                            <div className={`lg:hidden`}>
                                <Hamburger
                                    toggled={isOpen}
                                    toggle={setOpen}
                                    size={20}
                                    direction="left"
                                    duration={0.7}
                                    distance="md"
                                    color={`${isOpen ? "#000000" : "#FFFFFF"}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Expanded Hamburger menu */}
            {isOpen && (
                <nav id="mobile-nav" className="lg:hidden fixed inset-x-0 bottom-0 top-16 z-50 overflow-x-hidden bg-white">
                    <div className="flex flex-col fixed bottom-0 left-0 top-16 w-screen overflow-y-hidden  ">
                        <ul className="flex flex-col w-full leading-tight ">
                            <li className="hover:underline hover:underline-offset-1">
                                <AuthCheck>
                                    <button className="flex items-center justify-between h-16 w-full py-3 pl-7 pr-10 sm:pl-12 sm:pr-14 border-b hover:bg-hoverBlue">
                                        <Link href="/dashboard/">Dashboard</Link>
                                        <ArrowRight strokeWidth={1} />
                                    </button>
                                </AuthCheck>
                            </li>
                            <li className="m-0 bg-none p-0 inset-x-0 w-full">
                                <button className="flex items-center justify-between h-16 w-full py-3 pl-7 pr-10 sm:pl-12 sm:pr-14 border-b hover:bg-hoverBlue">
                                    About
                                    <ArrowRight strokeWidth={1} />
                                </button>
                            </li>
                            <li className="m-0 bg-none p-0 inset-x-0 w-full">
                                <button className="flex items-center justify-between h-16 w-full py-3 pl-7 pr-10 sm:pl-12 sm:pr-14 border-b hover:bg-hoverBlue">
                                    Contact Us
                                    <ArrowRight strokeWidth={1} />
                                </button>
                            </li>
                        </ul>
                        <div className="mb-20 mt-auto flex flex-col items-center gap-3 p-5 md:flex-row md:gap-6 md:p-6 md:px-9">
                            <Button className="h-10 w-full px-4 py-3 bg-gray text-black">
                                <Link href="/dashboard/sign-in">Sign in</Link>
                            </Button>
                            <Button className="h-10 w-full px-4 py-3 bg-navigationBarBlue">
                                <Link href="/dashboard/sign-up"> Get started</Link>
                            </Button>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}
