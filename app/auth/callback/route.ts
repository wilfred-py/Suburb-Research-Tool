// The `/auth/callback` route is required for the server-side auth flow implemented
// by the Auth Helpers package. It exchanges an auth code for the user's session.

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    // The `/auth/callback` route is required for the server-side auth flow implemented
    // by the Auth Helpers package. It exchanges an auth code for the user's session.
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    console.log("Proof Key for Code Exchange successful");

    if (code) {
        const supabase = createRouteHandlerClient({ cookies });
        await supabase.auth.exchangeCodeForSession(code);

        console.log("signed in with oauth");
        supabase.auth.onAuthStateChange((event, session) => {
            if (event == "SIGNED_IN") console.log("SIGNED_IN", session);
        });

        const { data, error } = await supabase.auth.getSession();

        console.log(data);
    }

    // Redirect user back to the same URL they came from after the sign-in process completes
    // return NextResponse.redirect(requestUrl.origin);
    return NextResponse.redirect("http://localhost:3000/suburb/Abbotsford+NSW+2046");
}
