import "@fortawesome/fontawesome-svg-core/styles.css";
import About from "@/components/About";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

// Import client components with Lazy Loading

// import Highlights from "@/components/Highlights";
// import NavBar from "./NavBar";
// import FAQs from "@/components/FAQs";

const Highlights = dynamic(() => import('../components/Highlights'))
const NavBar = dynamic(() => import('../app/NavBar'))
const FAQs = dynamic(() => import('../components/FAQs'))


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
                <section id="Frequent-Asked-Questions">
                    <FAQs />
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
