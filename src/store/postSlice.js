import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
  isLoading: false,
  type: "du-hoc-dai-loan",
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    HANDLE_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    GET_POST: (state, action) => {
      state.post = action.payload;
    },
    HANDLE_SET_TYPE: (state, action) => {
      state.type = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export const { GET_POST, HANDLE_LOADING, HANDLE_SET_TYPE } = actions;

export default reducer;
