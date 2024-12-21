import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api, report, temperatureReport } from "../../api"

const reportsSlice = createSlice({
    name: "reports",
    initialState: {
        reports: [] as report[],
        reportInfo: null as temperatureReport|null,
        status: "",
        startDate: "",
        endDate: "",
    },
    reducers: {
        setReportInfo(state,{payload}){
            state.reportInfo = payload
        },
        setStatusFilter(state,{payload}){
            state.status = payload
        },
        setStartDate(state,{payload}){
            state.startDate = payload
        },
        setEndDate(state,{payload}){
            state.endDate = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getReports.fulfilled,(state,action)=>{
            state.reports = action.payload
        })
        builder.addCase(getReportInfo.fulfilled,(state,action)=>{
            state.reportInfo = action.payload
        })
    }
    
})

export const { actions: reportsActions, reducer: reportsReducer } = reportsSlice

export const getReports = createAsyncThunk<report[],{status?:string,startDate:string,endDate:string}>
    ('reports/getReports', async (data)=>
    api.reports.reportsList(data).then(({data})=>data))

export const getReportInfo = createAsyncThunk<temperatureReport,string>('reports/getReport', async (id) =>
    api.reports.reportsRead(id).then(({data})=>data))

export const changeReportDate = createAsyncThunk<void,{id:string,data:string}>('reports/change', async (data) =>
    api.reports.reportsUpdate(data.id,data.data).then(()=>{return}))

export const formReport = createAsyncThunk<void,string>('reports/form',async (id)=> 
    api.reports.reportsFormUpdate(id).then(()=>{return}))

export const deleteReport = createAsyncThunk<void,string>('reports/delete', async (id)=>
    api.reports.reportsDeleteDelete(id).then(()=>{return}))