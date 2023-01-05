import { configureStore } from "@reduxjs/toolkit";
import postReducer from './postSlice'
import authReducer from './authSlice'
import newsReducer from './newSlice'
import uploadReducer from "./uploadSlice"

const rootReducer = {
  post: postReducer,
  auth: authReducer,
  news: newsReducer,
  uploader: uploadReducer,
};

export default configureStore({
  reducer: rootReducer,
});
