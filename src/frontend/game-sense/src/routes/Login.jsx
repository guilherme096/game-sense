import textLogo from "/text-logo.png";
import iconLogo from "/icon-logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signIn = useSignIn();
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle going back to the previous page
  const handleGoBack = () => {
    // Check if there's a previous location in state
    const previousPath = location.state?.from?.pathname || '/home';
    
    // Navigate back to the previous page
    navigate(previousPath);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); 

    const formData = {
      username,
      password,
    };

    try {
      console.log("Sending authentication request...");
      const response = await axios.post(
        "/api/v1/management/authenticate", 
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response received:", response);

      if (response.status === 200 && response.data.token) {
        console.log("Token received:", response.data.token);
        if (signIn({
          auth: {
            token: response.data.token,
            type: 'Bearer'
          },
          userState: { username: response.data.username }
        })) {
          console.log("Sign in successful, navigating to /home");
          navigate("/home");
        } else {
          console.error("Sign in failed");
          toast.error("Failed to sign in. Please try again.");
        }
      } else {
        console.error("Unexpected response:", response);
        toast.error("Unexpected response from server. Please try again.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setUsername("");
      setPassword("");

      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        toast.error(err.response.data.message || "Authentication failed");
      } else if (err.request) {
        console.error("No response received");
        toast.error("No response from server. Please try again.");
      } else {
        console.error("Error setting up request:", err.message);
        toast.error("An error occurred. Please try again.");
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
                to="/home"
                className="text-sm text-gray-400 underline"
              >
                Enter as guest
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

        {/* Go Back Button */}
        {location.state?.from && (
          <div className="mt-4 text-center w-full max-w-md">
            <button 
              onClick={handleGoBack}
              className="w-full text-white py-2 px-4 rounded-md text-lg bg-yellow-400"
            >
              Go Back to Previous Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}