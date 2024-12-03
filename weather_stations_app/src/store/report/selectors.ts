import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useCurrentReport = () =>
    useSelector((state:RootState) => state.report.currentReport)

export const useStationsCount = () =>
    useSelector((state:RootState) => state.report.stationsCount)

