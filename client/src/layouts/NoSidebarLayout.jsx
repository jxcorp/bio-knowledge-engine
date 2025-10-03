// src/layouts/NoSidebarLayout.jsx
import React from 'react';
import Header from '../components/Header'; // Assuming you have a Header component
/* import Footer from '../components/Footer'; // Assuming you have a Footer component
 */
const NoSidebarLayout = ({ children }) => {
  return (
    // The main container fills the entire viewport
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Header (fixed at the top) */}
      <header className="sticky top-0 z-10 shadow-md bg-white">
        <Header />
      </header>

      {/* 2. Main Content Area */}
      {/* flex-grow allows this section to take up all available vertical space */}
      <main className="flex-grow bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children} {/* This is where your OSDRDetailsPage content will go */}
        </div>
      </main>

      {/* 3. Footer (fixed at the bottom or just stick to the bottom) */}
      <footer className="w-full border-t bg-gray-100 p-4">
{/*         <Footer />
 */}      </footer>
      
    </div>
  );
};

export default NoSidebarLayout;