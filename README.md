# Weather Application

A modern weather application built with React, TypeScript, and Vite that allows users to check current weather conditions and forecasts for different locations.

## Features

- **Current Weather Display**: View detailed current weather information including temperature, feels like, humidity, wind speed and direction
- **Weather Forecast**: Check upcoming weather forecasts
- **Search History**: Track and revisit your previous weather searches
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Technologies Used

- **React 19** with TypeScript for building the UI
- **Redux Toolkit** for state management
- **React Router** for navigation
- **TailwindCSS** for styling
- **Axios** for API requests
- **OpenWeather API** for weather data
- **Vite** for fast development and building

## Project Structure

```
src/
  ├── components/       # Reusable UI components
  ├── pages/            # Application pages
  ├── store/            # Redux store configuration
  └── utils/            # Utility functions and API services
```

## Absolute Imports

This project uses absolute imports and module aliases for cleaner import statements:

```tsx
// Instead of relative imports like this:
import { store } from '../../../store';

// You can use absolute imports:
import { store } from '@store/index';
import CurrentWeather from '@components/CurrentWeather';
```

Available aliases:

- `@/*` → `./src/*`
- `@components/*` → `./src/components/*`
- `@pages/*` → `./src/pages/*`
- `@store/*` → `./src/store/*`
- `@utils/*` → `./src/utils/*`

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- OpenWeather API key

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with your OpenWeather API key:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

### Development

Start the development server:

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview

## License

MIT
```
