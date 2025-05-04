import CountryCards from "../components/CountryCards";

// Simplified Home component that receives data from App.jsx
const Home = ({ countries, loading, error }) => {
    return (
        <div className="p-6 w-full max-w-7xl mx-auto">
            {loading ? (
                <div className="flex justify-center items-center p-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="text-center p-6">
                    <p className="text-red-500">{error}</p>
                </div>
            ) : countries.length === 0 ? (
                <div className="text-center p-6">
                    <p className="text-gray-500 dark:text-gray-300">No countries found matching your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {countries.map((country) => (
                        <CountryCards key={country.cca3} country={country} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;