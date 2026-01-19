import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../AuthContext";
import google from "../resource/google.png";
const axios = require("axios");

export default function Signup() {
  const { signup, googleLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userName: "",
    mobileNumber: "",
    pin: "",
    confirmPin: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showOtpLogin, setShowOtpLogin] = useState(false);
  const [otpMobile, setOtpMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.pin !== formData.confirmPin) {
      setError("PIN and Confirm PIN do not match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await signup(formData);
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    setOtpError("");
    if (!otpMobile) {
      setOtpError("Please enter mobile number");
      return;
    }
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(otpMobile)) {
      setOtpError("Please enter a valid 10-digit mobile number");
      return;
    }
    setOtpLoading(true);
    try {
      await axios.post("/api/otp/send", { mobileNumber: otpMobile });
      setOtpSent(true);
    } catch (e) {
      setOtpError(e.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    setOtpError("");
    if (!otp) {
      setOtpError("Please enter OTP");
      return;
    }
    setOtpLoading(true);
    try {
      const res = await axios.post("/api/otp/verify", { mobileNumber: otpMobile, otp });
      if (res.data.success) {
        setOtpSent(false);
        alert("OTP verified! Please complete the form to finish signup.");
        setFormData({ ...formData, mobileNumber: otpMobile });
        setShowOtpLogin(false);
      } else {
        setOtpError("Invalid OTP");
      }
    } catch (e) {
      setOtpError(e.response?.data?.message || "OTP verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-green-100 flex items-center justify-center overflow-auto relative pt-20 md:pt-[70px]">
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/bglogin3.jpg"
        alt="Background image"
      />

      <div className="relative bg-gradient-to-r from-green-900/70 to-green-950/50 backdrop-blur-md border border-white/60 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl p-6 sm:p-8 md:p-10 m-12 sm:mt-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <label className="text-white text-lg">User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-3 py-3 text-white placeholder-white/90 bg-green-700/50 backdrop-blur-md border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
            />
          </div>

          <div>
            <label className="text-white text-lg">Phone Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              className="w-full px-3 py-3 text-white placeholder-white/90 bg-green-700/50 backdrop-blur-md border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
            />
          </div>

          <div>
            <label className="text-white text-lg">PIN</label>
            <input
              type="password"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="Create a secure PIN"
              className="w-full px-3 py-3 text-white placeholder-white/90 bg-green-700/50 backdrop-blur-md border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
            />
          </div>

          <div>
            <label className="text-white text-lg">Confirm PIN</label>
            <input
              type="password"
              name="confirmPin"
              value={formData.confirmPin}
              onChange={handleChange}
              placeholder="Re-enter your PIN"
              className="w-full px-3 py-3 text-white placeholder-white/90 bg-green-700/50 backdrop-blur-md border rounded-md mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 text-xl rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-blue-300"
              } transition`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-white text-lg text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-200 hover:underline">
            Log In
          </a>
        </p>

        <button
          onClick={googleLogin}
          className="w-full flex items-center justify-center text-xl mx-auto border-2 border-white my-4 bg-green-700/40 backdrop-blur-md text-white px-6 py-3 rounded-md hover:bg-green-900/50 focus:ring-2 focus:ring-blue-300 transition"
        >
          <img src={google} alt="Google" className="w-7 h-7 mr-2" />
          Sign Up with Google
        </button>

        <button
          onClick={() => setShowOtpLogin((prev) => !prev)}
          className="w-full text-white flex items-center justify-center text-xl mx-auto border-2 border-white my-4 bg-green-700/30 backdrop-blur-md px-6 py-3 rounded-md hover:bg-green-900/50 focus:ring-2 focus:ring-blue-300 transition"
        >
          Sign Up with OTP
        </button>

        {showOtpLogin && (
          <div className="mt-4 p-0 rounded-md">
            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={otpMobile}
              onChange={(e) => setOtpMobile(e.target.value)}
              className="w-full px-3 py-3 text-lg text-white placeholder-white/90 bg-green-700/50 backdrop-blur-md border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {!otpSent ? (
              <button
                onClick={sendOtp}
                disabled={otpLoading}
                className={`w-full py-3 rounded-md text-white text-xl mt-4 ${otpLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-blue-300"
                  }`}
              >
                {otpLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 mb-2 rounded-md text-black"
                />
                <button
                  onClick={verifyOtp}
                  disabled={otpLoading}
                  className={`w-full text-white py-3 text-xl rounded-md mt-4 ${otpLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                    } transition`}
                >
                  {otpLoading ? "Verifying OTP..." : "Verify OTP"}
                </button>
              </>
            )}
            {otpError && <p className="text-red-400 mt-2">{otpError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
