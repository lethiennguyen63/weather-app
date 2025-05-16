import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { type RootState, useAppDispatch } from '@store';
import {
  addToHistory,
  clearError,
  removeFromHistory,
  setError,
  setSearchTerm,
} from '@store/searchSlice';
import { fetchWeatherData } from '@store/weatherSlice';

import type { ForecastData, WeatherData } from '@/utils/model';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchTerm, error } = useSelector((state: RootState) => state.search);
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      dispatch(setError('Please enter a city or country name'));
      return;
    }

    try {
      const resultAction = await dispatch(fetchWeatherData(searchTerm));

      if (resultAction.type === 'weather/fetchWeatherData/rejected') {
        dispatch(setError('City or country not found'));
        return;
      } else {
        dispatch(clearError());

        const payload = resultAction.payload as {
          currentWeather: WeatherData;
          forecast: ForecastData;
        };
        dispatch(
          addToHistory({
            city: payload.currentWeather.name,
            country: payload.currentWeather.sys.country,
          })
        );
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 my-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Search Weather</h2>

      <form onSubmit={handleSearch}>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            placeholder="Search country or city here..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
    </div>
  );
};

const HistoryList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchHistory } = useSelector((state: RootState) => state.search);

  const handleHistoryItemClick = (city: string) => {
    dispatch(fetchWeatherData(city));
    navigate('/');
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeFromHistory(id));
  };

  if (searchHistory.length === 0) {
    return (
      <div className="text-center text-gray-500 my-4">
        No search history yet
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden my-4">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Search History</h2>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {searchHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => handleHistoryItemClick(item.city)}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
            >
              <div>
                <span className="font-medium">
                  {item.city}, {item.country}
                </span>
                <span className="text-xs text-gray-500 block">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
              <button
                onClick={(e) => handleDeleteItem(item.id, e)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                aria-label="Delete item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SearchHistoryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Weather App</h1>
        <p className="text-gray-600">
          Search for a location or select from your history
        </p>
      </div>

      <SearchBar />
      <HistoryList />
    </div>
  );
};

export default SearchHistoryPage;
