import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">

      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-gray-900 border-r border-gray-800 flex-col p-6">

        <h2 className="text-xl font-semibold mb-10">
          Admin Panel
        </h2>

        <nav className="space-y-2">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="vehicles"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            Vehicles
          </NavLink>

          <NavLink
            to="categories"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            Categories
          </NavLink>

          <NavLink
            to="parts"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            Parts
          </NavLink>

          <NavLink
            to="sell-requests"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            Sell Requests
          </NavLink>

        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 transition px-4 py-3 rounded-lg font-medium"
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">

        {/* Mobile Header */}
        <div className="md:hidden mb-6">
          <h2 className="text-xl font-semibold">
            Admin Panel
          </h2>
        </div>

        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
