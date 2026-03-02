import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <Link
          to="vehicles"
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-600 transition"
        >
          <h3 className="text-lg font-medium mb-2">
            Vehicles
          </h3>
          <p className="text-gray-400 text-sm">
            Manage vehicles listed for sale.
          </p>
        </Link>

        <Link
          to="categories"
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-600 transition"
        >
          <h3 className="text-lg font-medium mb-2">
            Categories
          </h3>
          <p className="text-gray-400 text-sm">
            Manage vehicle categories.
          </p>
        </Link>

        <Link
          to="parts"
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-600 transition"
        >
          <h3 className="text-lg font-medium mb-2">
            Parts
          </h3>
          <p className="text-gray-400 text-sm">
            Manage spare parts inventory.
          </p>
        </Link>

        <Link
          to="sell-requests"
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-600 transition"
        >
          <h3 className="text-lg font-medium mb-2">
            Sell Requests
          </h3>
          <p className="text-gray-400 text-sm">
            Review customer vehicle submissions.
          </p>
        </Link>

      </div>
    </div>
  );
}

export default Dashboard;
