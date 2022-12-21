import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { POST_API, GET_API, DELETE_API, UPDATE_API } from "../utils/api";
import { HANDLE_LOADING, GET_POST,HANDLE_SET_TYPE } from "../store/postSlice";

const usePost = () => {
  const dispatch = useDispatch();
  const { post, isLoading ,type} = useSelector((state) => state.post);

  const handleGetPost = async (page, cat, type) => {
    dispatch(HANDLE_LOADING(true));
    try {
      const res = await axiosInstance.get(
        GET_API({ page: page, cat: cat, type: type }).getPost
      );

      if (res.data.status === "success") {
        if (page == 1) {
          console.log(res.data.posts);
          dispatch(GET_POST(res.data.posts));
        } else {
          const newArray = [...post, ...res.data.posts];
          dispatch(GET_POST(newArray));
          console.log(newArray);
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
      console.log(res.data);
      if (res.data.status === "success") {
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
      dispatch(HANDLE_LOADING(false));
    } catch (error) {
      console.log("error", error);
      dispatch(HANDLE_LOADING(false));
    }
  };

  const handleDeletePost = async (id) => {
    dispatch(HANDLE_LOADING(true));
    try {
      const res = await axiosInstance.delete(DELETE_API(id).deletePost);
      if (res.data.status === "success") {
        dispatch(HANDLE_LOADING(false));
        window.location.reload(true);
      }
      dispatch(HANDLE_LOADING(false));
    } catch (error) {
      console.log("err", error);
      dispatch(HANDLE_LOADING(false));
    }
  };

  const handleChangeSetType = (type) => {
    dispatch(HANDLE_SET_TYPE(type))
  }

  return {
    handleCreatePost,
    post,
    isLoading,
    handleGetPost,
    handleDeletePost,
    handleEditPost,
    type,
    handleChangeSetType
  };
};

export default usePost;
