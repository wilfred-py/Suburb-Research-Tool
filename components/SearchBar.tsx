"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { suburbNames } from "../data/suburbNames";
import Link from "next/link";

export default function SearchBar() {
    // state to manage search query
    const [searchQuery, setSearchQuery] = useState("");

    // state to manage dropdown show/hidden
    const [showResults, setShowResults] = useState(false);

    // state to manage drop down list of matching results; initialise with all suburb names
    const [searchResults, setSearchResults] = useState<string[]>(suburbNames);

    const resultsRef = useRef(null);
    const inputRef = useRef(null);

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

    // Filter search results based on searchQuery state
    useEffect(() => {
        if (searchQuery === "") {
            setSearchResults(suburbNames);
            setShowResults(false);
        } else {
            const filteredResults = suburbNames.filter((suburb) => suburb.toLowerCase().includes(searchQuery));
            setSearchResults(filteredResults);
            setShowResults(true);
        }
    }, [searchQuery]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (resultsRef.current && !resultsRef.current.contains(event.target) && inputRef.current !== event.target) {
                setShowResults(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <div>
            <div className="flex m-4 items-center justify-center">
                <div className="relative">
                    <div>
                        <MagnifyingGlassIcon className="h-4 w-4 opacity-50" />
                    </div>
                    <form className="items-center space-x-2 rounded-full" onSubmit={onSearch}>
                        <input
                            ref={inputRef}
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value.toLowerCase())}
                            onClick={() => setShowResults(false)}
                            type="search"
                            placeholder="Suburb or Postcode..."
                            className="w-[600px] m-10 px-5 py-3 text-lg rounded-full border-2 border-gray-500 focus:border-gray-700 outline-none hover:bg-hoverYellow"
                        />

                        {/* Search results container */}
                        {showResults ? (
                            <div
                                ref={resultsRef}
                                className="flex flex-col first-line:absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto"
                            >
                                {searchResults.map((suburb) => {
                                    const dashedSuburb = suburb.replace(/\s+/g, "&");
                                    return (
                                        <Link href={`/suburb/${dashedSuburb}`} onClick={() => setShowResults(false)}>
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
