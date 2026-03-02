// AdminSellRequests.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSellRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/api/sell/admin");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id) => {
    await axios.put(`http://localhost:5000/api/sell/approve/${id}`);
    fetchRequests();
  };

  const reject = async (id) => {
    await axios.put(`http://localhost:5000/api/sell/reject/${id}`);
    fetchRequests();
  };

  return (
  <div className="min-h-screen bg-gray-950 text-white p-6 md:p-8">
    <div className="max-w-7xl mx-auto">

      {/* Page Title */}
      <h2 className="text-3xl font-semibold mb-10">
        Vehicle Sell Requests
      </h2>

      {requests.length === 0 && (
        <p className="text-gray-400">No pending requests.</p>
      )}

      <div className="space-y-8">
        {requests.map((item) => (
          <div
            key={item._id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
          >

            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

              {/* Left Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {item.vehicleName}
                </h3>

                <p className="text-sm text-gray-400">
                  Owner:{" "}
                  <span className="text-gray-200">
                    {item.ownerName}
                  </span>
                </p>

                <p className="text-sm text-gray-400">
                  Phone:{" "}
                  <span className="text-gray-200">
                    {item.phone}
                  </span>
                </p>

                <p className="text-blue-400 font-medium">
                  ₹{item.price}
                </p>

                {/* Status Badge */}
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                    item.status === "approved"
                      ? "bg-green-600/20 text-green-400"
                      : item.status === "rejected"
                      ? "bg-red-600/20 text-red-400"
                      : "bg-yellow-600/20 text-yellow-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => approve(item._id)}
                  disabled={item.status !== "pending"}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    item.status === "pending"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Approve
                </button>

                <button
                  onClick={() => reject(item._id)}
                  disabled={item.status !== "pending"}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    item.status === "pending"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>

            {/* Images Section */}
            {item.images?.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                {item.images.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/uploads/${img}`}
                    alt=""
                    className="w-full h-32 object-cover rounded-lg border border-gray-800"
                  />
                ))}
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  </div>
);

}