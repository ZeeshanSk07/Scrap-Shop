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
    <div className="p-6">
      <h2 className="text-2xl mb-4">Vehicle Sell Requests</h2>

      {requests.map((item) => (
        <div key={item._id} className="border p-4 mb-4 rounded">
          <p><b>Name:</b> {item.ownerName}</p>
          <p><b>Phone:</b> {item.phone}</p>
          <p><b>Vehicle:</b> {item.vehicleName}</p>
          <p><b>Price:</b> {item.price}</p>
          <p><b>Status:</b> {item.status}</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => approve(item._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => reject(item._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>

          <div className="flex gap-2 mt-3">
            {item.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000/uploads/${img}`}
                alt=""
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}