import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import CurrentWeather from '@components/CurrentWeather';
import ForecastList from '@components/ForecastList';
import { type RootState, useAppDispatch, useAppSelector } from '@store';
import { fetchWeatherData } from '@store/weatherSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { currentWeather, loading } = useAppSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    if (!currentWeather) {
      dispatch(fetchWeatherData('Singapore'));
    }
  }, [dispatch, currentWeather]);
  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading weather data...</div>
        </div>
      ) : (
        <>
          <div className="text-center">
            <Link
              to="/search"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Search & History
            </Link>
          </div>
          <CurrentWeather />
          <ForecastList />
        </>
      )}
    </div>
  );
};

export default HomePage;
