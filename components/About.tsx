import ExampleFTE from "./(graphs)/(employment)/ExampleFTE";

export default function About() {
    return (
        <div className="pt-16 mb-10 ">
            <div className="flex flex-col place-items-center w-full max-h-96 mx-auto px-5 sm:px-9 md:px-10 lg:px-12 ">
                <div className="w-full mx-auto max-w-8xl pt-16 md:pb-8  md:pt-24 ">
                    <div className="flex flex-col w-full">
                        <h1 className="w-full max-w-[95%] mr-auto mb-6 font-inter600 tracking-tighter text-5xl leading-tight">
                            Visualising demographic trends across Australian suburbs
                        </h1>
                        <h2 className="min-w-min max-w-[85%] font-inter font-normal sm:text-lg tracking-normal ">
                            Whether you're planning to <span className="font-bold">relocate, invest, or simply explore</span>, our mission
                            is to provide insightful details about Australian suburbs -{" "}
                            <span className="bg-slate-100 underline underline-offset-4 decoration-1 hover:bg-hoverBlue hover:decoration-2 hover:font-bold">
                                all in one spot.
                            </span>
                        </h2>
                    </div>
                    <div className="flex md:flex-row flex-col">
                        <div className="flex flex-col md:mx-4">
                            <h1 className="mt-10 font-inter700">Discover employment trends in a suburb</h1>
                        </div>

                        <div className="">
                            <ExampleFTE selectedSuburb={""}></ExampleFTE>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
