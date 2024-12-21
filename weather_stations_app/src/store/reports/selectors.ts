import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useReportInfo = () =>
    useSelector((state:RootState) => state.reports.reportInfo)

export const useReports = () =>
    useSelector((state:RootState) => state.reports.reports)

