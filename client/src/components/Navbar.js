import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center px-4 py-3">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-yellow-400">
          ScrapMart 🚗
        </Link>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/parts" className="hover:text-yellow-400">Parts</Link>
          <Link to="/vehicles" className="hover:text-yellow-400">Vehicles</Link>
          <Link to="/sell" className="hover:text-yellow-400">Sell</Link>
          <Link
            to="/admin"
            className="bg-yellow-400 text-black px-3 py-1 rounded"
          >
            Admin
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-gray-800 flex flex-col space-y-3 px-4 pb-4">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/parts" onClick={() => setOpen(false)}>Parts</Link>
          <Link to="/vehicles" onClick={() => setOpen(false)}>Vehicles</Link>
          <Link to="/sell" onClick={() => setOpen(false)}>Sell Vehicle</Link>
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="bg-yellow-400 text-black px-3 py-2 rounded text-center"
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
}