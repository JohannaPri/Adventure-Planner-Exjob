import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GoogleLogo, X } from "@phosphor-icons/react";
import { closesigninmodal } from "../../redux/slices/modalSigninSlice";
import { showToast } from "../../redux/slices/toastSlice";

const Login: React.FC = () => {
  const isOpen = useSelector((state: any) => state.signinmodal.isOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //@ts-expect-error: Unused variable warning
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //@ts-expect-error: Unused variable warning
  const [loading, setLoading] = useState<boolean>(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      navigate("/");
      dispatch(closesigninmodal());
      dispatch(showToast({ message: "Sign-in successful!", type: "success" }));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      dispatch(closesigninmodal());
      dispatch(showToast({ message: "Sign-in successful!", type: "success" }));
    } catch (err: any) {
      clearInputs();
      setError(err.message);
      dispatch(
        showToast({
          message: "Something went wrong, please try again.",
          type: "error",
        })
      );
    } finally {
      clearInputs();
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  console.log("isOpen: ", isOpen);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative z-10 w-full max-w-xl p-8 text-white rounded-md shadow-lg bg-cloudGray2">
        <button
          onClick={() => dispatch(closesigninmodal())}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-500"
        >
          <X size={20} />
        </button>
        <form onSubmit={handleEmailLogin}>
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
              placeholder="Email"
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-gray-500 transition duration-300 rounded-md bg-gray-200 hover:bg-cloudGray shadow-md shadow-gray-400 backdrop-blur-sm space-x-3"
          >
            Sign In with Email
          </button>
        </form>
        <div className="flex flex-row justify-between items-center px-2">
          <div className="text-sm text-gray-600 mt-3">
            Don't have an account yet?{" "}
            <span className="hover:underline hover:cursor-pointer font-medium">
              Sign Up
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-3 hover:underline hover:cursor-pointer font-medium">
            Forgot your password?
          </div>
        </div>
        <div className="w-full h-px mt-6 mb-6 bg-gray-500"></div>
        <div className="flex flex-col w-full text-center justify-center items-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 font-bold text-gray-500 transition duration-300 rounded-md bg-gray-200 hover:bg-cloudGray flex justify-center items-center space-x-3 shadow-md shadow-gray-400 backdrop-blur-sm"
          >
            <GoogleLogo size={22} className="mr-1" /> Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
