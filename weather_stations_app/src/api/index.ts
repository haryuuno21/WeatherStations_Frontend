import { Api } from './Api';
import { Station, StationReport, GETReportInfo, GETStations} from './Api';

export const api = new Api({baseURL: 'http://localhost:3000/api'});
export type station = Station;
export type stationReport = StationReport;
export type temperatureReport = GETReportInfo;
export type stations = GETStations;
