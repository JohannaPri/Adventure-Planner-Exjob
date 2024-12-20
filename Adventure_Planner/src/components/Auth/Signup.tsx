import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUpWithEmail } from "../../firebase/auth";
import { GoogleLogo, X } from "@phosphor-icons/react";
import { auth } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { showToast } from "../../redux/slices/toastSlice";

import { closesignupmodal } from "../../redux/slices/modalSignupSlice";

const Signup: React.FC = () => {
  const isOpen = useSelector((state: any) => state.signupmodal.isOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //@ts-expect-error: Unused variable warning
  const [error, setError] = useState("");
  //@ts-expect-error: Unused variable warning
  const [loading, setLoading] = useState<boolean>(false);
  //@ts-expect-error: Unused variable warning
  const [passwordMatchError, setPasswordMatchError] = useState<boolean>(false);

  // Redux dispatch and navigation hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  /**
   * Handles Google authentication and user sign-in.
   * Initiates Firebase authentication process with Google.
   */

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      navigate("/");
      dispatch(closesignupmodal());
      dispatch(showToast({ message: "Sign-in successful!", type: "success" }));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles email/password sign-up.
   * Checks for password confirmation match, then signs up the user using Firebase.
   * @param e - The form submit event
   */

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!");

    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      setPassword("");
      setConfirmPassword("");
      dispatch(
        showToast({
          message: "Passwords don’t match! Please try again.",
          type: "error",
        })
      );
      console.error("Passwords does not match!");
      return;
    }

    try {
      const user = await signUpWithEmail(email, password);
      console.log("Signup Success: ", user);
      navigate("/");
      dispatch(closesignupmodal());
      clearInputs();
      dispatch(showToast({ message: "Sign-up successful!", type: "success" }));
    } catch (error) {
      clearInputs();
      dispatch(
        showToast({
          message: "Something went wrong, please try again.",
          type: "error",
        })
      );
    }
    setPasswordMatchError(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative z-10 w-full max-w-xl p-8 text-white rounded-md shadow-lg bg-cloudGray2">
        {/* Close the modal when clicking on the close button */}
        <button
          onClick={() => dispatch(closesignupmodal())}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-500"
        >
          <X size={20} />
        </button>

        {/* Email, Password, and Confirm Password Sign-Up Form */}
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
              placeholder="Enter Your Password (min 6 characters)"
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

        {/* Google Sign-Up Button */}
        <div className="flex flex-col w-full text-center justify-center items-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 font-bold text-gray-500 transition duration-300 rounded-md bg-gray-200 hover:bg-cloudGray flex justify-center items-center space-x-3 shadow-md shadow-gray-400 backdrop-blur-sm"
          >
            <GoogleLogo size={22} className="mr-1" /> Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
