import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        alert("There's been an error loading the data.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(cityId) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${cityId}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (err) {
      alert("There's been an error loading the data.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

CitiesProvider.propTypes = {
  children: PropTypes.element,
};

// CUSTOM HOOK
function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("Cities context consumed outside Provider's scope.");

  return context;
}

export { CitiesProvider, useCities };
