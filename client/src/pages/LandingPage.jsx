import React, { useState, useEffect } from 'react';
import { Rocket, Database, Sparkles, Moon, Sun, ChevronRight, Microscope, Dna, Atom, Zap, Star, Search, Users, TrendingUp, Brain, Orbit, BookOpen, Activity } from 'lucide-react';

export default function LandingPage() {
  const [theme, setTheme] = useState('dark');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isDark = theme === 'dark';

  const features = [
    {
      icon: Database,
      title: 'NASA OSDR Integration',
      description: 'Real-time access to thousands of space biology datasets from the Open Science Data Repository.',
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      accentColor: isDark ? 'text-cyan-400' : 'text-cyan-600'
    },
    {
      icon: Brain,
      title: 'AI Neural Analysis',
      description: 'Advanced machine learning models identify patterns and correlations across millions of data points.',
      gradient: 'from-purple-400 via-pink-500 to-rose-600',
      accentColor: isDark ? 'text-purple-400' : 'text-purple-600'
    },
    {
      icon: BookOpen,
      title: 'Research Synthesis',
      description: 'Automated literature review combining peer-reviewed journals with experimental data.',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      accentColor: isDark ? 'text-emerald-400' : 'text-emerald-600'
    },
    {
      icon: Orbit,
      title: 'Interactive Visualization',
      description: 'Explore complex biological relationships through immersive 3D data visualization.',
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      accentColor: isDark ? 'text-amber-400' : 'text-amber-600'
    }
  ];

  const stats = [
    { icon: Database, value: '2.4M+', label: 'Research Papers', color: 'cyan' },
    { icon: Users, value: '18K+', label: 'Researchers', color: 'purple' },
    { icon: Atom, value: '450K+', label: 'Biomarkers', color: 'emerald' },
    { icon: Activity, value: '99.8%', label: 'Accuracy', color: 'amber' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'}`}>
      {/* Dynamic gradient orbs following mouse */}
      {isDark && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute w-[800px] h-[800px] transition-all duration-1000 ease-out"
            style={{
              left: mousePos.x - 400,
              top: mousePos.y - 400,
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          <div 
            className="absolute w-[600px] h-[600px] transition-all duration-1500 ease-out"
            style={{
              left: mousePos.x - 300,
              top: mousePos.y - 300,
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
        </div>
      )}

      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(isDark ? 80 : 40)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${isDark ? 'bg-white' : 'bg-blue-400'}`}
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: isDark ? Math.random() * 0.6 + 0.2 : Math.random() * 0.3 + 0.1,
              animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50 
            ? (isDark ? 'bg-slate-900/80 backdrop-blur-2xl border-b border-slate-800 shadow-xl' : 'bg-white/80 backdrop-blur-2xl border-b border-slate-200 shadow-lg')
            : (isDark ? 'bg-transparent' : 'bg-transparent')
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center ${
                isDark 
                  ? 'bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600' 
                  : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600'
              } shadow-2xl`}>
                <Dna className="w-8 h-8 text-white animate-pulse" />
                {isDark && <div className="absolute inset-0 rounded-2xl bg-cyan-500/40 blur-2xl animate-pulse" />}
              </div>
              <div>
                <h1 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  BioVerse
                </h1>
                <p className={`text-xs font-bold ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                  Discovery Engine
                </p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className={`text-sm font-semibold transition-all ${
                isDark ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-600 hover:text-blue-600'
              }`}>
                Features
              </a>
              <a href="#platform" className={`text-sm font-semibold transition-all ${
                isDark ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-600 hover:text-blue-600'
              }`}>
                Platform
              </a>
              <a href="#research" className={`text-sm font-semibold transition-all ${
                isDark ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-600 hover:text-blue-600'
              }`}>
                Research
              </a>
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-3 rounded-xl transition-all duration-500 ${
                  isDark 
                    ? 'bg-slate-800/50 hover:bg-slate-700/50 text-cyan-400 border border-slate-700' 
                    : 'bg-gradient-to-br from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-700 border border-amber-300'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Geometric decorations */}
        {isDark && (
          <>
            <div className="absolute top-40 left-10 w-72 h-72 border border-cyan-500/10 rounded-full animate-spin-slow" />
            <div className="absolute top-60 right-20 w-56 h-56 border border-purple-500/10 rounded-full animate-spin-reverse" />
            <div className="absolute bottom-40 left-1/4 w-40 h-40 border border-pink-500/10 rotate-45" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
          </>
        )}

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 backdrop-blur-xl' 
              : 'bg-white border-2 border-blue-300 shadow-lg'
          }`}>
            <Star className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-600'} animate-pulse`} />
            <span className={`text-sm font-bold ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>
              Next-Gen Space Biology Platform
            </span>
          </div>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-6xl lg:text-7xl font-black mb-6 leading-tight`}>
                <span className={`block ${
                  isDark 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400' 
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                }`}>
                  Unlock the
                </span>
                <span className={`block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Universe
                </span>
                <span className={`block ${
                  isDark 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400' 
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600'
                }`}>
                  of Biology
                </span>
              </h2>

              <p className={`text-xl lg:text-2xl mb-10 leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                The most advanced AI-powered platform connecting{' '}
                <span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>NASA OSDR</span> data with
                cutting-edge research for unprecedented scientific breakthroughs.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button className={`group px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-400/80 hover:scale-105' 
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-blue-500/40 hover:shadow-blue-600/60 hover:scale-105'
                }`}>
                  <Rocket className="w-6 h-6 group-hover:translate-y-[-4px] transition-transform" />
                  Launch Platform
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
                <button className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                  isDark 
                    ? 'bg-slate-800/50 backdrop-blur-xl border-2 border-cyan-500/30 text-white hover:border-cyan-400/50 hover:bg-slate-800/70' 
                    : 'bg-white border-2 border-blue-300 text-slate-900 hover:border-blue-500 hover:bg-blue-50 shadow-lg hover:shadow-xl'
                }`}>
                  <Search className="w-6 h-6" />
                  Explore Demo
                </button>
              </div>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-6">
                {stats.slice(0, 3).map((stat, i) => (
                  <div key={i} className={`flex items-center gap-3 px-5 py-3 rounded-xl ${
                    isDark ? 'bg-slate-800/30 backdrop-blur-xl border border-slate-700/50' : 'bg-white border border-slate-200 shadow-md'
                  }`}>
                    <stat.icon className={`w-6 h-6 ${isDark ? `text-${stat.color}-400` : `text-${stat.color}-600`}`} />
                    <div>
                      <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className={`relative w-full aspect-square rounded-3xl ${
                isDark 
                  ? 'bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700' 
                  : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 border-2 border-slate-200 shadow-2xl'
              } p-8 overflow-hidden`}>
                {/* Animated DNA helix visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-full h-2 ${
                        isDark ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/30 to-pink-500/20' : 'bg-gradient-to-r from-blue-400/30 via-purple-400/40 to-pink-400/30'
                      } rounded-full`}
                      style={{
                        animation: `rotate-helix ${3 + i * 0.5}s linear infinite`,
                        animationDelay: `${i * 0.5}s`,
                        transformOrigin: 'center',
                      }}
                    />
                  ))}
                </div>
                
                {/* Central icon */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="relative w-80 h-80">
                    <img 
                      src="https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg" 
                      alt="Earth from space"
                      className="absolute inset-0 w-full h-full object-cover rounded-full opacity-5"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2000&auto=format&fit=crop" 
                      alt="Earth from space"
                      className="relative w-full h-full object-cover rounded-full shadow-2xl"
                      style={{ animation: 'rotate-earth 40s linear infinite' }}
                    />
                    {/* Atmospheric glow effect */}
                    <div className={`absolute inset-0 rounded-full pointer-events-none ${
                      isDark ? 'shadow-[0_0_100px_rgba(59,130,246,0.6),0_0_150px_rgba(99,102,241,0.4)]' : 'shadow-[0_0_80px_rgba(59,130,246,0.4),0_0_120px_rgba(99,102,241,0.3)]'
                    }`} />
                    {/* Shine overlay */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
                

                {/* Floating data points */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-3 h-3 rounded-full ${
                      isDark ? 'bg-cyan-400' : 'bg-blue-500'
                    }`}
                    style={{
                      top: `${20 + Math.sin(i) * 30}%`,
                      left: `${20 + Math.cos(i) * 30}%`,
                      animation: `float ${3 + i * 0.3}s ease-in-out infinite ${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={`relative z-10 py-16 px-6 ${isDark ? 'bg-slate-900/30' : 'bg-white/50'} backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 p-10 rounded-3xl ${
            isDark 
              ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700' 
              : 'bg-white border-2 border-slate-200 shadow-2xl'
          }`}>
            {stats.map((stat, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="relative inline-block mb-4">
                  <stat.icon className={`w-12 h-12 ${isDark ? `text-${stat.color}-400` : `text-${stat.color}-600`} group-hover:scale-110 transition-transform`} />
                  {isDark && (
                    <div className={`absolute inset-0 bg-${stat.color}-500/30 blur-xl group-hover:blur-2xl transition-all`} />
                  )}
                </div>
                <div className={`text-4xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`relative z-10 py-24 px-6 ${isDark ? '' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className={`text-5xl md:text-6xl font-black mb-6 ${
              isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
            }`}>
              Powered by Innovation
            </h3>
            <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Advanced capabilities designed for the future of space biology research
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`group relative p-10 rounded-3xl transition-all duration-500 cursor-pointer hover:scale-105 ${
                  isDark 
                    ? 'bg-slate-800/40 backdrop-blur-2xl border border-slate-700 hover:border-slate-600' 
                    : 'bg-white border-2 border-slate-200 hover:border-blue-300 shadow-xl hover:shadow-2xl'
                }`}
              >
                {isDark && (
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                )}
                
                <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-3xl group-hover:scale-110 transition-all`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>

                <h4 className={`text-3xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {feature.title}
                </h4>
                <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {feature.description}
                </p>

                <div className={`flex items-center gap-2 font-bold ${feature.accentColor} group-hover:gap-4 transition-all`}>
                  Explore feature
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`relative z-10 py-32 px-6 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900' 
          : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600'
      }`}>
        {isDark ? (
          <>
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-pink-600/90" />
        )}

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Zap className={`w-20 h-20 mx-auto mb-8 ${isDark ? 'text-cyan-400' : 'text-white'} animate-pulse`} />
          <h3 className={`text-5xl md:text-7xl font-black mb-8 ${isDark ? 'text-white' : 'text-white'}`}>
            Transform Your <span className={`${
              isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
                : 'text-yellow-300'
            }`}>Research</span> Today
          </h3>
          <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto ${isDark ? 'text-slate-300' : 'text-white/90'}`}>
            Join the global community of researchers making groundbreaking discoveries in space biology
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className={`px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-3 ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-400/80 hover:scale-105' 
                : 'bg-white text-purple-600 shadow-2xl hover:shadow-3xl hover:scale-105'
            }`}>
              Get Started Free
              <ChevronRight className="w-6 h-6" />
            </button>
            <button className={`px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800/50 backdrop-blur-xl border-2 border-cyan-500/30 text-white hover:border-cyan-400/50 hover:bg-slate-800/70' 
                : 'bg-transparent border-2 border-white text-white hover:bg-white/10 backdrop-blur-xl'
            }`}>
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 border-t ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
      } py-16 px-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDark 
                    ? 'bg-gradient-to-br from-cyan-500 to-purple-600' 
                    : 'bg-gradient-to-br from-blue-600 to-purple-600'
                }`}>
                  <Dna className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  BioVerse
                </span>
              </div>
              <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                The next generation platform for space biology research, powered by NASA OSDR and advanced AI technology.
              </p>
            </div>
            <div>
              <h5 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Platform</h5>
              <ul className="space-y-2">
                {['Features', 'Datasets', 'API', 'Documentation'].map(item => (
                  <li key={item}>
                    <a href="#" className={`${isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-blue-600'} transition-colors`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Company</h5>
              <ul className="space-y-2">
                {['About', 'Research', 'Partners', 'Contact'].map(item => (
                  <li key={item}>
                    <a href="#" className={`${isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-blue-600'} transition-colors`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`pt-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} text-center`}>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              © 2025 BioVerse Discovery Engine. Powered by NASA OSDR & Advanced AI.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes rotate-helix {
          0% { transform: rotate(0deg) scaleX(1); }
          50% { transform: rotate(180deg) scaleX(0.5); }
          100% { transform: rotate(360deg) scaleX(1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
      `}</style>
    </div>
  );
}