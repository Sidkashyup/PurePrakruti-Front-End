import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import pure from "../resource/pureprakrti.png";
import mail from "../resource/mail.png";
import mapPin from "../resource/map-pin.png";
import phoneImg from "../resource/phone.png";
import { Link as ScrollLink } from "react-scroll";

export const Footer = () => {
  return (
    <footer className="bg-green-950 text-gray-300 py-6 px-6 md:px-12 border-t border-white/10 w-full relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
        {/* Logo and Description */}
        <div className="space-y-6">
          <Link to="/" className="inline-block transform transition-transform hover:scale-105">
            <img
              src={pure}
              className="h-16 md:h-20 w-auto"
              alt="Pure Prakruti Logo"
            />
          </Link>
          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            Empowering the logistics industry with AI-driven sustainability tools to reduce carbon footprint and build a greener future.
          </p>
          <div className="flex space-x-4">
            {[
              { icon: FaFacebook, href: "https://www.facebook.com/transportwings/" },
              { icon: FaTwitter, href: "https://x.com/Pureprakruti" },
              { icon: FaInstagram, href: "https://www.instagram.com/pure_prakruti/" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/company/twi-india/" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Company</h3>
          <ul className="space-y-4">
            <li><a href="/#hero" className="hover:text-green-400 transition-colors">Home</a></li>
            <li><Link to="/ContactUs" className="hover:text-green-400 transition-colors">Support</Link></li>
          </ul>
        </div>

        {/* Resources or Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-4">
            <li><Link to="/carbonfootprint" className="hover:text-green-400 transition-colors">Carbon Tracking</Link></li>
            <li><Link to="/UserDashBoard" className="hover:text-green-400 transition-colors">Dashboard</Link></li>
            <li><Link to="/ContactUs" className="hover:text-green-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="lg:col-span-2 xl:col-span-1">
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Get In Touch</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-500 mt-1">📍</span>
              <p className="text-sm leading-relaxed">609, Tower II, Pearls Omaxe, NSP, Pitampura, New Delhi - 110034</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500">📧</span>
              <a href="mailto:team@tsil.net.in" className="text-sm hover:text-green-400 transition-colors">team@tsil.net.in</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500">📞</span>
              <a href="tel:+919661829944" className="text-sm hover:text-green-400 transition-colors">+91-96618 29944</a>
            </div>
          </div>
        </div>

        {/* App Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-bold text-lg mb-2 lg:mb-6 uppercase tracking-wider">Mobile App</h3>
          <a href="https://play.google.com/store/apps/details?id=com.tsilteam.pureprakruti" className="block transform transition-all hover:-translate-y-1">
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-4 hover:bg-white/10 transition-colors">
              <svg viewBox="0 0 512 512" className="w-8 h-8 fill-green-500"><path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path></svg>
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold leading-none">Get it on</p>
                <p className="text-sm font-bold text-white">Google Play</p>
              </div>
            </div>
          </a>
          <div className="block cursor-not-allowed opacity-50 transform transition-all">
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-4">
              <svg viewBox="0 0 305 305" className="w-8 h-8 fill-gray-400"><path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path><path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path></svg>
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold leading-none">Coming soon on</p>
                <p className="text-sm font-bold text-gray-400">App Store</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto border-t border-white/5 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-wide">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} Pure Prakruti. Designed with ❤️ for a Sustainable Tomorrow.
        </p>
      </div>
    </footer>
  );
};
