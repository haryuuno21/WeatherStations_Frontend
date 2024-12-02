import { createSlice} from "@reduxjs/toolkit"
import { getCurrentReport } from "./getCurrentReport"

const dataSlice = createSlice({
    name: "data",
    initialState: {
        StationName: "",
        CurrentReport:null as number|null|undefined,
        StationsCount:0
    },
    reducers: {
        setStationName(state, {payload}) {
            state.StationName = payload
        },
        addStation(state){
            state.StationsCount += 1
        },
        removeStation(state){
            state.StationsCount -= 1
        },
        clearReport(state){
            state.StationsCount = 0
            state.CurrentReport = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentReport.fulfilled, (state, action) => {
          state.CurrentReport = action.payload
        })
      },
})

export const { actions: dataActions, reducer: dataReducer } = dataSlice