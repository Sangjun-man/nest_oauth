import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Status from "./components/Status";
import MainPage from "./pages/MainPage";
import RedicrectPage from "./pages/RedicrectPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/*" element={<RedicrectPage />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
