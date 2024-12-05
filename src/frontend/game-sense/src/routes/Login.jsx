import textLogo from "/text-logo.png";
import iconLogo from "/icon-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const response = await axios.post("http://localhost:8080/authenticate", {
        username,
        password,
      });

      if (response.status === 200) {
        signIn({
          token: "", 
          expiresIn: 10 * 60 * 60, 
          authState: { username }, 
        });

        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-14">
          <img src={iconLogo} alt="icon-logo" className="w-60 h-auto" />
          <img src={textLogo} alt="text-logo" className="w-64 h-auto mt-4" />
        </div>

        <div className="card w-full max-w-md shadow-2xl p-8 bg-[#333D4D] rounded-lg">
          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-center mb-2">{error}</div>
            )}

            {/* Username Input */}
            <div>
              <label className="text-sm text-gray-200 mb-1 block">
                Username
              </label>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
                required
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
              <button
                type="submit"
                className="btn w-full text-white py-2 px-4 rounded-md text-lg bg-[#21A179]"
              >
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
          </form>
        </div>
      </div>
    </div>
  );
}
