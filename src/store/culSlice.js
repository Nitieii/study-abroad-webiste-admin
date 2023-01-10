import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  culture: [],
  isLoading: false,
  totalPage: 1
};

const Slice = createSlice({
  name: "culture",
  initialState: initialState,
  reducers: {
    GET_CULTURE: (state, action) => {
      state.culture = action.payload;
    },
    HANDLE_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    GET_TOTAL: (state, action) => {
      state.totalPage = action.payload;
    },
    HANDLE_DELETE: (state, action) =>
      void (state.culture = state.culture.filter(
        (e) => e._id !== action.payload
      ))
  }
});

const { actions, reducer } = Slice;

export const { GET_CULTURE, HANDLE_LOADING, GET_TOTAL, HANDLE_DELETE } = actions;
export default reducer;
