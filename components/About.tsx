import Link from "next/link";

export default function About() {
    return (
        <div className="pt-16">
            <div className="flex flex-col place-items-center w-full max-h-96  mx-auto px-5 sm:px-9 md:px-10 lg:px-12">
                <div className="w-full mx-auto max-w-8xl py-16 md:pt-28">
                    <div className="flex flex-col w-full gap-8">
                        <h1 className="w-full max-w-[70%] mr-auto font-inter600 tracking-tighter text-5xl leading-tight">
                            Visualising demographic trends across Australian suburbs
                        </h1>
                        <h2 className="min-w-min max-w-[65%] font-inter font-normal sm:text-lg  tracking-normal ">
                            Whether you're planning to <span className="font-bold">relocate, invest, or simply explore</span>, our mission
                            is to provide insightful details about Australian suburbs -{" "}
                            <span className="bg-slate-100 underline underline-offset-4 decoration-1 hover:bg-hoverBlue hover:decoration-2 hover:font-bold">
                                all in one spot.
                            </span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
