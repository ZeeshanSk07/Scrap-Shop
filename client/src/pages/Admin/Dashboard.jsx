import React, { useState } from "react";
import VehiclesAdmin from "./VehiclesAdmin";
import CategoriesAdmin from "./CategoriesAdmin";
import PartsAdmin from "./PartsAdmin";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("vehicles");

  const renderTab = () => {
    switch (activeTab) {
      case "vehicles":
        return <VehiclesAdmin />;
      case "categories":
        return <CategoriesAdmin />;
      case "parts":
        return <PartsAdmin />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("vehicles")}
          className={`px-4 py-2 rounded ${
            activeTab === "vehicles"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Vehicles For Sale
        </button>

        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 rounded ${
            activeTab === "categories"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Vehicle Categories
        </button>

        <button
          onClick={() => setActiveTab("parts")}
          className={`px-4 py-2 rounded ${
            activeTab === "parts"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Parts
        </button>
      </div>

      {/* Active Section */}
      {renderTab()}
    </div>
  );
}

export default Dashboard;