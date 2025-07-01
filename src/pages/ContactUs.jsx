import React, { useState, useEffect } from "react";
import ContactUsDesktop from "./ContactUsDesktop";
import ContactUsMobile from "./ContactUsMobile";

const ContactUs = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <ContactUsMobile /> : <ContactUsDesktop />;
};

export default ContactUs;