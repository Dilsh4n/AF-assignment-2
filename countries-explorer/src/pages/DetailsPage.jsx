import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react"; 
import { fetchByCode } from "../services/api";
import { AppContext } from "../context/AppContext";

const DetailsPage = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { favourites, toggleFavourits } = useContext(AppContext);

    useEffect(() => {
        const getCountryData = async () => {
            try {
                setLoading(true);
                const response = await fetchByCode(code);
                setCountry(response.data[0]);
                setError(null);
            } catch (err) {
                console.error("Error fetching country details:", err);
                setError("Failed to load country data");
            } finally {
                setLoading(false);
            }
        };

        getCountryData();
    }, [code]);

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) return (
        <div className="flex justify-center items-center p-6 h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="p-6 text-center">
            <p className="text-red-500">{error}</p>
            <button 
                onClick={handleBack}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Go Back
            </button>
        </div>
    );

    if (!country) return null;

    const isFavourite = favourites.includes(country.cca3);

    return (
        <div className="p-6 max-w-6xl mx-auto w-full">
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={handleBack}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back
                </button>
                <button
                    onClick={() => toggleFavourits(country.cca3)}
                    className={`flex items-center px-4 py-2 rounded transition ${isFavourite ? 'bg-pink-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                    {isFavourite ? "💖 Remove from Favorites" : "🤍 Add to Favorites"}
                </button>
            </div>

            {/* Country Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-800 dark:to-purple-900 rounded-lg shadow-lg overflow-hidden text-white mb-6">
                <div className="p-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 flex flex-col items-center md:items-start mb-6 md:mb-0">
                        <h1 className="text-4xl font-bold mb-2">{country.name.common}</h1>
                        <p className="text-xl mb-4">{country.name.official}</p>
                        <div className="flex space-x-2">
                            {country.independent && (
                                <span className="px-2 py-1 bg-green-500 rounded-full text-xs font-bold">Independent</span>
                            )}
                            {country.unMember && (
                                <span className="px-2 py-1 bg-blue-700 rounded-full text-xs font-bold">UN Member</span>
                            )}
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center md:justify-end">
                        <img src={country.flags.svg} alt={country.flags.alt || country.name.common} className="max-h-32 object-contain shadow-lg rounded" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Column 1: National Identity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-red-500 dark:bg-red-700 p-4">
                        <h2 className="text-xl font-bold text-white">National Identity</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="font-bold text-lg">Symbols</h3>
                            </div>
                            <div className="text-3xl">{country.flag}</div>
                        </div>

                        {country.coatOfArms && country.coatOfArms.svg && (
                            <div className="mb-4">
                                <p className="font-semibold mb-2">Coat of Arms:</p>
                                <img src={country.coatOfArms.svg} alt="Coat of Arms" className="h-24 mx-auto" />
                            </div>
                        )}

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Native Name:</p>
                            {country.name.nativeName && Object.values(country.name.nativeName).map((name, index) => (
                                <p key={index}>{name.official} ({name.common})</p>
                            ))}
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Demonyms:</p>
                            {country.demonyms && country.demonyms.eng && (
                                <p>Male: {country.demonyms.eng.m}, Female: {country.demonyms.eng.f}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Alternative Spellings:</p>
                            <p>{country.altSpellings?.join(", ")}</p>
                        </div>

                        <div>
                            <p className="font-semibold mb-1">Codes:</p>
                            <p>ISO Alpha-2: {country.cca2}, ISO Alpha-3: {country.cca3}</p>
                            {country.cioc && <p>Olympic: {country.cioc}</p>}
                        </div>
                    </div>
                </div>

                {/* Column 2: Geography & Information */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-green-500 dark:bg-green-700 p-4">
                        <h2 className="text-xl font-bold text-white">Geography & Details</h2>
                    </div>
                    <div className="p-6">
                        <div className="mb-4">
                            <p className="font-semibold mb-1">Capital:</p>
                            <p>{country.capital ? country.capital.join(", ") : "N/A"}</p>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Region:</p>
                            <p>{country.region}, {country.subregion || ""}</p>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Location:</p>
                            <p>Lat: {country.latlng?.[0]}°, Long: {country.latlng?.[1]}°</p>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Area:</p>
                            <p>{country.area?.toLocaleString()} km²</p>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Population:</p>
                            <p>{country.population?.toLocaleString()} people</p>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Borders:</p>
                            <p>{country.borders?.join(", ") || "No land borders"}</p>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Time Zones:</p>
                            <p>{country.timezones?.join(", ")}</p>
                        </div>

                        <div>
                            <p className="font-semibold mb-1">Continents:</p>
                            <p>{country.continents?.join(", ")}</p>
                        </div>
                    </div>
                </div>

                {/* Column 3: Practical Information */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-amber-500 dark:bg-amber-700 p-4">
                        <h2 className="text-xl font-bold text-white">Practical Information</h2>
                    </div>
                    <div className="p-6">
                        <div className="mb-4">
                            <p className="font-semibold mb-1">Languages:</p>
                            <p>{Object.values(country.languages || {}).join(", ") || "N/A"}</p>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Currencies:</p>
                            {country.currencies && Object.entries(country.currencies).map(([code, currency]) => (
                                <p key={code}>
                                    {currency.name} ({code}) {currency.symbol && `- ${currency.symbol}`}
                                </p>
                            ))}
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Calling Code:</p>
                            {country.idd && (
                                <p>{country.idd.root}{country.idd.suffixes?.[0]}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Top Level Domain:</p>
                            <p>{country.tld?.join(", ")}</p>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Driving Side:</p>
                            <p className="capitalize">{country.car?.side || "N/A"}</p>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Start of Week:</p>
                            <p className="capitalize">{country.startOfWeek || "N/A"}</p>
                        </div>

                        {country.postalCode && (
                            <div>
                                <p className="font-semibold mb-1">Postal Code Format:</p>
                                <p>{country.postalCode.format}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Maps Section */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-indigo-500 dark:bg-indigo-700 p-4">
                    <h2 className="text-xl font-bold text-white">Maps</h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row justify-around gap-4">
                        {country.maps?.googleMaps && (
                            <a 
                                href={country.maps.googleMaps} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-4 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                View on Google Maps
                            </a>
                        )}
                        {country.maps?.openStreetMaps && (
                            <a 
                                href={country.maps.openStreetMaps} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-4 py-3 bg-green-600 text-white rounded-lg flex items-center justify-center hover:bg-green-700 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                View on OpenStreetMap
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Translations Section */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-purple-500 dark:bg-purple-700 p-4">
                    <h2 className="text-xl font-bold text-white">Translations</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {country.translations && Object.entries(country.translations).map(([langCode, names]) => (
                            <div key={langCode} className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                <p className="font-semibold text-sm uppercase">{langCode}</p>
                                <p className="text-sm">{names.common}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{names.official}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;