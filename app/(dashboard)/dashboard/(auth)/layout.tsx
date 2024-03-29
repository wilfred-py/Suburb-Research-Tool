import Image from "next/image";
import Link from "next/link";
import image from "@/public/Auth_Page_Images/Suburb Top-down.jpg";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="min-h-screen flex-1 flex flex-row overflow-hidden">
            <div id="left-panel" className="flex flex-col relative lg:w-1/3 w-full ">
                <div id="logo" className="xl:px-auto p-10 mobile-s:max-lg:bg-navigationBarBlue">
                    <Link className="text-2xl font-bold mobile-s:max-lg:text-white" href={"/"}>
                        SuburbIQ
                    </Link>
                </div>

                {/* Auth Form */}
                <div className="flex-1 flex flex-col mobile-s:max-lg:pt-24 mobile-s:max-lg:place-items-center lg:justify-center lg:place-items-center">
                    <div className="min-w-[242px]">{children}</div>
                </div>
            </div>

            <div id="right-panel" className="flex flex-col flex-1 relative lg:w-2/3 w-full justify-center items-center max-lg:hidden">
                {/* <h1 className="px-10 text-offWhite text-3xl font-inter600">Discover demographic trends in Australia's suburbs</h1>
                    <h2 className="w-full pt-6 px-10 text-offWhite">
                        Join the growing community of buyers and renters using Suburb IQ to help them make more informed decisions before
                        buying a home or investment.
                    </h2> */}
                {/* <Image fill={true} src={"/../Auth_Page_Images/Adelaide.jpg"} alt="Adelaide Photo" className="object-cover" /> */}
                <div>
                    <Image
                        fill={true}
                        src={image}
                        alt="Top-down Suburb Photo"
                        className="object-cover"
                        priority={true}
                        quality={100}
                        placeholder="blur"
                    />
                </div>
            </div>
        </section>
    );
}
