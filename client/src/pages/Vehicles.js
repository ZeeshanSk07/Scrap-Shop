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

        if (res.status === 200) {
          setVehicles(res.data);
        } else {
          setError("Failed to load vehicles");
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
    return (
      <div className="pt-28 min-h-screen bg-black text-white flex items-center justify-center">
        Loading vehicles...
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-28 min-h-screen bg-black text-red-500 flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="pt-28 min-h-screen bg-black text-white px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-semibold mb-12 text-center">
          Available Vehicles
        </h1>

        {vehicles.length === 0 ? (
          <p className="text-center text-gray-400">
            No vehicles available as of now.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {vehicles.map((v) => (
              <div
                key={v._id}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group border border-gray-800"
              >
                <div className="overflow-hidden">
                  <img
                    src={`http://localhost:5000/uploads/${v.image}`}
                    alt={v.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {v.name}
                  </h3>

                  <p className="text-green-500 text-xl font-medium">
                    ₹{v.price}
                  </p>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}
