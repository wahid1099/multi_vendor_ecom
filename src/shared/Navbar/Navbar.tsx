import { useState } from "react";
import { FiSearch, FiShoppingCart, FiHeart, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <a href="/">Logo</a>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center bg-gray-100 px-3 py-2 rounded-md w-1/3">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for products..."
            className="ml-2 bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Menu Icons */}
        <div className="flex items-center space-x-6">
          <a href="/cart" className="text-gray-700 text-lg">
            <FiShoppingCart />
          </a>
          <a href="/favorites" className="text-gray-700 text-lg">
            <FiHeart />
          </a>

          {/* Login / Sign Up or Profile */}
          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm shadow-md hover:shadow-lg hover:opacity-90 transition-all"
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm shadow-md hover:shadow-lg hover:opacity-90 transition-all"
            >
              Login / Sign Up
            </a>
          )}

          {/* Hamburger Menu */}
          <button
            className="lg:hidden text-gray-700 text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {menuOpen && (
        <nav className="lg:hidden bg-gray-100">
          <ul className="space-y-2 px-4 py-2">
            <li>
              <a href="/" className="block text-gray-700">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="block text-gray-700">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="block text-gray-700">
                Contact Us
              </a>
            </li>
          </ul>

          {/* Mobile Search Bar */}
          <div className="flex items-center bg-white px-3 py-2 mt-2 rounded-md">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for products..."
              className="ml-2 bg-transparent outline-none text-sm w-full"
            />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
