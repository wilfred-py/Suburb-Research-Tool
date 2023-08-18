"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { suburbs } from "@/data/suburbNames";
import Link from "next/link";

export default function SearchBar() {
    // state to manage search query
    const [searchQuery, setSearchQuery] = useState("");

    // state to manage dropdown show/hidden
    const [showResults, setShowResults] = useState(false);

    // state to manage drop down list of matching results; initialise with all suburb names
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    const resultsRef = useRef(null);
    const inputRef = useRef(null);

    const router = useRouter();

    // capitalise first letter of every word in search query
    function capitaliseAndReplace(str: any) {
        // split string into an array of words
        const words = str.split("+");

        // capitalise first letter of every word
        const capitalisedWords = words.map((word: any) => {
            const firstLetter = word.charAt(0).toUpperCase();
            const restOfWord = word.slice(1);
            return firstLetter + restOfWord;
        });

        // Join the capitalised words back into a string
        const result = capitalisedWords.join("+");

        return result;
    }

    // handle search query
    const onSearch = (event: React.FormEvent) => {
        // prevent refresh on submit
        event?.preventDefault();

        // encode search (spaces become "&" as "%20" is not supported in NextJS 13 routing)
        // if searchQuery has no spaces, return searchQuery as is
        // if searchQuery has spaces, replace spaces with "&"

        const noCommasSearchQuery = searchQuery.replace(",", "&");
        const modifiedSearchQuery = noCommasSearchQuery.replace(/\s+/g, "+").toLowerCase();
        capitaliseAndReplace(modifiedSearchQuery);

        // push encoded string to our URL
        router.push(`/dashboard/suburb?q=${capitaliseAndReplace(modifiedSearchQuery)}`);
    };

    // Filter search results based on searchQuery state
    useEffect(() => {
        if (searchQuery === "") {
            setShowResults(false);
        } else {
            const filteredResults = suburbs.filter((suburb) => suburb.toLowerCase().includes(searchQuery.toLowerCase()));
            const topResults = filteredResults.slice(0, 10);
            setSearchResults(topResults);
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

    // ** Prevent pressing of ENTER key from completing search on <input>
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    return (
        <div>
            <div className="relative mr-10">
                {/* <div className="absolute inset-y-0 mt-1.5 left-0 flex items-center pl-3 max-h-10 pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 opacity-50" />
                </div> */}

                <form className="" onSubmit={onSearch}>
                    <div className="relative flex items-center w-full">
                        <input
                            id="landing-page-searchbar"
                            type="search"
                            ref={inputRef}
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            onKeyDown={handleKeyDown}
                            onClick={() => setShowResults(true)}
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
                    {showResults && searchResults.length > 1 ? (
                        <div>
                            <div
                                ref={resultsRef}
                                className="absolute z-10 flex flex-col first-line:absolute mt-1 w-full p-2 bg-gray-50 border border-gray-300 rounded-lg shadow-lg rounded-bl rounded-br overflow-y-hidden"
                            >
                                {searchResults.map((suburb) => {
                                    const commasRemovedSearchQuery = suburb.replaceAll(",", "");
                                    const searchedSuburb = commasRemovedSearchQuery.replaceAll(/\s+/g, "+");
                                    return (
                                        <Link href={`/dashboard/suburb/${searchedSuburb}`} onClick={() => setShowResults(false)}>
                                            <div className="hover:bg-hoverBlue h-8 align-middle">{suburb}</div>
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
