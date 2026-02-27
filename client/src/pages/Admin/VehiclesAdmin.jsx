import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

function VehiclesAdmin() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    name: "",
    brand: "",
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
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("image", imageRef.current.files[0]);

    await API.post("/vehicles", formData);

    setForm({ name: "", brand: "", price: "", description: "" });
    imageRef.current.value = "";
    fetchVehicles();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Manage Vehicles
      </h2>

      <form onSubmit={addVehicle} className="bg-white p-6 rounded shadow mb-8">
        <input className="input" placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          required
        />
        <input className="input" placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({...form, brand: e.target.value})}
          required
        />
        <input className="input" type="number" placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({...form, price: e.target.value})}
          required
        />
        <input className="input" placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
          required
        />
        <input type="file" ref={imageRef} required className="mb-3" />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Vehicle
        </button>
      </form>

      {vehicles.map((v) => (
        <div key={v._id} className="bg-white p-4 mb-3 rounded shadow">
          {v.name} - ₹{v.price}
        </div>
      ))}
    </div>
  );
}

export default VehiclesAdmin;