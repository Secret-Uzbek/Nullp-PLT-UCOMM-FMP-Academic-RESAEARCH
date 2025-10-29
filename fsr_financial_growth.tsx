import React, { useState, useEffect } from 'react';

const FinancialGrowthViz = () => {
  const [activeYear, setActiveYear] = useState(null);
  const [scenario, setScenario] = useState('base');
  const [animationPhase, setAnimationPhase] = useState(0);
  
  const COLORS = {
    year1: '#00BCD4',
    year2: '#4CAF50',
    year3: '#9C27B0',
    revenue: '#2E7D32',
    shipments: '#2196F3',
    profit: '#FFC107'
  };

  // Финансовые данные
  const scenarios = {
    base: {
      name: 'Base Case',
      color: COLORS.year2,
      years: [
        {
          year: 2026,
          label: 'Year 1',
          revenue: 3.8,
          shipments: 850,
          gmv: 85,
          ebitda: -0.3,
          margin: -7,
          radius: 80,
          color: COLORS.year1
        },
        {
          year: 2027,
          label: 'Year 2',
          revenue: 14.1,
          shipments: 3200,
          gmv: 320,
          ebitda: 4.9,
          margin: 35,
          radius: 160,
          color: COLORS.year2
        },
        {
          year: 2028,
          label: 'Year 3',
          revenue: 36.6,
          shipments: 8500,
          gmv: 850,
          ebitda: 17.6,
          margin: 48,
          radius: 240,
          color: COLORS.year3
        }
      ]
    },
    upside: {
      name: 'Upside (+30%)',
      color: '#4CAF50',
      years: [
        { year: 2026, revenue: 4.9, shipments: 1100, gmv: 110, ebitda: 0.2, margin: 4, radius: 90 },
        { year: 2027, revenue: 18.3, shipments: 4160, gmv: 416, ebitda: 7.3, margin: 40, radius: 190 },
        { year: 2028, revenue: 47.6, shipments: 11050, gmv: 1105, ebitda: 24.7, margin: 52, radius: 280 }
      ]
    },
    downside: {
      name: 'Downside (-30%)',
      color: '#FF6F00',
      years: [
        { year: 2026, revenue: 2.7, shipments: 600, gmv: 60, ebitda: -0.6, margin: -22, radius: 70 },
        { year: 2027, revenue: 9.9, shipments: 2240, gmv: 224, ebitda: 2.5, margin: 25, radius: 130 },
        { year: 2028, revenue: 25.6, shipments: 5950, gmv: 595, ebitda: 10.5, margin: 41, radius: 200 }
      ]
    }
  };

  const currentScenario = scenarios[scenario];

  // Автоматическая смена фаз
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Циклическая подсветка годов
  useEffect(() => {
    if (!activeYear) {
      const yearCycle = setInterval(() => {
        const years = currentScenario.years.map(y => y.year);
        const currentIndex = years.indexOf(activeYear);
        const nextIndex = (currentIndex + 1) % years.length;
        setActiveYear(years[nextIndex]);
      }, 2500);
      return () => clearInterval(yearCycle);
    }
  }, [activeYear, currentScenario]);

  return (
    <div className="relative w-full h-full min-h-[700px] bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-black bg-opacity-30 backdrop-blur-sm z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              📈 Financial Growth Trajectory
            </h1>
            <p className="text-gray-300 text-sm">
              From First Drop to Ocean • 2026-2028
            </p>
          </div>
          
          {/* Scenario Selector */}
          <div className="flex space-x-2">
            {Object.entries(scenarios).map(([key, s]) => (
              <button
                key={key}
                onClick={() => setScenario(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  scenario === key
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Background ripple pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full"
              style={{
                width: `${(i + 1) * 300}px`,
                height: `${(i + 1) * 300}px`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Year Circles (The Drops) */}
        {currentScenario.years.map((yearData, index) => {
          const isActive = activeYear === yearData.year;
          const isHovered = activeYear === yearData.year;
          
          return (
            <div
              key={yearData.year}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
              style={{
                width: `${yearData.radius * 2}px`,
                height: `${yearData.radius * 2}px`,
                zIndex: isActive ? 20 : 10 - index,
                opacity: animationPhase <= index ? 0 : 1,
                transform: `translate(-50%, -50%) scale(${isActive ? 1.1 : 1})`
              }}
              onMouseEnter={() => setActiveYear(yearData.year)}
              onMouseLeave={() => setActiveYear(null)}
            >
              {/* Ripple effect */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: yearData.color,
                  opacity: 0.2,
                  animationDuration: '3s',
                  animationDelay: `${index * 0.5}s`
                }}
              />
              
              {/* Main circle */}
              <div
                className="relative w-full h-full rounded-full flex flex-col items-center justify-center border-4 cursor-pointer transition-all duration-500"
                style={{
                  backgroundColor: `${yearData.color}40`,
                  borderColor: isActive ? 'white' : yearData.color,
                  boxShadow: `0 0 ${isActive ? '60' : '30'}px ${yearData.color}`
                }}
              >
                <div className="text-center">
                  <div className="text-white text-2xl font-bold mb-1">
                    {yearData.label}
                  </div>
                  <div className="text-white text-lg opacity-80">
                    {yearData.year}
                  </div>
                  <div className="text-white text-3xl font-bold mt-2">
                    €{yearData.revenue}M
                  </div>
                  <div className="text-gray-200 text-xs mt-1">
                    Revenue
                  </div>
                </div>
              </div>
              
              {/* Tooltip on hover */}
              {isHovered && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 bg-black bg-opacity-95 text-white p-6 rounded-lg shadow-2xl backdrop-blur-sm border border-gray-600 z-30 min-w-[280px]">
                  <div className="font-bold text-xl mb-3 text-center">
                    {yearData.label} ({yearData.year})
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="text-green-300 font-bold">€{yearData.revenue}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">GMV:</span>
                      <span className="text-cyan-300 font-bold">€{yearData.gmv}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipments:</span>
                      <span className="text-blue-300 font-bold">{yearData.shipments.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">EBITDA:</span>
                      <span className={`font-bold ${yearData.ebitda >= 0 ? 'text-green-300' : 'text-orange-300'}`}>
                        €{yearData.ebitda}M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Margin:</span>
                      <span className={`font-bold ${yearData.margin >= 0 ? 'text-green-300' : 'text-orange-300'}`}>
                        {yearData.margin}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Growth indicator */}
                  {index > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-600">
                      <div className="text-xs text-gray-400 mb-1">YoY Growth:</div>
                      <div className="text-green-400 font-bold">
                        +{Math.round((yearData.revenue / currentScenario.years[index - 1].revenue - 1) * 100)}%
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Center label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-5 pointer-events-none">
          <div className="text-white text-lg font-bold opacity-50">
            Growth as Ripples
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="p-6 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Key Metrics • {currentScenario.name}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentScenario.years.map((yearData, index) => (
              <div
                key={yearData.year}
                className={`bg-gray-800 bg-opacity-50 rounded-lg p-6 border-2 transition-all duration-500 cursor-pointer ${
                  activeYear === yearData.year ? 'border-white scale-105' : 'border-gray-600'
                }`}
                style={{
                  opacity: animationPhase <= index ? 0.3 : 1
                }}
                onMouseEnter={() => setActiveYear(yearData.year)}
                onMouseLeave={() => setActiveYear(null)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-300 font-bold">{yearData.label}</div>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: yearData.color }}
                  />
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Revenue</div>
                    <div className="text-green-300 text-2xl font-bold">
                      €{yearData.revenue}M
                    </div>
                    {index > 0 && (
                      <div className="text-green-400 text-xs">
                        +{Math.round((yearData.revenue / currentScenario.years[index - 1].revenue - 1) * 100)}% YoY
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-600">
                    <div>
                      <div className="text-gray-400 text-xs">GMV</div>
                      <div className="text-cyan-300 font-bold">€{yearData.gmv}M</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Shipments</div>
                      <div className="text-blue-300 font-bold">{(yearData.shipments / 1000).toFixed(1)}K</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">EBITDA</div>
                      <div className={`font-bold ${yearData.ebitda >= 0 ? 'text-green-300' : 'text-orange-300'}`}>
                        €{yearData.ebitda}M
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Margin</div>
                      <div className={`font-bold ${yearData.margin >= 0 ? 'text-green-300' : 'text-orange-300'}`}>
                        {yearData.margin}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Break-even marker */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-green-500 bg-opacity-20 text-green-300 px-4 py-2 rounded-lg border border-green-500 text-sm font-bold backdrop-blur-sm">
        ✅ Break-even: Month 14 (Q2 2027)
      </div>

      {/* Phase indicator */}
      <div className="absolute top-20 right-4 text-xs text-gray-400 space-y-1">
        <div className={animationPhase >= 0 ? 'text-cyan-400 font-bold' : ''}>
          💧 Year 1
        </div>
        <div className={animationPhase >= 1 ? 'text-green-400 font-bold' : ''}>
          🌊 Year 2
        </div>
        <div className={animationPhase >= 2 ? 'text-purple-400 font-bold' : ''}>
          🌊 Year 3
        </div>
        <div className={animationPhase >= 3 ? 'text-blue-400 font-bold' : ''}>
          🌊 Ocean
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 text-right">
        <div>FSR Hub Platform</div>
        <div>Financial Growth Model</div>
        <div className="text-cyan-400">Hover circles for details</div>
      </div>
    </div>
  );
};

export default FinancialGrowthViz;