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
                    <div className="flex md:flex-row flex-col my-2">
                        <hr></hr>
                        <div className="flex flex-col md:mx-4 md:justify-center">
                            <h1 className="mt-6 mb-4 font-inter700 text-center">Discover and compare employment trends in a suburb</h1>
                        </div>

                        <div className="border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                            <ExampleFTE selectedSuburb={""}></ExampleFTE>
                        </div>
                        <div className="border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                            <ExamplePartTimeEmploymentLineGraph selectedSuburb={""}></ExamplePartTimeEmploymentLineGraph>
                        </div>
                        <div className="border border-gray-200 rounded-md shadow-lg hover:shadow-xl mb-4">
                            <ExampleUnemploymentLineGraph selectedSuburb={""}></ExampleUnemploymentLineGraph>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
