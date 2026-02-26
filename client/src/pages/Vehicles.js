import { useEffect, useState } from "react";
import axios from "axios";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/vehicles"
        );

        // ✅ Handle wrapped backend response
        if (res.status = 200) {
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
      <h1 className="text-2xl font-bold mb-4">
        Available Vehicles
      </h1>

      {vehicles.length === 0 ? (
        <p>No vehicles available as of now.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold">
                {vehicle.name}
              </h2>
              <p>Model: {vehicle.model}</p>
              <p>Year: {vehicle.year}</p>
              <p className="font-bold text-green-600">
                ₹ {vehicle.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}