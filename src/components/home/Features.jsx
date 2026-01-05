import React from "react";
import { motion } from "framer-motion";

const featureList = [
  {
    title: "Real-Time Carbon Tracking",
    description: "Monitor your fleet’s carbon emissions in real-time with our easy-to-use dashboard and actionable insights.",
    image: "/image1.webp",
  },
  {
    title: "Emission Reduction Strategies",
    description: "Access expert-backed strategies tailored to your logistics operations to help reduce emissions effectively.",
    image: "/image2.webp",
  },
  {
    title: "Sustainability Reporting",
    description: "Generate comprehensive reports that align with global sustainability standards and help you communicate your progress.",
    image: "/image3.jpg",
  },
  {
    title: "Customizable Alerts",
    description: "Set alerts for emission thresholds to stay proactive and maintain compliance with environmental regulations.",
    image: "/image4.jpg",
  },
  {
    title: "Carbon Offset Integration",
    description: "Seamlessly integrate carbon offset programs directly into your logistics workflow to neutralize emissions.",
    image: "/image5.jpg",
  },
  {
    title: "User-Friendly Interface",
    description: "Navigate an intuitive platform designed with user experience in mind to make sustainability accessible for all.",
    image: "/image6.jpg",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-green-100 lg:bg-gradient-to-r from-green-100 via-white to-green overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-4">
          <span className="text-green-900 bg-green-100 font-semibold px-4 py-1 rounded-full text-sm uppercase tracking-wider">
            Our Features
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12">
          <span className="text-black">Key Features: </span>
          <span className="text-green-800">Revolutionizing Green Logistics</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-500 flex flex-col items-center text-center cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 0.1 * index }}
            >
              <div className="w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-green-600 shadow-md">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-green-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-green-700 text-lg md:text-xl">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
