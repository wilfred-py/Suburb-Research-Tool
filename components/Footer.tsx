import Link from "next/link";

export default function Footer() {
    return (
        <div className="w-full h-96 pt-10 mx-auto px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px] bg-footerBlue">
            <div className="flex flex-col mt-2 ">
                <div className="flex flex-col ">
                    <Link href="/" className="font-inter700 text-2xl">
                        Suburb IQ
                    </Link>
                </div>

                <div className="flex flex-col mt-4 space-y-2">
                    <h1 className="font-inter600">Get started</h1>
                    <Link href="/dashboard/sign-in">Sign in</Link>
                    <Link href="/dashboard/sign-up">Sign up</Link>
                </div>

                <div className="flex flex-col mt-10 space-y-2">
                    <h1 className="font-inter600">Support</h1>
                    <a
                        href="mailto:suburb.iq.feedback@gmail.com?subject=Feedback&body=Hi Suburb IQ team, "
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contact us
                    </a>
                    <a href={"https://suburb-iq.canny.io/bug-reports-features-requests"} target="_blank">
                        Report a bug
                    </a>
                    <a href={"https://suburb-iq.canny.io/bug-reports-features-requests"} target="_blank">
                        <span className="">Request a new feature</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
