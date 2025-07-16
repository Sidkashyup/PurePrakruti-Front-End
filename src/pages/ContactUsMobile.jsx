import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ReactComponent as MailIcon } from "../resource/mail3.svg";
import { ReactComponent as LocIcon } from "../resource/loc.svg";
import { ReactComponent as CallIcon } from "../resource/call.svg";

export const ContactUsMobile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

   const [showSuccess, setShowSuccess] = useState(false);

  const { firstName, lastName, email, phone, message } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    try {
      const response = await axios.post("https://pureprakruti.com/api/query", {
        fullName: `${firstName} ${lastName}`,
        email,
        phone,
        message,
      });

      setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

      if (response.status === 200) {
        console.log("Query submitted successfully!");
        // tostershow();
      } else {
        console.error("Failed to submit query.");
      }

      console.log('formdata values', formData);
    } catch (error) {
      console.error("Error submitting query:", error);
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-green-900/80 p-4 relative text-white pt-32">
      <ToastContainer />

      {/* Reach Out Section */}
      <div className="max-w-xl mx-auto text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <p className="text-green-200 text-lg mb-8">
          Join the revolution in road logistics by reducing carbon emissions and
          ensuring compliance with global environmental standards.
        </p>

        <div className="bg-green-800 rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-4">
            <MailIcon className="w-10 h-10 text-white" />
            <div className="text-left">
              <h4 className="text-xl font-semibold">Email Support</h4>
              <p className="text-green-300">Our team can respond in real time.</p>
              <a href="mailto:team@tsil.net.in" className="block text-green-400 hover:underline">
                team@tsil.net.in
              </a>
              <a href="mailto:siddharth@tsil.net.in" className="block text-green-400 hover:underline">
                siddharth@tsil.net.in
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LocIcon className="w-11 h-11 text-white" />
            <div className="text-left">
              <h4 className="text-xl font-semibold">Visit Our Office</h4>
              <p className="text-green-300">Visit our location in real life.</p>
              <a
                href="https://maps.app.goo.gl/rRJx9bAN9PjNQMfe7"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-400 hover:underline"
              >
                609, Tower II, Pearls Omaxe, Netaji Subhash Place, Pitampura, New Delhi - 110034
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <CallIcon className="w-8 h-8" />
            <div className="text-left">
              <h4 className="text-xl font-semibold">Call Us Directly</h4>
              <p className="text-green-300">Available during working hours.</p>
              <a href="tel:+919661829944" className="block text-green-400 hover:underline">
                +91-96618 29944
              </a>
            </div>
          </div>
        </div>
      </div>
      {showSuccess && (
      <div className="fixed top-20 right-10 bg-green-600 text-white p-6 text-xl rounded shadow-lg z-50">
        Query raised successfully!
      </div>
    )}

      {/* Map */}
      <div className="max-w-xl mx-auto mb-8 rounded-md overflow-hidden shadow-lg h-64">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28911.023034541106!2d77.22371!3d28.6333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd7fc38a8187%3A0x7abb73aa8c418882!2sParivahan%20Vings%20(KAL)%20Private%20Limited!5e0!3m2!1sen!2sin!4v1690137192828!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Map"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleOnSubmit}
        className="max-w-xl mx-auto bg-green-900/70 backdrop-blur-md p-6 rounded-lg flex flex-col gap-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleOnChange}
            placeholder="First Name *"
            required
            className="flex-1 p-2 rounded border border-white/60 bg-green-700/50 text-white placeholder-white/80"
          />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleOnChange}
            placeholder="Last Name"
            className="flex-1 p-2 rounded border border-white/60 bg-green-700/50 text-white placeholder-white/80"
          />
        </div>

        <input
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Email *"
          required
          className="w-full p-2 rounded border border-white/60 bg-green-700/50 text-white placeholder-white/80"
        />
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handleOnChange}
          placeholder="Phone Number"
          className="w-full p-2 rounded border border-white/60 bg-green-700/50 text-white placeholder-white/80"
        />
        <textarea
          name="message"
          value={message}
          onChange={handleOnChange}
          placeholder="Your Query *"
          rows={4}
          required
          className="w-full p-2 rounded border border-white/60 bg-green-700/50 text-white placeholder-white/80 resize-none"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactUsMobile;
