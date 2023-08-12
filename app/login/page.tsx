"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Database } from "../database.types";

export default function Login() {
    // state to manage email
    const [email, setEmail] = useState("");

    // state to manage password
    const [password, setPassword] = useState("");

    // initialise useRouter hook from next/navigation
    const router = useRouter();

    // create Supabase client in client component
    const supabase = createClientComponentClient<Database>();

    // async function to handle signup
    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });
        router.refresh();
    };

    const handleSignIn = async () => {
        await supabase.auth.signInWithPassword({
            email,
            password,
        });
        router.refresh();
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <div className="flex flex-col place-items-center">
            <input className="max-w-xl border border-black" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <input
                className="max-w-xl border border-black"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={handleSignUp}>Sign up</button>
            <button onClick={handleSignIn}>Sign in</button>
            <button onClick={handleSignOut}>Sign out</button>
        </div>
    );
}
