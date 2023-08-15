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
    const supabase = createClientComponentClient();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        async function fetchSession() {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setSession(session?.user.user_metadata.isEmailVerified);
        }

        fetchSession();
    }, [session]);

    // if (session?.user?.user_metadata?.email_verified === true) {
    //     return <Image src={session.user.user_metadata.picture} alt="Profile Picture" width={32} height={32} />;
    // }

    return <Link href="/dashboard/sign-in">Sign In</Link>;
}

export function SignOutButton() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    async function LogOut() {
        let { error } = await supabase.auth.signOut();
        if (!error) {
            console.log("signing out");
            console.log(error);
            router.push("/");
        }
    }

    return <button onClick={LogOut}>Sign Out Mofo</button>;
}
