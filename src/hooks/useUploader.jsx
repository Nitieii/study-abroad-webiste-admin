import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { POST_API, GET_API, DELETE_API } from "../utils/api";
import { HANDLE_LOADING, SET_UPLOAD, HANDLE_DELETE } from "../store/uploadSlice"
import axios from "axios";

const useUploader = () => {
    const dispatch = useDispatch();;
    const { isLoading, file } = useSelector(state => state.uploader)
    const handleUploadImg = async (formData) => {
        dispatch(HANDLE_LOADING(true))
        try {
            const res = await axiosInstance.post(POST_API().uploader, formData)
            if (res.data.status === "success") {
                console.log(res)
                dispatch(SET_UPLOAD(file))             
            }

            dispatch(HANDLE_LOADING(false))
        } catch (e) {
            console.log(e)
            dispatch(HANDLE_LOADING(false))
        }
    }
    const handleGetImage = async (cat) => {
        dispatch(HANDLE_LOADING(true))
        try {
            const res = await axiosInstance.get(GET_API({ cat: cat }).getImage)
            if (res.data.status === "success") {
                dispatch(SET_UPLOAD(res.data.images))

            }
            dispatch(HANDLE_LOADING(false))
        } catch (e) {
            console.log(e)
            dispatch(HANDLE_LOADING(false))
        }
    }
    const handleDeleteImage = async (id) => {
        dispatch(HANDLE_LOADING(true))
        try {
            await axiosInstance.delete(DELETE_API(id).deleteImage)
                .then(() => {
                    dispatch(HANDLE_DELETE(id))
                })

            dispatch(HANDLE_LOADING(false))
        } catch (e) {
            console.log(e)
            dispatch(HANDLE_LOADING(false))
        }
    }
    return {
        isLoading,
        file,
        handleUploadImg,
        handleGetImage,
        handleDeleteImage
    }
}

export default useUploader