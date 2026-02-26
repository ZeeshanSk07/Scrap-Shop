import { useEffect, useState } from "react";
import axios from "axios";

export default function Parts() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/parts"
        );
        
        // ✅ Handle wrapped backend response
        if (res.status = 200) {
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
      <h1 className="text-2xl font-bold mb-6">
        Spare Parts
      </h1>

      {parts.length === 0 ? (
        <p>No spare parts available as of now.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {parts.map((part) => (
            <div
              key={part._id}
              className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold mb-2">
                {part.name}
              </h2>
              <p className="text-gray-600 mb-2">
                {part.description}
              </p>
              <p className="font-bold text-green-600">
                ₹ {part.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}