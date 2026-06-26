import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiGithub } from 'react-icons/fi';
import Logo from '../Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-brandNavy/5 pt-16 pb-12 w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mb-12">
        
        {/* Column 1: Logo & Brand Description */}
        <div className="flex flex-col gap-5 md:col-span-1">
          <Link to="/">
            <Logo className="h-9 w-auto" textClassName="text-2xl font-bold text-brandNavy font-sans" />
          </Link>
          <p className="text-brandTextSec text-sm leading-relaxed max-w-sm">
            A comprehensive student-centric community platform for St Agnes College, Mangalore. Discover PG stays, buy/sell student essentials, and retrieve lost items.
          </p>
          <div className="flex items-center gap-4 text-brandTextSec mt-2">
            <a href="#" className="hover:text-brandAccent transition-colors p-2 bg-brandBgSoft rounded-xl hover:-translate-y-1 duration-300">
              <FiFacebook className="text-lg" />
            </a>
            <a href="#" className="hover:text-brandAccent transition-colors p-2 bg-brandBgSoft rounded-xl hover:-translate-y-1 duration-300">
              <FiTwitter className="text-lg" />
            </a>
            <a href="#" className="hover:text-brandAccent transition-colors p-2 bg-brandBgSoft rounded-xl hover:-translate-y-1 duration-300">
              <FiInstagram className="text-lg" />
            </a>
            <a href="#" className="hover:text-brandAccent transition-colors p-2 bg-brandBgSoft rounded-xl hover:-translate-y-1 duration-300">
              <FiGithub className="text-lg" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-5">
          <h4 className="font-semibold text-brandNavy text-base font-sans tracking-wide">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-sm font-medium text-brandTextSec">
            <li>
              <Link to="/" className="hover:text-brandAccent transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/find-pg" className="hover:text-brandAccent transition-colors">Find PG</Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-brandAccent transition-colors">Marketplace</Link>
            </li>
            <li>
              <Link to="/lost-found" className="hover:text-brandAccent transition-colors">Lost & Found</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col gap-5">
          <h4 className="font-semibold text-brandNavy text-base font-sans tracking-wide">Contact Us</h4>
          <ul className="flex flex-col gap-3 text-sm font-medium text-brandTextSec">
            <li className="leading-relaxed">
              St Agnes College Campus,<br />
              Bendore, Mangalore,<br />
              Karnataka - 575002
            </li>
            <li>
              Email: <a href="mailto:support@stagnes.edu.in" className="hover:text-brandAccent transition-colors">support@stagnes.edu.in</a>
            </li>
            <li>
              Helpline: <span className="font-mono text-brandNavy font-semibold">+91 6361079075</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Legal / Trust */}
        <div className="flex flex-col gap-5">
          <h4 className="font-semibold text-brandNavy text-base font-sans tracking-wide">Legal & Privacy</h4>
          <ul className="flex flex-col gap-3 text-sm font-medium text-brandTextSec">
            <li>
              <a href="#" className="hover:text-brandAccent transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-brandAccent transition-colors">Terms & Conditions</a>
            </li>
            <li>
              <a href="#" className="hover:text-brandAccent transition-colors">Safety Guidelines</a>
            </li>
            <li>
              <a href="#" className="hover:text-brandAccent transition-colors">Refund & Dispute Policy</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-brandNavy/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-brandTextSec">
        <p>© {currentYear} AgnesNest. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Designed for
          <span className="text-brandNavy font-semibold">St Agnes College Students</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
