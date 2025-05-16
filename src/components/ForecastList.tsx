import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import WindArrow from '@components/WindArrow';

import type { ForecastDay } from '@/utils/model';
import type { RootState } from '@store';

const ForecastList: React.FC = () => {
  const { forecast } = useSelector((state: RootState) => state.weather);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const groupedForecast = useMemo(() => {
    if (!forecast) return [];
    const result: ForecastDay[] = [];
    const dayMap: Record<string, number> = {};

    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'long' });
      const dateStr = date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
      });
      const fullDayKey = `${dayKey}, ${dateStr}`;

      if (dayMap[fullDayKey] === undefined) {
        dayMap[fullDayKey] = result.length;
        result.push({
          day: dayKey,
          date: dateStr,
          forecasts: [],
        });
      }

      result[dayMap[fullDayKey]].forecasts.push(item);
    });
    return result;
  }, [forecast]);

  const limitedForecast = useMemo(() => {
    return groupedForecast.slice(0, 5);
  }, [groupedForecast]);

  if (!forecast) return null;

  const days = limitedForecast;
  const selectedDay = days[selectedDayIndex];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden my-4">
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>

        <div className="mb-4 border-b">
          <div className="flex overflow-x-auto">
            {days.map((day, index) => (
              <button
                key={`${day.day}-${day.date}`}
                onClick={() => setSelectedDayIndex(index)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  index === selectedDayIndex
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {day.day}, {day.date}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full">
            {selectedDay.forecasts.map((item) => {
              const date = new Date(item.dt * 1000);
              const time = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              });

              return (
                <div
                  key={item.dt}
                  className="flex items-center p-3 border-b hover:bg-gray-50"
                >
                  <div className="w-20 text-gray-600">{time}</div>
                  <div className="w-20 flex justify-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="w-32 text-center">
                    <span className="font-medium">
                      {Math.round(item.main.temp_max)}°
                    </span>
                    <span className="text-gray-500">
                      /{Math.round(item.main.temp_min)}°
                    </span>
                  </div>
                  <div className="w-24 flex items-center justify-center">
                    <span className="mr-1">{item.wind.speed} m/s</span>
                    <WindArrow
                      degree={item.wind.deg}
                      speed={item.wind.speed}
                      size="sm"
                    />
                  </div>
                  <div className="flex-grow text-gray-600 capitalize">
                    {item.weather[0].description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastList;
