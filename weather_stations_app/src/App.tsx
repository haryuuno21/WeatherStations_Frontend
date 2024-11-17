import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StationInfoPage } from "./pages/StationInfoPage/StationInfoPage";
import { StationsPage } from "./pages/StationsPage/StationsPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { ROUTES } from "./Routes";
import Navigation from "./components/NavBar/NavBar";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const isTauri = Boolean((window as any).__TAURI__);

    if (isTauri) {
      const { invoke } = (window as any).__TAURI__.tauri;

      // Вызов команды create
      invoke("create")
        .then((response: any) => console.log("Создано:", response))
        .catch((error: any) => console.error("Ошибка создания:", error));

      // Возврат функции очистки, вызов команды close
      return () => {
        invoke("close")
          .then((response: any) => console.log("Закрыто:", response))
          .catch((error: any) => console.error("Ошибка закрытия:", error));
      };
    } else {
      console.warn("Приложение запущено вне среды Tauri.");
    }
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.STATIONS} element={<StationsPage />} />
        <Route path={`${ROUTES.STATIONS}/:id`} element={<StationInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
