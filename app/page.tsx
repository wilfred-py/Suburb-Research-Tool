import SearchBar from "@/components/SearchBar";
import AuthForm from "./AuthForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
    const supabase = createServerComponentClient({ cookies });
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
