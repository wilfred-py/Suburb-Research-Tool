"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

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
        supabase.auth.onAuthStateChange((event: any, session: any) => {
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
    // Set picture url to userPicture state
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
        return <Image src={`${userPicture}`} alt="Profile Picture" width={32} height={32} />;
    }

    // Delay rendering of Link component to allow component to check if user is signed in or not
    return renderSignIn ? (
        <>
            <div>
                <Link href="/dashboard/sign-in" className="flex flex-row">
                    <div className="flex items-center space-x-2 hover:underline hover:underline-offset-1 transform delay-300">
                        <span className="-mr-1 ">Sign In</span>
                        <div className="w-4 h-4 transition-transform duration-300 transform hover:translate-x-1 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    ) : (
        <></>
    );
}

export function HamburgerSignOutButton() {
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

    return (
        <Button
            onClick={LogOut}
            className="h-10 mobile-s:max-mobile-l:w-9/12 mobile-l:w-80  bg-black hover:underline hover:underline-offset-1 shadow-lg"
        >
            Sign Out{" "}
        </Button>
    );
}

export function NavSignOutButton() {
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

    return (
        <Button onClick={LogOut} className="bg-white text-black hover:bg-hoverBlue hover:underline shadow-lg">
            Sign Out{" "}
        </Button>
    );
}
