import { configureStore } from "@reduxjs/toolkit";
import postReducer from './postSlice'

const rootReducer = {
    post: postReducer
};

export default configureStore({
  reducer: rootReducer,
});
