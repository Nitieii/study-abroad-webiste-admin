import "./style.scss";
import StackNavigate from "./components/navigate/StackNavigate";
import Login from "./pages/Login";

function App() {
  const emailData = localStorage.getItem("email")
  const passwordData = localStorage.getItem("password")
  return (
    <>
      {emailData && passwordData ? <StackNavigate /> : <Login/>}
    </>
  );
}

export default App;
