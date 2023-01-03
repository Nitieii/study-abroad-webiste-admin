import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

import "./style.scss";
import AuthStackNavigate from "./components/navigate/AuthStackNavigate";
import StackNavigate from "./components/navigate/StackNavigate";
import useAuthentication from "./hooks/useAuthentication";



function App() {
  const {isAuthenticated} = useAuthentication();
  console.log(isAuthenticated)
  return (
    <>
      {!isAuthenticated ? <AuthStackNavigate/> : <StackNavigate/>}
    </>
    // <AuthStackNavigate/>
  );
}

export default App;
