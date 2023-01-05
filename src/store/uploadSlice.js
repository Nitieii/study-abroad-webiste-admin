import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadding: false,
    file: []
}

const Slice = createSlice({
    name: 'uploader',
    initialState: initialState,
    reducers: {
        HANDLE_LOADING: (state, action) => {
            state.isLoadding = action.payload
        },
        SET_UPLOAD: (state, action) => {
            state.file = action.payload
        }
    }
})

const { reducer, actions } = Slice;

export const { HANDLE_LOADING, SET_UPLOAD } = actions
export default reducer