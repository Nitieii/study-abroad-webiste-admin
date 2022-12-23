import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  isLoading: false,
  totalPage: 1
};
const slice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    GET_NEWS: (state, action) => {
      state.news = action.payload;
    },
    HANDLE_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    GET_TOTALPAGE: (state, action) =>{
      state.totalPage = action.payload
    }
  },
});

const { actions, reducer } = slice;
export const { GET_NEWS, HANDLE_LOADING, GET_TOTALPAGE } = actions;

export default reducer;
