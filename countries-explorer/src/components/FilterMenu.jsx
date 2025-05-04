import { useState, useRef, useEffect } from "react";

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

const FilterMenu = ({ onSelectRegion }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("All");
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        onSelectRegion(region);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
                <span className="mr-2">{selectedRegion} Region</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
                    <ul className="py-1">
                        {regions.map((region) => (
                            <li key={region}>
                                <button
                                    onClick={() => handleRegionSelect(region)}
                                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                                        selectedRegion === region ? "bg-blue-50 dark:bg-gray-600 font-medium" : ""
                                    }`}
                                >
                                    {region}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FilterMenu;