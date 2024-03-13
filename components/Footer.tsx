"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
    // * Check auth
    // Handle auth state
    const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(false);

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

    return (
        <div className="w-full h-full pt-10 pb-32 lg:pt-16 mx-auto px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px] bg-footerBlue">
            <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col w-48 ">
                    <Link className="font-inter700 text-2xl" href={"/"}>
                        Suburb IQ
                    </Link>
                </div>

                {/* Hide sign-in/sign-up if user is logged in and authenticated */}

                {isEmailVerified ? (
                    <>
                        <div className="flex flex-col w-48 mobile-s:max-lg:mt-4 space-y-2">
                            <h1 className="font-inter600">Support</h1>
                            <a data-canny-link href="https://suburbiq.canny.io/feature-requests" target="_blank" className="w-44">
                                Request a new feature
                            </a>
                            {/* <a href={"https://suburb-iq.canny.io/bug-reports-features-requests"} target="_blank" className="w-28">
                        Report a bug
                    </a> */}
                            <a
                                href="mailto:suburb.iq.feedback@gmail.com?subject=Feedback&body=Hi Suburb IQ team, "
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-24"
                            >
                                Contact us
                            </a>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col w-48 mobile-s:max-lg:mt-4 space-y-2 ">
                            <h1 className="font-inter600">Get started</h1>
                            <Link href="/dashboard/sign-in" className="w-14">
                                Sign in
                            </Link>
                            <Link href="/dashboard/sign-up" className="w-16">
                                Sign up
                            </Link>
                        </div>
                        <div className="flex flex-col w-48 mobile-s:max-lg:mt-10 space-y-2">
                            <h1 className="font-inter600">Support</h1>
                            <a data-canny-link href="https://suburbiq.canny.io/feature-requests" target="_blank" className="w-44">
                                Request a new feature
                            </a>
                            {/* <a href={"https://suburb-iq.canny.io/bug-reports-features-requests"} target="_blank" className="w-28">
                        Report a bug
                    </a> */}
                            <a
                                href="mailto:suburb.iq.feedback@gmail.com?subject=Feedback&body=Hi Suburb IQ team, "
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-24"
                            >
                                Contact us
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
