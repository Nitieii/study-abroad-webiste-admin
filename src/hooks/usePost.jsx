import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { POST_API } from "../utils/api";
import { HANDLE_LOADING, SET_POST } from "../store/postSlice";

const usePost = () => {
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state.post);

  const handleCreatePost = async (form) => {
    dispatch(HANDLE_LOADING(true));
    try {
      const res = await axiosInstance.post(POST_API().createPost, form, {
        headers: { "Content-type": "multipart/form-data" },
      });
      dispatch(SET_POST(res.data));
      dispatch(HANDLE_LOADING(false));
    } catch (error) {
      console.log("err", error);
    }
  };
  return {
    handleCreatePost,
    post,
    isLoading,
  };
};

export default usePost;
