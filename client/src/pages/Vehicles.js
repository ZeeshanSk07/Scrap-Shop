import { useEffect, useState } from "react";
import axios from "axios";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vehicles");

        // ✅ Handle wrapped backend response
        if ((res.status = 200)) {
          setVehicles(res.data);
        } else {
          setError(res.data.message || "Failed to load vehicles");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return <div className="p-6">Loading vehicles...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Vehicles</h1>

      {vehicles.length === 0 ? (
        <p>No vehicles available as of now.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {vehicles.map((v) => (
            <div key={v._id} className="bg-white w-full p-4 rounded shadow">
              <img
                src={`http://localhost:5000/uploads/${v.image}`}
                alt={v.name}
                className="w-72 h-60 object-cover rounded mb-3"
              />

              <h3 className="font-semibold text-lg">{v.name}</h3>
              <p className="text-gray-600">₹{v.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
