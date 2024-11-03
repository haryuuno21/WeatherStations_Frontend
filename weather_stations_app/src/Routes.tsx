export const ROUTES = {
    HOME: "/",
    STATIONS: "/stations",
  }
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    STATIONS: "Станции",
  };