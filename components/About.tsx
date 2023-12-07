export default function About() {
    return (
        <div className="pt-16 mb-10 ">
            <div className="flex flex-col place-items-center w-full h-full mx-auto px-5 sm:px-9 md:px-10 lg:px-12">
                <div className="w-full mx-auto max-w-8xl pt-16 md:pb-8 md:pt-20 ">
                    <div className="flex flex-col w-full">
                        <h1 className="w-full max-w-[95%] mr-auto mb-6 font-inter600 tracking-tighter text-5xl leading-tight">
                            Visualising demographic trends across Australian suburbs
                        </h1>
                        <h2 className="min-w-min max-w-[85%] mb-6 font-inter font-normal sm:text-lg tracking-normal ">
                            Providing investors historical socioeconomic data in digestable graphs
                        </h2>
                    </div>
                    <hr></hr>
                </div>
            </div>
        </div>
    );
}
