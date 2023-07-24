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

    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

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

    // Handle mouse clicks outside search bar and hide search results
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
            <div className="relative m-10">
                <div className="absolute inset-y-0 mt-1.5 left-0 flex items-center pl-3 max-h-10 pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 opacity-50" />
                </div>

                <form className="" onSubmit={onSearch}>
                    <div className="relative flex items-center w-112">
                        <input
                            id="landing-page-searchbar"
                            type="search"
                            ref={inputRef}
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value.toLowerCase())}
                            onClick={() => setShowResults(false)}
                            placeholder="Suburb or Postcode..."
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
                            focus:border-mainBlue"
                            required
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="rounded-md text-white absolute right-2.5 bg-mainBlue hover:bg-deepDarkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button>
                    </div>

                    {/* Search results container */}
                    {showResults ? (
                        <div>
                            <span>Suggested Locations</span>
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
                        </div>
                    ) : (
                        ""
                    )}
                </form>
            </div>
        </div>
    );
}
