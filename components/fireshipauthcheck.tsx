"use client";

import { useSession } from "next-auth/react";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
    // Access current session and user status using useSession hook
    const { data: session, status } = useSession();

    console.log(session, status);

    if (status === "authenticated") {
        return <>{children}</>;
    } else {
        return <></>;
    }
}
