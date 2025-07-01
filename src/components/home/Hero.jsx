import React from "react";
import { motion } from "framer-motion";

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
    <header className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/green.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
        {/* Left to right reveal by animating clipPath */}
        <motion.h1
  initial={{ opacity: 0, scale: 1.04 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="text-5xl md:text-7xl font-extrabold max-w-5xl leading-tight drop-shadow-lg text-white"
  style={{ display: "inline-block" }}
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
          <div onClick={scrollToFeatures}>
          <button className="bg-green-700 hover:bg-green-600 text-white text-lg font-semibold py-4 px-10 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            Explore Our Solutions
          </button>
          </div>
          <div onClick={scrollToAbout}>
          <button className="border-2 border-white hover:bg-white hover:text-green-700 text-white text-lg font-semibold py-4 px-10 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            Learn More
          </button>
          </div>
        </motion.div>
      </div>

      <div
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce z-20"
        aria-label="Scroll down to About section"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </header>
  );
};

export default Hero;
