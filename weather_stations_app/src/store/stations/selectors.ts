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

export const useNextPage = () =>
    useSelector((state:RootState) => state.stations.nextPageURL)

export const usePrevPage = () =>
    useSelector((state:RootState) => state.stations.prevPageURL)

export const useFoundCount = () =>
    useSelector((state:RootState) => state.stations.foundStationsCount)

export const useCurrentPage = () =>
    useSelector((state:RootState) => state.stations.currentPage)