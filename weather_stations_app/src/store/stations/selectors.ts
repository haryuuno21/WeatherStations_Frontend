import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useCurrentReport = () =>
    useSelector((state:RootState) => state.stations.currentReport)

export const useStationsCount = () =>
    useSelector((state:RootState) => state.stations.stationsCount)

export const useStations = () =>
    useSelector((state:RootState) => state.stations.stations)

export const useStationInfo = () =>
    useSelector((state:RootState) => state.stations.stationInfo)

