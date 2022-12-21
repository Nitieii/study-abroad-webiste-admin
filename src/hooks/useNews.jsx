import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { POST_API, GET_API, DELETE_API } from "../utils/api";
import { GET_NEWS, HANDLE_LOADING } from "../store/newSlice";

const useNews = () => {
  const dispatch = useDispatch();
  const { news, isLoading } = useSelector((state) => state.news);

  const handleGetNews = async (page, cat) => {
    dispatch(HANDLE_LOADING(true));
    try {
      const res = await axiosInstance.get(
        GET_API({ page: page, cat: cat }).getNews
      );
      if (res.data.status === "success") {
        console.log(res.data.posts);
        dispatch(GET_NEWS(res.data.posts));
      }
      dispatch(HANDLE_LOADING(false));
    } catch (e) {
      console.log(e);
      dispatch(HANDLE_LOADING(false));
    }
  };
  return {
    news,
    isLoading,
    handleGetNews,
  };
};

export default useNews;
