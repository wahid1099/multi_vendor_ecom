import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-[90%] max-w-4xl">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-purple-600 text-white p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Welcome</h2>
          <p className="text-center mb-6 text-sm md:text-base">
            Join Our Unique Platform, Explore a New Experience
          </p>
          <button className="bg-white text-purple-600 px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 text-sm md:text-base">
            <Link to="/signup">REGISTER</Link>
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-purple-600 mb-4 md:mb-6">
            Sign In
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <label className="flex items-center text-sm md:text-base">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a
                href="#"
                className="text-purple-600 text-sm md:text-base hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold text-sm md:text-base"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
