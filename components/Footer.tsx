import Link from "next/link";

export default function Footer() {
    return (
        <div className="w-full h-96 pt-10 mx-auto px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-40 3xl:px-52 4xl:px-72 5xl:px-96 6xl:px-[440px] 7xl:px-[500px] 8xl:px-[600px] bg-footerBlue">
            <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col ">
                    <h1 className="font-inter700 text-2xl">Suburb IQ</h1>
                </div>

                <div className="flex flex-col sm:max-lg:mt-4 space-y-2">
                    <h1 className="font-inter600">Get started</h1>
                    <Link href="/dashboard/sign-in" className="inline-block w-1/4">
                        Sign in
                    </Link>
                    <Link href="/dashboard/sign-up" className="w-1/4">
                        Sign up
                    </Link>
                </div>

                <div className="flex flex-col mt-10 space-y-2">
                    <h1 className="font-inter600">Support</h1>
                    <a href={"https://suburb-iq.canny.io/bug-reports-features-requests"} target="_blank">
                        <span className="inline-block">Request a new feature</span>
                    </a>
                    <a href={"https://suburb-iq.canny.io/bug-reports-features-requests"} target="_blank">
                        Report a bug
                    </a>
                    <a
                        href="mailto:suburb.iq.feedback@gmail.com?subject=Feedback&body=Hi Suburb IQ team, "
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contact us
                    </a>
                </div>
            </div>
        </div>
    );
}
