"use client";

import Link from "next/link";
import AuthCheck from "@/components/AuthCheck";
import { SignInButton, SignOutButton } from "@/components/AuthButtons";
import { Twirl as Hamburger } from "hamburger-react";
import { useState } from "react";

export default function NavBar() {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <nav className="w-full sticky top-0 left-0 z-50">
                <div className="mx-auto w-full px-5 sm:px-9 md:px-10 xl:px-12 h-16 bg-navigationBarBlue">
                    <div className="h-16 mx-auto max-w-8xl flex items-center justify-between text-offwhite ">
                        <div className="flex flex-1 gap-8 font-semibold ">
                            <Link className="text-2xl font-bold m-2" href={"/"}>
                                Suburb IQ
                            </Link>
                            {/* <li>
                        <Link href={"/test"} className="text-purple-500 font-bold text-2xl">
                            Test
                        </Link>
                    </li> */}
                        </div>

                        <div className="my-auto xl:pr-24 lg:pr-24 md:pr-24 mr-2 text-offwhite bg-pastelPink">
                            <ul className="flex flex-row place-items-center font-semibold list-none">
                                <li className="hover:underline hover:underline-offset-1">
                                    <AuthCheck>
                                        <Link href={"/dashboard"} className="mx-3">
                                            Dashboard
                                        </Link>
                                    </AuthCheck>
                                </li>
                                <li className="hidden sm:block">
                                    <SignInButton />
                                </li>
                                <li className="hidden sm:block">
                                    <AuthCheck>
                                        <SignOutButton />
                                    </AuthCheck>
                                </li>
                            </ul>
                            <div className="bg-red sm:hidden">
                                <Hamburger toggled={isOpen} toggle={setOpen} size={20} direction="left" duration={0.7} distance="md" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {isOpen && (
                <nav id="mobile-nav">
                    <div className="bg-pastelPink">
                        <h1>TEST</h1>
                    </div>
                </nav>
            )}
        </>
    );
}
