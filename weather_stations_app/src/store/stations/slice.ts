import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api, station, stations } from "../../api"

const stationsSlice = createSlice({
    name: "stations",
    initialState: {
        currentReport: null as number|null|undefined,
        stationsCount: 0,
        stations:[] as station[],
        stationInfo: null as station|null,
        foundStationsCount: 0,
        nextPageURL: null as string|null,
        prevPageURL: null as string|null,
        currentPage: "1"
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
        },

        nextPage(state){
            if(state.nextPageURL!=null){
                const url = new URL(state.nextPageURL)
                state.currentPage = url.searchParams.get("page")|| "last";
            }
        },
        
        prevPage(state){
            if(state.prevPageURL!=null){
                const url = new URL(state.prevPageURL)
                state.currentPage = url.searchParams.get("page")|| "1";
            }
        },

        firstPage(state){
            state.currentPage = "1"
        },

        lastPage(state){
            state.currentPage = "last"
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getStations.fulfilled,(state,action)=>{
            const payload = action.payload
            state.nextPageURL = payload.next
            state.prevPageURL = payload.previous
            state.foundStationsCount = payload.count
            state.stations = payload.results.stations
            state.stationsCount = payload.results.stations_count
            state.currentReport = payload.results.current_report
        })
        builder.addCase(getStation.fulfilled,(state,action)=>{
            state.stationInfo = action.payload
        })
        builder.addCase(addStationToReport.fulfilled,(state,action)=>{
            state.stationsCount += 1
            state.currentReport = action.payload.currentReport
        })
        builder.addCase(deleteStationFromReport.fulfilled,(state)=>{
            state.stationsCount -= 1
        })
    }
})

export const { actions: stationsActions, reducer: stationsReducer } = stationsSlice

export const getStations = createAsyncThunk<stations,{stationName:string|undefined,page:string|undefined}>('stations/getStaions', async (data) =>
    api.stations.stationsList({station_name:data.stationName,page:data.page}).then(({data})=>data))

export const getStation = createAsyncThunk<station,string>('stations/getStation',async (id) =>
    api.stations.stationsRead(id).then(({data})=>data))

export const addStationToReport = createAsyncThunk<{currentReport:number},string>('stations/addToReport',async (id)=>
    api.stations.stationsAddToReportCreate(id).then(({data})=>data))

export const deleteStationFromReport = createAsyncThunk<void,{reportID:string,stationID:string}>(
    'stations/deleteFromReport', async (data) =>
    api.stationsReports.stationsReportsRemoveStationDelete(data.reportID,data.stationID).then(()=>{return})
)

export const putTemperature = createAsyncThunk<void,{reportID:string,stationID:string,temp:number}>(
    'stations/putTemperature', async (data) =>
    api.stationsReports.stationsReportsPutTemperatureUpdate(data.reportID,data.stationID,data.temp).then(()=>{return})
)