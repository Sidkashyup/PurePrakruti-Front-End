import React from "react";

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
    <section className="relative py-20 bg-white overflow-hidden" id="features">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/featuresbg4.avif"
        alt="Background"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-white/60 backdrop-blur-sm z-10" />

      <div className="relative z-20 max-w-screen-3xl mx-auto px-6 sm:px-12 md:px-24">
        <div className="flex justify-center mb-4">
          <span className="text-green-900 bg-green-100 font-semibold px-4 py-1 rounded-full text-sm uppercase tracking-wider">
            Our Features
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12">
          <span className="text-black">Key Features: </span>
          <span className="text-green-800">Revolutionizing Green Logistics</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-10 lg:gap-16 xl:gap-24 2xl:gap-32">
          {featureList.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 xl:p-10 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition border-green-500 border duration-300 flex flex-col items-center text-center"
            >
              <div className="w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-green-600 shadow">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl xl:text-3xl font-bold text-green-900 mb-3">{feature.title}</h3>
              <p className="text-green-700 text-lg xl:text-2xl">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
