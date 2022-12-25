import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContexProvider } from "./context/authContext";
import { Provider } from "react-redux";
import store from "./store";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContexProvider>
        <SnackbarProvider anchorOrigin={{vertical:'top',horizontal:'right'}}>
          <App />
        </SnackbarProvider>
      </AuthContexProvider>
    </Provider>
  </React.StrictMode>
);
