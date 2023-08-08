import SearchBar from "@/components/SearchBar";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import AuthForm from "./AuthForm";
import { Database } from "./database.types";

export default async function Home({ session }: { session: Session | null }) {
    if (session) {
        console.log("User is logged in:", session.user);
    } else {
        console.log("User is not logged in.");
    }

    return (
        <main>
            <section id="About" className="flex flex-col flex-wrap items-center">
                <h1 className="mt-10 text-2xl">Find out more about the suburb you want to buy or rent in</h1>
                <div>
                    <SearchBar />
                </div>
                <div className="col-6 auth-widget">
                    <AuthForm />
                </div>
            </section>
        </main>
    );
}
