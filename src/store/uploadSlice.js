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
        SET_UPLOAD: (state, action) => void(
            state.file = action.payload
        ),
        HANDLE_DELETE: (state, action) => void(
            state.file = state.file.filter(file => file._id !== action.payload)
        )
    }
})

const { reducer, actions } = Slice;

export const { HANDLE_LOADING, SET_UPLOAD, HANDLE_DELETE } = actions
export default reducer