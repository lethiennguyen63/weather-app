import React from 'react';
import { useSelector } from 'react-redux';

import WindArrow from '@components/WindArrow';

import type { RootState } from '@store';

const CurrentWeather: React.FC = () => {
  const { currentWeather, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  if (loading)
    return <div className="text-center p-4">Loading weather data...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!currentWeather)
    return <div className="text-center p-4">No weather data available</div>;

  const { name, sys, weather, main, wind, visibility } = currentWeather;
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="p-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {name}, {sys.country}
          </h2>
          <p className="text-gray-600">{formattedDate}</p>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt={weather[0].description}
            className="w-24 h-24"
          />
          <p className="text-4xl font-bold text-gray-800">
            {Math.round(main.temp)}°C
          </p>
          <p className="text-gray-600 capitalize">{weather[0].description}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Feels Like</p>
            <p className="text-xl font-semibold">
              {Math.round(main.feels_like)}°C
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-xl font-semibold">{main.humidity}%</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Pressure</p>
            <p className="text-xl font-semibold">{main.pressure} hPa</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center mt-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Wind</p>
            <div className="flex items-center justify-center">
              <p className="text-xl font-semibold mr-2">{wind.speed} m/s</p>
              <WindArrow degree={wind.deg} speed={wind.speed} size="sm" />
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Visibility</p>
            <p className="text-xl font-semibold">
              {(visibility / 1000).toFixed(1)} km
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Min/Max</p>
            <p className="text-xl font-semibold">
              {Math.round(main.temp_min)}°/{Math.round(main.temp_max)}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
