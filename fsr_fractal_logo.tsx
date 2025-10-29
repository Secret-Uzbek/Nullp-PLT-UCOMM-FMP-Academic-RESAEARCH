import React, { useState, useEffect } from 'react';

const FractalLogoAnimated = () => {
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [activeLayer, setActiveLayer] = useState(null);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const COLORS = {
    l0: '#9C27B0', // Purple - Philosophy
    l1: '#E91E63', // Pink - Metatheory
    l2: '#2196F3', // Blue - Methodology
    l3: '#00BCD4', // Cyan - Empirical
    l4: '#4CAF50', // Green - Integration
    l5: '#8BC34A', // Light Green - Sociocultural
    l6: '#FFC107', // Yellow - Technology
    l7: '#FF6F00'  // Orange - Collective
  };

  // 7 слоёв FMP архитектуры
  const layers = [
    {
      id: 'l0',
      name: 'L0 - Philosophical',
      description: 'Core Principles & Values',
      color: COLORS.l0,
      radius: 30,
      details: 'Transparency, Efficiency, Trust, Sustainability',
      icon: '🎯'
    },
    {
      id: 'l1',
      name: 'L1 - Metatheoretical',
      description: 'Data Models & Structures',
      color: COLORS.l1,
      radius: 50,
      details: 'Shipment Entity, Route Graph, Carrier Profile',
      icon: '📐'
    },
    {
      id: 'l2',
      name: 'L2 - Methodological',
      description: 'Business Logic & Algorithms',
      color: COLORS.l2,
      radius: 70,
      details: 'Pricing Engine, Matching Rules, Optimization',
      icon: '⚙️'
    },
    {
      id: 'l3',
      name: 'L3 - Empirical',
      description: 'Platform Implementation',
      color: COLORS.l3,
      radius: 90,
      details: 'React, Node.js, PostgreSQL, AWS',
      icon: '💻'
    },
    {
      id: 'l4',
      name: 'L4 - Integration',
      description: 'External Systems',
      color: COLORS.l4,
      radius: 110,
      details: 'Carrier APIs, Customs, Payment Gateways',
      icon: '🔌'
    },
    {
      id: 'l5',
      name: 'L5 - Sociocultural',
      description: 'UX & Localization',
      color: COLORS.l5,
      radius: 130,
      details: 'Multi-language, Cultural Adaptation, Accessibility',
      icon: '🌍'
    },
    {
      id: 'l6',
      name: 'L6 - Technological',
      description: 'Automation & AI',
      color: COLORS.l6,
      radius: 150,
      details: 'AI/ML, Blockchain, IoT, Predictive Analytics',
      icon: '🤖'
    },
    {
      id: 'l7',
      name: 'L7 - Collective',
      description: 'Network Effects',
      color: COLORS.l7,
      radius: 170,
      details: 'Community Feedback, Ecosystem Growth, Emergent Properties',
      icon: '🌐'
    }
  ];

  // Автоматическая rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationSpeed(prev => {
        const speeds = [0.5, 1, 2];
        const currentIndex = speeds.indexOf(prev);
        return speeds[(currentIndex + 1) % speeds.length];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Циклическая подсветка слоёв
  useEffect(() => {
    if (!activeLayer) {
      const cycleInterval = setInterval(() => {
        const layerIds = layers.map(l => l.id);
        const currentIndex = layerIds.indexOf(hoveredLayer);
        const nextIndex = (currentIndex + 1) % layerIds.length;
        setHoveredLayer(layerIds[nextIndex]);
      }, 2000);
      return () => clearInterval(cycleInterval);
    }
  }, [activeLayer, hoveredLayer]);

  const handleLayerClick = (layerId) => {
    setActiveLayer(activeLayer === layerId ? null : layerId);
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative w-full h-full min-h-[700px] bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-black bg-opacity-30 backdrop-blur-sm z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            ⚛️ Fractal Architecture
          </h1>
          <h2 className="text-xl text-purple-200 mb-1">
            FSR Hub Logo - L0 to L7 Epistemic Layers
          </h2>
          <p className="text-gray-400 text-sm">
            Self-similar patterns across all scales
          </p>
        </div>
      </div>

      {/* Main Logo */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Background particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                opacity: 0.3
              }}
            />
          ))}
        </div>

        {/* Fractal Layers */}
        <div className="relative" style={{ width: '400px', height: '400px' }}>
          {layers.map((layer, index) => {
            const isHovered = hoveredLayer === layer.id;
            const isActive = activeLayer === layer.id;
            const scale = isExpanded && isActive ? 1.3 : isExpanded && !isActive ? 0.7 : 1;
            const opacity = isExpanded && !isActive ? 0.3 : 1;
            
            return (
              <div
                key={layer.id}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 cursor-pointer"
                style={{
                  width: `${layer.radius * 2}px`,
                  height: `${layer.radius * 2}px`,
                  zIndex: isActive ? 100 : isHovered ? 50 : layers.length - index,
                  transform: `translate(-50%, -50%) scale(${scale}) rotate(${index * (360 / layers.length) * rotationSpeed}deg)`,
                  opacity
                }}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => !activeLayer && setHoveredLayer(null)}
                onClick={() => handleLayerClick(layer.id)}
              >
                {/* Rotating ring */}
                <div
                  className="absolute inset-0 rounded-full border-4 transition-all duration-500"
                  style={{
                    borderColor: isHovered || isActive ? layer.color : `${layer.color}40`,
                    borderStyle: index % 2 === 0 ? 'solid' : 'dashed',
                    boxShadow: isHovered || isActive ? `0 0 30px ${layer.color}` : 'none',
                    animation: `spin ${15 / rotationSpeed}s linear infinite ${index % 2 === 0 ? '' : 'reverse'}`
                  }}
                />
                
                {/* Layer markers */}
                {[0, 90, 180, 270].slice(0, index + 1).map((angle, markerIndex) => (
                  <div
                    key={markerIndex}
                    className="absolute w-3 h-3 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: layer.color,
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${layer.radius}px) rotate(-${angle}deg)`,
                      boxShadow: isHovered || isActive ? `0 0 10px ${layer.color}` : 'none',
                      opacity: isHovered || isActive ? 1 : 0.6
                    }}
                  />
                ))}
                
                {/* Layer label */}
                {(isHovered || isActive) && (
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
                    style={{
                      width: `${layer.radius * 1.6}px`
                    }}
                  >
                    <div className="text-2xl mb-1">{layer.icon}</div>
                    <div className="text-white text-xs font-bold">
                      {layer.id.toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Center FSR Hub Logo */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
            style={{
              transform: `translate(-50%, -50%) scale(${isExpanded ? 0.6 : 1})`,
              zIndex: 200
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-white"
              style={{
                backgroundColor: COLORS.l0,
                boxShadow: '0 0 40px rgba(156, 39, 176, 0.8)'
              }}
            >
              <div className="text-center">
                <div className="text-2xl">⚛️</div>
                <div className="text-white text-xs font-bold mt-1">FSR</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer Details Panel */}
      {activeLayer && (
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-black bg-opacity-95 rounded-lg p-6 max-w-md backdrop-blur-sm border-2 shadow-2xl z-50"
          style={{
            borderColor: layers.find(l => l.id === activeLayer)?.color
          }}
        >
          {(() => {
            const layer = layers.find(l => l.id === activeLayer);
            return (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-4xl">{layer.icon}</div>
                    <div>
                      <div className="text-white font-bold text-lg">{layer.name}</div>
                      <div className="text-gray-400 text-sm">{layer.description}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLayerClick(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="bg-gray-800 bg-opacity-50 rounded p-4 mb-4">
                  <div className="text-xs text-gray-400 mb-2">Implementation Details:</div>
                  <div className="text-white text-sm leading-relaxed">
                    {layer.details}
                  </div>
                </div>
                
                <div className="text-xs text-gray-400">
                  <div className="mb-2">Layer Properties:</div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Radius:</span>
                      <span className="text-cyan-300">{layer.radius}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Markers:</span>
                      <span className="text-cyan-300">{layers.indexOf(layer) + 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Position:</span>
                      <span className="text-cyan-300">Layer {layers.indexOf(layer)}</span>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Layer Legend */}
      <div className="p-6 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            🔬 Epistemic Layers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`p-3 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                  hoveredLayer === layer.id || activeLayer === layer.id
                    ? 'scale-105'
                    : 'scale-100'
                }`}
                style={{
                  backgroundColor: hoveredLayer === layer.id || activeLayer === layer.id 
                    ? `${layer.color}20` 
                    : 'rgba(0,0,0,0.3)',
                  borderColor: layer.color
                }}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => !activeLayer && setHoveredLayer(null)}
                onClick={() => handleLayerClick(layer.id)}
              >
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">{layer.icon}</div>
                  <div>
                    <div className="text-white font-bold text-xs">{layer.id.toUpperCase()}</div>
                    <div className="text-gray-300 text-xs">{layer.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Speed Control */}
      <div className="absolute top-20 left-4 bg-black bg-opacity-70 rounded-lg p-3 backdrop-blur-sm border border-gray-600">
        <div className="text-xs text-gray-400 mb-2">Rotation Speed:</div>
        <div className="flex space-x-2">
          {[0.5, 1, 2].map((speed) => (
            <button
              key={speed}
              onClick={() => setRotationSpeed(speed)}
              className={`px-3 py-1 rounded text-xs transition-all ${
                rotationSpeed === speed
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="absolute bottom-20 left-4 bg-black bg-opacity-80 rounded-lg p-4 max-w-xs backdrop-blur-sm border border-gray-600">
        <h4 className="text-white font-bold mb-2">💡 Fractal Principle</h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          Same organizational logic from single shipment to entire corridor. 
          Each layer contains and reflects the whole system.
        </p>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 text-right">
        <div>FSR Hub Platform</div>
        <div>Fractal Metascience Architecture</div>
        <div className="text-cyan-400">Click layers for details</div>
      </div>

      {/* CSS for rotation */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FractalLogoAnimated;