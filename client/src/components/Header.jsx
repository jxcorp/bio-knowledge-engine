// src/components/Header.jsx
import React from "react";
import { Link } from 'react-router-dom';
const NASA_BLUE = "#0B3D91";

const Header = () => {
  return (
    // The header is a full-width bar with a strong background color
    <header style={{ backgroundColor: NASA_BLUE }} className="shadow-lg">
      {/* Content is centered and padded, matching the main content area width */}
      <div className="container mx-auto max-w-7xl px-4 py-3 flex justify-between items-center">
        {/* LEFT SIDE: Title/Logo Area */}
        <Link
          to="/"
          // Add any necessary styling to the Link component itself
          // We add flex items-center here for structure, but it's redundant if the content already has it.
          className="flex items-center hover:opacity-80 transition duration-150"
        >
          <span className="text-white text-3xl font-extrabold tracking-tight">
            SPACE BIO
          </span>
          <span className="text-white text-3xl font-light ml-1">ENGINE</span>
          <p className="hidden md:block ml-4 pl-4 border-l border-white/50 text-white/90 text-sm italic">
            NASA Research Repository
          </p>
        </Link>

        {/* RIGHT SIDE: Navigation/Utility Links */}
        <nav className="hidden md:flex space-x-6">
          <a
            href="#"
            className="text-white hover:text-gray-300 transition duration-150 font-medium text-sm"
          >
            About This Project
          </a>
          <a
            href="https://data.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition duration-150 font-medium text-sm"
          >
            NASA Data Portals
          </a>
        </nav>

        {/* Optional: Simple Menu Icon for Mobile (Hidden on MD and up) */}
        <button className="md:hidden text-white p-2 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
