import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { POST_API, GET_API } from "../utils/api";
import { useNavigate } from "react-router-dom";
// import { useAlert } from 'hook'
import {
  HANDLE_LOADING,
  HANDLE_LOGOUT,
  IS_AUTHENTICATED,
} from "../store/authSlice";
import { setSession, getIdByToken } from "../utils/jwt";

const useAuthentication = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = async (inputs) => {
    try {
      const res = await axiosInstance.post(POST_API().login, inputs);
      const data = await res.inputs
      console.log(res);
      if (res.data.status === "success") {
        // getUser(res.data.data)
        
        dispatch(IS_AUTHENTICATED(true));
        dispatch(HANDLE_LOADING(false));
        navigate("/thong-tin-du-hoc-sinh");
      } else {
        alert("Sai thong tin dang nhap!!");
      }
    } catch (error) {
      dispatch(HANDLE_LOADING(false));
      console.log("error", error);
    }
  };

  const handleLogout = () => {
    setSession("");
    dispatch(HANDLE_LOGOUT());
    window.localStorage.clear();
    navigate("/login");
  };

  return {
    handleLogin,
    isLoading,
    isAuthenticated,
    handleLogout,
  };
};

export default useAuthentication;
