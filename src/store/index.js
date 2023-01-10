import { configureStore } from "@reduxjs/toolkit";
import postReducer from './postSlice'
import authReducer from './authSlice'
import newsReducer from './newSlice'
import uploadReducer from "./uploadSlice"
import CultureSlice from "./culSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const rootReducer = {
  post: postReducer,
  auth: authReducer,
  news: newsReducer,
  uploader: uploadReducer,
  culture: CultureSlice,
};

const customizeMiddleWare = getDefaultMiddleware({
  serializableCheck: false
})

export default configureStore({
  middleware: customizeMiddleWare,
  reducer: rootReducer,
});
