// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Base (Light) Styles: bg-gray-50, text-gray-500, light border
    // Dark Styles: dark:bg-gray-900, dark:text-gray-400, dark border
    <footer className="w-full mt-10 py-12 transition-colors duration-500
                       bg-gray-50 border-t border-gray-200 
                       dark:bg-gray-950 dark:border-gray-800">
      
      <div className="container mx-auto max-w-7xl px-4">
        
        {/* Top Section: Links/Logo */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 space-y-4 md:space-y-0">
          
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="text-2xl font-extrabold tracking-tight 
                       text-gray-900 dark:text-white"
          >
            SpaceBio <span className="text-indigo-600 dark:text-cyan-400">Engine</span>
          </Link>
          
          {/* Footer Navigation */}
          <div className="flex space-x-6 text-sm font-medium">
            <Link 
              to="/terms" 
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-cyan-400 transition"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-cyan-400 transition"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-cyan-400 transition"
            >
              Contact
            </Link>
          </div>
        </div>
        
        {/* Separator Line */}
        <div className="border-t border-gray-200 dark:border-gray-800 mb-6"></div>

        {/* Bottom Section: Copyright and Data Source */}
        <div className="text-center text-sm font-light 
                        text-gray-500 dark:text-gray-500">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} SpaceBio Engine. All rights reserved.
          </p>
          <p>
            Data provided by NASA Open Science Data Repository (OSDR) and curated journal sources.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;