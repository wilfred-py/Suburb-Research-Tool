// The `/auth/callback` route is required for the server-side auth flow implemented
// by the Auth Helpers package. It exchanges an auth code for the user's session.

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
        const supabase = createRouteHandlerClient({ cookies });
        await supabase.auth.exchangeCodeForSession(code);

        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        console.log("Proof Key for Code Exchange successful\nSigned in with oAuth");
        console.log(session);

        supabase.auth.onAuthStateChange((event, session) => {
            if (event == "SIGNED_IN") console.log("SIGNED_IN", session);
        });
    } else {
        console.error("Problem with PKCE flow");
    }

    // Redirect user back to the same URL they came from after the sign-in process completes
    // return NextResponse.redirect(requestUrl.origin);
    return NextResponse.redirect("https://www.suburbiq.com/dashboard");
}
