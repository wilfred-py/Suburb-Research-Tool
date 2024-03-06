// * Use Middleware to refresh the user's session before loading Server Component routes
// Next.JS Middleware will run before each route is rendered

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "./app/database.types";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient<Database>({ req, res });

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    await supabase.auth.getSession();

    console.log(res);

    return res;
}
