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

        // ✅ Handle wrapped backend response
        if ((res.status = 200)) {
          setParts(res.data);
        } else {
          setError(res.data.message || "Failed to load parts");
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
    return <div className="p-6">Loading parts...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Spare Parts</h1>

      {parts.length === 0 ? (
        <p>No spare parts available as of now.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {parts.map((p) => (
            <div key={p._id} className="bg-white p-4 w-full rounded shadow">
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
                className="w-72 h-72 object-cover rounded mb-3"
              />

              <h3 className="font-semibold text-lg">{p.name}</h3>

              <p className="text-gray-600">₹{p.price}</p>

              <p className="text-sm text-gray-500">
                Category: {p.vehicle?.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
