import React, { useState, useEffect } from 'react';

const TradeCorridorLive = () => {
  const [activeFlows, setActiveFlows] = useState([]);
  const [hoveredHub, setHoveredHub] = useState(null);
  const [activePhase, setActivePhase] = useState('idle');
  
  // Цвета из Terra Design System
  const COLORS = {
    usa: '#2196F3',
    germany: '#FFC107',
    centralAsia: '#4CAF50',
    platform: '#9C27B0',
    fractal: '#03DAC6',
    flow: '#00BCD4'
  };

  // Ключевые хабы
  const hubs = [
    {
      id: 'usa',
      name: 'USA Hub',
      city: 'New York',
      x: 150,
      y: 250,
      color: COLORS.usa,
      icon: '🗽',
      data: {
        shipments: 320,
        value: '$65B',
        partners: 150
      }
    },
    {
      id: 'germany',
      name: 'Germany Hub',
      city: 'Hamburg',
      x: 400,
      y: 200,
      color: COLORS.germany,
      icon: '🏭',
      data: {
        shipments: 285,
        value: '$58B',
        partners: 180
      }
    },
    {
      id: 'centralAsia',
      name: 'Central Asia Hub',
      city: 'Tashkent',
      x: 650,
      y: 250,
      color: COLORS.centralAsia,
      icon: '🕌',
      data: {
        shipments: 245,
        value: '$57B',
        partners: 120
      }
    }
  ];

  // Маршруты
  const routes = [
    { from: 'usa', to: 'germany', strength: 0.9 },
    { from: 'germany', to: 'centralAsia', strength: 0.85 },
    { from: 'usa', to: 'centralAsia', strength: 0.7 }
  ];

  // Генерация потоков
  useEffect(() => {
    const interval = setInterval(() => {
      const route = routes[Math.floor(Math.random() * routes.length)];
      const fromHub = hubs.find(h => h.id === route.from);
      const toHub = hubs.find(h => h.id === route.to);
      
      if (fromHub && toHub) {
        const newFlow = {
          id: Date.now() + Math.random(),
          fromX: fromHub.x,
          fromY: fromHub.y,
          toX: toHub.x,
          toY: toHub.y,
          progress: 0,
          strength: route.strength
        };
        
        setActiveFlows(prev => [...prev, newFlow].slice(-20)); // Держим последние 20
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Анимация потоков
  useEffect(() => {
    let animationId;
    const animate = () => {
      setActiveFlows(prev => 
        prev
          .map(flow => ({
            ...flow,
            progress: Math.min(flow.progress + 0.015, 1)
          }))
          .filter(flow => flow.progress < 1)
      );
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Смена фаз
  useEffect(() => {
    const phases = ['idle', 'highlight', 'pulse', 'connect'];
    let index = 0;
    const phaseInterval = setInterval(() => {
      index = (index + 1) % phases.length;
      setActivePhase(phases[index]);
    }, 4000);
    return () => clearInterval(phaseInterval);
  }, []);

  // Вычисление позиции потока
  const getFlowPosition = (flow) => {
    const dx = flow.toX - flow.fromX;
    const dy = flow.toY - flow.fromY;
    
    // Кривая Безье для более органичного движения
    const t = flow.progress;
    const curveHeight = 50;
    
    const midX = flow.fromX + dx * 0.5;
    const midY = flow.fromY + dy * 0.5 - curveHeight;
    
    const x = Math.pow(1 - t, 2) * flow.fromX + 
              2 * (1 - t) * t * midX + 
              Math.pow(t, 2) * flow.toX;
    
    const y = Math.pow(1 - t, 2) * flow.fromY + 
              2 * (1 - t) * t * midY + 
              Math.pow(t, 2) * flow.toY;
    
    return { x, y };
  };

  // Получить путь для SVG линии
  const getRoutePath = (from, to) => {
    const fromHub = hubs.find(h => h.id === from);
    const toHub = hubs.find(h => h.id === to);
    
    if (!fromHub || !toHub) return '';
    
    const midX = (fromHub.x + toHub.x) / 2;
    const midY = (fromHub.y + toHub.y) / 2 - 50;
    
    return `M ${fromHub.x} ${fromHub.y} Q ${midX} ${midY} ${toHub.x} ${toHub.y}`;
  };

  return (
    <div className="relative w-full h-full min-h-[600px] bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-black bg-opacity-30 backdrop-blur-sm z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              🌍 Trade Corridor Live
            </h1>
            <p className="text-gray-300 text-sm">
              USA → Germany → Central Asia • $180B Market Opportunity
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-cyan-300">
              {activeFlows.length} Active
            </div>
            <div className="text-sm text-gray-400">Shipments in Transit</div>
          </div>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="flex-1 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* SVG для линий и потоков */}
        <svg className="absolute inset-0 w-full h-full" style={{ minHeight: '500px' }}>
          {/* Маршруты (статичные линии) */}
          {routes.map((route, idx) => (
            <path
              key={idx}
              d={getRoutePath(route.from, route.to)}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={route.strength * 3}
              fill="none"
              className={activePhase === 'connect' ? 'animate-pulse' : ''}
            />
          ))}
          
          {/* Направляющие стрелки */}
          {routes.map((route, idx) => {
            const fromHub = hubs.find(h => h.id === route.from);
            const toHub = hubs.find(h => h.id === route.to);
            if (!fromHub || !toHub) return null;
            
            const angle = Math.atan2(toHub.y - fromHub.y, toHub.x - fromHub.x);
            const arrowX = toHub.x - Math.cos(angle) * 80;
            const arrowY = toHub.y - Math.sin(angle) * 80;
            
            return (
              <polygon
                key={`arrow-${idx}`}
                points="0,-4 10,0 0,4"
                fill={COLORS.fractal}
                opacity="0.4"
                transform={`translate(${arrowX}, ${arrowY}) rotate(${angle * 180 / Math.PI})`}
              />
            );
          })}
        </svg>

        {/* Хабы */}
        {hubs.map((hub, index) => (
          <div
            key={hub.id}
            className="absolute transition-all duration-500 cursor-pointer"
            style={{
              left: `${hub.x - 60}px`,
              top: `${hub.y - 60}px`,
              transform: hoveredHub === hub.id ? 'scale(1.15)' : 
                         activePhase === 'pulse' ? 'scale(1.05)' : 'scale(1)',
              zIndex: hoveredHub === hub.id ? 20 : 10
            }}
            onMouseEnter={() => setHoveredHub(hub.id)}
            onMouseLeave={() => setHoveredHub(null)}
          >
            {/* Пульсирующий круг */}
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                backgroundColor: hub.color,
                opacity: 0.2,
                animationDuration: '3s',
                animationDelay: `${index * 0.5}s`
              }}
            />
            
            {/* Основной круг */}
            <div
              className="relative w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-300"
              style={{
                backgroundColor: hub.color,
                borderColor: hoveredHub === hub.id ? 'white' : hub.color,
                boxShadow: `0 0 ${hoveredHub === hub.id ? '40' : '20'}px ${hub.color}`
              }}
            >
              <div className="text-4xl mb-1">{hub.icon}</div>
              <div className="text-white font-bold text-sm text-center">
                {hub.city}
              </div>
            </div>
            
            {/* Tooltip при hover */}
            {hoveredHub === hub.id && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black bg-opacity-90 text-white p-4 rounded-lg shadow-xl backdrop-blur-sm border border-gray-600 whitespace-nowrap z-30">
                <div className="font-bold mb-2 text-lg">{hub.name}</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between space-x-4">
                    <span className="text-gray-400">Shipments/year:</span>
                    <span className="text-cyan-300 font-bold">{hub.data.shipments}</span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="text-gray-400">Market Value:</span>
                    <span className="text-green-300 font-bold">{hub.data.value}</span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="text-gray-400">Partners:</span>
                    <span className="text-purple-300 font-bold">{hub.data.partners}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Анимированные потоки */}
        {activeFlows.map(flow => {
          const pos = getFlowPosition(flow);
          return (
            <div
              key={flow.id}
              className="absolute w-3 h-3 rounded-full pointer-events-none"
              style={{
                left: `${pos.x - 6}px`,
                top: `${pos.y - 6}px`,
                backgroundColor: COLORS.flow,
                boxShadow: `0 0 12px ${COLORS.flow}`,
                opacity: Math.sin(flow.progress * Math.PI) * flow.strength,
                transform: `scale(${0.8 + flow.strength * 0.4})`
              }}
            />
          );
        })}

        {/* FSR Hub Logo (центр) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-white transition-all duration-1000"
            style={{
              backgroundColor: COLORS.platform,
              boxShadow: `0 0 ${activePhase === 'highlight' ? '60' : '30'}px ${COLORS.platform}`,
              transform: activePhase === 'highlight' ? 'scale(1.2)' : 'scale(1)'
            }}
          >
            <div className="text-center">
              <div className="text-3xl">⚛️</div>
              <div className="text-white text-xs font-bold mt-1">FSR Hub</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-4 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: COLORS.usa }}>
              $65B
            </div>
            <div className="text-gray-400 text-sm">USA Market</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: COLORS.germany }}>
              $58B
            </div>
            <div className="text-gray-400 text-sm">Germany Market</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: COLORS.centralAsia }}>
              $57B
            </div>
            <div className="text-gray-400 text-sm">Central Asia Market</div>
          </div>
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="absolute top-20 right-4 text-xs text-gray-400">
        <div className="space-y-1">
          <div className={activePhase === 'idle' ? 'text-cyan-400' : ''}>
            ⭕ Idle State
          </div>
          <div className={activePhase === 'highlight' ? 'text-yellow-400' : ''}>
            ⭐ Hub Highlight
          </div>
          <div className={activePhase === 'pulse' ? 'text-pink-400' : ''}>
            💓 Pulse Active
          </div>
          <div className={activePhase === 'connect' ? 'text-green-400' : ''}>
            🔗 Connections
          </div>
        </div>
      </div>

      {/* Bottom Right Info */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 text-right">
        <div>FSR Hub Platform</div>
        <div>Powered by Fractal Architecture</div>
        <div className="text-cyan-400">Real-time Visualization</div>
      </div>
    </div>
  );
};

export default TradeCorridorLive;