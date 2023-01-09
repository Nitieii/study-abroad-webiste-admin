import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { POST_API, GET_API, DELETE_API } from "../utils/api";
import {
    GET_POST, GET_TOTAL, HANDLE_DELETE, HANDLE_LOADING
} from "../store/culSlice"
import axios from "axios";

const useCulture = () =>{
    const dispatch = useDispatch();
    const { isLoading, culture, totalPage } = useSelector(state => state.culture)

    const handleGetPost = async(page, cat) => {
        dispatch(HANDLE_LOADING(true))
        try{
            const res = await axiosInstance.get(GET_API({page: page, cat: cat}).getNews)
            if(res.data.status === "success"){
                dispatch(GET_POST(res.data.posts))
                dispatch(GET_TOTAL(res.data.totalPage))
            }
            dispatch(HANDLE_LOADING(false))
        }catch(e){
            console.log(e)
            dispatch(HANDLE_LOADING(false))
        }
    }

    const handleDeletePost = async(id) =>{
        dispatch(HANDLE_LOADING(true))
        try{
            await axiosInstance.delete(DELETE_API(id).deletePost)
            .then(()=>{
                dispatch(HANDLE_DELETE(id))
            })
            dispatch(HANDLE_LOADING(false))
        }catch(e){
            console.log(e)
            dispatch(HANDLE_LOADING(false))
        }
    }

    return{
        isLoading,
        culture,
        totalPage,
        handleGetPost,
        handleDeletePost
    }
}

export default useCulture