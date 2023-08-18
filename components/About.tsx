export default function About() {
    return (
        <div className="bg-landingPage flex flex-col flex-wrap place-items-center h-[600px] ">
            <div className="mt-32 flex flex-col flex-wrap place-items-center max-w-4xl">
                <h1 className="w-10/12 font-roboto font-extrabold text-6xl text-center tracking-normal leading-[65px]">
                    Comprehensive Insights
                </h1>
                <h1 className="w-10/12 font-roboto font-extrabold text-6xl text-center tracking-normal leading-[65px]">
                    into Australian Suburbs
                </h1>
                <p className="m-4 min-w-min max-w-[65%] font-inter font-normal text-lg text-center tracking-normal leading-7">
                    Whether you're planning to <span className="font-bold">relocate, invest, or simply explore</span>, our mission is to
                    provide insightful details about Australian suburbs -{" "}
                    <span className="bg-slate-100 underline underline-offset-4 decoration-1 hover:bg-hoverBlue hover:decoration-2">
                        all in one convenient location
                    </span>
                    .
                </p>
            </div>
            <div className="mt-10">
                <button className="border border-black bg-deepDarkBlue text-white font-semibold rounded-md p-2 hover:text-blue-200 hover:shadow-xl hover:shadow-slate-200">
                    Get Started For Free
                </button>
            </div>
        </div>
    );
}
