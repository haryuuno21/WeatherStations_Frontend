import { createSlice } from "@reduxjs/toolkit"

const reportSlice = createSlice({
    name: "report",
    initialState: {
        currentReport: null as number|null,
        stationsCount: 0,
    },
    reducers: {
        setCurrentReport(state, {payload}) {
            state.currentReport = payload
        },
        setStationsCount(state, {payload}) {
            state.stationsCount = payload
        },
        addStation(state){
            state.stationsCount += 1
        }
        removeStation(state){
            if(state.stationsCount>0)
        }
    }
})

export const { actions: userActions, reducer: userReducer } = userSlice