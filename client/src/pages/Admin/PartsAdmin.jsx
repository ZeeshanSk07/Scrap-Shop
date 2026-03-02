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
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Parts</h2>

      {/* Add Part Form */}
      <form onSubmit={addPart} className="bg-white p-6 rounded shadow mb-8">
        <input
          className="input"
          placeholder="Part Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          className="input"
          value={form.vehicle}
          onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
          required
        >
          <option value="">Select Vehicle Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

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
          Add Part
        </button>
      </form>

      {/* Parts List */}
      {parts.map((p) => (
        <div key={p._id} className="bg-white p-4 mb-3 rounded shadow">
          <p className="font-semibold">
            <img
              src={`http://localhost:5000/uploads/${p.image}`}
              alt={p.name}
              className="w-40 h-28 object-cover rounded mb-2"
            />

            <p className="font-semibold">
              {p.name} - ₹{p.price} ({p.vehicle?.name})
            </p>
          </p>

          <p>
            Status:{" "}
            {p.sold ? (
              <span className="text-red-600 font-bold">Sold</span>
            ) : (
              <span className="text-green-600">Available</span>
            )}
          </p>

          <div className="flex gap-2 mt-3">
            {/* Edit Price */}
            <button
              onClick={() => updatePrice(p._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit Price
            </button>

            {/* Mark Sold (only if not sold) */}
            {!p.sold && (
              <button
                onClick={() => markSold(p._id)}
                className="bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Mark Sold
              </button>
            )}

            {/* Delete */}
            <button
              onClick={() => deletePart(p._id)}
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

export default PartsAdmin;
