import { createSlice} from "@reduxjs/toolkit"

const dataSlice = createSlice({
    name: "data",
    initialState: {
        StationName: "",
        UserLogin:"",
        UserGroup:"guest",
    },
    reducers: {
        setStationName(state, {payload}) {
            state.StationName = payload
        },
        setUserGroup(state,{payload}){
            state.UserGroup = payload
        }
    }
})

export const { actions: dataActions, reducer: dataReducer } = dataSlice