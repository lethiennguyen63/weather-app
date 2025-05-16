import { createSlice } from '@reduxjs/toolkit';
import {
  addToSearchHistory,
  getSearchHistory,
  removeFromSearchHistory,
} from '@utils/api';

import type { SearchState } from '@/utils/model';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: SearchState = {
  searchTerm: '',
  searchHistory: getSearchHistory(),
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    addToHistory: (
      state,
      action: PayloadAction<{ city: string; country: string }>
    ) => {
      const { city, country } = action.payload;
      state.searchHistory = addToSearchHistory(city, country);
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = removeFromSearchHistory(action.payload);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setSearchTerm,
  addToHistory,
  removeFromHistory,
  setError,
  clearError,
} = searchSlice.actions;
export default searchSlice.reducer;
