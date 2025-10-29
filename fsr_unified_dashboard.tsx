import React, { useState, useEffect } from 'react';

const UnifiedDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('overview');
  const [liveMetrics, setLiveMetrics] = useState({
    activeShipments: 0,
    revenue: 0,
    growth: 0
  });

  const COLORS = {
    primary: '#9C27B0',
    usa: '#2196F3',
    germany: '#FFC107',
    centralAsia: '#4CAF50',
    accent: '#00BCD4'
  };

  // Components menu
  const components = [
    { id: 'overview', name: 'Overview', icon: '📊', color: COLORS.primary },
    { id: 'corridor', name: 'Trade Corridor', icon: '🌍', color: COLORS.usa },
    { id: 'firstdrop', name: 'First Drop', icon: '💧', color: COLORS.accent },
    { id: 'stakeholders', name: 'Stakeholders', icon: '👥', color: COLORS.centralAsia },
    { id: 'financials', name: 'Financials', icon: '📈', color: COLORS.germany },
    { id: 'logo', name: 'Fractal Logo', icon: '⚛️', color: COLORS.primary },
    { id: 'pitch', name: 'Pitch Deck', icon: '🎯', color: COLORS.accent }
  ];

  // Simulate live metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics({
        activeShipments: Math.floor(15 + Math.random() * 10),
        revenue: 3.8 + Math.random() * 0.5,
        growth: 250 + Math.random() * 50
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[800px] bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-black bg-opacity-50 backdrop-blur-sm border-r border-gray-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-white"
              style={{ backgroundColor: COLORS.primary }}
            >
              <span className="text-2xl">⚛️</span>
            </div>
            <div>
              <div className="text-white font-bold text-lg">FSR Hub</div>
              <div className="text-gray-400 text-xs">Platform Dashboard</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {components.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setActiveComponent(comp.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeComponent === comp.id
                    ? 'bg-white bg-opacity-20 border-l-4'
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
                style={{
                  borderColor: activeComponent === comp.id ? comp.color : 'transparent'
                }}
              >
                <span className="text-2xl">{comp.icon}</span>
                <span className="text-white font-medium">{comp.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-500">
            <div className="mb-1">Version 1.0.0</div>
            <div>© 2025 FSR Hub</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-black bg-opacity-30 backdrop-blur-sm border-b border-gray-700 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {components.find(c => c.id === activeComponent)?.name || 'Dashboard'}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                FSR Hub Platform Visualization Suite
              </p>
            </div>
            
            {/* Live Metrics */}
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">
                  {liveMetrics.activeShipments}
                </div>
                <div className="text-xs text-gray-400">Active Now</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-300">
                  €{liveMetrics.revenue.toFixed(1)}M
                </div>
                <div className="text-xs text-gray-400">Revenue (Y1)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">
                  {liveMetrics.growth.toFixed(0)}%
                </div>
                <div className="text-xs text-gray-400">Growth</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview */}
          {activeComponent === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Key Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Market Size</h3>
                    <span className="text-3xl">🌍</span>
                  </div>
                  <div className="text-4xl font-bold text-cyan-300 mb-2">$180B</div>
                  <div className="text-sm text-gray-400">Total Addressable Market</div>
                  <div className="mt-4 text-xs text-gray-500">
                    <div>• $110B USA-CA Investments</div>
                    <div>• $55B EU Infrastructure</div>
                    <div>• $15B Current Trade</div>
                  </div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Seed Round</h3>
                    <span className="text-3xl">💰</span>
                  </div>
                  <div className="text-4xl font-bold text-green-300 mb-2">€2.5M</div>
                  <div className="text-sm text-gray-400">€8M Pre-money Valuation</div>
                  <div className="mt-4 text-xs text-gray-500">
                    <div>• 24% Equity Offered</div>
                    <div>• Lion Projects: €500K-1M</div>
                    <div>• 18-month Runway</div>
                  </div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Launch Target</h3>
                    <span className="text-3xl">🚀</span>
                  </div>
                  <div className="text-4xl font-bold text-purple-300 mb-2">Jan 2026</div>
                  <div className="text-sm text-gray-400">8 Weeks from Today</div>
                  <div className="mt-4 text-xs text-gray-500">
                    <div>• MVP Ready Q1 2026</div>
                    <div>• Pilot: 50 Shipments</div>
                    <div>• Break-even: Month 14</div>
                  </div>
                </div>
              </div>

              {/* Quick Access to Components */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Explore Platform Components</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {components.filter(c => c.id !== 'overview').map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => setActiveComponent(comp.id)}
                      className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-gray-600 hover:border-white hover:bg-opacity-20 transition-all duration-300 group"
                    >
                      <div className="text-5xl mb-3">{comp.icon}</div>
                      <div className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {comp.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Preview */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
                <h2 className="text-2xl font-bold text-white mb-6">Launch Timeline</h2>
                <div className="space-y-4">
                  {[
                    { date: 'Sept 23, 2025', event: 'UN Summit - $105B Announcement', icon: '💧', status: 'completed' },
                    { date: 'Oct 2025', event: 'Seed Round Closing', icon: '💰', status: 'in-progress' },
                    { date: 'Nov 2025', event: 'Team Hiring (CTO, COO)', icon: '👥', status: 'upcoming' },
                    { date: 'Dec 2025', event: 'MVP Development Complete', icon: '💻', status: 'upcoming' },
                    { date: 'Jan 1, 2026', event: 'FSR Hub Platform Launch', icon: '🚀', status: 'upcoming' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'in-progress' ? 'bg-yellow-500' :
                        'bg-gray-600'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-bold">{item.event}</div>
                        <div className="text-gray-400 text-sm">{item.date}</div>
                      </div>
                      <div className={`px-3 py-1 rounded text-xs font-bold ${
                        item.status === 'completed' ? 'bg-green-500 text-white' :
                        item.status === 'in-progress' ? 'bg-yellow-500 text-black' :
                        'bg-gray-600 text-gray-300'
                      }`}>
                        {item.status === 'completed' ? '✓ Done' :
                         item.status === 'in-progress' ? '⏳ Active' :
                         '📅 Planned'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other components */}
          {activeComponent === 'corridor' && (
            <div className="h-full flex items-center justify-center animate-fade-in">
              <div className="text-center max-w-2xl">
                <div className="text-8xl mb-6">🌍</div>
                <h2 className="text-4xl font-bold text-white mb-4">Trade Corridor Live</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  This would embed the Trade Corridor Live component showing the animated
                  USA → Germany → Central Asia route with real-time data flows.
                </p>
                <div className="bg-cyan-500 bg-opacity-20 border border-cyan-500 rounded-lg p-4">
                  <div className="text-cyan-300 font-bold mb-2">Component Features:</div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>✓ 3 Animated Hubs (NYC, Hamburg, Tashkent)</div>
                    <div>✓ Live Data Flows (20 simultaneous)</div>
                    <div>✓ Hover Tooltips with Metrics</div>
                    <div>✓ 4 Animation Phases</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeComponent === 'firstdrop' && (
            <div className="h-full flex items-center justify-center animate-fade-in">
              <div className="text-center max-w-2xl">
                <div className="text-8xl mb-6">💧</div>
                <h2 className="text-4xl font-bold text-white mb-4">First Drop Launch</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  The "First Drop" visualization showing September 2025 as the inflection point
                  with expanding ripples representing $105B → $4.2B → €48B → $180B activation.
                </p>
                <div className="bg-blue-500 bg-opacity-20 border border-blue-500 rounded-lg p-4">
                  <div className="text-blue-300 font-bold mb-2">Component Features:</div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>✓ Falling → Impact → Ripples Animation</div>
                    <div>✓ 4 Major Events Timeline</div>
                    <div>✓ Click to Replay</div>
                    <div>✓ Auto-cycle Mode</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeComponent === 'stakeholders' && (
            <div className="h-full flex items-center justify-center animate-fade-in">
              <div className="text-center max-w-2xl">
                <div className="text-8xl mb-6">👥</div>
                <h2 className="text-4xl font-bold text-white mb-4">Stakeholder Council</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Ecosystem visualization showing FSR Hub at the center with 10 nodes
                  (shippers, carriers, customs, Lion Projects, etc.) connected by animated data flows.
                </p>
                <div className="bg-green-500 bg-opacity-20 border border-green-500 rounded-lg p-4">
                  <div className="text-green-300 font-bold mb-2">Component Features:</div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>✓ 10 Ecosystem Nodes</div>
                    <div>✓ 13 Connection Types</div>
                    <div>✓ Animated Data Flows</div>
                    <div>✓ Hover for Details</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeComponent === 'financials' && (
            <div className="h-full flex items-center justify-center animate-fade-in">
              <div className="text-center max-w-2xl">
                <div className="text-8xl mb-6">📈</div>
                <h2 className="text-4xl font-bold text-white mb-4">Financial Growth</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Year 1-3 projections visualized as expanding circles (ripple effect).
                  Toggle between Base/Upside/Downside scenarios with hover details.
                </p>
                <div className="bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded-lg p-4">
                  <div className="text-yellow-300 font-bold mb-2">Component Features:</div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>✓ 3 Concentric Growth Circles</div>
                    <div>✓ 3 Scenario Toggle</div>
                    <div>✓ Detailed Metrics Cards</div>
                    <div>✓ Break-even Indicator</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeComponent === 'logo' && (
            <div className="h-full flex items-center justify-center animate-fade-in">
              <div className="text-center max-w-2xl">
                <div className="text-8xl mb-6">⚛️</div>
                <h2 className="text-4xl font-bold text-white mb-4">Fractal Logo</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  7-layer architecture (L0-L7) visualized as rotating concentric rings.
                  Each layer represents an epistemic level of the FSR Hub system.
                </p>
                <div className="bg-purple-500 bg-opacity-20 border border-purple-500 rounded-lg p-4">
                  <div className="text-purple-300 font-bold mb-2">Component Features:</div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>✓ 7 Rotating Rings (L0-L7)</div>
                    <div>✓ Speed Control (0.5x, 1x, 2x)</div>
                    <div>✓ Click for Layer Details</div>
                    <div>✓ Expand Mode</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeComponent === 'pitch' && (
            <div className="h-full flex items-center justify-center animate-fade-in">
              <div className="text-center max-w-2xl">
                <div className="text-8xl mb-6">🎯</div>
                <h2 className="text-4xl font-bold text-white mb-4">Interactive Pitch Deck</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  9-slide presentation with keyboard navigation (arrows, space, numbers).
                  Auto-play mode and progress indicators included.
                </p>
                <div className="bg-orange-500 bg-opacity-20 border border-orange-500 rounded-lg p-4">
                  <div className="text-orange-300 font-bold mb-2">Component Features:</div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>✓ 9 Slides (Cover → Ask)</div>
                    <div>✓ Keyboard Navigation</div>
                    <div>✓ Auto-play (8s/slide)</div>
                    <div>✓ Progress Dots</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-black bg-opacity-30 backdrop-blur-sm border-t border-gray-700 p-4">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <div>
              FSR Hub Platform • Powered by Fractal Architecture
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">API</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
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

export default UnifiedDashboard;