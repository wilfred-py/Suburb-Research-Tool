import ExampleFTE from "./(graphs)/(employment)/(examples)/ExampleFTE";
import ExamplePartTimeEmploymentLineGraph from "./(graphs)/(employment)/(examples)/ExamplePartTimeEmploymentLineGraph";
import ExampleUnemploymentLineGraph from "./(graphs)/(employment)/(examples)/ExampleUnemploymentLineGraph";

export default function About() {
    return (
        <div className="pt-16 mb-10 ">
            <div className="flex flex-col place-items-center w-full max-h-96 mx-auto px-5 sm:px-9 md:px-10 lg:px-12 ">
                <div className="w-full mx-auto max-w-8xl pt-16 md:pb-8  md:pt-24 ">
                    <div className="flex flex-col w-full">
                        <h1 className="w-full max-w-[95%] mr-auto mb-6 font-inter600 tracking-tighter text-5xl leading-tight">
                            Visualising demographic trends across Australian suburbs
                        </h1>
                        <h2 className="min-w-min max-w-[85%] mb-6 font-inter font-normal sm:text-lg tracking-normal ">
                            Providing investors historical socioeconomic data in digestable graphs
                        </h2>
                    </div>
                    <hr></hr>
                    <div className="flex flex-col md:justify-center">
                        <h1 className="mt-6 mb-1 font-inter700 text-2xl text-center lg:text-left">Employment</h1>
                        <h3 className="mb-4 font-inter400">
                            Discover and compare employment rates in a suburb against the state and Australia
                        </h3>
                    </div>
                    <div className="flex lg:flex-row flex-col my-2 lg:space-x-4">
                        <div className="lg:w-1/3 border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                            <ExampleFTE selectedSuburb={""}></ExampleFTE>
                        </div>
                        <div className="lg:w-1/3 border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                            <ExamplePartTimeEmploymentLineGraph selectedSuburb={""}></ExamplePartTimeEmploymentLineGraph>
                        </div>
                        <div className="lg:w-1/3 border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                            <ExampleUnemploymentLineGraph selectedSuburb={""}></ExampleUnemploymentLineGraph>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
