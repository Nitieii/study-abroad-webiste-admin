import "./style.scss";
import StackNavigate from "./components/navigate/StackNavigate";
import useAuthentication from "./hooks/useAuthentication";
import Login from "./pages/Login";
import { useEffect } from "react";



function App() {
  const { isAuthenticated } = useAuthentication();
  console.log(isAuthenticated)
  const emailData = localStorage.getItem("email")
  const passwordData = localStorage.getItem("password")
  return (
    <>
      {!emailData && !passwordData ? <Login /> : <StackNavigate />}
    </>
  );
}


export default App;
