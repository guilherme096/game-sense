import textLogo from "/text-logo.png";
import iconLogo from "/icon-logo.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-14">
          <img src={iconLogo} alt="icon-logo" className="w-60 h-auto" />
          <img src={textLogo} alt="text-logo" className="w-64 h-auto mt-4" />
        </div>

        <div className="card w-full max-w-md shadow-2xl p-8 bg-[#333D4D] rounded-lg">
          <div className="flex flex-col space-y-4">
            {/* Username Input */}
            <div>
              <label className="text-sm text-gray-200 mb-1 block">
                Username
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm text-gray-200 mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800 -mb-3"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-left">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-400 underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="flex items-center">
              {/* Login Button */}
              <button className="btn w-full text-white py-2 px-4 rounded-md text-lg bg-[#21A179]">
                Login
              </button>
            </div>
            {/* Create Account Link */}
            <div className="text-center">
              <Link
                to="/register"
                className="text-sm font-bold text-white underline"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
