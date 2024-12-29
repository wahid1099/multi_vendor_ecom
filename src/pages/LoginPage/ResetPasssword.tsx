import { useState } from "react";
import React from "react";
import { authApi } from "../../redux/features/Auth/authAPi";
import Swal from "sweetalert2";

interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
}

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [resetPassword, { isLoading }] = authApi.useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear previous errors

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
      const token = urlParams.get("token");

      if (!userId || !token) {
        Swal.fire({
          icon: "error",
          title: "Invalid Link",
          text: "The reset link is invalid or expired.",
        });
        return;
      }

      // Call the mutation
      const response = await resetPassword({
        userId,
        token,
        password,
      }).unwrap();

      // Success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.message || "Password reset successfully!",
      });

      // Redirect to login page (optional)
      window.location.href = "/login";
    } catch (err) {
      const apiError = err as ApiError; // Explicitly cast error to ApiError
      Swal.fire({
        icon: "error",
        title: "Error",
        text: apiError.data?.message || "Failed to reset password!",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-purple-600 text-center mb-4">
          Reset Password
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Enter your new password below to reset your account password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
