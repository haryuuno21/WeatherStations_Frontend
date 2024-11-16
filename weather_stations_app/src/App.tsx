import { Route, Routes } from "react-router-dom";
import { StationInfoPage} from "./pages/StationInfoPage/StationInfoPage.tsx";
import { StationsPage } from "./pages/StationsPage/StationsPage.tsx";
import { HomePage } from "./pages/HomePage/HomePage";
import Navigation from './components/NavBar/NavBar.tsx';

function App() {
  return (
    <>
    <Navigation/>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/stations" element={<StationsPage />} />
        <Route path="/stations/:id" element={<StationInfoPage />} />
      </Routes>
    </>
  );
}

export default App;