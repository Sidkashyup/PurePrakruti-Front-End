import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import GoogleAuthCallback from "./components/GoogleAuthCallback";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CarbonFootprint } from "./pages/CarbonFootprint";
import  ContactUs  from "./pages/ContactUs";
import { UserDashBoard } from "./pages/UserDashBoard";

import OurTeam from './pages/OurTeam';
import Facts from './pages/Facts';

function App() {
  return (

    <Router>
      <AuthProvider> {/* ✅ Moved inside Router */}
        <Navbar />
        <MainRoutes />
        <Footer />
      </AuthProvider>
    </Router>
  );
}

const MainRoutes = () => {
  // const { isLoggedIn } = useContext(AuthContext); // ✅ Get isLoggedIn state

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
      <Route path="/carbonfootprint" element={<CarbonFootprint />} />
      <Route path="/UserDashBoard" element={<UserDashBoard />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/ourteam" element={<OurTeam />} />
      <Route path="/Facts" element={<Facts />} />
    </Routes>
  );
};

export default App;