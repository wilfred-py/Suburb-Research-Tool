import NavMenu from "./NavMenu";

export default async function Home() {
    return (
        <div>
            <main>
                <section id="About" className="flex flex-col flex-wrap place-items-center">
                    <h1>Landing Page Details</h1>
                </section>
            </main>
        </div>
    );
}

// ? There are 5 ways to access the Supabase client with the Next.js Auth Helpers:

// *Client Components
// createClientComponentClient in Client Components

// *Server Components
// createServerComponentClient in Server Components

// *Server Actions
// createServerActionClient in Server Actions

// *Route Handlers
// createRouteHandlerClient in Route Handlers

// *Middleware
// createMiddlewareClient in Middleware
