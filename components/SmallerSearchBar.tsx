"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { suburbNames } from "../data/suburbNames";
import Link from "next/link";

export default function SmallerSearchBar() {
    // state to manage search query
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    // capitalise first letter of every word in search query
    function capitaliseAndReplace(str: any) {
        // split string into an array of words
        const words = str.split("&");

        // capitalise first letter of every word
        const capitalisedWords = words.map((word: any) => {
            const firstLetter = word.charAt(0).toUpperCase();
            const restOfWord = word.slice(1);
            return firstLetter + restOfWord;
        });

        // Join the capitalised words back into a string
        const result = capitalisedWords.join("&");

        return result;
    }

    // handle search query
    const onSearch = (event: React.FormEvent) => {
        // prevent refresh on submit
        event?.preventDefault();

        // encode search (spaces become "&" as "%20" is not supported in NextJS 13 routing)

        // if searchQuery has no spaces, return searchQuery as is
        // if searchQuery has spaces, replace spaces with "&"

        const modifiedSearchQuery = searchQuery.replace(/\s+/g, "&");
        capitaliseAndReplace(modifiedSearchQuery);

        // push encoded string to our URL
        router.push(`/suburb?q=${capitaliseAndReplace(modifiedSearchQuery)}`);
    };

    // state to manage dropdown show/hidden
    const [showResults, setShowResults] = useState(false);

    // if user clicks box, show most recent searches
    //

    // state to manage drop down list of matching results; initialise with all suburb names
    const [searchResults, setSearchResults] = useState<string[]>(suburbNames);

    // Filter search results based on searchQuery state
    useEffect(() => {
        const filteredResults = suburbNames.filter((suburb) => suburb.toLowerCase().includes(searchQuery));
        setSearchResults(filteredResults);
        setShowResults(true);
    }, [searchQuery]);

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="relative">
                    <div>
                        <MagnifyingGlassIcon className="h-4 w-4 opacity-50" />
                    </div>
                    <form className="items-center rounded-lg" onSubmit={onSearch}>
                        <input
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value.toLowerCase())}
                            onClick={() => setShowResults(false)}
                            type="search"
                            placeholder=" Suburb or Postcode..."
                            className="w-[500px] mx-4 my-2 text-lg p-1 rounded-lg border-2 bg-white border-gray-500 focus:border-gray-700 outline-none hover:bg-gray-200"
                        />

                        {/* Search results container */}
                        {showResults ? (
                            <div className="flex flex-col first-line:absolute w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto">
                                {searchResults.map((suburb) => {
                                    const dashedSuburb = suburb.replace(/\s+/g, "&");
                                    return (
                                        <Link href={`/suburb/${dashedSuburb}`}>
                                            <div className="hover:bg-hoverYellow">{suburb}</div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            ""
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
