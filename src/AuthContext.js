import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [baseUsername, setbaseUserName] = useState(localStorage.getItem("baseUsername") || "");


  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("baseUsername");

    setUser(null);
    setToken("");
    setIsLoggedIn(false);
    setUserId("");
    setUserName("");

    navigate("/login");
  }, [navigate]);

  // Token validation & auto-login
  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);

        // Check token expiration
        if (decodedUser.exp * 1000 < Date.now()) {
          console.warn("Token expired, logging out.");
          logout();
        } else {
          setUser(decodedUser);
          setIsLoggedIn(true);
          setUserId(decodedUser.userId);
          setUserName(decodedUser.userName);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [token, logout]);

  // Handle Google Login
  useEffect(() => {
    const handleGoogleLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        try {
          localStorage.setItem("token", token);
          const decodedUser = jwtDecode(token);

          setUser(decodedUser);
          setIsLoggedIn(true);
          setUserId(decodedUser.userId);
          setUserName(decodedUser.userName);
          setbaseUserName(decodedUser.baseUsername);
          // console.log('user login success')

          window.history.replaceState(null, null, window.location.pathname);

          window.location.reload();
        } catch (error) {
          console.error("Google login error:", error);
          logout();
        }
      }
    };

    handleGoogleLogin();
  }, [navigate, logout]);

  // Signup function
  const signup = async (userData) => {
    try {
      const res = await axios.post("http://localhost:4500/api/auth/signup", userData);
console.log('#$$$$$%^&%$#',res.data);
      // alert(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const res = await axios.post("http://localhost:4500/api/auth/login", credentials);
      // console.log("Login response data:", res.data.data.token);
      const { token } = res.data.data;

      if (!token) throw new Error("No token received");

      const decodedUser = jwtDecode(token);
      if (!decodedUser?.userId || !decodedUser?.userName) throw new Error("Invalid token data");

      localStorage.setItem("token", token);
      localStorage.setItem("userId", decodedUser.userId);
      localStorage.setItem("userName", decodedUser.userName);
      localStorage.setItem("baseUsername", decodedUser.baseUsername);


      setToken(token);
      setUser(decodedUser);
      setIsLoggedIn(true);
      setUserId(decodedUser.userId);
      setUserName(decodedUser.userName);
      setUserName(decodedUser.baseUsername);


      navigate("/");
    } catch (error) {
      console.log("Login error1111:", error);
      // Handle error response
      if (error.response?.status === 401) {
        alert("Invalid credentials, please try again.");
      } else if (error.response?.status === 404) {
        alert("User not found, please sign up.");
      }
      console.error("Login error*********:", error.response?.data || error.message);
      alert("Error:", error.response?.data?.message || "Login failed");
    }
  };

  // Google Login function
  const googleLogin = () => {
    window.location.href = "http://localhost:4500/auth/google";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setIsLoggedIn,
        logout,
        setUser,
        googleLogin,
        signup,
        login,
        userId,
        userName,
        baseUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
