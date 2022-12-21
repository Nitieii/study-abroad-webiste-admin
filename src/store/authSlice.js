import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 isLoading: false,
 isAuthenticated: false,
 isInitialized: false,
 user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    HANDLE_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SET_USER: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    IS_AUTHENTICATED: (state, action) => {
      state.isAuthenticated = action.payload
    },
    HANDLE_LOGOUT: state => {
      state.isAuthenticated = false
      state.user = {}
    },
  },
});

const { reducer, actions } = slice;

export const { HANDLE_LOADING, SET_USER, IS_AUTHENTICATED,HANDLE_LOGOUT } = actions;

export default reducer;
