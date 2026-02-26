import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [requests, setRequests] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/admin/sell-requests");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approve = async (id) => {
    await axios.put(`http://localhost:5000/admin/approve/${id}`);
    fetchData();
  };

  const reject = async (id) => {
    await axios.put(`http://localhost:5000/admin/reject/${id}`);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Admin Panel - Sell Requests
      </h1>

      <div className="grid gap-6">
        {requests.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <h2 className="text-lg md:text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold mt-2">₹ {item.price}</p>

            <p className={`mt-2 font-semibold ${
              item.status === "approved"
                ? "text-green-600"
                : item.status === "rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }`}>
              Status: {item.status}
            </p>

            {/* 🔥 Multiple Images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              {item.images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/uploads/${img}`}
                  alt="product"
                  className="h-24 w-full object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Buttons */}
            {item.status === "pending" && (
              <div className="flex gap-4 mt-4 flex-col sm:flex-row">
                <button
                  onClick={() => approve(item._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                >
                  Approve
                </button>

                <button
                  onClick={() => reject(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;