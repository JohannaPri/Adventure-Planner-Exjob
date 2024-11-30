import React, { useState } from "react";
import { signUpWithEmail } from "../../firebase/auth";
import { GoogleLogo, X } from "@phosphor-icons/react";
import { auth } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      navigate("/");
      //close modal
    } catch (err:any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const user = await signUpWithEmail(email, password);
        console.log("Signup Success: ", user);
      } catch (error) {
        setError("Failed to sign up.");
      }
    } else {
      console.error("Passwords does not match!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative z-10 w-full max-w-xl p-8 text-white rounded-md shadow-lg bg-cloudGray2">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-500">
          <X size={20} />
        </button>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-slateGray"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="text-md w-full shadow-inner shadow-gray-400 p-3 text-gray-500 rounded-md bg-cloudGray focus:outline-none focus:ring-2 focus-slateGray"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-slateGray"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="text-md w-full shadow-inner shadow-gray-400 p-3 text-gray-500 rounded-md bg-cloudGray focus:outline-none focus:ring-2 focus-gray-500"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-slateGray mt-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              className="text-md w-full shadow-inner shadow-gray-400 p-3 text-gray-500 rounded-md bg-cloudGray focus:outline-none focus:ring-2 focus-gray-500"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-gray-500 transition duration-300 rounded-md bg-gray-200 hover:bg-cloudGray shadow-md shadow-gray-400 backdrop-blur-sm space-x-3"
          >
            Sign Up with Email
          </button>
        </form>
        <div className="w-full h-px mt-6 mb-6 bg-gray-500"></div>
        <div className="flex flex-col w-full text-center justify-center items-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 font-bold text-gray-500 transition duration-300 rounded-md bg-gray-200 hover:bg-cloudGray flex justify-center items-center space-x-3 shadow-md shadow-gray-400 backdrop-blur-sm"
          >
            <GoogleLogo size={22} className="mr-1" /> Sign Up with Google
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
