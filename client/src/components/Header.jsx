// src/components/Header.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/Themecontext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme(); 
  const icon = theme === 'dark' ? '☀️' : '🌑'; 

  return (
    <button
      onClick={toggleTheme}
      className="p-2 ml-4 rounded-full text-xl transition-all duration-300 ease-in-out
                 bg-white/70 text-gray-800 hover:bg-gray-100 shadow 
                 dark:bg-gray-800/70 dark:text-cyan-400 dark:hover:bg-gray-700 
                 dark:shadow-lg dark:shadow-cyan-900/50 backdrop-blur-md"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {icon}
    </button>
  );
};

const Header = () => {
  return (
    <header className="sticky top-0 z-40 transition-all duration-500 backdrop-blur-md
                       bg-white/80 border-b border-gray-200 
                       dark:bg-gray-950/80 dark:border-gray-800 shadow-sm">
      
      <div className="container mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
        
        {/* === Brand === */}
        <Link 
          to="/" 
          className="text-2xl font-extrabold tracking-tight transition duration-300
                     text-gray-900 hover:text-indigo-600 
                     dark:text-white dark:hover:text-cyan-400"
        >
          SpaceBio 
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent ml-1">
            Engine
          </span>
        </Link>
        
        {/* === Navigation === */}
        <nav className="flex items-center gap-6 text-lg font-medium">
          <NavLink 
            to="/about" 
            className={({ isActive }) =>
              `relative transition-colors duration-300 hover:text-indigo-600 dark:hover:text-cyan-400
               ${isActive ? "text-indigo-600 dark:text-cyan-400" : "text-gray-700 dark:text-gray-300"}`
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/engine" 
            className={({ isActive }) =>
              `relative transition-colors duration-300 hover:text-indigo-600 dark:hover:text-cyan-400
               ${isActive ? "text-indigo-600 dark:text-cyan-400" : "text-gray-700 dark:text-gray-300"}`
            }
          >
            Engine
          </NavLink>
          

          {/* Theme Toggle */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
