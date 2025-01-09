import { Api, PaginatedStations, TemperatureReport } from './Api';
import { Station, StationReport, GETReportInfo} from './Api';

export const api = new Api({baseURL: 'http://localhost:3000/api'});
export type station = Station;
export type stationReport = StationReport;
export type temperatureReport = GETReportInfo;
export type stations = PaginatedStations;
export type report = TemperatureReport;
