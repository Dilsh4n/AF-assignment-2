import { useState, useEffect, useRef } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const searchTimeout = useRef(null);

    // Debounce search to avoid excessive API calls
    useEffect(() => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        if (query.trim() === "") {
            onSearch("");
            setIsTyping(false);
            return;
        }

        setIsTyping(true);
        searchTimeout.current = setTimeout(() => {
            onSearch(query);
            setIsTyping(false);
        }, 500); // 500ms debounce delay

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, [query, onSearch]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleClear = () => {
        setQuery("");
        onSearch("");
    };

    return (
        <div className="relative w-full md:w-1/2">
            <div className="flex items-center">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search for a country..."
                    value={query}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {isTyping && (
                    <div className="absolute inset-y-0 right-10 flex items-center pr-3">
                        <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        aria-label="Clear search"
                    >
                        <svg
                            className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;