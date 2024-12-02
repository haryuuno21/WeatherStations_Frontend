import { Api } from './Api';
import { Station, StationReport, TemperatureReport, GETStations} from './Api';

export const api = new Api({baseURL: 'http://localhost:3000/api'});
export type station = Station;
export type stationReport = StationReport;
export type temperatureReport = TemperatureReport;
export type stations = GETStations;
