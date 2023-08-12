import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Database } from "../database.types";
import { cookies } from "next/headers";

export default async function Dashboard() {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    // console.log(`data:${session}`, `error: ${error}`);
    console.log(session);

    return (
        <div>
            Hello
            <p>{session?.user.user_metadata.full_name}</p>
        </div>
    );
}
