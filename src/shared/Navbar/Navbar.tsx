import { useState } from "react";
import { FiSearch, FiShoppingCart, FiHeart, FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.jpg";
import { logOut } from "../../redux/features/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../../redux/features/user/userApi";
import { useCurrentToken } from "../../redux/features/Auth/AuthSlice";
import { FaCaretDown } from "react-icons/fa"; // Import a dropdown icon from React Icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Fetch user details
  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;

  // Fetch cart items from the Redux store
  const cartItems = useAppSelector((state) => state.cart.items); // Adjust path based on your store structure
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logo}
              className="h-14 md:h-15 lg:h-19 w-auto"
              alt="Logo"
            />
            <span>BD SHOP</span>
          </Link>
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
          {/* Cart Icon with Count */}
          <div className="relative">
            <Link to="/cart" className="text-gray-700 text-lg relative">
              <FiShoppingCart />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          <Link to="/favorites" className="text-gray-700 text-lg">
            <FiHeart />
          </Link>

          {/* User Profile or Login */}
          <div className="relative">
            {user ? (
              <div className="relative">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
                  />
                  <span className="text-gray-700 font-semibold hidden lg:block">
                    {user.name}
                  </span>

                  {/* Dropdown Trigger (using React Icon) */}
                  <button
                    onClick={toggleDropdown}
                    className="text-gray-700 font-semibold focus:outline-none"
                  >
                    <FaCaretDown className="h-5 w-5" />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-300 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm shadow-md hover:shadow-lg hover:opacity-90 transition-all"
              >
                Login / Sign Up
              </Link>
            )}
          </div>

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
              <Link to="/" className="block text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block text-gray-700">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block text-gray-700">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Mobile User Info */}
          {user && (
            <div className="flex items-center space-x-4 px-4 py-2 border-t border-gray-300">
              <img
                src={user.profileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
              />
              <span className="text-gray-700 font-semibold">{user.name}</span>
              <button
                onClick={handleLogOut}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm shadow-md hover:shadow-lg hover:opacity-90 transition-all"
              >
                Logout
              </button>
            </div>
          )}

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
