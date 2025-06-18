import React from "react";
import rajesh from "../../resource/rajesh.jpg";


const testimonials = [
  {
    name: "Alex M.",
    role: "Logistics Manager",
    image: rajesh,
    text: "Pure Prakruti has completely transformed how we approach sustainability. Thanks to their platform, we've been able to reduce our carbon emissions by over 30%.",
  },
  {
    name: "Sarah K.",
    role: "Supply Chain Director",
    image: rajesh,
    text: "The analytics dashboard is intuitive and powerful. We can now monitor our carbon footprint in real time and take actionable steps to improve.",
  },
  {
    name: "Ravi N.",
    role: "Environmental Officer",
    image: rajesh,
    text: "I appreciate how easy it is to generate reports and share progress with stakeholders. The platform saves us hours of manual work each month.",
  },
  {
    name: "Emma J.",
    role: "Operations Lead",
    image: rajesh,
    text: "Implementation was smooth and support was top-notch. Within weeks, we had measurable results and improved compliance with environmental regulations.",
  },
  {
    name: "Carlos R.",
    role: "Fleet Supervisor",
    image: rajesh,
    text: "Our team loves how user-friendly the tool is. The visualizations make it easy to understand our environmental impact and communicate improvements internally.",
  },
  {
    name: "Lisa T.",
    role: "Sustainability Consultant",
    image: rajesh,
    text: "Pure Prakruti provides the perfect balance between usability and depth. It’s perfect for both high-level reporting and deep environmental analysis.",
  },
];

const Testimonials = () => {
  return (
    <section className="p-0 bg-gray-50 overflow-hidden">

        <div className="bg-green-900 py-12 relative">
        {/* Row 1 */}
        <div className="flex gap-0 animate-slide-2 group whitespace-wrap break-words py-0">
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <div key={`row1-${index}`} className="m-12 bg-green-900 ">
  <div className="min-w-[600px] max-w-[600px] min-h-[350px] bg-white shadow-lg rounded-xl p-4 flex flex-col justify-center">
    
    {/* Testimonial text */}
    <p className="text-xl text-gray-700 italic text-center m-10">
      “{testimonial.text}”
    </p>

    {/* Profile: image on left, name and role on right */}
    <div className="flex items-center justify-center gap-4">
      <img
        src='https://xsgames.co/randomusers/avatar.php?g=male'
        alt={testimonial.name}
        className="w-20 h-20 rounded-full border-4 border-green-300 object-cover"
      />
      <div className="text-left">
        <h4 className="font-semibold text-lg text-green-800">{testimonial.name}</h4>
        <p className="text-green-600 text-md">{testimonial.role}</p>
      </div>
    </div>
  </div>
</div>

          ))}
        </div>

        {/* Row 2 - Duplicate */}
        {/* Row 2 */}
        <div className="flex gap-0 animate-slide-1 group">
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <div key={`row2-${index}`} className="m-12 bg-green-900">
  <div className="min-w-[600px] max-w-[600px] min-h-[350px] bg-white shadow-lg rounded-xl p-4 flex flex-col justify-center">

              {/* Testimonial text */}
    <p className="text-xl text-gray-700 italic text-center m-10">
      “{testimonial.text}”
    </p>

    {/* Profile: image on left, name and role on right */}
    <div className="flex items-center justify-center gap-4">
      <img
        src='https://xsgames.co/randomusers/avatar.php?g=female'
        alt={testimonial.name}
        className="w-20 h-20 rounded-full border-4 border-green-300 object-cover "
      />
      <div className="text-left">
        <h4 className="font-semibold text-lg text-green-800">{testimonial.name}</h4>
        <p className="text-green-600 text-md">{testimonial.role}</p>
      </div>
    </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
