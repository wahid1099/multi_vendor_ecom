import { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import banner from "../../assets/Registerpage.png";
import uploadImageToCloudinary from "../../utils/uploadImage";
import { toast } from "sonner";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { authApi } from "../../redux/features/Auth/authAPi";

const RegistrationPage = () => {
  const [addSignUp, { isLoading }] = authApi.useSignUpMutation();
  const [role, setRole] = useState("Customer");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { image, username, name, email, password } = data;
    try {
      setIsImageLoading(true);

      const userImage = await uploadImageToCloudinary(image[0]); // Upload the first file
      const modifiedUserData = {
        name,
        username,
        email,
        password,
        profileImage: userImage,
        role, // Include the selected role
      };

      await addSignUp(modifiedUserData).unwrap();
      toast.success("Registration successful!");
      reset();
      navigate("/login");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed!";
      toast.error(errorMessage);
    } finally {
      setIsImageLoading(false);
    }
  };

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
            alt="Welcome Banner"
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
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                id="image"
                {...register("image", {
                  required: "Profile image is required",
                })}
                onChange={handleImageUpload}
                className="w-full text-sm md:text-base"
              />
              {errors.image && (
                <span className="text-red-500">
                  {String(errors.image.message)}
                </span>
              )}
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
                {...register("username", { required: "Username is required" })}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              />
              {errors.username && (
                <span className="text-red-500">
                  {String(errors.username.message)}
                </span>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register("name", { required: "Full name is required" })}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              />
              {errors.fullName && (
                <span className="text-red-500">
                  {String(errors.fullName.message)}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              />
              {errors.email && (
                <span className="text-red-500">
                  {String(errors.email.message)}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              />
              {errors.password && (
                <span className="text-red-500">
                  {String(errors.password.message)}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              />
              {errors.confirmPassword && (
                <span className="text-red-500">
                  {String(errors.confirmPassword.message)}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full mt-4 py-3 rounded-md transition duration-200 ${
                isLoading || isImageLoading
                  ? "bg-green-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white flex items-center justify-center`}
              disabled={isLoading || isImageLoading}
            >
              {isLoading || isImageLoading ? (
                <>
                  <span className="loader-icon"></span>
                  <span className="ml-2">Registering...</span>
                </>
              ) : (
                "REGISTER"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
