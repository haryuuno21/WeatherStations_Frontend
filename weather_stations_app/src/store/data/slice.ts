import { createSlice} from "@reduxjs/toolkit"

const dataSlice = createSlice({
    name: "data",
    initialState: {
        StationName: ""
    },
    reducers: {
        setStationName(state, {payload}) {
            state.StationName = payload
        }
    }
})

export const { actions: dataActions, reducer: dataReducer } = dataSlice