import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import About from "@/components/About";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

import Highlights from "@/components/Highlights";
import NavBar from "./NavBar";

export default async function Home() {
    return (
        <div>
            <header className="relative z-[999]">
                <NavBar />
            </header>
            <main>
                <section id="About" className="relative">
                    <About />
                </section>
                <section id="Suburb-Highlights">
                    <Highlights />
                </section>
                {/* <section id="Call-To-Action">
                    <CallToAction />
                </section> */}
            </main>
            {/* <footer>
                <Footer />
            </footer> */}
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
