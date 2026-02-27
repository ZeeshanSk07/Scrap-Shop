import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

function Admin() {
  const [categories, setCategories] = useState([]);
  const [parts, setParts] = useState([]);

  const [categoryName, setCategoryName] = useState("");

  const [partForm, setPartForm] = useState({
    name: "",
    vehicle: "",
    price: "",
    description: "",
  });

  const partImageRef = useRef();

  // ---------------- FETCH DATA ----------------

  const fetchData = async () => {
    try {
      const [catRes, partRes] = await Promise.all([
        API.get("/vehicle-categories"),
        API.get("/parts?admin=true"),
      ]);

      setCategories(catRes.data);
      setParts(partRes.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------- ADD VEHICLE CATEGORY ----------------

  const addCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) return;

    try {
      await API.post("/vehicle-categories", { name: categoryName });

      setCategoryName("");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error adding category");
    }
  };

  // ---------------- ADD PART ----------------

  const addPart = async (e) => {
    e.preventDefault();

    const imageFile = partImageRef.current?.files[0];

    if (!imageFile) {
      alert("Upload image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", partForm.name);
      formData.append("vehicle", partForm.vehicle); // category id
      formData.append("price", partForm.price);
      formData.append("description", partForm.description);
      formData.append("image", imageFile);

      await API.post("/parts", formData);

      setPartForm({
        name: "",
        vehicle: "",
        price: "",
        description: "",
      });

      partImageRef.current.value = "";
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error adding part");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8">Parts Admin</h1>

      {/* ---------------- ADD CATEGORY ---------------- */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Add Vehicle Category (For Parts)
        </h2>

        <form onSubmit={addCategory}>
          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Vehicle Name (e.g. Swift)"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Category
          </button>
        </form>
      </div>

      {/* ---------------- ADD PART ---------------- */}

      <div className="bg-white p-6 rounded-xl shadow mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Add Part
        </h2>

        <form onSubmit={addPart}>

          <input
            required
            className="w-full mb-3 p-2 border rounded"
            placeholder="Part Name"
            value={partForm.name}
            onChange={(e) =>
              setPartForm({ ...partForm, name: e.target.value })
            }
          />

          <select
            required
            className="w-full mb-3 p-2 border rounded"
            value={partForm.vehicle}
            onChange={(e) =>
              setPartForm({ ...partForm, vehicle: e.target.value })
            }
          >
            <option value="">Select Vehicle Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            required
            type="number"
            className="w-full mb-3 p-2 border rounded"
            placeholder="Price"
            value={partForm.price}
            onChange={(e) =>
              setPartForm({ ...partForm, price: e.target.value })
            }
          />

          <input
            required
            className="w-full mb-3 p-2 border rounded"
            placeholder="Description"
            value={partForm.description}
            onChange={(e) =>
              setPartForm({ ...partForm, description: e.target.value })
            }
          />

          <input type="file" ref={partImageRef} className="mb-3" required />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Add Part
          </button>
        </form>
      </div>

      {/* ---------------- PARTS LIST ---------------- */}

      <h2 className="text-2xl font-bold mb-4">All Parts</h2>

      {parts.map((p) => (
        <div
          key={p._id}
          className="bg-white p-4 mb-4 rounded shadow"
        >
          <img
            src={`http://localhost:5000/uploads/${p.image}`}
            alt=""
            className="w-24 mb-2 rounded"
          />
          <p className="font-semibold">
            {p.name} - ₹{p.price}
          </p>
          <p>
            Vehicle: {p.vehicle?.name}
          </p>
        </div>
      ))}

    </div>
  );
}

export default Admin;