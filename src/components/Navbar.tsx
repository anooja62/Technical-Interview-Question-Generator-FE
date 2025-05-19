import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-tight">
          CodeCrack
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition">
            About
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Contact
          </Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Sign In
          </button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-4">
          <Link to="/" className="block text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="block text-gray-600 hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="block text-gray-600 hover:text-blue-600">
            Contact
          </Link>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
}
