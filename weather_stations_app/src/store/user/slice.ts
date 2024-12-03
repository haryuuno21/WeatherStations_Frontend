import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        userName: "",
        userGroup: "guest"
    },
    reducers: {
        setUserName(state, {payload}) {
            state.userName = payload
        },
        setUserGroup(state, {payload}) {
            state.userGroup = payload
        },
    }
})

export const { actions: userActions, reducer: userReducer } = userSlice