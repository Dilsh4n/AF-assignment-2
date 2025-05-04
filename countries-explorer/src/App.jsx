import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useCallback, useEffect, useContext } from 'react'
import { fetchAllCountries, fetchByName, fetchByRegion } from './services/api'
import { AppContext } from './context/AppContext'
import Home from './Pages/Home'
import DetailsPage from './pages/DetailsPage'
import Header from './components/Header'
import FavoritesPage from './Pages/FavoritesPage'

function App() {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(AppContext);
  
  // Add dark class to body element based on theme
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  // Fetch all countries on initial load
  useEffect(() => {
    const getAll = async () => {
      try {
        setLoading(true);
        const response = await fetchAllCountries();
        setCountries(response.data);
        setAllCountries(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Failed to load countries. Please try again.");
        setCountries([]);
        setAllCountries([]);
      } finally {
        setLoading(false);
      }
    };

    getAll();
  }, []);

  // Handle search with local filtering for better performance
  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setCountries(allCountries);
      return;
    }

    try {
      // First try local filtering for better performance
      const lowercaseQuery = query.toLowerCase();
      const filteredCountries = allCountries.filter(country => {
        return (
          country.name.common.toLowerCase().includes(lowercaseQuery) || 
          (country.name.official && country.name.official.toLowerCase().includes(lowercaseQuery)) ||
          (country.capital && country.capital.some(cap => cap.toLowerCase().includes(lowercaseQuery)))
        );
      });

      // If local filtering finds results, use those
      if (filteredCountries.length > 0) {
        setCountries(filteredCountries);
        return;
      }

      // If local filtering gives no results, try API search
      const response = await fetchByName(query);
      setCountries(response.data);
      setError(null);
    } catch (error) {
      console.error("Error searching countries:", error);
      setCountries([]);
      // Don't set error if search simply yielded no results
      if (error.response && error.response.status !== 404) {
        setError("Search failed. Please try again.");
      }
    }
  }, [allCountries]);

  // Handle region filtering
  const handleFilter = useCallback(async (region) => {
    if (region === "All") {
      setCountries(allCountries);
      return;
    }

    try {
      setLoading(true);
      const response = await fetchByRegion(region);
      setCountries(response.data);
      setError(null);
    } catch (error) {
      console.error("Error filtering by region:", error);
      setCountries([]);
      setError(`Failed to load countries from ${region}.`);
    } finally {
      setLoading(false);
    }
  }, [allCountries]);

  return (
    <div className="app-container bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <Header 
        onSearch={handleSearch} 
        onSelectRegion={handleFilter} 
      />
      <main className="content-area w-full">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                countries={countries} 
                loading={loading} 
                error={error} 
              />
            } 
          />
          <Route path="/country/:code" element={<DetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage allCountries={allCountries} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App