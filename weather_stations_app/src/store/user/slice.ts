import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../api";
import { User } from "../../api/Api";

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
        builder.addCase(deauthorizeUser.fulfilled,(state)=>{
            state.userGroup = "guest"
            state.userName = ""
        })
        builder.addCase(changeUser.fulfilled,(state,action)=>{
            if(action.payload.username) state.userName = action.payload.username
        })
    }
})

export const { actions: userActions, reducer: userReducer } = userSlice

export const getUser = createAsyncThunk<userResponse,User>('user/getUser', async (user) =>
    api.users.usersAuthenticationCreate(user).then(({data})=>data))

export const deauthorizeUser = createAsyncThunk<void,void>('user/deauthorization',async ()=>
    api.users.usersDeauthorizationCreate().then())

export const registrationUser = createAsyncThunk<void,User>('user/register', async (user) =>
    api.users.usersRegistrationCreate(user).then())

export const changeUser = createAsyncThunk<User,{password?:string,username?:string,email?:string}>
('user/change',async (user)=>
    api.users.usersUpdate(user).then(({data})=>data))