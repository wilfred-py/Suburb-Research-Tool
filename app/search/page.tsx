"use client";

import { useSearchParams } from "next/navigation";

const SearchPage = () => {
    // app/search?q="SEARCH PARAMS"
    // q is query
    // useSearchParams lets you read the current URL's query string
    const search = useSearchParams();

    // tenary operator to handle truthy and falsy values
    const searchQuery = search ? search.get("q") : null;
    const encodedSearchQuery = encodeURI(searchQuery || "");
    console.log("SEARCH PARAMS", encodedSearchQuery);
    return <div>Search Result: {encodedSearchQuery}</div>;

    // use search query to send GET request to PB
};

export default SearchPage;
