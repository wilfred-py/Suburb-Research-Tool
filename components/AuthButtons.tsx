"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface Session {
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    sub: string;
    email: string;
    phone: string;
    app_metadata: AppMetadata;
    user_metadata: UserMetadata;
    role: string;
    aal: string;
    amr: AMR[];
    session_id: string;
}

export interface AMR {
    method: string;
    timestamp: number;
}

export interface AppMetadata {
    provider: string;
    providers: string[];
}

export interface UserMetadata {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    picture: string;
    provider_id: string;
    sub: string;
}

export function SignInButton() {
    const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [userPicture, setUserPicture] = useState("");
    const [renderSignIn, setRenderSignIn] = useState(false);

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

    useEffect(() => {
        if (isEmailVerified === false) {
            const timer = setTimeout(() => {
                setRenderSignIn(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isEmailVerified]);

    // * Check if signed in user has verified their email
    // Set session
    async function checkEmailVerification() {
        const supabase = createClientComponentClient();
        const {
            data: { session },
        } = await supabase.auth.getSession();
        setUserPicture(session?.user.user_metadata.picture);
        if (session?.user?.user_metadata.email_verified) {
            setIsEmailVerified(true);
        } else {
            setIsEmailVerified(false);
        }
    }

    // *If user is signed in, show their profile picture from the session's user_meta data
    if (isEmailVerified === true) {
        console.log("(SignInButton) Email is Verified");
        return <Image src={`${userPicture}`} alt="Profile Picture" width={32} height={32} />;
    }
    // Delay rendering of Link component to allow component to check if user is signed in or not
    return renderSignIn ? <Link href="/dashboard/sign-in">Sign In</Link> : <></>;
}

export function SignOutButton() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    async function LogOut() {
        let { error } = await supabase.auth.signOut();
        if (!error) {
            console.log("Signing Out...");
            console.log(error);
            router.push("/");
        }
    }

    return <button onClick={LogOut}>Sign Out Mofo</button>;
}
