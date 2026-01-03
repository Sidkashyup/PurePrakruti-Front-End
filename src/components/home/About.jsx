import React from "react";
import { motion } from "framer-motion";
import { FiTarget, FiEye, FiHeart } from "react-icons/fi";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cards = [
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
  ];

  return (
    <motion.section
      id="about"
      className="px-6 py-20 bg-green-100 lg:bg-gradient-to-r from-green-100 via-white to-green"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* "Our Story" Label */}
      <div className="flex justify-center items-center mb-4">
        <span className="text-green-800 bg-green-200 font-semibold px-4 py-1 rounded-full text-sm uppercase tracking-wider">
          Our Story
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-12 w-full md:w-4/5 mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
          <span className="text-black">About </span>
          <span className="text-green-700">Pure Prakruti</span>
        </h2>
        <p className="text-lg md:text-2xl font-semibold text-gray-600 px-4 mx-auto">
          Pure Prakruti is your partner in building a sustainable future. Focused on the road
          logistics industry responsible for 27% of global emissions. We provide tools and insights
          to help businesses cut their carbon footprint and drive real climate action.
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row w-4/5 mx-auto gap-8">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white min-h-[400px] p-8 shadow-2xl rounded-2xl text-center flex flex-col transform transition-transform duration-300 ease-out hover:cursor-pointer hover:scale-105 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 * idx }}
            whileHover={{scale: 1.05}}
          >
            {card.icon}
            <h3 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
              {card.title}
            </h3>
            <p className="text-gray-700 text-lg md:text-xl flex-grow">{card.description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default About;