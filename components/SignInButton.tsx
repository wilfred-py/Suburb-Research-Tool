"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
    // Show user's avatar if user is signed in
    // Show button if user is not signed in
    const { data: session, status } = useSession();
    console.log(session, status);

    if (status === "loading") {
        return <>...</>;
    }

    if (status === "authenticated") {
        return (
            <Link href={`/suburb`}>
                <Image src={session.user?.image ?? "/default-avatar.webp"} width={32} height={32} alt="Your Name" />
            </Link>
        );
    }

    return <button onClick={() => signIn()}></button>;
}
export function SignOutButton() {
    return <button onClick={() => signOut()}>Sign Out</button>;
}
