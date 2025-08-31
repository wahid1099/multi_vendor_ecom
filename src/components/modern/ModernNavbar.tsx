import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  Bell,
  ChevronDown,
  Settings,
  Package,
  BarChart3,
  Users,
  LogIn,
  LogOut,
  Star,
  Store,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/redux/hook";
import {
  useCurrentToken,
  selectCurrentUser,
} from "@/redux/features/Auth/AuthSlice";
import { userApi } from "@/redux/features/user/userApi";

const ModernNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Get auth state
  const token = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);

  // Fetch user data if token exists
  const { data: userData } = userApi.endpoints.getMe.useQuery(
    {},
    {
      skip: !token,
    }
  );

  const user = userData?.data || currentUser;
  const isLoggedIn = !!token && !!user;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/all-products" },
    { name: "Cart", href: "/cart" },
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              EcomStore
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-blue-50 transition-colors"
              onClick={() => navigate("/notifications")}
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-red-50 transition-colors"
              onClick={() => navigate("/wishlist")}
              title="Wishlist"
            >
              <Heart className="h-5 w-5" />
              <Badge
                variant="secondary"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600"
              >
                5
              </Badge>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-green-50 transition-colors"
              onClick={() => navigate("/cart")}
              title="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge
                variant="default"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-500 hover:bg-green-600"
              >
                2
              </Badge>
            </Button>

            {/* Profile Dropdown or Login */}
            <div className="relative">
              {isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span className="hidden md:block text-sm font-medium">
                      {user.name}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                      >
                        {/* User Info */}
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {user.role}
                          </Badge>
                        </div>

                        {/* Role-based menu items */}
                        {user.role === "Customer" && (
                          <>
                            <Link
                              to="/dashboard"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <LayoutDashboard className="h-4 w-4 mr-3" />
                              My Dashboard
                            </Link>
                            <Link
                              to="/dashboard/my-profile"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <User className="h-4 w-4 mr-3" />
                              My Profile
                            </Link>
                            <Link
                              to="/dashboard/my-orders"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Package className="h-4 w-4 mr-3" />
                              My Orders
                            </Link>
                            <Link
                              to="/wishlist"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Heart className="h-4 w-4 mr-3" />
                              My Wishlist
                            </Link>
                            <Link
                              to="/dashboard/my-reviews"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Star className="h-4 w-4 mr-3" />
                              My Reviews
                            </Link>
                            <Link
                              to="/dashboard/settings"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Settings className="h-4 w-4 mr-3" />
                              Settings
                            </Link>
                          </>
                        )}

                        {user.role === "Admin" && (
                          <>
                            <Link
                              to="/dashboard"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <BarChart3 className="h-4 w-4 mr-3" />
                              Admin Dashboard
                            </Link>
                            <Link
                              to="/dashboard/manage-users"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Users className="h-4 w-4 mr-3" />
                              Manage Users
                            </Link>
                            <Link
                              to="/dashboard/admin-manage-products"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Package className="h-4 w-4 mr-3" />
                              Manage Products
                            </Link>
                            <Link
                              to="/dashboard/admin-manage-order"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-3" />
                              Manage Orders
                            </Link>
                            <Link
                              to="/dashboard/my-profile"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <User className="h-4 w-4 mr-3" />
                              My Profile
                            </Link>
                          </>
                        )}

                        {user.role === "Vendor" && (
                          <>
                            <Link
                              to="/dashboard"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <BarChart3 className="h-4 w-4 mr-3" />
                              Vendor Dashboard
                            </Link>
                            <Link
                              to="/dashboard/add-product"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Package className="h-4 w-4 mr-3" />
                              Add Product
                            </Link>
                            <Link
                              to="/dashboard/vendor-manage-products"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Package className="h-4 w-4 mr-3" />
                              My Products
                            </Link>
                            <Link
                              to="/dashboard/vendor-orders"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-3" />
                              My Orders
                            </Link>
                            <Link
                              to="/dashboard/my-shop"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Store className="h-4 w-4 mr-3" />
                              My Shop
                            </Link>
                            <Link
                              to="/dashboard/my-profile"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <User className="h-4 w-4 mr-3" />
                              My Profile
                            </Link>
                          </>
                        )}

                        <hr className="my-2" />
                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                />
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Quick Actions */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Quick Actions
                  </h3>
                  <Link
                    to="/notifications"
                    className="flex items-center py-2 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Bell className="h-4 w-4 mr-3" />
                    Notifications
                    <Badge variant="destructive" className="ml-auto text-xs">
                      3
                    </Badge>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center py-2 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4 mr-3" />
                    Wishlist
                    <Badge
                      variant="secondary"
                      className="ml-auto text-xs bg-red-500"
                    >
                      5
                    </Badge>
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center py-2 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-3" />
                    Cart
                    <Badge
                      variant="default"
                      className="ml-auto text-xs bg-green-500"
                    >
                      2
                    </Badge>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ModernNavbar;
