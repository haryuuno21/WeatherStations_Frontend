import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

interface userRequest{
    login : string;
    password : string;
}

interface userResponse{
    userName : string;
    userGroup: string;
}

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
        logout(state){
            state.userGroup = "guest"
            state.userName = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled,(state,action)=>{
            state.userGroup = action.payload.userGroup
            state.userName = action.payload.userName
        })
    }
})

export const { actions: userActions, reducer: userReducer } = userSlice

export const getUser = createAsyncThunk<userResponse,userRequest>('user/getUser', async (user:userRequest) =>{
    const response = await axios.post('http://localhost:3000/api/users/authentication/',{
        username: user.login,
        password: user.password,
    })
    return response.data
})