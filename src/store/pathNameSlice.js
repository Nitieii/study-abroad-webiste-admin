import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    pathName: null
}

const slice = createSlice({
    name: 'pathName',
    initialState,
    reducers: {
        HANDLE_GET_PATHNAME:(state,action) => {
            state.pathName = action.payload
        }
    }
})

const {reducer,actions} =slice

export const {HANDLE_GET_PATHNAME} = actions

export default reducer