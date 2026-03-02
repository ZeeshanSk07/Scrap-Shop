import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-white"
        >
          Scrap<span className="text-green-500 font-bold">Mart</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-gray-300">

          <Link
            to="/"
            className="hover:text-white transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/vehicles"
            className="hover:text-white transition duration-300"
          >
            Vehicles
          </Link>

          <Link
            to="/parts"
            className="hover:text-white transition duration-300"
          >
            Parts
          </Link>

          <Link
            to="/sell"
            className="hover:text-white transition duration-300"
          >
            Sell
          </Link>

          {/* CTA Button */}
          <Link
            to="/admin"
            className="ml-4 px-6 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition shadow-md"
          >
            Admin
          </Link>

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-white"
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800 px-8 py-6 flex flex-col gap-5 text-gray-300 font-medium">

          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link to="/vehicles" onClick={() => setOpen(false)}>
            Vehicles
          </Link>

          <Link to="/parts" onClick={() => setOpen(false)}>
            Parts
          </Link>

          <Link to="/sell" onClick={() => setOpen(false)}>
            Sell
          </Link>

          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="mt-2 bg-green-600 text-white py-2 rounded-full text-center font-semibold"
          >
            Admin
          </Link>

        </div>
      )}
    </nav>
  );
}
