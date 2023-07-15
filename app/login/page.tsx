"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email: "test@gmail.com",
            password: "supabase",
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });
        router.refresh();
    };
    const handleSignIn = async () => {
        await supabase.auth.signInWithPassword({
            email: "example@email.com",
            password: "example-password",
        });
        router.refresh();
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <div className="flex gap-2">
            <button onClick={handleSignUp}>Sign up</button>
            <button onClick={handleSignIn}>Sign in</button>
            <button onClick={handleSignOut}>Sign out</button>
        </div>
    );
}
