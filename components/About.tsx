import Link from "next/link";

export default function About() {
    return (
        <div className="flex flex-col place-items-center h-[600px] ">
            <div className="flex flex-col place-items-center sm:mt-32 sm:text-6xl mt-10 w-full">
                <h1 className="w-10/12 font-roboto font-extrabold text-center tracking-normal ">
                    Visualising demographic trends in Australian suburbs
                </h1>
                <p className="m-4 min-w-min max-w-[65%] font-inter font-normal sm:text-lg text-center tracking-normal ">
                    Whether you're planning to <span className="font-bold">relocate, invest, or simply explore</span>, our mission is to
                    provide insightful details about Australian suburbs -{" "}
                    <span className="bg-slate-100 underline underline-offset-4 decoration-1 hover:bg-hoverBlue hover:decoration-2 hover:font-bold">
                        all in one spot.
                    </span>
                </p>
            </div>
            <div className="mt-10">
                <Link
                    href={"/dashboard/sign-up"}
                    className="border border-black bg-buttonBlue 
                    text-white  hover:bg-hoverButtonBlue font-semibold rounded-md p-2 hover:shadow-2xl hover:shadow-buttonPressShadowWhite"
                >
                    Get Started For Free
                </Link>
            </div>
        </div>
    );
}
