import React, { useState, useEffect } from 'react';

const FirstDropLaunch = () => {
  const [phase, setPhase] = useState('waiting');
  const [ripples, setRipples] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);
  
  const COLORS = {
    drop: '#00BCD4',
    ripple1: '#4CAF50',
    ripple2: '#FFC107',
    ripple3: '#9C27B0',
    ocean: '#2196F3'
  };

  // События запуска
  const events = [
    {
      id: 'drop',
      date: 'Sept 23, 2025',
      title: 'UN Summit - First Drop',
      description: '$105B USA-Uzbekistan investments announced',
      icon: '💧',
      color: COLORS.drop,
      delay: 0
    },
    {
      id: 'ripple1',
      date: 'Sept 25, 2025',
      title: 'Kazakhstan Wave',
      description: '$4.2B Wabtec locomotive deal',
      icon: '🌊',
      color: COLORS.ripple1,
      delay: 2000
    },
    {
      id: 'ripple2',
      date: 'Oct 2025',
      title: 'EU Infrastructure',
      description: '€48-55B Middle Corridor funding',
      icon: '🌍',
      color: COLORS.ripple2,
      delay: 4000
    },
    {
      id: 'ocean',
      date: 'Jan 1, 2026',
      title: 'FSR Hub Launch',
      description: '$180B TAM fully activated',
      icon: '🚀',
      color: COLORS.ocean,
      delay: 6000
    }
  ];

  // Автоматическая смена фаз
  useEffect(() => {
    const sequence = [
      { phase: 'waiting', duration: 1000 },
      { phase: 'falling', duration: 2000 },
      { phase: 'impact', duration: 1000 },
      { phase: 'ripple1', duration: 2000 },
      { phase: 'ripple2', duration: 2000 },
      { phase: 'ocean', duration: 3000 },
    ];

    let currentIndex = 0;
    
    const runSequence = () => {
      if (currentIndex < sequence.length) {
        const current = sequence[currentIndex];
        setPhase(current.phase);
        
        setTimeout(() => {
          currentIndex++;
          runSequence();
        }, current.duration);
      } else {
        // Restart after complete cycle
        setTimeout(() => {
          currentIndex = 0;
          setRipples([]);
          runSequence();
        }, 2000);
      }
    };

    runSequence();
  }, []);

  // Создание волн
  useEffect(() => {
    if (phase.startsWith('ripple') || phase === 'impact') {
      const newRipple = {
        id: Date.now(),
        size: 0,
        maxSize: phase === 'impact' ? 200 : phase === 'ripple1' ? 350 : 500,
        opacity: 1
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 2000);
    }
  }, [phase]);

  // Ручной запуск
  const handleDropClick = () => {
    setPhase('falling');
    setRipples([]);
    
    setTimeout(() => setPhase('impact'), 1500);
    setTimeout(() => setPhase('ripple1'), 2500);
    setTimeout(() => setPhase('ripple2'), 4500);
    setTimeout(() => setPhase('ocean'), 6500);
    setTimeout(() => setPhase('waiting'), 9500);
  };

  return (
    <div className="relative w-full h-full min-h-[700px] bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-800 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-black bg-opacity-30 backdrop-blur-sm z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            💧 The First Drop
          </h1>
          <h2 className="text-xl text-blue-200 mb-1">
            September 2025 - The Moment Everything Changed
          </h2>
          <p className="text-gray-400 text-sm">
            From a single announcement to $180B market activation
          </p>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Background water surface */}
        <div 
          className="absolute inset-0 transition-all duration-2000"
          style={{
            background: phase === 'ocean' 
              ? `radial-gradient(circle at 50% 50%, ${COLORS.ocean}40 0%, ${COLORS.ocean}20 50%, transparent 100%)`
              : 'radial-gradient(circle at 50% 80%, rgba(33, 150, 243, 0.1) 0%, transparent 60%)',
            opacity: phase === 'ocean' ? 1 : 0.5
          }}
        />

        {/* The Drop */}
        <div
          className={`absolute transition-all duration-1000 cursor-pointer ${
            phase === 'impact' ? 'animate-bounce' : ''
          }`}
          onClick={handleDropClick}
          style={{
            left: '50%',
            top: phase === 'waiting' ? '10%' : 
                 phase === 'falling' ? '50%' : '50%',
            transform: 'translateX(-50%)',
            zIndex: 20
          }}
        >
          <div
            className="relative transition-all duration-500"
            style={{
              width: phase === 'impact' ? '80px' : '48px',
              height: phase === 'impact' ? '80px' : '60px',
              background: phase === 'ocean' 
                ? `radial-gradient(circle, ${COLORS.ocean}, ${COLORS.drop})`
                : `linear-gradient(to bottom, ${COLORS.drop}, #0097A7)`,
              borderRadius: phase === 'impact' ? '50%' : '50% 50% 50% 50% / 60% 60% 40% 40%',
              boxShadow: `0 0 ${phase === 'impact' ? '40' : '20'}px ${COLORS.drop}`,
              filter: phase === 'impact' ? 'brightness(1.5)' : 'brightness(1)'
            }}
          >
            {phase === 'ocean' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl animate-spin" style={{ animationDuration: '3s' }}>
                  🚀
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ripples */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute border-2 rounded-full pointer-events-none"
            style={{
              width: '100px',
              height: '100px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderColor: phase === 'ripple1' ? COLORS.ripple1 :
                          phase === 'ripple2' ? COLORS.ripple2 : COLORS.drop,
              animation: 'ripple-expand 2s ease-out forwards'
            }}
          />
        ))}

        {/* Event Markers */}
        {phase !== 'waiting' && phase !== 'falling' && events.map((event, index) => {
          const angle = (index * 90) - 45;
          const distance = 200;
          const x = Math.cos(angle * Math.PI / 180) * distance;
          const y = Math.sin(angle * Math.PI / 180) * distance;
          
          const isActive = 
            (phase === 'impact' && event.id === 'drop') ||
            (phase === 'ripple1' && event.id === 'ripple1') ||
            (phase === 'ripple2' && event.id === 'ripple2') ||
            (phase === 'ocean');

          return (
            <div
              key={event.id}
              className={`absolute transition-all duration-1000 ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-transform"
                style={{
                  backgroundColor: event.color,
                  boxShadow: `0 0 20px ${event.color}`
                }}
                onMouseEnter={() => setShowTimeline(true)}
              >
                {event.icon}
              </div>
            </div>
          );
        })}

        {/* Center Platform (FSR Hub) */}
        {phase === 'ocean' && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              className="w-32 h-32 rounded-full flex flex-col items-center justify-center animate-pulse"
              style={{
                backgroundColor: COLORS.ocean,
                boxShadow: `0 0 60px ${COLORS.ocean}`,
                border: '4px solid white'
              }}
            >
              <div className="text-4xl">⚛️</div>
              <div className="text-white text-sm font-bold mt-1">FSR Hub</div>
              <div className="text-white text-xs">Live</div>
            </div>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="p-6 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            📅 Launch Timeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {events.map((event, index) => {
              const isActive = 
                (phase === 'impact' && event.id === 'drop') ||
                (phase === 'ripple1' && event.id === 'ripple1') ||
                (phase === 'ripple2' && event.id === 'ripple2') ||
                (phase === 'ocean' && event.id === 'ocean');

              return (
                <div
                  key={event.id}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-500 ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? `${event.color}20` : 'rgba(0,0,0,0.3)',
                    borderColor: isActive ? event.color : 'rgba(255,255,255,0.1)'
                  }}
                >
                  <div className="text-3xl mb-2">{event.icon}</div>
                  <div className="text-xs text-gray-400 mb-1">{event.date}</div>
                  <div className="text-white font-bold text-sm mb-1">{event.title}</div>
                  <div className="text-gray-300 text-xs">{event.description}</div>
                  
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: event.color }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="absolute top-20 left-4 text-xs text-gray-400 space-y-1">
        <div className={phase === 'waiting' ? 'text-yellow-400 font-bold' : ''}>
          ⏳ Waiting
        </div>
        <div className={phase === 'falling' ? 'text-blue-400 font-bold' : ''}>
          ⬇️ Falling
        </div>
        <div className={phase === 'impact' ? 'text-cyan-400 font-bold' : ''}>
          💥 Impact
        </div>
        <div className={phase === 'ripple1' ? 'text-green-400 font-bold' : ''}>
          🌊 Wave 1
        </div>
        <div className={phase === 'ripple2' ? 'text-yellow-400 font-bold' : ''}>
          🌊 Wave 2
        </div>
        <div className={phase === 'ocean' ? 'text-purple-400 font-bold' : ''}>
          🌊 Ocean
        </div>
      </div>

      {/* Info Box */}
      <div className="absolute bottom-20 right-4 bg-black bg-opacity-80 rounded-lg p-4 max-w-xs backdrop-blur-sm border border-gray-600">
        <h4 className="text-white font-bold mb-2">💡 Why This Matters</h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          September 2025 wasn't just another announcement. It was the moment when 
          <span className="text-cyan-300 font-bold"> $180B in infrastructure investments</span> became 
          real. FSR Hub launches January 2026 to serve this awakening corridor.
        </p>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 text-right">
        <div>FSR Hub Platform</div>
        <div>First Drop Visualization</div>
        <div className="text-cyan-400">Click the drop to replay</div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            width: 100px;
            height: 100px;
            opacity: 0.8;
          }
          100% {
            width: 600px;
            height: 600px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FirstDropLaunch;