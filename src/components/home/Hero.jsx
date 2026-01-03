import React from "react";
import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const navbarHeight = 50;
      const animationOffset = 38; // from your motion.section initial y value
      const elementPosition = aboutSection.getBoundingClientRect().top;
      const offsetPosition = window.pageYOffset + elementPosition - navbarHeight - animationOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
const scrollToFeatures = () => {
  const featuresSection = document.getElementById("features");
  if (featuresSection) {
    const navbarHeight = 70; // Adjust this to your actual navbar height
    const elementPosition = featuresSection.getBoundingClientRect().top;
    const offsetPosition = window.pageYOffset + elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

  return (
    <header className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center text-center px-6">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/green.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative z-10 flex flex-col items-center max-w-5xl">
        <motion.h1 
          initial={{ opacity: 0, scale: 1.04 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, ease: "easeOut" }} 
          className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg"
        >
          <span className="text-white">Pure Prakruti: </span>
          <span className="text-green-300">
            Sustainable Logistics for a Better Tomorrow
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="mt-6 text-white text-xl md:text-3xl max-w-3xl drop-shadow-md"
        >
          Join the revolution in road logistics by reducing carbon emissions and
          ensuring compliance with global environmental standards.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-10 flex flex-wrap justify-center gap-6"
        >
          <button 
            onClick={() => scrollToAbout("features")}
            className="bg-green-700 hover:bg-green-600 text-white text-lg font-semibold py-4 px-10 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Explore Our Solutions
          </button>
        </motion.div>

      </div>
        <button
          onClick={() => scrollToAbout("about", 50)}
          className="absolute bottom-12 cursor-pointer animate-bounce"
          aria-label="Scroll down to About section"
        >
          <ChevronsDown size={48} color="white" />
        </button>
    </header>
  );
};

export default Hero;
