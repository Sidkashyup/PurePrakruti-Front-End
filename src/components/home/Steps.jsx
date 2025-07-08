import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import result1 from "../../resource/Screenshot1.png";
import result2 from "../../resource/Screenshot2.png";
import result3 from "../../resource/Screenshot3.png";
import result4 from "../../resource/Screenshot4.png";

const steps = [
  {
    title: "Sign Up & Login",
    description:
      "Create an account using your email or Google login. Securely access your personalized dashboard anytime.",
    image: result1,
  },
  {
    title: "Input Your Logistics Data",
    description:
      "Enter your transport and shipping data such as distance, vehicle type, and fuel consumption using our guided form.",
    image: result2,
  },
  {
    title: "Get Instant Carbon Footprint Report",
    description:
      "View your CO₂ emissions instantly. Our intelligent engine computes accurate metrics using standard environmental formulas.",
    image: result3,
  },
  {
    title: "Download & Share Reports",
    description:
      "Export your carbon reports in PDF format and share with clients, regulators, or your sustainability team.",
    image: result4,
  },
];

const cardVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.4 } },
  exit: { x: "-100%", opacity: 0, transition: { duration: 0.2 } },
};

const Steps = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % steps.length);
  };

  return (
    <section
      className="h-screen w-full bg-gray-100 relative flex items-center justify-center overflow-hidden"
      id="steps"
    >
      {/* Left Arrow */}
      <button
        onClick={goPrev}
        className="absolute left-8 md:left-24 z-10 text-green-700 hover:text-green-900 transition"
      >
        <FaChevronLeft className="text-6xl" />
      </button>

      {/* Animated Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex items-center justify-center"
        >
          {/* Outer green border container */}
          <div className="p-2 border-[2px] border-green-700 rounded-2xl bg-white shadow-xl">
            {/* Inner white card */}
            <div className="flex w-full max-w-6xl rounded-lg overflow-hidden">
              {/* Left - Image */}
              <div className="w-1/2 flex items-center justify-center bg-gray-50 p-4">
                <img
                  src={steps[current].image}
                  alt={steps[current].title}
                  className="w-full max-w-[90%] max-h-[70vh] object-contain"
                />
              </div>

              {/* Right - Text */}
              <div className="w-1/2 p-10 flex flex-col justify-center text-gray-800">
                <h2 className="text-3xl font-bold text-green-700 mb-4">
                  Step {current + 1}: {steps[current].title}
                </h2>
                <p className="text-lg leading-relaxed">
                  {steps[current].description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Right Arrow */}
      <button
        onClick={goNext}
        className="absolute right-8 md:right-24 z-10 text-green-700 hover:text-green-900 transition"
      >
        <FaChevronRight className="text-6xl" />
      </button>
    </section>
  );
};

export default Steps;
