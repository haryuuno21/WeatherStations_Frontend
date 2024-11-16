export const ROUTES = {
    HOME: "https://haryuuno21.github.io/WeatherStations_Frontend/",
    STATIONS: "https://haryuuno21.github.io/WeatherStations_Frontend/#/stations",
  }
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    STATIONS: "Станции",
  };