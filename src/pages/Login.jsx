import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import LoadingScreen from "../components/LoadingScreen";
import useAuthentication from './../hooks/useAuthentication';


const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const {handleLogin,isLoading} = useAuthentication()
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

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
        <div className="auth">
          <h1>Đăng nhập</h1>
          <form>
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
      )}
    </>
  );
};

export default Login;
