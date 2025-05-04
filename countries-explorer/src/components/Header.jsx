import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterMenu from "./FilterMenu";
import ThemeToggle from "./ThemeToggle";

const Header = ({ onSearch, onSelectRegion }) => {
    const { favourites } = useContext(AppContext);
    
    return (
        <header className="fixed-header shadow-md px-4 py-3">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
                {/* Logo/Title */}
                <Link to="/" className="text-xl font-bold whitespace-nowrap">
                    🌍 Countries Explorer
                </Link>
                
                {/* Search Bar */}
                <div className="order-3 md:order-2 w-full md:flex-1 md:mx-4">
                    {onSearch && <SearchBar onSearch={onSearch} />}
                </div>
                
                {/* Controls Group */}
                <div className="order-2 md:order-3 flex items-center gap-3">
                    {/* Filter by Region */}
                    {onSelectRegion && (
                        <div className="hidden sm:block">
                            <FilterMenu onSelectRegion={onSelectRegion} />
                        </div>
                    )}
                    
                    {/* Favorites Button */}
                    <Link 
                        to="/favorites"
                        className="flex items-center px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        <span className="mr-1">💖</span>
                        <span className="hidden sm:inline">Favorites</span>
                        {favourites.length > 0 && (
                            <span className="ml-1 bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                {favourites.length}
                            </span>
                        )}
                    </Link>
                    
                    {/* Theme Toggle */}
                    <ThemeToggle />
                </div>
            </div>
            
            {/* Mobile Filter (only shows on small screens) */}
            {onSelectRegion && (
                <div className="mt-2 sm:hidden">
                    <FilterMenu onSelectRegion={onSelectRegion} />
                </div>
            )}
        </header>
    );
};

export default Header;