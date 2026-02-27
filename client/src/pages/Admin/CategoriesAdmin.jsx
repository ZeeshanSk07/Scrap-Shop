import React, { useEffect, useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/categories", { name });
    setName("");
    fetchCategories();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Manage Vehicle Categories
      </h2>

      <form onSubmit={addCategory} className="bg-white p-6 rounded shadow mb-8">
        <input
          className="input"
          placeholder="Category Name (Swift)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Category
        </button>
      </form>

      {categories.map((c) => (
        <div key={c._id} className="bg-white p-4 mb-3 rounded shadow">
          {c.name}
        </div>
      ))}
    </div>
  );
}

export default CategoriesAdmin;