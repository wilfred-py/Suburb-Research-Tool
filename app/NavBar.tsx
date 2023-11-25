"use client";

import Link from "next/link";
import AuthCheck from "@/components/AuthCheck";
import { SignInButton, SignOutButton } from "@/components/AuthButtons";
import { Twirl as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function NavBar() {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <nav className="fixed w-full top-0 left-0 z-40">
                <div
                    className={`mx-auto w-full px-5 sm:px-9 md:px-10 xl:px-12 h-16 
                
                ${isOpen ? "bg-white" : "bg-navigationBarBlue"}
                
                
                `}
                >
                    <div
                        className={`h-16 mx-auto max-w-8xl flex items-center justify-between 
                    
                    ${isOpen ? "text-black" : "text-offWhite"}
                    `}
                    >
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

                        <div className="my-auto xl:pr-24 lg:pr-24 md:pr-24 mr-2 text-offWhite">
                            <ul className="flex flex-row place-items-center font-semibold list-none">
                                <li className="hover:underline hover:underline-offset-1">
                                    <AuthCheck>
                                        <Link href={"/dashboard"} className="mx-3">
                                            Dashboard
                                        </Link>
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
                            <div className="bg-red lg:hidden">
                                <Hamburger toggled={isOpen} toggle={setOpen} size={20} direction="left" duration={0.7} distance="md" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {isOpen && (
                <nav id="mobile-nav" className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-x-hidden bg-white">
                    <div className="flex flex-col fixed bottom-0 left-0 top-16 w-screen overflow-y-hidden bg-pastelPink">
                        <ul className="flex flex-col w-full leading-tight ">
                            <li className="m-0 bg-none p-0 inset-x-0 w-full">
                                <Button>About</Button>
                            </li>
                            <li className="m-0 bg-none p-0 inset-x-0 w-full">
                                <Button>Contact Us</Button>
                            </li>
                        </ul>
                        <div className="mb-20 mt-auto flex flex-col items-center gap-3 p-5 md:flex-row md:gap-6 md:p-6 md:px-9">
                            <Button className="h-10 w-full px-4 py-3">
                                <Link href="/dashboard/sign-in"> Sign in</Link>
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
