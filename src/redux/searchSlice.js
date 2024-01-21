import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: "",
    searchResults: [],
    page: 1,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setSearchTerm, setSearchResults, setPage } = searchSlice.actions;

export const selectSearchTerm = (state) => state.search.searchTerm;
export const selectSearchResults = (state) => state.search.searchResults;
export const selectPage = (state) => state.search.page;

export default searchSlice.reducer;