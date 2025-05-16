export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  temp_max: number;
  temp_min: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface ForecastItem {
  dt: number;
  main: Main;
  weather: Weather[];
  wind: Wind;
}

export interface ForecastDay {
  day: string;
  date: string;
  forecasts: ForecastItem[];
}

export interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
}

export const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
};

export interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  dt: number;
}

export interface ForecastData {
  list: [
    {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
      };
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      wind: {
        speed: number;
        deg: number;
      };
      visibility: number;
      dt_txt: string;
    }
  ];
  city: {
    name: string;
    country: string;
  };
}

export interface SearchHistoryItem {
  id: string;
  city: string;
  country: string;
  timestamp: number;
}

export interface WindArrowProps {
  degree: number;
  speed: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface SearchState {
  searchTerm: string;
  searchHistory: SearchHistoryItem[];
  error: string | null;
}
