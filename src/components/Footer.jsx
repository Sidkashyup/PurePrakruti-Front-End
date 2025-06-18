import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaLinkedin } from 'react-icons/fa';
import pure from '../resource/pureprakrti.png';
import mail from "../resource/mail.png";
import mapPin from "../resource/map-pin.png";
import phoneImg from "../resource/phone.png";

export const Footer = () => {
  return (
    <footer className="bg-green-900 text-black p-10 w-screen">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <Link to="/">
            <img src={pure} className="w-auto h-full max-h-20 mb-4" alt="Pure Prakruti Logo" />
          </Link>
          <p className="text-sm text-white font-semibold"> Pure Prakruti </p>
          
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Company</h3>
          <ul className="text-white">
            <li className="mb-2">
              <Link to="/" className="hover:text-green-300">Home</Link>
            </li>
            <li className="mb-2">
              <Link to="/about" className="hover:text-green-300">About</Link>
            </li>
            <li className="mb-2">
              <Link to="/services" className="hover:text-green-300">Services</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-300">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Business Links */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Business</h3>
          <ul className="text-white">
            <li className="mb-2">
              <Link to="/team" className="hover:text-green-300">Our Team</Link>
            </li>
            <li className="mb-2">
              <Link to="/facts" className="hover:text-green-300">Facts</Link>
            </li>
            <li>
              <Link to="/customers" className="hover:text-green-300">Customers</Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="text-white">
          <h3 className="font-semibold mb-4 ">Get In Touch</h3>

          <div className="flex items-center gap-2 text-white">
                      <img src={mail} alt="mail" className="h-full max-h-4 w-auto filter invert" />
                       <span>siddharth@tsil.net.in</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <img src={mail} alt="mail" className="h-full max-h-4 w-auto filter invert" />
                      <span>team@tsil.net.in</span>
                    </div>
          <div className="flex items-start gap-2 text-white">
                    <img src={mapPin} alt="mapPin" className="h-full max-h-4 w-auto filter invert" />
                       <span>Corporate Office: 609, Tower II, Pearls Omaxe, Netaji Subhash Place, Pitampura, New Delhi - 110034. Delhi, INDIA.</span>
                    </div>
          <div className="flex items-center gap-2 text-white">
                      <img src={phoneImg} alt="phone" className="h-full max-h-4 w-auto filter invert" />
                      <span>+91-96618 29944</span>
                    </div>
          <div className="flex mt-4 space-x-4 text-white">
            <a href="#" className="hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-blue-500">
              <FaTwitter />
            </a>
           {/* <a href="#" className="hover:text-blue-500">
              <FaGoogle />
            </a>  */}
            <a href="#" className="hover:text-blue-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-500">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="w-4/5 mx-auto border-t border-gray-300 mt-8 pt-4 text-center text-sm">
      <p className='text-white'>&copy; Pure Prakruti. All rights reserved.</p>
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