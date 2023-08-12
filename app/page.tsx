import SearchBar from "@/components/SearchBar";
import { createServerComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import AuthForm from "./AuthForm";
import { cookies } from "next/headers";

export default async function Home() {
    // * Retrieve current session
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();
    console.log(`data:${session}`, `error: ${error}`);

    return (
        <main>
            <section id="About" className="flex flex-col flex-wrap items-center">
                <h1 className="mt-10 text-2xl">Find out more about the suburb you want to buy or rent in</h1>
                <div>
                    <SearchBar />
                </div>

                <div className="border border-gray-300 rounded-md p-6">
                    {session ? (
                        <p className="text-center">Welcome, {session?.user.user_metadata?.name}!</p>
                    ) : (
                        "Welcome! Please sign in below."
                    )}

                    <AuthForm />
                </div>
            </section>
        </main>
    );
}
