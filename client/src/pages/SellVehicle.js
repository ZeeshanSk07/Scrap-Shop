import { useState } from "react";
import axios from "axios";

export default function SellVehicle() {
  const [form, setForm] = useState({});
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    setImages(e.target.files);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (images.length < 2) {
      alert("Please upload minimum 2 images");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await axios.post("http://localhost:5000/api/sell", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Vehicle submitted successfully");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = images.length >= 2;

  return (
    <div className="pt-28 min-h-screen bg-black text-white px-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-semibold text-center mb-10">
          Sell Your Vehicle
        </h1>

        <form
          onSubmit={submit}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-6 shadow-xl"
        >

          {/* Owner Name */}
          <input
            name="ownerName"
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
            required
          />

          {/* Phone */}
          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
            required
          />

          {/* Vehicle Name */}
          <input
            name="vehicleName"
            placeholder="Vehicle Name"
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
            required
          />

          {/* Price */}
          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition"
            required
          />

          {/* Images */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Upload Images (Minimum 2)
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
            />

            <p className="mt-2 text-sm text-gray-500">
              {images.length} image(s) selected
            </p>
          </div>

          {/* Submit Button */}
          <button
            disabled={!isValid || submitting}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              isValid
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Vehicle"}
          </button>

        </form>
      </div>
    </div>
  );
}
