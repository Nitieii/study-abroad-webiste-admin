import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContexProvider } from "./context/authContext";
import { Provider } from "react-redux";
import store from "./store";
import { SnackbarProvider } from "notistack";
import { styled } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContexProvider>
        <SnackbarProvider
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={3000}
        >
          <App />
        </SnackbarProvider>
      </AuthContexProvider>
    </Provider>
  </React.StrictMode>
);
