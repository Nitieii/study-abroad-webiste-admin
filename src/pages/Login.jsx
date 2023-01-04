import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import LoadingScreen from "../components/LoadingScreen";
import useAuthentication from './../hooks/useAuthentication';
import "../style/style.css"

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const { handleLogin, isLoading } = useAuthentication()

  const { login } = useContext(AuthContext);

  // React.useEffect(() => {
  //   const token = localStorage.getItem('accessToken')
  //   if (!token) return
  //   handleAuthenticated()
  // }, [])

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await login(inputs);
      handleLogin(inputs)

      // navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="auth-container">
          <div className="auth">
            <h2 style={{
              color:'teal',
              marginBottom:20
            }}>Đăng Nhập</h2>
            <form className="form-login">
              <input
                required
                type="text"
                placeholder="email"
                name="email"
                onChange={handleChange}
              />
              <input
                required
                type="password"
                placeholder="mật khẩu"
                name="password"
                onChange={handleChange}
              />
              <button onClick={handleSubmit}>Login</button>
              {err && <p>{err}</p>}
            </form>
          </div>
        </div>

      )}
    </>
  );
};

export default Login;
