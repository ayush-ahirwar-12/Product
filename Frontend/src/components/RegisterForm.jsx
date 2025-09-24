import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, User, Mail, Lock, UserCheck } from "lucide-react";
import { RegisterSeller } from "../Apis/SellerApis";
import { RegisterUser } from "../Apis/AuthApis";
import { Link, NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";
// This is the main component that renders the registration form.
export default function RegisterForm({ setFlag }) {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // This function is called by handleSubmit only after validation is successful.
  const onSubmit = async (data) => {
    console.log("--->", data.role);
    try {
      let userData = {
        userName: data.userName,
        email: data.email,
        fullName: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        password: data.password,
      };
      console.log(userData);

      if (data.role === "seller") {
        let response = await RegisterSeller();
        navigate("/")
        console.log(response);
      } else {
        let user = await RegisterUser(userData);
        if (user) {
          console.log(user);
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error in registration form-->", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      {/* Floating background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative w-full max-w-md">
        {/* Glassmorphism container */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join Us</h1>
            <p className="text-gray-300">Create your account and get started</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Username *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  defaultValue={user?.userName}
                  disabled={user ? true : false}
                  {...register("userName", {

                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 border ${
                    errors.userName ? "border-red-400" : "border-white/20"
                  } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                  placeholder="Enter your username"
                />
              </div>
              {errors.userName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  defaultValue={user?.email}
                  disabled={user ? true : false}
                  {...register("email", {

                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email",
                    },
                  })}
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 border ${
                    errors.email ? "border-red-400" : "border-white/20"
                  } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  First Name *
                </label>
                <input
                  type="text"
                  defaultValue={user?.fullName?.firstName}
                  disabled={user ? true : false}
                  {...register("firstName", {

                  })}
                  className={`w-full px-4 py-3 bg-white/10 border ${
                    errors.firstName ? "border-red-400" : "border-white/20"
                  } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.fullName?.lastName}
                  disabled={user ? true : false}
                  {...register("lastName")}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setValue("role", "user")}
                  className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                    getValues("role") === "user"
                      ? "border-purple-400 bg-purple-500/20 text-white"
                      : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40"
                  }`}
                >
                  User
                </button>
                <NavLink
                  type="button"
                  onClick={() => setValue("role", "seller")}
                  className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                    getValues("role") === "seller"
                      ? "border-purple-400 bg-purple-500/20 text-white"
                      : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40"
                  }`}
                >
                  Seller
                  </NavLink>

                
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  defaultValue={user?.password}
                  disabled={user ? true : false}
                  {...register("password", {

                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full pl-12 pr-12 py-3 bg-white/10 border ${
                    errors.password ? "border-red-400" : "border-white/20"
                  } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            {/* <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Password confirmation is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  className={`w-full pl-12 pr-12 py-3 bg-white/10 border ${
                    errors.confirmPassword
                      ? "border-red-400"
                      : "border-white/20"
                  } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setFlag((prev) => !prev)}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
