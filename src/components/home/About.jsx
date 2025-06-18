import React from "react";
import { motion } from "framer-motion";
import { FiTarget, FiEye, FiHeart } from "react-icons/fi";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="about"
      className="px-6 py-20 bg-gradient-to-r from-green-100 via-white to-green-100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
    {/* "Our Story" Label */}
<div className="flex justify-center items-center mb-4">
  <span className=" text-green-800 bg-green-200 font-semibold px-4 py-1 rounded-full text-sm uppercase tracking-wider">
    Our Story
  </span>
</div>

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
          <span className="text-black">About </span>
          <span className="text-green-700">Pure Prakruti</span>
        </h2>
        <p className="text-xl md:text-3xl font-semibold text-gray-600 max-w-7xl mx-auto">
                      Pure Prakruti is your partner in building a sustainable future. Focused on the road logistics industry—responsible for 27% of global emissions—we provide tools and insights to help businesses cut their carbon footprint and drive real climate action.

        </p>
      </div>

      {/* Cards Section */}
      <motion.div
        className="flex flex-wrap justify-center items-center gap-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {[
          {
            title: "Our Mission",
            description:
              "Our mission is to offer innovative technologies and services that allow logistics companies to track, analyze, and reduce their carbon emissions. We are dedicated to empowering businesses to adopt more sustainable practices and drive the shift towards a zero-carbon future.",
              icon: (
  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <FiTarget size={28} className="text-green-700" />
  </div>
),

          },
          {
            title: "Our Vision",
            description:
              "Our vision is to lead in green logistics, offering innovative solutions that reduce emissions and help businesses thrive in an eco-conscious world. We aim to transform the logistics industry through technology, sustainable partnerships, and environmental stewardship.",
icon: (
  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <FiEye size={28} className="text-green-700" />
  </div>
),
          },
          {
            title: "Our Values",
            description:
              "We believe in integrity, innovation, and collaboration. Our values drive us to deliver transparent, effective solutions that support our clients and a sustainable planet. We're committed to trust and creativity, working with partners to inspire lasting environmental change in logistics.",
icon: (
  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <FiHeart size={28} className="text-green-700" />
  </div>
),
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            className="bg-white w-full sm:w-[90%] md:w-[48%] lg:w-[30%] max-w-[600px] p-16 shadow-2xl rounded-2xl text-center max-w-lg mx-auto transform transition-transform duration-50 ease-linear hover:scale-120 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.05, delay: 0.2 * idx }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">{card.title}</h3>
            {card.icon}
            <p className="text-gray-700 text-3xl">{card.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default About;

