import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StationInfoPage} from "./pages/StationInfoPage/StationInfoPage.tsx";
import { StationsPage } from "./pages/StationsPage/StationsPage.tsx";
import { HomePage } from "./pages/HomePage/HomePage";
import { ROUTES } from "./Routes";
import Navigation from './components/NavBar/NavBar.tsx';
import { AuthPage } from "./pages/AuthPage/AuthPage.tsx";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage.tsx";

function App() {
  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.STATIONS} element={<StationsPage />} />
        <Route path={`${ROUTES.STATIONS}/:id`} element={<StationInfoPage />} />
        <Route path={ROUTES.LOGIN} element={<AuthPage />} />
        <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;