import Navigation from "./Navigation";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageSquare,
  User,
  Facebook,
  Apple,
  CircleUserRound,
} from "lucide-react";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[url('https://images.prismic.io/ubac/ea5fb6bc-a5e2-4731-bfa6-ec9343a9c4c2_image07503+%283%29+%281%29.jpeg')] bg-cover bg-center min-h-screen">
      <Navigation />
      <div className="flex justify-center items-center px-4 mt-12">
        <div
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20"

        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex flex-col items-center gap-2">
              <div className="size-12 rounded-xl bg-[#3B3F70] flex items-center justify-center">
                <MessageSquare className="size-6 text-[#605DFF]" />
              </div>
              <h1 className="text-2xl font-bold text-[#ECF9FF]">
                Create Account
              </h1>
              <p className="text-gray-400 text-sm">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-gray-600" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 p-2 mt-1 text-gray-500 bg-gray-200 border-gray-600"
                  placeholder="Muhammad Umar"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 p-2 mt-1 text-gray-500 bg-gray-200 border-gray-600"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 p-2 mt-1 text-gray-500 pr-10 text-gray-300 bg-gray-200 border-gray-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-20"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-gray-400" />
                  ) : (
                    <Eye className="size-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-[#605DFF] text-white w-full p-3 hover:bg-[#4b44d4] transition"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-600" />
              <span className="px-3 text-gray-400 text-sm">
                Or sign up with
              </span>
              <div className="flex-grow h-px bg-gray-600" />
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-4">
              <button className="bg-white rounded-full p-2 hover:scale-105 transition">
                <CircleUserRound className="text-black size-5" />
              </button>
              <button className="bg-white rounded-full p-2 hover:scale-105 transition">
                <Facebook className="text-[#1877F2] size-5" />
              </button>
              <button className="bg-white rounded-full p-2 hover:scale-105 transition">
                <Apple className="text-black size-5" />
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <a className="text-[#605DFF] hover:underline cursor-pointer">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
