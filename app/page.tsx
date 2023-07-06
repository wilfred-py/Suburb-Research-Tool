import SearchBar from "@/components/SearchBar";
import AuthForm from "./AuthForm";

export default async function Home() {
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
