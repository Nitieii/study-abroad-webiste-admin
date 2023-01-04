import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { POST_API, GET_API } from "../utils/api";
import { useNavigate } from "react-router-dom";
import  useAlert  from './useAlert'
import {
  SET_USER,
  HANDLE_LOADING,
  HANDLE_LOGOUT,
  IS_AUTHENTICATED,
} from "../store/authSlice";
import { setSession, getIdByToken } from "../utils/jwt";

const useAuthentication = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useAlert();

  const handleAuthenticated = async (token = '') => {
    dispatch(HANDLE_LOADING(true))
    try {
      const accessToken = token || localStorage.getItem('accessToken')
      const getId = getIdByToken(accessToken)

      if (getId) {
        setSession(accessToken)
        const response = await axiosInstance.get(GET_API(getId).userById)

        dispatch(HANDLE_LOADING(false))

        if (response.data.status === 'success') {
          return dispatch(SET_USER
            (response.data.user))
        }
        return false
      }

      dispatch(HANDLE_LOGOUT())
      dispatch(HANDLE_LOADING(false))
    } catch (err) {
      console.log('error', err)
      dispatch(HANDLE_LOGOUT())
    }
  }

  const handleLogin = async (inputs) => {
    try {
      const res = await axiosInstance.post(POST_API().login, inputs);
      const data = await res.inputs
      console.log(res);
      if (res.data.status === "success") {
        // getUser(res.data.data)
         enqueueSnackbar("Đăng nhập thành công", { variant: "success" });
        dispatch(IS_AUTHENTICATED(true));
        dispatch(HANDLE_LOADING(false));
        // navigate("/thong-tin-du-hoc-sinh");
      } else {
         enqueueSnackbar("Sai thông tin đăng nhập", { variant: "error" });
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
    // navigate("/login");
  };

  return {
    handleLogin,
    isLoading,
    isAuthenticated,
    handleLogout,
    handleAuthenticated,
  };
};

export default useAuthentication;
