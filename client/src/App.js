import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Parts from "./pages/Parts";
import Vehicles from "./pages/Vehicles";
import SellVehicle from "./pages/SellVehicle";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Navbar />  {/* ✅ Added Here */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parts" element={<Parts />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/sell" element={<SellVehicle />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;