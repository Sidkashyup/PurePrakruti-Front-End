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
    <footer className="bg-green-900 text-black p-10 w-screen">
      <div className="max-w-[1900px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo and Description */}
        <div>
          <Link to="/">
            <img
              src={pure}
              className="w-auto max-h-28 mb-4"
              alt="Pure Prakruti Logo"
            />
          </Link>
          <p className="text-xl text-white font-semibold"> Pure Prakruti </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-4 text-white text-lg">Company</h3>
          <ul className="text-white">
            <li className="mb-2">
              <a href="/#hero" className="hover:text-green-300 text-lg">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="/#about" className="hover:text-green-300 text-lg">
                About
              </a>
            </li>
            <li className="mb-2">
              <Link to="/services" className="hover:text-green-300 text-lg">
                Services
              </Link>
            </li>
            <li>
              <Link to="/ContactUs" className="hover:text-green-300 text-lg">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Business Links */}
        <div>
          <h3 className="font-semibold mb-4 text-white text-lg">Business</h3>
          <ul className="text-white">
            <li className="mb-2">
              <Link to="/ourteam" className="hover:text-green-300 text-lg">
                Our Team
              </Link>
            </li>
            <li className="mb-2">
              <a href="/Facts" className="hover:text-green-300 text-lg">
                Facts
              </a>
            </li>
            <li>
              <Link to="/customers" className="hover:text-green-300 text-lg">
                Customers
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="text-white">
          <h3 className="font-semibold mb-4 text-lg ">Get In Touch</h3>

          <div className="flex items-center gap-2 text-white">
            <img
              src={mail}
              alt="mail"
              className="h-full max-h-4 w-auto filter invert"
            />
            <a
              href="mailto:team@tsil.net.in"
              className="text-white text-lg font-medium hover:underline hover:text-green-300"
            >
              team@tsil.net.in
            </a>
          </div>
          <div className="flex items-center gap-2 text-white">
            <img
              src={mail}
              alt="mail"
              className="h-full max-h-4 w-auto filter invert"
            />
            <a
              href="mailto:siddharth@tsil.net.in"
              className="text-white text-lg font-medium hover:underline hover:text-green-300"
            >
              siddharth@tsil.net.in
            </a>
          </div>
          <div className="flex items-start gap-2 text-white">
            <img
              src={mapPin}
              alt="mapPin"
              className="h-full max-h-4 w-auto filter invert"
            />
            <a
              href="https://maps.app.goo.gl/rRJx9bAN9PjNQMfe7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-md font-medium hover:underline hover:text-green-300"
            >
              Corporate Office: 609, Tower II, Pearls Omaxe, Netaji Subhash
              Place, Pitampura, New Delhi - 110034. Delhi, INDIA.
            </a>
          </div>
          <div className="flex items-center gap-2 text-white">
            <img
              src={phoneImg}
              alt="phone"
              className="h-full max-h-4 w-auto filter invert"
            />
            <a
              href="tel:+919661829944"
              className="text-white text-lg font-medium hover:underline hover:text-green-300"
            >
              +91-96618 29944
            </a>
          </div>
          <div className="flex mt-4 space-x-4 text-white">
            <a
              href="https://www.facebook.com/transportwings/"
              className="hover:text-blue-500 text-xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/Pureprakruti"
              className="hover:text-blue-500 text-xl"
            >
              <FaTwitter />
            </a>
            {/* <a href="#" className="hover:text-blue-500">
              <FaGoogle />
            </a>  */}
            <a
              href="https://www.instagram.com/pure_prakruti/"
              className="hover:text-blue-500 text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/twi-india/?originalSubdomain=in"
              className="hover:text-blue-500 text-xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:ml-auto md:mr-0 space-y-6 mx-auto items-center justify-end flex-shrink-0 ">
          <a href="https://play.google.com/store/apps/details?id=com.tsilteam.pureprakruti&pli=1">
            <button className="bg-green-50 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 w-[200px] focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="green"
                className="w-6 h-6"
                viewBox="0 0 512 512"
              >
                <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
              </svg>
              <span className="ml-4 flex items-start flex-col leading-none">
                <span className="text-sm text-gray-600 mb-1">GET IT ON</span>
                <span className="title-font font-medium">Google Play</span>
              </span>
            </button>
          </a>
          <button className="bg-green-50 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 w-[200px] focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="green"
              class="w-6 h-6"
              viewBox="0 0 305 305"
            >
              <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
              <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
            </svg>
            <span className="ml-4 flex items-start flex-col leading-none">
              <span className="text-sm text-gray-600 mb-1">Download on the</span>
              <span className="title-font font-medium">App Store</span>
            </span>
          </button>
        </div>
      </div>

      <div className="w-5/6 mx-auto border-t border-gray-300 mt-8 pt-4 text-center text-sm">
        <p className="text-white text-lg">
          &copy; Pure Prakruti. All rights reserved.
        </p>
        {/* <p>
          Follow us on{' '}
          <a href="#" className="text-white underline hover:text-gray-200">
            LinkedIn
          </a>{' '}
          |{' '}
          <a href="#" className="text-white underline hover:text-gray-200">
            Twitter
          </a>
        </p> */}
      </div>
    </footer>
  );
};
