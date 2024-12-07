import textLogo from "/text-logo.png";
import iconLogo from "/icon-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); 

    const formData = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        "/api/v1/authenticate", 
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        if (signIn({
          auth: {
            token: response.data.token,
            type: 'Bearer'
          },
          refresh: response.data.refreshToken,
          userState: { username: response.data.username || username }
        })) {
          navigate("/home");
        } else {
          setError("Failed to sign in. Please try again.");
        }
      }
    } catch (err) {
      console.error("Login failed", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        setError(err.response.data || "Authentication failed");
      } else if (err.request == null) {
        console.error("No response received");
        setError("No response from server. Please try again.");
      } else {
        console.error("Error setting up request:", err.message);
        setError("An error occurred. Please try again.");
      }
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
            {error && (
              <div className="text-red-500 text-center mb-2">{error}</div>
            )}

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

            <div className="text-left">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-400 underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="flex items-center">
              <button
                type="submit"
                className="btn w-full text-white py-2 px-4 rounded-md text-lg bg-[#21A179]"
              >
                Login
              </button>
            </div>

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
