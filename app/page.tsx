import Image from "next/image";

export default function Home() {
    return (
        <main>
            <section id="About" className="landing-page">
                <div className="bg-customYellow text-4xl">
                    <h1>Suburb Research Tool</h1>
                    <p className="text-xs">Find out important details about a suburb before you buy.</p>
                </div>
            </section>
        </main>
    );
}
