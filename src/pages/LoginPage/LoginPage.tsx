import { Link } from "react-router-dom";

import { FieldValues, useForm } from "react-hook-form";
import { authApi } from "../../redux/features/Auth/authAPi";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [addLogin, { isLoading }] = authApi.useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const res = await addLogin(data).unwrap();
      verifyToken(res.data.accessToken);

      dispatch(setUser({ user: res.data, token: res.data.accessToken }));
      toast.success("Logged in", {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });

      console.log("Navigating to home...");
      navigate("/dashboard");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      console.error("Login error:", err);
      toast.error(err?.data?.message || "Login failed", {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });
    }
  };
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
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("email", { required: true })}
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
                {...register("password", { required: true })}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <label className="flex items-center text-sm md:text-base">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>

              <Link
                to="/forgot-pass"
                className="text-purple-600 text-sm md:text-base hover:underline"
              >
                {" "}
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className={`w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold text-sm md:text-base transition duration-200 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              } flex items-center justify-center`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <ClipLoader
                    color="#e93b16"
                    loading={isLoading}
                    size={20} // Adjust size for better alignment
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
