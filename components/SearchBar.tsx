"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { encode } from "punycode";
import { useEffect, useRef, useState } from "react";
import { suburbNames } from "../data/suburbNames";

export default function SearchBar() {
    // state to manage search query
    const [searchQuery, setSearchQuery] = useState("");
    console.log(searchQuery);

    const router = useRouter();

    // handle search query
    const onSearch = (event: React.FormEvent) => {
        // prevent refresh on submit
        event?.preventDefault();

        // encode search (spaces become "%20")
        const encodedSearchQuery = encodeURI(searchQuery);
        // push encoded string to our URL
        router.push(`/suburb?q=${encodedSearchQuery}`);
    };

    // state to manage drop down list of matching results
    const [searchResults, setSearchResults] = useState<string[]>(suburbNames);

    return (
        <div>
            <div className="flex m-4 items-center justify-center">
                <div>
                    <MagnifyingGlassIcon className="h-4 w-4 m-5 opacity-50" />
                </div>
                <div className="relative">
                    <form className="items-center space-x-2 rounded-full" onSubmit={onSearch}>
                        <input
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            type="search"
                            placeholder="Suburb or Postcode..."
                            className="w-[600px] m-10 px-5 py-3 text-lg rounded-full border-2 border-gray-500 focus:border-gray-700 outline-none transition"
                        />
                        {/* Search results container */}
                        <div className="flex flex-col first-line:absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto">
                            {searchResults.map((suburb) => {
                                return <div className="hover:bg-hoverYellow">{suburb}</div>;
                            })}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// interface Props<T> {
//     suburbs: T[];
//     renderItem(item: T): JSX.Element;
// }

// // Define function signature that takes in prop called "results" of type "Props<any>". This specifies that this component is a function component.
// // The Props interface is a generic interface that allows speicfying the type of "results" as any data type.
// // function ({ results }) is the function body where we destructure the "results" rpopr from the component's prop.
// const LiveSearch: FC<Props<any>> = function ({ suburbs, renderItem }) {
//     return (
//         <div className="flex m-4 items-center justify-center">
//             <div className="relative">
//                 <input
//                     type="text"
//                     placeholder="Suburb or postcode..."
//                     className="w-[600px] px-5 py-3 text-lg rounded-full border-2 border-gray-500 focus:border-gray-700 outline-none transition"
//                 />

//                 {/* Search Results Container */}
//                 <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto"></div>
//             </div>
//         </div>
//     );
// };

// export default LiveSearch;
