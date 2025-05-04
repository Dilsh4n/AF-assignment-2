import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const CountryCards = ({ country }) => {
  const { favourites, toggleFavourits } = useContext(AppContext);
  const isFavourite = favourites.includes(country.cca3);

  return (
      <div className="rounded overflow-hidden shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-all">
        <Link to={`/country/${country.cca3}`} className="block bg-white dark:bg-gray-800">
          <div className="relative w-full h-40 bg-white dark:bg-gray-800">
            <img 
              src={country.flags.svg} 
              alt={country.name.common} 
              className="w-full h-40 object-cover" 
              loading="lazy"
            />
          </div>
        </Link>
        <div className="p-4 bg-white dark:bg-gray-800">
          <div className="flex justify-between items-start">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">{country.name.common}</h2>
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation when clicking the button
                toggleFavourits(country.cca3);
              }}
              className="text-xl"
              title={isFavourite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavourite ? "💖" : "🤍"}
            </button>
          </div>
          <p className="text-gray-800 dark:text-gray-200"><strong>Region:</strong> {country.region}</p>
          <p className="text-gray-800 dark:text-gray-200"><strong>Population:</strong> {country.population.toLocaleString()}</p>
        </div>
      </div>
  );
};
    
export default CountryCards;