import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import CountryCards from "../components/CountryCards";
import { Link } from "react-router-dom";

const FavoritesPage = ({ allCountries }) => {
    const { favourites } = useContext(AppContext);
    
    // Filter all countries to only show favorites
    const favoriteCountries = allCountries.filter(country => 
        favourites.includes(country.cca3)
    );

    return (
        <div className="p-6 w-full max-w-7xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Favorite Countries</h2>
                <Link 
                    to="/"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to All Countries
                </Link>
            </div>

            {favoriteCountries.length === 0 ? (
                <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="text-5xl mb-4">💔</div>
                    <h3 className="text-xl font-medium mb-2">No Favorite Countries Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Click the heart icon on any country card to add it to your favorites
                    </p>
                    <Link
                        to="/"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block transition"
                    >
                        Explore Countries
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favoriteCountries.map((country) => (
                        <CountryCards key={country.cca3} country={country} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;