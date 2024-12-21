import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api, station, stations } from "../../api"

const stationsSlice = createSlice({
    name: "stations",
    initialState: {
        currentReport: null as number|null|undefined,
        stationsCount: 0,
        stations:[] as station[],
        stationInfo: null as station|null
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
        setStationsList(state, {payload}) {
            state.stations = payload
        },
        setStationInfo(state, {payload}) {
            state.stationInfo = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStations.fulfilled,(state,action)=>{
            state.stations = action.payload.stations
            state.stationsCount = action.payload.stations_count
            state.currentReport = action.payload.current_report
            console.log(action.payload)
        })
        builder.addCase(getStation.fulfilled,(state,action)=>{
            state.stationInfo = action.payload
        })
        builder.addCase(addStationToReport.fulfilled,(state,action)=>{
            state.stationsCount += 1
            console.log(action.payload)
            state.currentReport = action.payload.currentReport
        })
    }
})

export const { actions: stationsActions, reducer: stationsReducer } = stationsSlice

export const getStations = createAsyncThunk<stations,string|undefined>('stations/getStaions', async (stationName) =>
    api.stations.stationsList({station_name:stationName}).then(({data})=>data))

export const getStation = createAsyncThunk<station,string>('stations/getStation',async (id) =>
    api.stations.stationsRead(id).then(({data})=>data))

export const addStationToReport = createAsyncThunk<{currentReport:number},string>('stations/addToReport',async (id)=>
    api.stations.stationsAddToReportCreate(id).then(({data})=>data))