import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post:{

    },
    isLoading: false
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    SET_POST: (state,action) => {
        state.post =action.payload
    },
    HANDLE_LOADING: (state,action) => {
        state.isLoading = action.payload
    }
  },
});

const { reducer, actions } = slice;

export const { SET_POST,HANDLE_LOADING } =
  actions;

export default reducer;
