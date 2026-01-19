import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../AuthContext";
import google from "../resource/google.png";
const axios = require("axios");

export default function Login() {
  const [formData, setFormData] = useState({ mobileNumber: "", pin: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, googleLogin } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(formData);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const [showOtpLogin, setShowOtpLogin] = useState(false);
  const [otpMobile, setOtpMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

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
      await axios.post("https://api.pureprakruti.com/api/otp/send", { mobileNumber: otpMobile });
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
      const res = await axios.post("https://api.pureprakruti.com/api/otp/verify", { mobileNumber: otpMobile, otp });
      if (res.data.success) {
        await login({ mobileNumber: otpMobile, otpLogin: true });
        navigate("/UserDashBoard");
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
    <div className="relative min-h-screen w-full overflow-auto">
      <img
        className="absolute inset-0 w-full h-full object-cover z-0 bg-cover "
        src="/bglogin3.jpg"
        alt="Background image"
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10">
        <div className=" bg-gradient-to-r from-green-900/70 to-green-950/50 backdrop-blur-md border border-white/60 rounded-xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 sm:p-12 sm:mt-32 m-4 md:m-24 ">
          <h2 className="text-2xl sm:text-4xl font-semibold text-white mb-4 sm:mb-6 text-center">Log In</h2>

          {error && <p className="text-red-500 text-center text-sm sm:text-lg mb-2 sm:mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
            <div>
              <label className="text-white text-sm sm:text-lg">Phone Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-3 py-2 sm:py-3 text-sm sm:text-lg text-white placeholder-white/90 bg-green-700/50 backdrop-blur-md border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="text-white text-sm sm:text-lg">PIN</label>
              <input
                type="password"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                placeholder="PIN"
                className="w-full px-3 py-2 sm:py-3 text-sm sm:text-lg text-white placeholder-white/90 bg-green-700/50 backdrop-blur-md border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 sm:py-3 text-white text-lg rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-blue-300"
                } transition`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-white text-center text-lg sm:text-lg mt-3">
            Don't have an account?{" "}
            <a href="/signup" className="text-green-200 hover:underline">
              Sign Up
            </a>
          </p>

          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center text-base sm:text-lg mb-3 border-2 border-white my-2 bg-green-700/30 backdrop-blur-md text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-green-900/50 focus:ring-2 focus:ring-blue-300 transition"
          >
            <img src={google} alt="Google" className="w-5 h-5 sm:w-7 sm:h-7 mr-2" />
            Log In with Google
          </button>

          <button
            onClick={() => setShowOtpLogin((prev) => !prev)}
            className="w-full text-white flex items-center justify-center text-base sm:text-lg border-2 border-white my-2 bg-green-700/30 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-green-900/50 focus:ring-2 focus:ring-blue-300 transition"
          >
            Login with OTP
          </button>

          {showOtpLogin && (
            <div className="mt-3 sm:mt-4">
              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={otpMobile}
                onChange={(e) => setOtpMobile(e.target.value)}
                className="w-full px-3 py-2 sm:py-3 text-sm sm:text-lg text-white placeholder-white/90 bg-green-700/50 backdrop-blur-md border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {!otpSent ? (
                <button
                  onClick={sendOtp}
                  disabled={otpLoading}
                  className={`w-full py-2 sm:py-3 rounded-md text-white text-lg mt-3 ${otpLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-blue-300"
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
                    className="w-full px-3 py-2 sm:py-2 mb-2 rounded-md text-black"
                  />
                  <button
                    onClick={verifyOtp}
                    disabled={otpLoading}
                    className={`w-full text-white py-2 sm:py-3 text-lg rounded-md mt-2 ${otpLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                      } transition`}
                  >
                    {otpLoading ? "Verifying OTP..." : "Verify OTP"}
                  </button>
                </>
              )}
              {otpError && <p className="text-red-400 mt-2 text-sm">{otpError}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
