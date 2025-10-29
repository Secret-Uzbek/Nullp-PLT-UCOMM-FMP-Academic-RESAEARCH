import React, { useState, useEffect } from 'react';

const InteractivePitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const COLORS = {
    primary: '#9C27B0',
    usa: '#2196F3',
    germany: '#FFC107',
    centralAsia: '#4CAF50',
    accent: '#00BCD4'
  };

  // Slides
  const slides = [
    {
      id: 'cover',
      title: 'FSR Hub',
      subtitle: 'Living Logistics for the New Silk Road',
      type: 'cover',
      content: {
        tagline: 'Digital Platform for USA → Germany → Central Asia Trade Corridor',
        stats: ['$180B Market', '€2.5M Seed Round', 'Jan 2026 Launch']
      }
    },
    {
      id: 'problem',
      title: 'The Problem',
      subtitle: 'Despite $180B+ investments, the corridor is broken',
      type: 'problem',
      content: {
        issues: [
          { icon: '🔍', text: 'Zero Visibility', detail: '15-30 day black box shipping' },
          { icon: '💸', text: '30-40% Markups', detail: 'Opaque broker pricing' },
          { icon: '⏱️', text: '7-14 Day Delays', detail: 'Manual customs clearance' },
          { icon: '🚫', text: '40-60% Empty Returns', detail: 'No route optimization' }
        ]
      }
    },
    {
      id: 'solution',
      title: 'The Solution',
      subtitle: 'FSR Hub - One Platform, End-to-End',
      type: 'solution',
      content: {
        features: [
          { icon: '🤖', text: 'AI Route Optimization', color: COLORS.accent },
          { icon: '📍', text: 'Real-time Tracking', color: COLORS.usa },
          { icon: '⚡', text: '2-3 Day Customs', color: COLORS.germany },
          { icon: '💱', text: 'Multi-Currency Native', color: COLORS.centralAsia }
        ]
      }
    },
    {
      id: 'why-now',
      title: 'Why Now?',
      subtitle: 'September 2025 - The Inflection Point',
      type: 'timeline',
      content: {
        events: [
          { date: 'Sept 23, 2025', text: '$105B USA-Uzbekistan', icon: '💧' },
          { date: 'Sept 25, 2025', text: '$4.2B Kazakhstan Deal', icon: '🌊' },
          { date: 'Oct 2025', text: '€48-55B EU Infrastructure', icon: '🌍' },
          { date: 'Jan 1, 2026', text: 'FSR Hub Launch', icon: '🚀' }
        ]
      }
    },
    {
      id: 'market',
      title: 'Market Opportunity',
      subtitle: '$180B TAM • $45-60B SAM • €850M Target (Y3)',
      type: 'market',
      content: {
        breakdown: [
          { label: 'USA-CA Investments', value: '$110B', color: COLORS.usa },
          { label: 'EU-CA Infrastructure', value: '$55B', color: COLORS.germany },
          { label: 'Current Trade', value: '$15B', color: COLORS.centralAsia }
        ]
      }
    },
    {
      id: 'financials',
      title: 'Financial Projections',
      subtitle: 'Break-even Month 14 • 48% EBITDA Margin (Y3)',
      type: 'financials',
      content: {
        years: [
          { year: 'Y1 (2026)', revenue: '€3.8M', shipments: '850', margin: '-7%' },
          { year: 'Y2 (2027)', revenue: '€14.1M', shipments: '3,200', margin: '35%' },
          { year: 'Y3 (2028)', revenue: '€36.6M', shipments: '8,500', margin: '48%' }
        ]
      }
    },
    {
      id: 'competitive',
      title: 'Competitive Advantage',
      subtitle: '10x More Capital Efficient • 2-3 Year Head Start',
      type: 'competitive',
      content: {
        advantages: [
          { title: 'Niche Focus', desc: 'USA-Germany-CA only', icon: '🎯' },
          { title: 'Fractal Architecture', desc: 'Natural scaling', icon: '⚛️' },
          { title: 'Local Expertise', desc: 'Founder in Tashkent', icon: '🌍' },
          { title: 'Capital Efficient', desc: '€2.5M vs €50M+', icon: '💰' }
        ]
      }
    },
    {
      id: 'team',
      title: 'Team & Advisors',
      subtitle: 'Founder + 5 Key Hires (Q1 2026)',
      type: 'team',
      content: {
        roles: [
          { role: 'CEO', name: 'Abdurashid A.', bg: 'FMP Architect, Terra Ecosystem' },
          { role: 'CTO', name: 'Hiring Q1', bg: 'Ex-Flexport/Uber Freight engineer' },
          { role: 'COO', name: 'Hiring Q1', bg: '8+ years logistics operations' },
          { role: 'Strategic Partner', name: 'Lion Projects', bg: 'EU Operations Lead' }
        ]
      }
    },
    {
      id: 'ask',
      title: 'The Ask',
      subtitle: '€2.5M Seed Round • €8M Pre-money • 24% Equity',
      type: 'ask',
      content: {
        terms: [
          { label: 'Lion Projects', amount: '€500K-1M', equity: '15-25%', extra: '+ Board Seat' },
          { label: 'Use of Funds', breakdown: ['65% Platform Dev', '20% Operations', '10% Marketing', '5% Legal'] }
        ],
        returns: [
          { scenario: 'Base', timeline: '2028-2030', multiple: '10-20x' },
          { scenario: 'Upside', timeline: '2030-2032', multiple: '40x+' }
        ]
      }
    }
  ];

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 8000);
    
    return () => clearInterval(timer);
  }, [autoPlay, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        if (index < slides.length) {
          setCurrentSlide(index);
          setAutoPlay(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [slides.length]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
      setAutoPlay(false);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
      setAutoPlay(false);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-full min-h-[700px] bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex flex-col overflow-hidden">
      {/* Slide Content */}
      <div className="flex-1 relative">
        {/* Background Animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                opacity: 0.2
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-12">
          {/* Cover Slide */}
          {slide.type === 'cover' && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 border-white mb-6"
                  style={{
                    backgroundColor: COLORS.primary,
                    boxShadow: '0 0 60px rgba(156, 39, 176, 0.6)'
                  }}
                >
                  <div className="text-6xl">⚛️</div>
                </div>
              </div>
              <h1 className="text-7xl font-bold text-white mb-4">{slide.title}</h1>
              <h2 className="text-3xl text-purple-200 mb-8">{slide.subtitle}</h2>
              <p className="text-xl text-gray-300 mb-12">{slide.content.tagline}</p>
              <div className="flex justify-center space-x-8">
                {slide.content.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-8 py-4 border border-white border-opacity-20">
                    <div className="text-2xl font-bold text-cyan-300">{stat}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problem Slide */}
          {slide.type === 'problem' && (
            <div className="max-w-5xl w-full animate-fade-in">
              <h1 className="text-5xl font-bold text-white mb-4 text-center">{slide.title}</h1>
              <h2 className="text-2xl text-red-300 mb-12 text-center">{slide.subtitle}</h2>
              <div className="grid grid-cols-2 gap-6">
                {slide.content.issues.map((issue, idx) => (
                  <div key={idx} className="bg-red-900 bg-opacity-30 backdrop-blur-sm rounded-lg p-6 border-2 border-red-500 border-opacity-50 hover:border-opacity-100 transition-all duration-300 hover:scale-105">
                    <div className="text-5xl mb-4">{issue.icon}</div>
                    <div className="text-2xl font-bold text-white mb-2">{issue.text}</div>
                    <div className="text-gray-300">{issue.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solution Slide */}
          {slide.type === 'solution' && (
            <div className="max-w-5xl w-full animate-fade-in">
              <h1 className="text-5xl font-bold text-white mb-4 text-center">{slide.title}</h1>
              <h2 className="text-2xl text-green-300 mb-12 text-center">{slide.subtitle}</h2>
              <div className="grid grid-cols-2 gap-6">
                {slide.content.features.map((feature, idx) => (
                  <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border-2 hover:scale-105 transition-all duration-300"
                    style={{ borderColor: feature.color }}
                  >
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <div className="text-2xl font-bold text-white">{feature.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Slide */}
          {slide.type === 'timeline' && (
            <div className="max-w-6xl w-full animate-fade-in">
              <h1 className="text-5xl font-bold text-white mb-4 text-center">{slide.title}</h1>
              <h2 className="text-2xl text-yellow-300 mb-12 text-center">{slide.subtitle}</h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-green-500 to-purple-500 transform -translate-y-1/2" />
                
                {/* Events */}
                <div className="grid grid-cols-4 gap-4">
                  {slide.content.events.map((event, idx) => (
                    <div key={idx} className="relative">
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border-2 border-white border-opacity-30 hover:border-opacity-100 transition-all duration-300">
                        <div className="text-4xl mb-3 text-center">{event.icon}</div>
                        <div className="text-xs text-gray-400 mb-2 text-center">{event.date}</div>
                        <div className="text-sm text-white font-bold text-center">{event.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Market Slide */}
          {slide.type === 'market' && (
            <div className="max-w-5xl w-full animate-fade-in">
              <h1 className="text-5xl font-bold text-white mb-4 text-center">{slide.title}</h1>
              <h2 className="text-2xl text-blue-300 mb-12 text-center">{slide.subtitle}</h2>
              <div className="space-y-6">
                {slide.content.breakdown.map((item, idx) => (
                  <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border-l-8"
                    style={{ borderColor: item.color }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-2xl text-white font-bold">{item.label}</div>
                      <div className="text-4xl font-bold" style={{ color: item.color }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financials Slide */}
          {slide.type === 'financials' && (
            <div className="max-w-6xl w-full animate-fade-in">
              <h1 className="text-5xl font-bold text-white mb-4 text-center">{slide.title}</h1>
              <h2 className="text-2xl text-green-300 mb-12 text-center">{slide.subtitle}</h2>
              <div className="grid grid-cols-3 gap-8">
                {slide.content.years.map((year, idx) => (
                  <div key={idx} className="bg-gradient-to-b from-green-900 to-transparent bg-opacity-30 backdrop-blur-sm rounded-lg p-8 border-2 border-green-500 border-opacity-50 hover:border-opacity-100 transition-all duration-300 hover:scale-105">
                    <div className="text-xl text-gray-400 mb-4">{year.year}</div>
                    <div className="text-5xl font-bold text-green-300 mb-4">{year.revenue}</div>
                    <div className="text-lg text-white mb-2">{year.shipments} shipments</div>
                    <div className="text-lg text-gray-300">Margin: <span className={year.margin.startsWith('-') ? 'text-orange-400' : 'text-green-400'}>{year.margin}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competitive Slide */}
          {slide.type === 'competitive' && (
            <div className="max-w-5xl w-full animate-fade-in">
              <h1 className="text-5xl font-bold text-white mb-4 text-center">{slide.title}</h1>
              <h2 className="text-2xl text-purple-300 mb-12 text-center">{slide.subtitle}</h2>
              <div className="grid grid-cols-2 gap-6">
                {slide.content.advantages.map((adv, idx) => (
                  <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border-2 border-purple-500 border-opacity-50 hover:border-opacity-100 transition-all duration-300 hover:scale-105">
                    <div className="text-5xl mb-4">{adv.icon}</div>
                    <div className="text-2xl font-bold text-white mb-2">{adv.title}</div>
                    <div className="text-gray-300">{adv.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Slide */}
          {slide.type === 'team' && (
            <div className="max-w-5xl w-full animate-fade-in">
              <h1 className="text-5xl font-bold text-white mb-4 text-center">{slide.title}</h1>
              <h2 className="text-2xl text-cyan-300 mb-12 text-center">{slide.subtitle}</h2>
              <div className="grid grid-cols-2 gap-6">
                {slide.content.roles.map((person, idx) => (
                  <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border-2 border-cyan-500 border-opacity-50">
                    <div className="text-xl font-bold text-cyan-300 mb-2">{person.role}</div>
                    <div className="text-2xl text-white font-bold mb-2">{person.name}</div>
                    <div className="text-gray-300 text-sm">{person.bg}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ask Slide */}
          {slide.type === 'ask' && (
            <div className="max-w-6xl w-full animate-fade-in">
              <h1 className="text-6xl font-bold text-white mb-4 text-center">{slide.title}</h1>
              <h2 className="text-3xl text-yellow-300 mb-12 text-center">{slide.subtitle}</h2>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-yellow-900 to-orange-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 border-4 border-yellow-500">
                  <div className="text-2xl text-white font-bold mb-4">{slide.content.terms[0].label}</div>
                  <div className="text-5xl font-bold text-yellow-300 mb-4">{slide.content.terms[0].amount}</div>
                  <div className="text-xl text-white mb-2">Equity: {slide.content.terms[0].equity}</div>
                  <div className="text-lg text-gray-300">{slide.content.terms[0].extra}</div>
                </div>
                
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border-2 border-white border-opacity-30">
                  <div className="text-2xl text-white font-bold mb-4">{slide.content.terms[1].label}</div>
                  <div className="space-y-2">
                    {slide.content.terms[1].breakdown.map((item, idx) => (
                      <div key={idx} className="text-lg text-gray-300">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl text-gray-300 mb-4">Expected Returns:</div>
                <div className="flex justify-center space-x-8">
                  {slide.content.returns.map((ret, idx) => (
                    <div key={idx} className="bg-green-900 bg-opacity-30 backdrop-blur-sm rounded-lg px-8 py-4 border-2 border-green-500">
                      <div className="text-lg text-gray-300 mb-2">{ret.scenario} ({ret.timeline})</div>
                      <div className="text-4xl font-bold text-green-300">{ret.multiple}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-black bg-opacity-50 backdrop-blur-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Progress Dots */}
          <div className="flex space-x-2">
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'bg-purple-500 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                title={s.title}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <div className="text-gray-400 text-sm">
              {currentSlide + 1} / {slides.length}
            </div>
            
            <button
              onClick={prevSlide}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-all"
            >
              ← Prev
            </button>
            
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-4 py-2 rounded transition-all ${
                autoPlay
                  ? 'bg-green-600 hover:bg-green-500 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              {autoPlay ? '⏸️' : '▶️'}
            </button>
            
            <button
              onClick={nextSlide}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Hints */}
      <div className="absolute bottom-20 left-4 text-xs text-gray-500 bg-black bg-opacity-50 rounded p-2">
        <div>← → : Navigate | Space: Next</div>
        <div>1-9: Jump to slide | Click dots</div>
      </div>

      {/* CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InteractivePitchDeck;