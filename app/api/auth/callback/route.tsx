import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import type { Database } from "@/app/database.types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    const supabase = createRouteHandlerClient<Database>({ cookies });

    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(new URL("/", requestUrl.origin));
}
