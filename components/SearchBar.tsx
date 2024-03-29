"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { suburbs } from "@/data/suburbNames";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface SearchBarProps {
    setSelectedSuburb: (suburb: string) => void;
}

const recommendedSearches = [
    "Auburn, NSW, 2144",
    "Kambah, ACT, 2902",
    "Merrylands, NSW, 2160",
    "Paralowie, SA, 5108",
    "Southport, QLD, 4215",
    "Kingston, TAS, 7050",
    "Ryde, NSW, 2133",
    "St Kilda, VIC, 3182",
    "Williamstown, VIC, 3016",
    "Tiwi, NT, 0810",
    "Ellenbrook, WA, 6069",
    "Richmond, SA, 5033",
];

export default function SearchBar(props: SearchBarProps) {
    // state to manage search query
    const [searchQuery, setSearchQuery] = useState("");

    // state to manage dropdown show/hidden
    const [showResults, setShowResults] = useState(false);

    // state to manage drop down list of matching results; initialise with all suburb names
    const [searchResults, setSearchResults] = useState<string[]>(recommendedSearches);

    // state to manage if user has selected a suburb
    const [suburbSelected, setSuburbSelected] = useState(false);

    const resultsRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    // * Capitalise first letter of every word in search query
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

    // ! Deprecated by removal of "ENTER" for completing <input> *** Handle search query
    const onSearch = (event: React.FormEvent) => {
        // prevent refresh on submit
        event?.preventDefault();

        // encode search (spaces become "+" as "%20" is not supported in NextJS 13 routing)
        // if searchQuery has no spaces, return searchQuery as is
        // if searchQuery has spaces, remove commas AND replace spaces with "&"
        const noCommasSearchQuery = searchQuery.replace(",", "&");
        const modifiedSearchQuery = noCommasSearchQuery.replace(/\s+/g, "+").toLowerCase();

        capitaliseAndReplace(modifiedSearchQuery);

        // push encoded string to our URL
        router.push(`/dashboard/suburb?q=${capitaliseAndReplace(modifiedSearchQuery)}`);
    };

    // * Filter search results based on searchQuery state
    useEffect(() => {
        if (searchQuery === "") {
            setSearchResults(recommendedSearches);
            setShowResults(false);
        } else if (!suburbSelected) {
            // console.log(`searchQuery: ${searchQuery}`);
            const filteredResults = suburbs.filter((suburb) => suburb.toLowerCase().includes(searchQuery.toLowerCase()));
            const topResults = filteredResults.slice(0, 10);
            setSearchResults(topResults);
            setShowResults(true);
        }
    }, [searchQuery]);

    // * Handle mouse clicks outside search bar and hide search results
    const handleOutsideClick = (event: Event) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node) && inputRef.current !== event.target) {
            setShowResults(false);
        }
    };

    // * Add and remove listeners to the document object
    useEffect(() => {
        // Register click handler inside useEffect hook to detect global click event when component is mounted
        document.addEventListener("click", handleOutsideClick);
        return () => {
            // Clean up code when component is unmounted
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    // * Prevent pressing of ENTER key from completing search on <input>
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }

        if (event.key === "Escape") {
            event.preventDefault();
            setSearchQuery("");
            setShowResults(false);
            setSuburbSelected(false);
        }
    };

    // * Handle click inside <input> tag
    const handleInputClick = () => {
        setShowResults(true);
        // If value is blank, set showResults to true
        if (searchQuery == "") {
            setShowResults(true);
        } else if (searchQuery) {
            setShowResults(true); // Show results if user clicks on input field
        } else {
            setShowResults(false); // If value exists, set showResults to false
        }
    };

    // * Handle click event of results in results container. >> Hide searchResults and set search query
    const handleResultsClick = (suburb: string) => {
        setShowResults(false);
        setSearchQuery(suburb);
        setSuburbSelected(true);
        props.setSelectedSuburb(suburb);
    };

    return (
        <div className="w-full">
            <div className="relative">
                <form className="" onSubmit={onSearch}>
                    <div className="relative ">
                        <input
                            id="landing-page-searchbar"
                            type="search"
                            ref={inputRef}
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            onKeyDown={handleKeyDown}
                            onClick={() => handleInputClick()}
                            placeholder="Suburb or Postcode..."
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray rounded-lg bg-gray-50 focus:ring-blue-500 
                            "
                            // focus:border-mainBlue
                            required
                            autoComplete="off"
                        />
                        {/* <button
                            type="submit"
                            className="rounded-md text-white absolute right-2.5 bg-mainBlue hover:bg-deepDarkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button> */}
                    </div>

                    {/* Search results container 
                        - Only show results container if <input> value is blank or user has clicked on <div>{suburb}</div>
                    */}
                    {showResults ? (
                        <div>
                            <div
                                ref={resultsRef}
                                className="absolute flex flex-col w-full first-line:absolute mt-1 pt-2 bg-white border border-gray-300 rounded-lg shadow-lg rounded-bl rounded-br overflow-y-hidden"
                            >
                                <span className="pl-2 pb-2 font-semibold">Suggested Locations</span>
                                {searchResults.map((suburb, index) => {
                                    const commasRemovedSearchQuery = suburb.replaceAll(",", "");
                                    const searchedSuburb = commasRemovedSearchQuery.replaceAll(/\s+/g, "+");
                                    return (
                                        // <Link href={`/dashboard/suburb/${searchedSuburb}`} onClick={() => setShowResults(false)}>
                                        <div
                                            key={index}
                                            onClick={() => handleResultsClick(suburb)}
                                            className="flex flex-col justify-center h-8 mobile-s:max-mobile-l:w-max-[240px] overflow-x-hidden whitespace-nowrap overflow-ellipsis rounded-sm pl-2 select-none hover:bg-hoverBlue hover:font-semibold hover:cursor-pointer "
                                        >
                                            {suburb}
                                        </div>
                                        // </Link>
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
