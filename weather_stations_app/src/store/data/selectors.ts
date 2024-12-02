import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useStationName = () =>
    useSelector((state:RootState) => state.data.StationName)

