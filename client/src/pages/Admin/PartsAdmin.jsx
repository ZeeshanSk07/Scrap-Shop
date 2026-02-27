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
      axios.get("http://localhost:5000/api/parts"),
      axios.get("http://localhost:5000/api/categories"),
    ]);

    setParts(partRes.data);
    setCategories(catRes.data);
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

    await axios.post("http://localhost:5000/api/parts", formData);

    setForm({ name: "", vehicle: "", price: "", description: "" });
    imageRef.current.value = "";
    fetchData();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Manage Parts
      </h2>

      <form onSubmit={addPart} className="bg-white p-6 rounded shadow mb-8">

        <input className="input" placeholder="Part Name"
          value={form.name}
          onChange={(e)=>setForm({...form, name:e.target.value})}
          required
        />

        <select className="input"
          value={form.vehicle}
          onChange={(e)=>setForm({...form, vehicle:e.target.value})}
          required
        >
          <option value="">Select Vehicle Category</option>
          {categories.map(c=>(
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <input className="input" type="number" placeholder="Price"
          value={form.price}
          onChange={(e)=>setForm({...form, price:e.target.value})}
          required
        />

        <input className="input" placeholder="Description"
          value={form.description}
          onChange={(e)=>setForm({...form, description:e.target.value})}
          required
        />

        <input type="file" ref={imageRef} required className="mb-3"/>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Part
        </button>
      </form>

      {parts.map(p=>(
        <div key={p._id} className="bg-white p-4 mb-3 rounded shadow">
          {p.name} - ₹{p.price} ( {p.vehicle?.name} )
        </div>
      ))}
    </div>
  );
}

export default PartsAdmin;