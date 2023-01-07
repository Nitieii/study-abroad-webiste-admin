import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { POST_API, GET_API, DELETE_API, UPDATE_API } from "../utils/api";
import {
  HANDLE_LOADING,
  GET_POST,
  HANDLE_SET_TYPE,
  GET_TOTALPAGE,
  DELETE_POST
} from "../store/postSlice";
import useAlert from "./useAlert";
import { useNavigate } from "react-router-dom";

const usePost = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useAlert();
  const { post, isLoading, type, totalPage } = useSelector(
    (state) => state.post
  );
  const navigate = useNavigate();

  const handleGetPost = async (page, cat, type) => {
    dispatch(HANDLE_LOADING(true));
    try {
      const res = await axiosInstance.get(
        GET_API({ page: page, cat: cat, type: type }).getPost
      );

      if (res.data.status === "success") {
        dispatch(GET_TOTALPAGE(res.data.totalPage));
        if (page == 1) {
          dispatch(GET_POST(res.data.posts));
        } else {
          const newArray = [...post, ...res.data.posts];
          dispatch(GET_POST(newArray));
        }
      }
      dispatch(HANDLE_LOADING(false));
    } catch (e) {
      dispatch(HANDLE_LOADING(false));
      console.log(e);
    }
  };
  const handleCreatePost = async (form) => {
    dispatch(HANDLE_LOADING(true));
    try {
      const res = await axiosInstance.post(POST_API().createPost, form, {
        headers: { "Content-type": "multipart/form-data" },
      });
      // dispatch(SET_POST(res.data));
      if (res.data.status === "success") {
        enqueueSnackbar("Tạo bài viết thành công", { variant: "success" });
        navigate("/thong-tin-du-hoc-sinh");
        dispatch(HANDLE_LOADING(false));
      }
    } catch (error) {
      console.log("err", error);
      dispatch(HANDLE_LOADING(false));
    }
  };

  const handleEditPost = async (id, form) => {
    dispatch(HANDLE_LOADING(true));
    try {
      const res = await axiosInstance.put(UPDATE_API(id).updatePost, form);
      enqueueSnackbar("Chỉnh sửa bài viết thành công", {
        variant: "success",
      });
      navigate("/thong-tin-du-hoc-sinh");
      dispatch(HANDLE_LOADING(false));
    } catch (error) {
      console.log("error", error);
      dispatch(HANDLE_LOADING(false));
    }
  };

  const handleDeletePost = async (id) => {
    dispatch(HANDLE_LOADING(true));
    try {
      await axiosInstance.delete(DELETE_API(id).deletePost)
        .then(() => {
          dispatch(DELETE_POST(id))
        })
      dispatch(HANDLE_LOADING(false));
    } catch (error) {
      console.log("err", error);
      dispatch(HANDLE_LOADING(false));
    }
  };

  const handleChangeSetType = (type) => {
    dispatch(HANDLE_SET_TYPE(type));
  };

  return {
    handleCreatePost,
    post,
    isLoading,
    handleGetPost,
    handleDeletePost,
    handleEditPost,
    type,
    handleChangeSetType,
    totalPage,
  };
};

export default usePost;
