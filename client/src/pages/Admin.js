import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [vehicles, setVehicles] = useState([]);
  const [parts, setParts] = useState([]);
  const [sellRequests, setSellRequests] = useState([]);

  const [vehicleForm, setVehicleForm] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    image: null
  });

  const [partForm, setPartForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null
  });

  // ---------------- FETCH DATA ----------------

  const fetchData = async () => {
    const v = await axios.get(
      "http://localhost:5000/api/vehicles?admin=true"
    );
    const p = await axios.get(
      "http://localhost:5000/api/parts?admin=true"
    );
    const s = await axios.get(
      "http://localhost:5000/api/sell/admin"
    );

    setVehicles(v.data);
    setParts(p.data);
    setSellRequests(s.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------- ADD VEHICLE ----------------

  const addVehicle = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(vehicleForm).forEach(key => {
      formData.append(key, vehicleForm[key]);
    });

    await axios.post(
      "http://localhost:5000/api/vehicles",
      formData
    );

    setVehicleForm({
      name: "",
      brand: "",
      price: "",
      description: "",
      image: null
    });

    fetchData();
  };

  // ---------------- ADD PART ----------------

  const addPart = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(partForm).forEach(key => {
      formData.append(key, partForm[key]);
    });

    await axios.post(
      "http://localhost:5000/api/parts",
      formData
    );

    setPartForm({
      name: "",
      category: "",
      price: "",
      description: "",
      image: null
    });

    fetchData();
  };

  // ---------------- UPDATE PRICE ----------------

  const updatePrice = async (type, id) => {
    const newPrice = prompt("Enter new price:");
    if (!newPrice) return;

    await axios.put(
      `http://localhost:5000/api/${type}/${id}/price`,
      { price: newPrice }
    );

    fetchData();
  };

  // ---------------- MARK SOLD ----------------

  const markSold = async (type, id) => {
    await axios.put(
      `http://localhost:5000/api/${type}/${id}/sold`
    );

    fetchData();
  };

  // ---------------- DELETE ----------------

  const deleteItem = async (type, id) => {
    await axios.delete(
      `http://localhost:5000/api/${type}/${id}`
    );
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* ---------------- ADD FORMS ---------------- */}

      <div className="grid md:grid-cols-2 gap-8 mb-12">

        {/* Add Vehicle */}
        <form
          onSubmit={addVehicle}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-xl font-semibold mb-4">
            Add Vehicle
          </h2>

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Name"
            value={vehicleForm.name}
            onChange={(e) =>
              setVehicleForm({ ...vehicleForm, name: e.target.value })
            }
          />

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Brand"
            value={vehicleForm.brand}
            onChange={(e) =>
              setVehicleForm({ ...vehicleForm, brand: e.target.value })
            }
          />

          <input
            className="w-full mb-3 p-2 border rounded"
            type="number"
            placeholder="Price"
            value={vehicleForm.price}
            onChange={(e) =>
              setVehicleForm({ ...vehicleForm, price: e.target.value })
            }
          />

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Description"
            value={vehicleForm.description}
            onChange={(e) =>
              setVehicleForm({ ...vehicleForm, description: e.target.value })
            }
          />

          <input
            type="file"
            className="mb-3"
            onChange={(e) =>
              setVehicleForm({ ...vehicleForm, image: e.target.files[0] })
            }
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Vehicle
          </button>
        </form>

        {/* Add Part */}
        <form
          onSubmit={addPart}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-xl font-semibold mb-4">
            Add Part
          </h2>

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Name"
            value={partForm.name}
            onChange={(e) =>
              setPartForm({ ...partForm, name: e.target.value })
            }
          />

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Category"
            value={partForm.category}
            onChange={(e) =>
              setPartForm({ ...partForm, category: e.target.value })
            }
          />

          <input
            className="w-full mb-3 p-2 border rounded"
            type="number"
            placeholder="Price"
            value={partForm.price}
            onChange={(e) =>
              setPartForm({ ...partForm, price: e.target.value })
            }
          />

          <input
            className="w-full mb-3 p-2 border rounded"
            placeholder="Description"
            value={partForm.description}
            onChange={(e) =>
              setPartForm({ ...partForm, description: e.target.value })
            }
          />

          <input
            type="file"
            className="mb-3"
            onChange={(e) =>
              setPartForm({ ...partForm, image: e.target.files[0] })
            }
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Add Part
          </button>
        </form>
      </div>

      {/* ---------------- VEHICLES ---------------- */}

      <h2 className="text-2xl font-bold mb-4">Vehicles</h2>
      {vehicles.map((v) => (
        <div
          key={v._id}
          className="bg-white p-4 mb-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <img
              src={`http://localhost:5000/uploads/${v.image}`}
              className="w-24 mb-2 rounded"
              alt=""
            />
            <p className="font-semibold">
              {v.name} - ₹{v.price}
            </p>
            <p>{v.sold ? "Sold" : "Available"}</p>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => updatePrice("vehicles", v._id)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit Price
            </button>

            <button
              onClick={() => markSold("vehicles", v._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Mark Sold
            </button>

            <button
              onClick={() => deleteItem("vehicles", v._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* ---------------- PARTS ---------------- */}

      <h2 className="text-2xl font-bold mb-4 mt-10">Parts</h2>
      {parts.map((p) => (
        <div
          key={p._id}
          className="bg-white p-4 mb-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <img
              src={`http://localhost:5000/uploads/${p.image}`}
              className="w-24 mb-2 rounded"
              alt=""
            />
            <p className="font-semibold">
              {p.name} - ₹{p.price}
            </p>
            <p>{p.sold ? "Sold" : "Available"}</p>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => updatePrice("parts", p._id)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit Price
            </button>

            <button
              onClick={() => markSold("parts", p._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Mark Sold
            </button>

            <button
              onClick={() => deleteItem("parts", p._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* ---------------- SELL REQUESTS ---------------- */}

      <h2 className="text-2xl font-bold mb-4 mt-10">
        Sell Requests
      </h2>

      {sellRequests.map((s) => (
        <div
          key={s._id}
          className="bg-white p-4 mb-4 rounded shadow"
        >
          <p className="font-semibold">
            {s.title} - ₹{s.price}
          </p>
          <p>{s.description}</p>
          <p>Status: {s.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Admin;