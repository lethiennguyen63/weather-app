import { AxiosError } from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentWeather, getForecast } from '@utils/api';

import type { ForecastData, WeatherData, WeatherState } from '@/utils/model';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city: string, { rejectWithValue }) => {
    try {
      const [currentWeatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);

      return { currentWeather: currentWeatherData, forecast: forecastData };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        return rejectWithValue(
          error.response?.data?.message || 'Failed to fetch weather data'
        );
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeatherData: (state) => {
      state.currentWeather = null;
      state.forecast = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeatherData.fulfilled,
        (
          state,
          action: PayloadAction<{
            currentWeather: WeatherData;
            forecast: ForecastData;
          }>
        ) => {
          state.loading = false;
          state.currentWeather = action.payload.currentWeather;
          state.forecast = action.payload.forecast;
        }
      )
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An error occurred';
      });
  },
});

export const { clearWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
