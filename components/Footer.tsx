import Link from "next/link";

export default function Footer() {
    return (
        <div className="w-full h-96 mx-auto px-5 sm:px-9 md:px-10 lg:px-12 bg-footerBlue">
            <div className="flex flex-col">
                <h1 className="text-2xl font-inter700 text-center">Suburb IQ</h1>
                <Link href="/dashboard/sign-in">Sign in</Link>
                <Link href="/dashboard/sign-up"> Get started</Link>
            </div>
        </div>
    );
}
