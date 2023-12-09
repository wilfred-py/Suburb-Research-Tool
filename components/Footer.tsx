import Link from "next/link";

export default function Footer() {
    return (
        <div className="w-full h-96 mx-auto px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px] bg-footerBlue">
            <div className="flex flex-row bg-red mt-10 ">
                <div className="flex flex-col ">
                    <Link href="/" className="font-inter700 text-2xl">
                        Suburb IQ
                    </Link>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-inter500">Get started</h1>
                    <Link href="/dashboard/sign-in">Sign in</Link>
                    <Link href="/dashboard/sign-up">Sign up</Link>
                </div>
                <div className="flex flex-col">
                    <h1>Support</h1>
                    <Link href="">Message</Link>
                    <Link href="">Report a bug</Link>
                    <Link href="">Request a feature</Link>
                </div>
            </div>
        </div>
    );
}
