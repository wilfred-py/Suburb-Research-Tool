"use client";

import Link from "next/link";
import AuthCheck from "@/components/AuthCheck";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SignInButton, HamburgerSignOutButton, NavSignOutButton } from "@/components/AuthButtons";
import { Twirl as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NavBar() {
    // Handle hamburger open state
    const [isOpen, setOpen] = useState(false);

    // Handle auth state
    const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(false);

    // * Check auth
    useEffect(() => {
        const supabase = createClientComponentClient();

        // Set up an auth state change listener
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT") {
                setIsEmailVerified(false);
            } else if (event === "SIGNED_IN" && session?.user?.user_metadata?.email_verified) {
                setIsEmailVerified(true);
            } else {
                setIsEmailVerified(false);
            }
        });

        // Initial check
        checkEmailVerification();
    }, []);

    async function checkEmailVerification() {
        const supabase = createClientComponentClient();
        const {
            data: { session },
        } = await supabase.auth.getSession();
        if (session?.user?.user_metadata.email_verified) {
            setIsEmailVerified(true);
        } else {
            setIsEmailVerified(false);
        }
    }

    // * Close hamburger menu if width > 1024px
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
                    className={`mx-auto w-full px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px] h-16 border-b ${
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
                                {isEmailVerified && (
                                    <li className="hidden lg:block mr-4">
                                        <Link href={"/dashboard"}>Dashboard</Link>
                                    </li>
                                )}

                                <li className="hidden lg:block">
                                    <SignInButton />
                                </li>

                                {!isEmailVerified && (
                                    <li className="hidden lg:block">
                                        <Button className="rounded-sm py-2 px-5 bg-white text-navigationBarBlue hover:bg-hoverBlue hover:shadow-sm hover:text-black">
                                            Get Started
                                            <Link href={"/dashboard/sign-up"}></Link>
                                        </Button>
                                    </li>
                                )}

                                {isEmailVerified && (
                                    <li className="hidden lg:block">
                                        <NavSignOutButton />
                                    </li>
                                )}
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
                            {isEmailVerified && (
                                <li className="hover:underline hover:underline-offset-1">
                                    <button className="flex items-center justify-between h-16 w-full py-3 pl-7 pr-10 sm:pl-12 sm:pr-14 border-b hover:bg-hoverBlue">
                                        <Link href="/dashboard/">Dashboard</Link>
                                        <ArrowRight strokeWidth={1} />
                                    </button>
                                </li>
                            )}
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
                        {!isEmailVerified && (
                            <div className="mb-20 mt-auto flex flex-col items-center gap-3 p-5 md:flex-row md:gap-6 md:p-6 md:px-9">
                                <Button className="h-10 w-full px-4 py-3 bg-gray text-black">
                                    <Link href="/dashboard/sign-in">Sign in</Link>
                                </Button>
                                <Button className="h-10 w-full px-4 py-3 bg-navigationBarBlue">
                                    <Link href="/dashboard/sign-up"> Get started</Link>
                                </Button>
                            </div>
                        )}
                        {isEmailVerified && (
                            <div className="mb-20 mt-auto flex flex-col items-center gap-3 p-5 md:flex-row md:gap-6 md:p-6 md:px-9">
                                <HamburgerSignOutButton />
                            </div>
                        )}
                    </div>
                </nav>
            )}
        </>
    );
}
