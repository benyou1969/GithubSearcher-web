import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constants";
import { AppState } from "./configureStore";

export const search = createAsyncThunk(
  "fetch/search",
  async (data: { searchType: string; searchTerm: string }, thunkAPI) => {
    try {
      // const searchApi = new SearchApi();
      // const response = await searchApi.apiSearchPost(data);
      // return response.data.items;
      const response = await axios(`${API_URL}/api/search`, {
        data,
        method: "POST",
      });
      return response.data.items;
    } catch (e) {
      const { response } = e;
      const { data } = response;

      return thunkAPI.rejectWithValue({
        error: data.error ? data.error : data.message,
      });
    }
  }
);

const initialState = {
  data: null,
  loading: "idle",
  error: null,
};

export const FetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {
    clear(state) {
      state.data = null;
    },
  },
  extraReducers: {
    [search.pending.type]: (state) => {
      delete state.error;
      state.loading = "loading";
    },
    [search.fulfilled.type]: (state, action) => {
      state.loading = "loaded";
      state.data = action.payload;
    },
    [search.rejected.type]: (state, action) => {
      state.loading = "error";
      state.error = action.payload.error;
    },
  },
});

export const selectFetch = (state: AppState) => state[FetchSlice.name];

const { actions } = FetchSlice;

export const { clear } = actions;
