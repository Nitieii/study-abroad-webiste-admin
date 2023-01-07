import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
  isLoading: false,
  type: "du-hoc-han-quoc",
  totalPage: 1,
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
    GET_TOTALPAGE: (state, action) => {
      state.totalPage = action.payload;
    },
    DELETE_POST: (state, actions) => void (
      state.post = state.post.filter(e => e._id !== actions.payload)
    )

  },
});

const { reducer, actions } = slice;

export const { GET_POST, HANDLE_LOADING, HANDLE_SET_TYPE, GET_TOTALPAGE, DELETE_POST } =
  actions;

export default reducer;
