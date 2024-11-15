import { createSlice} from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../store";

const dataSlice = createSlice({
    name: "stationName",
    initialState: {
        StationName: ""
    },
    reducers: {
        setStationName(state, {payload}) {
            state.StationName = payload
        }
    }
})

export const useStationName = () =>
    useSelector((state:RootState) => state.ourData.StationName)


export const {
    setStationName: setStationNameAction
} = dataSlice.actions


export default dataSlice.reducer