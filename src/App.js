import "./style.scss";
import StackNavigate from "./components/navigate/StackNavigate";
import useAuthentication from "./hooks/useAuthentication";
import Login from "./pages/Login";


function App() {
  const {isAuthenticated} = useAuthentication();
  console.log(isAuthenticated)
  return (
    <>
      {!isAuthenticated ? <Login/> : <StackNavigate/>}
    </>
  );
}


export default App;
