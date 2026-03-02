import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

function PartsAdmin() {
  const [parts, setParts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    vehicle: "",
    price: "",
    description: "",
  });

  const imageRef = useRef();

  const fetchData = async () => {
    const [partRes, catRes] = await Promise.all([
      API.get("/parts?admin=true"), // ✅ show sold + unsold
      API.get("/categories"),
    ]);

    setParts(partRes.data);
    setCategories(catRes.data);
    console.log(partRes.data);
    console.log(catRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addPart = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("vehicle", form.vehicle);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("image", imageRef.current.files[0]);

    await API.post("/parts", formData);

    setForm({ name: "", vehicle: "", price: "", description: "" });
    imageRef.current.value = "";
    fetchData();
  };

  const updatePrice = async (id) => {
    const newPrice = prompt("Enter new price:");
    if (!newPrice) return;

    await API.put(`/parts/${id}/price`, { price: newPrice });
    fetchData();
  };

  const markSold = async (id) => {
    await API.put(`/parts/${id}/sold`);
    fetchData();
  };

  const deletePart = async (id) => {
    if (!window.confirm("Delete this part?")) return;

    await API.delete(`/parts/${id}`);
    fetchData();
  };

  return (
  <div className="min-h-screen bg-gray-950 text-white p-6 md:p-8">
    <div className="max-w-7xl mx-auto">

      {/* Page Title */}
      <h2 className="text-3xl font-semibold mb-10">
        Parts Management
      </h2>

      {/* Add Part Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 mb-12">
        <h3 className="text-lg font-medium mb-6 text-gray-300">
          Add New Part
        </h3>

        <form onSubmit={addPart} className="grid md:grid-cols-2 gap-6">

          {/* Part Name */}
          <input
            placeholder="Part Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            required
          />

          {/* Category Select */}
          <select
            value={form.vehicle}
            onChange={(e) =>
              setForm({ ...form, vehicle: e.target.value })
            }
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-gray-300"
            required
          >
            <option value="">Select Vehicle Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Price */}
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

          {/* Description */}
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            required
          />

          {/* File Upload */}
          <input
            type="file"
            ref={imageRef}
            required
            className="md:col-span-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />

          {/* Button */}
          <div className="md:col-span-2">
            <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold w-full md:w-auto">
              Add Part
            </button>
          </div>
        </form>
      </div>

      {/* Parts List */}
      <div className="space-y-6">
        {parts.map((p) => (
          <div
            key={p._id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >

            {/* Left Section */}
            <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
                className="w-full sm:w-40 h-40 sm:h-28 object-cover rounded-lg"
              />

              <div>
                <h4 className="text-lg font-semibold">
                  {p.name}
                </h4>

                <p className="text-blue-400 font-medium">
                  ₹{p.price}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">

                  {/* Category Badge */}
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-600/20 text-purple-400">
                    {p.vehicle?.name || "General"}
                  </span>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      p.sold
                        ? "bg-red-600/20 text-red-400"
                        : "bg-green-600/20 text-green-400"
                    }`}
                  >
                    {p.sold ? "Sold" : "Available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => updatePrice(p._id)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Edit Price
              </button>

              {!p.sold && (
                <button
                  onClick={() => markSold(p._id)}
                  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Mark Sold
                </button>
              )}

              <button
                onClick={() => deletePart(p._id)}
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

export default PartsAdmin;
