import { useEffect, useState } from "react";
import axios from "axios";

export default function Parts() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/parts");

        if (res.status === 200) {
          setParts(res.data);
        } else {
          setError("Failed to load parts");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load parts");
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  if (loading) {
    return (
      <div className="pt-28 min-h-screen bg-black text-white flex items-center justify-center">
        Loading parts...
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
          Spare Parts
        </h1>

        {parts.length === 0 ? (
          <p className="text-center text-gray-400">
            No spare parts available as of now.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {parts.map((p) => (
              <div
                key={p._id}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group border border-gray-800"
              >
                <div className="overflow-hidden">
                  <img
                    src={`http://localhost:5000/uploads/${p.image}`}
                    alt={p.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {p.name}
                  </h3>

                  <p className="text-green-500 text-xl font-medium mb-2">
                    ₹{p.price}
                  </p>

                  <p className="text-sm text-gray-400">
                    Category:{" "}
                    <span className="text-gray-300">
                      {p.vehicle?.name || "General"}
                    </span>
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
