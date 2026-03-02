import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

function VehiclesAdmin() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const imageRef = useRef();

  const fetchVehicles = async () => {
    const res = await API.get("/vehicles?admin=true");
    setVehicles(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const addVehicle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("image", imageRef.current.files[0]);

    await API.post("/vehicles", formData);

    setForm({ name: "", price: "", description: "" });
    imageRef.current.value = "";
    fetchVehicles();
  };

  const updatePrice = async (id) => {
    const newPrice = prompt("Enter new price:");
    if (!newPrice) return;
    await API.put(`/vehicles/${id}/price`, { price: newPrice });
    fetchVehicles();
  };

  const markSold = async (id) => {
    await API.put(`/vehicles/${id}/sold`);
    fetchVehicles();
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;
    await API.delete(`/vehicles/${id}`);
    fetchVehicles();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* Page Title */}
        <h2 className="text-3xl font-semibold mb-10">
          Vehicles Management
        </h2>

        {/* Add Vehicle Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-12">
          <h3 className="text-lg font-medium mb-6 text-gray-300">
            Add New Vehicle
          </h3>

          <form onSubmit={addVehicle} className="grid md:grid-cols-2 gap-6">

            <input
              placeholder="Vehicle Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              required
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              required
            />

            <input
              type="file"
              ref={imageRef}
              required
              className="md:col-span-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />

            <div className="md:col-span-2">
              <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold">
                Add Vehicle
              </button>
            </div>
          </form>
        </div>

        {/* Vehicles List */}
        <div className="space-y-6">
          {vehicles.map((v) => (
            <div
              key={v._id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              {/* Left Section */}
              <div className="flex gap-6 items-center">
                <img
                  src={`http://localhost:5000/uploads/${v.image}`}
                  alt={v.name}
                  className="w-40 h-28 object-cover rounded-lg"
                />

                <div>
                  <h4 className="text-lg font-semibold">
                    {v.name}
                  </h4>
                  <p className="text-blue-400 font-medium">
                    ₹{v.price}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                      v.sold
                        ? "bg-red-600/20 text-red-400"
                        : "bg-green-600/20 text-green-400"
                    }`}
                  >
                    {v.sold ? "Sold" : "Available"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => updatePrice(v._id)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Edit Price
                </button>

                {!v.sold && (
                  <button
                    onClick={() => markSold(v._id)}
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    Mark Sold
                  </button>
                )}

                <button
                  onClick={() => deleteVehicle(v._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default VehiclesAdmin;
