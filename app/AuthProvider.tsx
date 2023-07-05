"use client";

// Get the current user server and client-side

import { SessionProvider } from "next-auth/react";

type Props = {
    children: React.ReactNode;
};

// Children prop wrapped by <SessionProvider> allows any client-side components nested below this to access the current user
export default function AuthProvider({ children }: Props) {
    return <SessionProvider>{children}</SessionProvider>;
}
