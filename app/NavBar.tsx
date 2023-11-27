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
                            <ul className="flex flex-row place-items-center font-semibold list-none">
                                <li className="hidden lg:block">
                                    <AuthCheck>
                                        <Link href={"/dashboard"}>Dashboard</Link>
                                    </AuthCheck>
                                </li>
                                <li className="hidden lg:block">
                                    <SignInButton />
                                </li>

                                <li className="hidden lg:block">
                                    <Link href={"/dashboard/sign-up"}>Get Started</Link>
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
            {isOpen && <Hamburger />}
        </>
    );
}
