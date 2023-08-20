"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
    const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);

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

    // Initial Check

    // useEffect(() => {
    //     const checkEmailVerification = async () => {
    //         const supabase = createClientComponentClient();
    //         const {
    //             data: { session },
    //         } = await supabase.auth.getSession();

    //         console.log(session);
    //         console.log(session?.user.user_metadata.email_verified);

    //         if (session?.user.user_metadata.email_verified === true) {
    //             setIsEmailVerified(true);
    //         } else if (!session) {
    //             console.log("no email");
    //             setIsEmailVerified(false);
    //         }
    //     };
    //     checkEmailVerification();
    // }, [isEmailVerified]);

    // console.log(`Email Verification Status: ${isEmailVerified}`);

    if (isEmailVerified === null) {
        // Loading state or some other indicator
        return <></>;
    } else if (isEmailVerified) {
        return <>{children}</>;
    } else {
        return <></>;
    }
}
