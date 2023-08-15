"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
    const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);

    useEffect(() => {
        const checkEmailVerification = async () => {
            const supabase = createClientComponentClient();
            const {
                data: { session },
            } = await supabase.auth.getSession();

            console.log(session);
            console.log(session?.user.user_metadata.email_verified);

            if (session?.user.user_metadata.email_verified === true) {
                setIsEmailVerified(true);
            } else {
                setIsEmailVerified(false);
            }
        };

        checkEmailVerification();
    }, []);

    console.log(`Email Verification Status: ${isEmailVerified}`);

    if (isEmailVerified === null) {
        // Loading state or some other indicator
        return <></>;
    } else if (isEmailVerified) {
        return <>{children}</>;
    } else {
        return <></>;
    }
}
