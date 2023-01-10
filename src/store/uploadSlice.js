import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    file: []
}

const Slice = createSlice({
    name: 'uploader',
    initialState: initialState,
    reducers: {
        HANDLE_LOADING: (state, action) => {
            state.isLoading = action.payload
        },
        SET_UPLOAD: (state, action) => {
            const array = action.payload
            state.file = [...array, ...state.file]
        },
        HANDLE_DELETE: (state, action) => void(
            state.file = state.file.filter(file => file._id !== action.payload)
        ),
        GET_IMG:(state, action)=>{
            state.file = action.payload
        }
    }
})

const { reducer, actions } = Slice;

export const { HANDLE_LOADING, SET_UPLOAD, HANDLE_DELETE, GET_IMG } = actions
export default reducer