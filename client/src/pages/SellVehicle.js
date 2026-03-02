import { useState } from "react";
import axios from "axios";

export default function SellVehicle() {
  const [form, setForm] = useState({});
  const [images, setImages] = useState([]);

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

    const formData = new FormData();

    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    await axios.post("http://localhost:5000/api/sell", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Vehicle submitted successfully");
  };
  const isValid = images.length >= 2;
  return (
    <form onSubmit={submit} className="p-6 space-y-3">
      <input name="ownerName" placeholder="Your Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full" />
      <input name="vehicleName" placeholder="Vehicle Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="price" placeholder="Price" onChange={handleChange} className="border p-2 w-full" />
      <input type="file" multiple accept="image/*" onChange={handleImages} className="w-full" />
      <button
  disabled={!isValid}
  className={`p-2 w-full rounded ${
    isValid ? "bg-blue-600 text-white" : "bg-gray-400 text-gray-200"
  }`}
>
  Submit
</button>
    </form>
  );
}