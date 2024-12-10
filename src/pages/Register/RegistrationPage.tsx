import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import banner from "../../assets/Registerpage.png";
const RegistrationPage = () => {
  const [role, setRole] = useState("Customer");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-[90%] max-w-4xl">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-purple-600 text-white p-6 md:p-10">
          <img
            src={banner}
            alt="Image 1"
            className="w-full h-full object-cover"
          />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Welcome</h2>
          <p className="text-center mb-6 text-sm md:text-base">
            Already have an account? Sign in now
          </p>
          <button className="bg-white text-purple-600 px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 text-sm md:text-base">
            <Link to="/login">LOGIN</Link>
          </button>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-purple-600 mb-4 md:mb-6">
            Register
          </h2>
          <form className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                Register as
              </label>
              <select
                value={role}
                onChange={handleRoleChange}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              >
                <option value="Customer">Customer</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm md:text-base"
              />
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile Preview"
                  className="mt-4 w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
                />
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold text-sm md:text-base"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
