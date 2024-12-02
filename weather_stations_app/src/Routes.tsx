export const ROUTES = {
    HOME: "/",
    STATIONS: "/stations",
    LOGIN: "/login",
    REGISTRATION: "/registration",
    REPORTS:"/reports"
  }
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    STATIONS: "Станции",
    LOGIN: "Войти",
    REGISTRATION: "Регистрация",
    REPORTS: "Отчеты"
  };