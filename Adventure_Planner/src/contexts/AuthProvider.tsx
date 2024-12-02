import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebase-config";
import { setUser, setLoading } from "../redux/slices/authSlice";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser));
      dispatch(setLoading(false));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};
