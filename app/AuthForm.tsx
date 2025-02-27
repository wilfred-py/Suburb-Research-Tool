"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database.types";

export default function AuthForm() {
    const supabase = createClientComponentClient<Database>();

    return (
        <Auth
            supabaseClient={supabase}
            view="magic_link"
            appearance={{ theme: ThemeSupa }}
            theme="light"
            showLinks={false}
            providers={["google"]}
            redirectTo="http://www.suburbiq.com/auth/callback"
        />
    );
}
