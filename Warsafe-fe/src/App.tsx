import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import "leaflet/dist/leaflet.css";
import Profile from "./pages/Profile";
import Location from "./pages/Location";
import Grafik from "./pages/Grafik";
import Pembukuan from "./pages/Pembukuan";
import Komunitas from "./pages/Komunitas";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route index element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* User Dashboard */}
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/location" element={<Location />} />
        <Route path="/grafik" element={<Grafik />} />
        <Route path="/komunitas" element={<Komunitas />} />
        <Route path="/pembukuan" element={<Pembukuan />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
