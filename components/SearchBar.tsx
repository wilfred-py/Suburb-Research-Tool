"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FormEvent, useRef } from "react";

export default function SearchBar() {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = inputRef.current?.value;
        if (!input) return;
        if (inputRef.current?.value) {
            inputRef.current.value = "";
        }

        try {
            // read suburb data from Firebase DB
        } catch (error) {
            // handle any errors
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2 rounded-full "
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Suburb or Postcode..."
                    className="pl-4 py-1"
                />
                <MagnifyingGlassIcon className="h-4 w-4 opacity-50" />
                <button hidden>Search</button>
            </form>
        </div>
    );
}
