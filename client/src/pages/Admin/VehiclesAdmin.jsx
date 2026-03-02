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
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Vehicles</h2>

      {/* Add Vehicle Form */}
      <form onSubmit={addVehicle} className="bg-white p-6 rounded shadow mb-8">
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="input"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          className="input"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input type="file" ref={imageRef} required className="mb-3" />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Vehicle
        </button>
      </form>

      {/* Vehicles List */}
      {vehicles.map((v) => (
        <div key={v._id} className="bg-white p-4 mb-3 rounded shadow">
          <p className="font-semibold">
            <img
              src={`http://localhost:5000/uploads/${v.image}`}
              alt={v.name}
              className="w-40 h-28 object-cover rounded mb-2"
            />

            <p className="font-semibold">
              {v.name} - ₹{v.price}
            </p>
          </p>

          <p>
            Status:{" "}
            {v.sold ? (
              <span className="text-red-600 font-bold">Sold</span>
            ) : (
              <span className="text-green-600">Available</span>
            )}
          </p>

          <div className="flex gap-2 mt-3">
            {/* Edit Price */}
            <button
              onClick={() => updatePrice(v._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit Price
            </button>

            {/* Mark Sold */}
            {!v.sold && (
              <button
                onClick={() => markSold(v._id)}
                className="bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Mark Sold
              </button>
            )}

            {/* Delete */}
            <button
              onClick={() => deleteVehicle(v._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VehiclesAdmin;
