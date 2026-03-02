import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Parts from "./pages/Parts";
import Vehicles from "./pages/Vehicles";
import SellVehicle from "./pages/SellVehicle";

import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import VehiclesAdmin from "./pages/Admin/VehiclesAdmin";
import CategoriesAdmin from "./pages/Admin/CategoriesAdmin";
import PartsAdmin from "./pages/Admin/PartsAdmin";
import AdminSellRequests from "./pages/Admin/AdminSellRequests";

import ProtectedRoute from "./pages/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";

function AppContent() {
  const location = useLocation();

  // Hide navbar on admin pages
  const hideNavbar =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/parts" element={<Parts />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/sell" element={<SellVehicle />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="vehicles" element={<VehiclesAdmin />} />
          <Route path="categories" element={<CategoriesAdmin />} />
          <Route path="parts" element={<PartsAdmin />} />
          <Route path="sell-requests" element={<AdminSellRequests />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
