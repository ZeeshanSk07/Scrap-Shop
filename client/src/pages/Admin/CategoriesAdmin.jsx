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
  <div className="min-h-screen bg-gray-950 text-white p-6 md:p-8">
    <div className="max-w-5xl mx-auto">

      {/* Page Title */}
      <h2 className="text-3xl font-semibold mb-10">
        Vehicle Categories
      </h2>

      {/* Add Category Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 mb-12">
        <h3 className="text-lg font-medium mb-6 text-gray-300">
          Add New Category
        </h3>

        <form
          onSubmit={addCategory}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            placeholder="Category Name (e.g. Swift, SUV, Sedan)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            required
          />

          <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold">
            Add
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div>
        <h3 className="text-lg font-medium mb-6 text-gray-300">
          Existing Categories
        </h3>

        {categories.length === 0 ? (
          <p className="text-gray-400">
            No categories created yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((c) => (
              <div
                key={c._id}
                className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-center hover:border-blue-600 transition"
              >
                {c.name}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  </div>
);
}

export default CategoriesAdmin;