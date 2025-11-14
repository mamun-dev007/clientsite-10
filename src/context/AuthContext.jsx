import React, { createContext, useEffect, useState } from "react";
import app from "../firebase.config";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import Loading from "../components/Loading";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = () => signInWithPopup(auth, googleProvider);

  const updateUserProfile = async (profile) => {
    try {
      return await updateProfile(auth.currentUser, profile);
    } catch (err) {
      console.error("Update Profile Error:", err);
    }
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Dark Mode
  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (loading) return <Loading />;

  const value = {
    user,
    loading,
    signUp,
    logIn,
    googleLogin,
    logOut,
    updateUserProfile,
    theme,
    toggleTheme,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
