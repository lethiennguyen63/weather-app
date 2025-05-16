import './App.css';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from '@pages/HomePage';
import SearchHistoryPage from '@pages/SearchHistoryPage';
import { store } from '@store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-blue-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchHistoryPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
