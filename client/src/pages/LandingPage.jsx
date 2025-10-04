import React, { useState, useEffect } from 'react';
import { Sun, Moon, Rocket, Database, Sparkles, Search, ArrowRight, Zap, Globe, Atom } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [theme, setTheme] = useState('dark');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';

  const features = [
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Live OSDR Integration',
      description: 'Access thousands of NASA Open Science Data Repository records directly. Real-time synchronization with the latest space biology datasets.',
      color: 'cyan'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI-Powered Discovery',
      description: 'Machine learning algorithms analyze patterns across millions of data points to surface relevant connections you might miss.',
      color: 'purple'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Curated Journal Corpus',
      description: 'Comprehensive collection of peer-reviewed space biology research, continuously updated and expertly categorized.',
      color: 'indigo'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Research Papers', icon: <Search className="w-6 h-6" /> },
    { value: '1000+', label: 'OSDR Datasets', icon: <Database className="w-6 h-6" /> },
    { value: '95%', label: 'Discovery Rate', icon: <Zap className="w-6 h-6" /> },
    { value: '24/7', label: 'Live Updates', icon: <Atom className="w-6 h-6" /> }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 text-slate-900'
    }`}>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
          isDark ? 'bg-cyan-500' : 'bg-cyan-300'
        }`} style={{ animationDuration: '4s' }} />
        <div className={`absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse ${
          isDark ? 'bg-purple-600' : 'bg-purple-300'
        }`} style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className={`absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl opacity-10 animate-pulse ${
          isDark ? 'bg-indigo-500' : 'bg-indigo-200'
        }`} style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Add custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
      `}</style>

      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-500 ${
        isDark 
          ? 'bg-slate-950/80 border-slate-800/50' 
          : 'bg-white/80 border-slate-200/50'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-gradient-to-br from-cyan-500 to-purple-600' : 'bg-gradient-to-br from-cyan-400 to-purple-500'}`}>
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Space Biology Engine</h1>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Powered by NASA OSDR</p>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-yellow-300' 
                  : 'bg-slate-100 hover:bg-slate-200 text-indigo-600'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Floating Earth Globe */}
        <div className="absolute top-1/4 right-[10%] hidden lg:block pointer-events-none animate-float">
          <div className={`relative w-100 h-100 transition-all duration-700 ${
            isDark ? 'opacity-30' : 'opacity-20'
          }`}>
            <img 
              src="/earth2.png" 
              alt="Earth"
              className="w-full h-full object-contain animate-spin-slow"
              style={{ animationDuration: '40s' }}
            />
            <div className={`absolute inset-0 rounded-full blur-3xl ${
              isDark ? 'bg-cyan-500/20' : 'bg-cyan-400/30'
            }`} />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md border transition-all duration-500 ${
              isDark 
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' 
                : 'bg-cyan-50 border-cyan-200 text-cyan-700'
            }`}>
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Next Generation Research Platform</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className={`block bg-clip-text text-transparent bg-gradient-to-r ${
                isDark 
                  ? 'from-cyan-300 via-purple-400 to-pink-400' 
                  : 'from-cyan-600 via-purple-600 to-pink-600'
              }`}>
                Discover the Universe
              </span>
              <span className={isDark ? 'text-white' : 'text-slate-900'}>
                of Space Biology
              </span>
            </h2>

            {/* Description */}
            <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Seamlessly connect curated journals with live NASA OSDR data. 
              Accelerate your research with AI-powered insights and real-time discovery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={'/engine'}
              ><button className={`group px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500' 
                  : 'bg-gradient-to-r from-cyan-600 to-purple-700 text-white hover:from-cyan-500 hover:to-purple-600'
              }`}>
                Start Exploring
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>
              <Link target='_blank' to ={'https://osdr.nasa.gov/bio/repo/search?q=&data_source=cgene,alsda,esa&data_type=study'}
              ><button className={`px-8 py-4 rounded-full font-semibold text-lg border-2 transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                isDark 
                  ? 'border-slate-700 hover:bg-slate-800/50 text-white' 
                  : 'border-slate-300 hover:bg-white/50 text-slate-900'
              }`}>
                NASA OSDR
              </button>
              </Link>
            </div>

            {/* Floating Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <div 
                  key={i}
                  className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-slate-900/50 border-slate-800/50' 
                      : 'bg-white/60 border-slate-200/50'
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`inline-flex p-2 rounded-lg mb-3 ${
                    isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700'
                  }`}>
                    {stat.icon}
                  </div>
                  <div className={`text-3xl font-black mb-1 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 border-t transition-colors duration-500 ${
        isDark ? 'border-slate-800/50' : 'border-slate-200/50'
      }`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <h3 className={`text-4xl md:text-5xl font-black mb-4 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Powerful Research Tools
              </h3>
              <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Everything you need to accelerate space biology discovery
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className={`group p-8 rounded-3xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                    isDark 
                      ? 'bg-slate-900/50 border-slate-800/50 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20' 
                      : 'bg-white/70 border-slate-200 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-200/50'
                  }`}
                >
                  <div className={`inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-br transition-all duration-300 group-hover:scale-110 ${
                    feature.color === 'cyan' 
                      ? isDark ? 'from-cyan-500/20 to-cyan-600/20 text-cyan-400' : 'from-cyan-100 to-cyan-200 text-cyan-700'
                      : feature.color === 'purple'
                      ? isDark ? 'from-purple-500/20 to-purple-600/20 text-purple-400' : 'from-purple-100 to-purple-200 text-purple-700'
                      : isDark ? 'from-indigo-500/20 to-indigo-600/20 text-indigo-400' : 'from-indigo-100 to-indigo-200 text-indigo-700'
                  }`}>
                    {feature.icon}
                  </div>
                  
                  <h4 className={`text-2xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {feature.title}
                  </h4>
                  
                  <p className={`leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-pink-900/30' 
            : 'bg-gradient-to-r from-cyan-100 via-purple-100 to-pink-100'
        }`} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className={`max-w-4xl mx-auto p-12 rounded-3xl backdrop-blur-xl border text-center ${
            isDark 
              ? 'bg-slate-900/50 border-slate-800/50' 
              : 'bg-white/80 border-slate-200'
          }`}>
            <h3 className={`text-4xl md:text-5xl font-black mb-6 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Ready to Transform Your Research?
            </h3>
            
            <p className={`text-xl mb-8 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Join thousands of researchers exploring the frontiers of space biology
            </p>
            
            <button className={`px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500' 
                : 'bg-gradient-to-r from-cyan-600 to-purple-700 text-white hover:from-cyan-500 hover:to-purple-600'
            }`}>
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-12 transition-colors duration-500 ${
        isDark ? 'border-slate-800/50 bg-slate-950/50' : 'border-slate-200 bg-slate-50/50'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Rocket className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Space Biology Discovery Engine
              </span>
            </div>
            
            <div className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              © 2025 Powered by NASA Open Science Data Repository
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}