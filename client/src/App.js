import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Parts from "./pages/Parts";
import Vehicles from "./pages/Vehicles";
import SellVehicle from "./pages/SellVehicle";
import Admin from "./pages/Admin";

import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import VehiclesAdmin from "./pages/Admin/VehiclesAdmin";
import CategoriesAdmin from "./pages/Admin/CategoriesAdmin";
import PartsAdmin from "./pages/Admin/PartsAdmin";

function App() {
  return (
    <Router>
      <Navbar />  {/* ✅ Added Here */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parts" element={<Parts />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/sell" element={<SellVehicle />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="vehicles" element={<VehiclesAdmin />} />
          <Route path="categories" element={<CategoriesAdmin />} />
          <Route path="parts" element={<PartsAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;