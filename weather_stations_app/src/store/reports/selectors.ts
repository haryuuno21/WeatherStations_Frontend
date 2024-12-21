import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useReportInfo = () =>
    useSelector((state:RootState) => state.reports.reportInfo)

export const useReports = () =>
    useSelector((state:RootState) => state.reports.reports)

export const useStatus = () =>
    useSelector((state:RootState) => state.reports.status)

export const useStartDate = () =>
    useSelector((state:RootState) => state.reports.startDate)

export const useEndDate = () =>
    useSelector((state:RootState) => state.reports.endDate)

