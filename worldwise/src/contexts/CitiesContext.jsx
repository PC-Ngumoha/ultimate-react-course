import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'cities/loaded':
      return { ...state, cities: action.payload, isLoading: false };

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type.');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: "There's been an error loading cities data.",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(cityId) {
      if (Number(cityId) === currentCity.id) return;

      dispatch({ type: 'loading' });

      try {
        const response = await fetch(`${BASE_URL}/cities/${cityId}`);
        const data = await response.json();
        dispatch({ type: 'city/loaded', payload: data });
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: "There's been an error loading the city data.",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch({ type: 'city/created', payload: data });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: "There's been an error creating the city.",
      });
    }
  }

  async function deleteCity(cityId) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: cityId });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: "There's been an error deleting the city.",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
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
