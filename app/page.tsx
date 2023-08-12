import SearchBar from "@/components/SearchBar";
import { createClientComponentClient, createServerComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import AuthForm from "./AuthForm";
import { Database } from "./database.types";
import Login from "./login";
import { supabase } from "./supa-client";
import { adminAuthClient } from "./AuthAdmin";

export default async function Home() {
    // // * THIS IS WORKING
    // const {
    //     data: { users },
    //     error,
    // } = await adminAuthClient.listUsers();

    // console.log("users_list:", users);
    // // * THIS IS WORKING

    // * Retrieve user from current session
    // const {
    //     data: { user },
    // } = await supabase.auth.getUser();
    // console.log("****user:", user);
    // "user: undefined"

    // * Retrieve current session
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();
    console.log(`data:${session}`, `error: ${error}`);
    // data:null error: null

    // * Retreive a new session
    // const { data, error } = await supabase.auth.refreshSession();
    // const { session, user } = data;
    // console.log(data, session, user);

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
                {/* <div>
                    <Login />
                </div> */}
                {/* <h1 className="font-bold">Users:</h1>
                {users.map((user) => (
                    <p key={user.id}>{user.email}</p>
                ))} */}

                <h1>Hello</h1>
                <p>{session?.user.user_metadata?.full_name}</p>
            </section>
        </main>
    );
}
