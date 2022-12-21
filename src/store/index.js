import { configureStore } from "@reduxjs/toolkit";
import postReducer from './postSlice'
import authReducer from './authSlice'
import newsReducer from './newSlice'
const rootReducer = {
    post: postReducer,
    auth: authReducer,
    news: newsReducer
};

export default configureStore({
  reducer: rootReducer,
});
