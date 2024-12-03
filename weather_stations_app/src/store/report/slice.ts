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
        },
        removeStation(state){
            if(state.stationsCount>0) state.stationsCount += 1
        },
        clearReportInfo(state){
            state.stationsCount = 0
            state.currentReport = null
        },
    }
})

export const { actions: reportActions, reducer: reportReducer } = reportSlice