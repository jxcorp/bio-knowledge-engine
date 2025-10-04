// src/pages/LandingPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const features = [
  {
    icon: '🚀',
    title: 'Live OSDR Integration',
    description:
      'Access and load thousands of NASA Open Science Data Repository records directly into your search results.',
  },
  {
    icon: '📚',
    title: 'Curated Journal Corpus',
    description:
      'Explore a growing collection of space biology journals, ensuring comprehensive coverage of the field.',
  },
  {
    icon: '✨',
    title: 'Smart Discovery',
    description:
      'AI-powered relevance ranking helps you discover connections faster and with more accuracy.',
  },
];

const LandingPage = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    theme === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }, [theme]);

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500 
                 bg-white text-gray-900 
                 dark:bg-gray-950 dark:text-white"
    >
      <Header theme={theme} setTheme={setTheme} />

      <main className="flex-grow">
        {/* === HERO SECTION: ENHANCED PLANETARY DESIGN & EARTH VIDEO === */}
        <section className="relative py-32 md:py-44 overflow-hidden shadow-2xl">
          
          {/* Enhanced Background Gradient (Deeper, more space-like) */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 opacity-95" />
          <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-40" />

          {/* FAUX PLANETARY ELEMENTS (Subtler blur, more position variety) */}
          <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[180px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-[-10%] w-[350px] h-[350px] rounded-full bg-purple-500/15 blur-[150px] animate-pulse-slow delay-500"></div>
          
          
          {/* 🌍 ROTATING EARTH VIDEO: Replaced <img> with <video> */}
          
          

          {/* Content (Z-INDEX 20 to ensure it is always in front of the video) */}
          <div className="relative container mx-auto max-w-6xl px-6 text-center z-20"> 
            <span
              className="inline-block mb-6 px-4 py-1 text-sm font-semibold rounded-full 
                         bg-white/10 dark:bg-cyan-400/10 text-white dark:text-cyan-300 backdrop-blur-sm border border-white/20"
            >
              🌌 Next Generation Research Platform
            </span>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-none">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r 
                               from-cyan-300 via-indigo-400 to-purple-500 drop-shadow-2xl">
                Space Biology
              </span>
              <span className="block text-white">Discovery Engine</span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200 font-light">
              The unified engine for space biology, seamlessly connecting curated journals and live{' '}
              <span className="font-extrabold text-cyan-400">NASA OSDR</span> data for rapid discovery.
            </p>

            <div className="flex justify-center gap-6">
              <Link
                to="/engine"
                className="px-10 py-5 text-lg font-bold rounded-full shadow-2xl transition duration-300 transform 
                           bg-cyan-500 text-gray-900 
                           hover:bg-cyan-400 hover:shadow-cyan-400/70 hover:scale-[1.05]" 
              >
                Start Research →
              </Link>
              <Link
                to="/about"
                className="px-10 py-5 text-lg font-semibold rounded-full shadow-md
                           bg-white/10 text-white border border-cyan-400/50 backdrop-blur-md
                           hover:bg-white/20 transition duration-300 hover:scale-[1.05]" 
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* === FEATURES SECTION: FLOATING MODULES === */}
        <section className="py-28 bg-gray-950 border-t border-gray-800">
          <div className="container mx-auto max-w-6xl px-6">
            <h2
              className="text-5xl font-extrabold text-center mb-20 text-white"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Core Modules
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="p-10 rounded-3xl backdrop-blur-md 
                             bg-gray-800/70 border border-cyan-500/30 
                             shadow-xl hover:shadow-cyan-500/40 transition duration-500
                             hover:scale-[1.03] hover:translate-y-[-5px]"
                >
                  <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-2xl 
                                  bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white text-3xl shadow-lg">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">{f.title}</h3>
                  <p className="text-gray-300">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === CTA SECTION === */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-cyan-600 opacity-90" />
          <div className="relative container mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                <span className="text-cyan-300">Jumpstart</span> Your Research.
              </h2>
              <p className="text-xl text-indigo-100 font-light">
                Secure your access to the most comprehensive space biology toolkit.
              </p>
            </div>
            <Link
              to="/engine"
              className="px-12 py-5 text-lg font-extrabold rounded-full shadow-2xl 
                           bg-white text-purple-700 hover:bg-gray-100 hover:shadow-white/50 transition duration-300
                           hover:scale-[1.07]"
            >
              Explore the Engine →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;