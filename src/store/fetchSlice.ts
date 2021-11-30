import { ActionCreator, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constants";
import { AppState } from "./configureStore";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const FetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {
    setData(state, { payload }: PayloadAction<any>) {
      state.data = payload.data;
      state.error = payload.error;
    },
    clear(state) {
      state.data = null;
    },
  },
});

export const setDataReducer: ActionCreator<any> =
  (searchType, searchTerm) => async (dispatch) => {
    try {
      const res = await axios(`${API_URL}/api/search`, {
        data: { searchType, searchTerm },
        method: "POST",
      });

      await dispatch(
        FetchSlice.actions.setData({
          data: res.data.items,
        })
      );
    } catch (e) {
      const { response } = e;
      const { data } = response;

      await dispatch(
        FetchSlice.actions.setData({
          data: null,
          error: data,
        })
      );
    }
  };

export const selectFetch = (state: AppState) => state[FetchSlice.name];

const { actions } = FetchSlice;

export const { clear } = actions;
