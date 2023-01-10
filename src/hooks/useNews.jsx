import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { POST_API, GET_API, DELETE_API } from "../utils/api";
import { GET_NEWS, HANDLE_LOADING, GET_TOTALPAGE, DELETE_NEWS } from "../store/newSlice";
import { GET_POST } from "../store/postSlice";

const useNews = () => {
  const dispatch = useDispatch();
  const { news, isLoading, totalPage } = useSelector((state) => state.news);

  const handleGetNews = async (page, cat) => {
    dispatch(HANDLE_LOADING(true));
    try {
      const res = await axiosInstance.get(
        GET_API({ page: page, cat: cat }).getNews
      );
      if (res.data.status === "success") {
        dispatch(GET_TOTALPAGE(res.data.totalPage))
        if (page === 1) {
          dispatch(GET_NEWS(res.data.posts));
          dispatch(GET_POST(res.data.posts))
        } else {
          const newArray = [...news, ...res.data.posts]
          dispatch(GET_NEWS(newArray))
        }
      }
      dispatch(HANDLE_LOADING(false));
    } catch (e) {
      console.log(e);
      dispatch(HANDLE_LOADING(false));
    }
  };

  const handleDeleteNews = async (id) => {
    dispatch(HANDLE_LOADING(true))
    try {
      await axiosInstance.delete(DELETE_API(id).deletePost)
        .then(() => {
          dispatch(DELETE_NEWS(id))
        })
        dispatch(HANDLE_LOADING(false))
    } catch (e) {
      console.log(e)
      dispatch(HANDLE_LOADING(false))
    }
  }
  return {
    news,
    isLoading,
    totalPage,
    handleGetNews,
    handleDeleteNews
  };
};

export default useNews;
