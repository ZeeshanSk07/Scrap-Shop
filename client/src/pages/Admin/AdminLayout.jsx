import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <div style={{
        width: "220px",
        background: "#111",
        color: "#fff",
        padding: "20px"
      }}>
        <h2>Admin Panel</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="vehicles">Vehicles</Link></li>
          <li><Link to="categories">Vehicle Categories</Link></li>
          <li><Link to="parts">Parts</Link></li>
        </ul>
      </div>

      <div style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;