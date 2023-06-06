import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { POST_API, GET_API } from "../utils/api";
import { useNavigate } from "react-router-dom";
import useAlert from "./useAlert";
import { SET_USER, HANDLE_LOADING, HANDLE_LOGOUT } from "../store/authSlice";

const useAuthentication = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, user, email, password } = useSelector(
    (state) => state.auth
  );

  const { enqueueSnackbar } = useAlert();

  const handleLogin = async (inputs) => {
    try {
      const res = await axiosInstance.post(POST_API().login, inputs);
      console.log(res);
      if (res.data.status === "success") {
        dispatch(SET_USER(res.data.user));

        if (res.data.user) {
          localStorage.setItem("email", res.data.user.email);
          localStorage.setItem("password", res.data.user.password);
          window.location.reload();
        }

        // getUser(res.data.data)
        window.location.redirect("/")
        enqueueSnackbar("Đăng nhập thành công", { variant: "success" });

        dispatch(HANDLE_LOADING(false));
      } else {
        enqueueSnackbar("Sai thông tin đăng nhập", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Sai thông tin đăng nhập", { variant: "error" });

      dispatch(HANDLE_LOADING(false));
      console.log("error", error);
    }
  };

  const handleLogout = () => {
    dispatch(HANDLE_LOGOUT());
    window.localStorage.clear();
    window.location.reload();
  };

  return {
    handleLogin,
    isLoading,
    isAuthenticated,
    handleLogout,
    user,
  };
};

export default useAuthentication;
