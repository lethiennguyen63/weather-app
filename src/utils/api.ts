import axios from 'axios';
import CryptoJS from 'crypto-js';

import type { ForecastData, SearchHistoryItem, WeatherData } from './model';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getForecast = async (city: string): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

const STORAGE_KEY = 'weather_search_history';
const SECRET_KEY = 'weather_app_secret_key';

export const saveSearchHistory = (history: SearchHistoryItem[]): void => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(history),
    SECRET_KEY
  ).toString();
  localStorage.setItem(STORAGE_KEY, encrypted);
};

export const getSearchHistory = (): SearchHistoryItem[] => {
  const encrypted = localStorage.getItem(STORAGE_KEY);
  if (!encrypted) return [];
  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    );
    console.log('JSON.parse(decrypted)', JSON.parse(decrypted));

    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Error decrypting search history:', error);
    return [];
  }
};

export const addToSearchHistory = (
  city: string,
  country: string
): SearchHistoryItem[] => {
  const history = getSearchHistory();

  const existingIndex = history.findIndex(
    (item) =>
      item.city.toLowerCase() === city.toLowerCase() &&
      item.country.toLowerCase() === country.toLowerCase()
  );

  const newItem: SearchHistoryItem = {
    id: Date.now().toString(),
    city,
    country,
    timestamp: Date.now(),
  };

  let newHistory: SearchHistoryItem[];

  if (existingIndex >= 0) {
    newHistory = [
      ...history.slice(0, existingIndex),
      newItem,
      ...history.slice(existingIndex + 1),
    ];
  } else {
    newHistory = [newItem, ...history];
  }

  saveSearchHistory(newHistory);

  return newHistory;
};

export const removeFromSearchHistory = (id: string): SearchHistoryItem[] => {
  const history = getSearchHistory();
  const newHistory = history.filter((item) => item.id !== id);
  saveSearchHistory(newHistory);
  return newHistory;
};
