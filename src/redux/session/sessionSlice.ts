import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ResultsPerPage = 5 | 25 | 100;

interface SessionSliceState {
  // Here would be session token as well
  // token?: string;
  userFilters: {
    searchText: string;
    currentPage: number;
    resultsPerPage: ResultsPerPage;
  };
}

const initialState: SessionSliceState = {
  userFilters: {
    searchText: "",
    currentPage: 1,
    resultsPerPage: 25,
  },
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSearchText(state, { payload }: PayloadAction<string>) {
      state.userFilters.searchText = payload;
      state.userFilters.currentPage = 1;
    },
    setPage(state, { payload }: PayloadAction<number>) {
      if (payload < 1) {
        state.userFilters.currentPage = 1;
      } else {
        state.userFilters.currentPage = payload;
      }
    },
    nextPage(state) {
      state.userFilters.currentPage++;
    },
    prevPage(state) {
      if (state.userFilters.currentPage > 1) {
        state.userFilters.currentPage--;
      }
    },
    setResultsPerPage(state, { payload }: PayloadAction<ResultsPerPage>) {
      state.userFilters.resultsPerPage = payload;
      state.userFilters.currentPage = 1;
    },
  },
});

export const { nextPage, prevPage, setResultsPerPage, setSearchText } =
  sessionSlice.actions;
export default sessionSlice.reducer;
