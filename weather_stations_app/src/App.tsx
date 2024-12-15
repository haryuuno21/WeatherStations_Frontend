import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StationInfoPage } from "./pages/StationInfoPage/StationInfoPage";
import { StationsPage } from "./pages/StationsPage/StationsPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { ROUTES } from "./Routes";
import Navigation from "./components/NavBar/NavBar";
import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

function App() {
  useEffect(()=>{
    invoke('tauri', {cmd:'create'})
      .then(() =>{console.log("Tauri launched")})
      .catch(() =>{console.log("Tauri not launched")})
    return () =>{
      invoke('tauri', {cmd:'close'})
        .then(() =>{console.log("Tauri launched")})
        .catch(() =>{console.log("Tauri not launched")})
    }
  }, [])

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
