import React, { useState, useEffect } from 'react';

const StakeholderCouncil = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [dataFlows, setDataFlows] = useState([]);
  const [animationPhase, setAnimationPhase] = useState('idle');
  
  const COLORS = {
    core: '#9C27B0',
    shippers: '#4CAF50',
    carriers: '#2196F3',
    customs: '#FFC107',
    strategic: '#FF6F00',
    support: '#00BCD4',
    flow: '#03DAC6'
  };

  // Узлы экосистемы
  const nodes = [
    // Центр - FSR Hub
    {
      id: 'fsrhub',
      name: 'FSR Hub',
      type: 'core',
      icon: '⚛️',
      color: COLORS.core,
      position: 0, // В центре
      distance: 0,
      data: {
        role: 'Digital Platform',
        revenue: '€36.6M (Y3)',
        shipments: '8,500/year',
        take_rate: '4%'
      }
    },
    
    // Первый круг - Ключевые игроки
    {
      id: 'shippers',
      name: 'Shippers',
      type: 'primary',
      icon: '📦',
      color: COLORS.shippers,
      position: 0,
      distance: 180,
      data: {
        count: '150+ companies',
        volume: '€850M GMV (Y3)',
        sectors: 'Manufacturing, Tech, Agriculture',
        retention: '80%'
      }
    },
    {
      id: 'carriers',
      name: 'Carriers',
      type: 'primary',
      icon: '🚛',
      color: COLORS.carriers,
      position: 120,
      distance: 180,
      data: {
        count: '40+ partners',
        capacity: '10,000+ containers/year',
        modes: 'Ocean, Rail, Road, Air',
        utilization: '85%'
      }
    },
    {
      id: 'customs',
      name: 'Customs',
      type: 'primary',
      icon: '🛃',
      color: COLORS.customs,
      position: 240,
      distance: 180,
      data: {
        jurisdictions: 'USA, EU, CA',
        clearance: '2-3 days avg',
        automation: '95%',
        compliance: '99.8%'
      }
    },
    
    // Второй круг - Партнёры
    {
      id: 'lion',
      name: 'Lion Projects',
      type: 'strategic',
      icon: '🦁',
      color: COLORS.strategic,
      position: 30,
      distance: 280,
      data: {
        role: 'Strategic Partner',
        equity: '20%',
        contribution: 'EU Operations, Network',
        synergies: 'Shared infrastructure'
      }
    },
    {
      id: 'chambers',
      name: 'Chambers',
      type: 'support',
      icon: '🏛️',
      color: COLORS.support,
      position: 90,
      distance: 280,
      data: {
        partners: 'DIHK, AmCham, AHK',
        referrals: '30% customers',
        events: '12/year',
        reach: '5,000+ members'
      }
    },
    {
      id: 'banks',
      name: 'Financial',
      type: 'support',
      icon: '🏦',
      color: COLORS.support,
      position: 150,
      distance: 280,
      data: {
        services: 'Trade Finance, FX',
        volume: '€200M+ financed',
        partners: 'Deutsche Bank, Citi',
        margin: '1-2%'
      }
    },
    {
      id: 'insurance',
      name: 'Insurance',
      type: 'support',
      icon: '🛡️',
      color: COLORS.support,
      position: 210,
      distance: 280,
      data: {
        coverage: '$10M E&O',
        claims: '<1% rate',
        partners: 'Lloyd\'s, Allianz',
        opt_in: '40%'
      }
    },
    {
      id: 'tech',
      name: 'Tech Stack',
      type: 'support',
      icon: '💻',
      color: COLORS.support,
      position: 270,
      distance: 280,
      data: {
        platform: 'AWS, Stripe, Blockchain',
        integrations: '50+ APIs',
        uptime: '99.9%',
        security: 'SOC 2 Type II'
      }
    },
    {
      id: 'government',
      name: 'Government',
      type: 'support',
      icon: '🏛️',
      color: COLORS.support,
      position: 330,
      distance: 280,
      data: {
        relations: 'USA, EU, CA ministries',
        licenses: 'AEO, NVOCC',
        compliance: 'OFAC, sanctions',
        support: 'Trade missions'
      }
    }
  ];

  // Связи
  const connections = [
    // FSR Hub <-> Primary
    { from: 'fsrhub', to: 'shippers', type: 'bidirectional', strength: 0.9 },
    { from: 'fsrhub', to: 'carriers', type: 'bidirectional', strength: 0.9 },
    { from: 'fsrhub', to: 'customs', type: 'bidirectional', strength: 0.8 },
    
    // FSR Hub <-> Strategic
    { from: 'fsrhub', to: 'lion', type: 'strategic', strength: 1.0 },
    
    // FSR Hub <-> Support
    { from: 'fsrhub', to: 'chambers', type: 'support', strength: 0.6 },
    { from: 'fsrhub', to: 'banks', type: 'support', strength: 0.7 },
    { from: 'fsrhub', to: 'insurance', type: 'support', strength: 0.5 },
    { from: 'fsrhub', to: 'tech', type: 'support', strength: 0.8 },
    { from: 'fsrhub', to: 'government', type: 'support', strength: 0.6 },
    
    // Cross connections
    { from: 'shippers', to: 'carriers', type: 'transaction', strength: 0.8 },
    { from: 'carriers', to: 'customs', type: 'compliance', strength: 0.7 },
    { from: 'lion', to: 'carriers', type: 'network', strength: 0.8 }
  ];

  // Генерация потоков данных
  useEffect(() => {
    const interval = setInterval(() => {
      const connection = connections[Math.floor(Math.random() * connections.length)];
      const fromNode = nodes.find(n => n.id === connection.from);
      const toNode = nodes.find(n => n.id === connection.to);
      
      if (fromNode && toNode) {
        const newFlow = {
          id: Date.now() + Math.random(),
          from: fromNode.id,
          to: toNode.id,
          progress: 0,
          type: connection.type
        };
        
        setDataFlows(prev => [...prev, newFlow].slice(-15));
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  // Анимация потоков
  useEffect(() => {
    let animationId;
    const animate = () => {
      setDataFlows(prev =>
        prev
          .map(flow => ({ ...flow, progress: Math.min(flow.progress + 0.02, 1) }))
          .filter(flow => flow.progress < 1)
      );
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Смена фаз анимации
  useEffect(() => {
    const phases = ['idle', 'highlight', 'pulse', 'connect'];
    let index = 0;
    const phaseInterval = setInterval(() => {
      index = (index + 1) % phases.length;
      setAnimationPhase(phases[index]);
    }, 5000);
    return () => clearInterval(phaseInterval);
  }, []);

  // Позиция узла
  const getNodePosition = (node) => {
    if (node.distance === 0) {
      return { x: 400, y: 300 }; // Центр
    }
    const angle = node.position * Math.PI / 180;
    return {
      x: 400 + Math.cos(angle) * node.distance,
      y: 300 + Math.sin(angle) * node.distance
    };
  };

  // Позиция потока
  const getFlowPosition = (flow) => {
    const fromNode = nodes.find(n => n.id === flow.from);
    const toNode = nodes.find(n => n.id === flow.to);
    
    if (!fromNode || !toNode) return { x: 0, y: 0 };
    
    const fromPos = getNodePosition(fromNode);
    const toPos = getNodePosition(toNode);
    
    const x = fromPos.x + (toPos.x - fromPos.x) * flow.progress;
    const y = fromPos.y + (toPos.y - fromPos.y) * flow.progress;
    
    return { x, y };
  };

  // Путь для SVG линии
  const getConnectionPath = (connection) => {
    const fromNode = nodes.find(n => n.id === connection.from);
    const toNode = nodes.find(n => n.id === connection.to);
    
    if (!fromNode || !toNode) return '';
    
    const fromPos = getNodePosition(fromNode);
    const toPos = getNodePosition(toNode);
    
    return `M ${fromPos.x} ${fromPos.y} L ${toPos.x} ${toPos.y}`;
  };

  return (
    <div className="relative w-full h-full min-h-[700px] bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-black bg-opacity-30 backdrop-blur-sm z-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            👥 Stakeholder Council
          </h1>
          <p className="text-gray-300 text-sm">
            FSR Hub Ecosystem - {nodes.length} Active Participants
          </p>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="flex-1 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* SVG для линий */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((connection, idx) => (
            <g key={idx}>
              <path
                d={getConnectionPath(connection)}
                stroke={
                  connection.type === 'strategic' ? COLORS.strategic :
                  connection.type === 'bidirectional' ? COLORS.flow :
                  'rgba(255, 255, 255, 0.1)'
                }
                strokeWidth={connection.strength * 2}
                fill="none"
                strokeDasharray={connection.type === 'bidirectional' ? '5,5' : 'none'}
                opacity={animationPhase === 'connect' ? 0.6 : 0.3}
                className={animationPhase === 'connect' ? 'animate-pulse' : ''}
              />
              
              {/* Стрелка */}
              {(() => {
                const fromNode = nodes.find(n => n.id === connection.from);
                const toNode = nodes.find(n => n.id === connection.to);
                if (!fromNode || !toNode) return null;
                
                const fromPos = getNodePosition(fromNode);
                const toPos = getNodePosition(toNode);
                const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
                
                const distance = connection.type === 'strategic' ? 60 : 40;
                const arrowX = toPos.x - Math.cos(angle) * distance;
                const arrowY = toPos.y - Math.sin(angle) * distance;
                
                return (
                  <polygon
                    points="0,-3 8,0 0,3"
                    fill={connection.type === 'strategic' ? COLORS.strategic : COLORS.flow}
                    opacity="0.5"
                    transform={`translate(${arrowX}, ${arrowY}) rotate(${angle * 180 / Math.PI})`}
                  />
                );
              })()}
            </g>
          ))}
        </svg>

        {/* Узлы */}
        {nodes.map((node, index) => {
          const pos = getNodePosition(node);
          const size = node.type === 'core' ? 100 : node.type === 'primary' ? 80 : 64;
          const isSelected = selectedNode?.id === node.id;
          
          return (
            <div
              key={node.id}
              className="absolute transition-all duration-500 cursor-pointer"
              style={{
                left: `${pos.x - size/2}px`,
                top: `${pos.y - size/2}px`,
                width: `${size}px`,
                height: `${size}px`,
                transform: isSelected ? 'scale(1.2)' : 
                           animationPhase === 'pulse' ? 'scale(1.05)' : 'scale(1)',
                zIndex: isSelected ? 30 : node.type === 'core' ? 20 : 10
              }}
              onMouseEnter={() => setSelectedNode(node)}
              onMouseLeave={() => setSelectedNode(null)}
            >
              {/* Пульсирующий круг */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: node.color,
                  opacity: 0.2,
                  animationDuration: node.type === 'core' ? '2s' : '3s',
                  animationDelay: `${index * 0.3}s`
                }}
              />
              
              {/* Основной круг */}
              <div
                className="relative w-full h-full rounded-full flex flex-col items-center justify-center border-4 transition-all duration-300"
                style={{
                  backgroundColor: node.color,
                  borderColor: isSelected ? 'white' : node.color,
                  boxShadow: `0 0 ${isSelected ? '40' : '20'}px ${node.color}`
                }}
              >
                <div className={`${node.type === 'core' ? 'text-4xl' : 'text-2xl'} mb-1`}>
                  {node.icon}
                </div>
                <div className="text-white font-bold text-xs text-center px-2">
                  {node.name}
                </div>
              </div>
              
              {/* Tooltip */}
              {isSelected && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black bg-opacity-95 text-white p-4 rounded-lg shadow-2xl backdrop-blur-sm border border-gray-600 whitespace-nowrap z-40 min-w-[250px]">
                  <div className="font-bold mb-2 text-lg">{node.name}</div>
                  <div className="space-y-1 text-sm">
                    {Object.entries(node.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between space-x-6">
                        <span className="text-gray-400 capitalize">{key.replace('_', ' ')}:</span>
                        <span className="text-cyan-300 font-bold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Анимированные потоки */}
        {dataFlows.map(flow => {
          const pos = getFlowPosition(flow);
          return (
            <div
              key={flow.id}
              className="absolute w-3 h-3 rounded-full pointer-events-none"
              style={{
                left: `${pos.x - 6}px`,
                top: `${pos.y - 6}px`,
                backgroundColor: COLORS.flow,
                boxShadow: `0 0 10px ${COLORS.flow}`,
                opacity: Math.sin(flow.progress * Math.PI),
                transform: `scale(${0.8 + flow.progress * 0.4})`
              }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="p-4 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.core }} />
            <span className="text-gray-300">Core Platform</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.shippers }} />
            <span className="text-gray-300">Shippers</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.carriers }} />
            <span className="text-gray-300">Carriers</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.strategic }} />
            <span className="text-gray-300">Strategic</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.support }} />
            <span className="text-gray-300">Support</span>
          </div>
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="absolute top-20 right-4 text-xs text-gray-400 space-y-1">
        <div className={animationPhase === 'idle' ? 'text-cyan-400 font-bold' : ''}>
          ⭕ Idle
        </div>
        <div className={animationPhase === 'highlight' ? 'text-yellow-400 font-bold' : ''}>
          ⭐ Highlight
        </div>
        <div className={animationPhase === 'pulse' ? 'text-pink-400 font-bold' : ''}>
          💓 Pulse
        </div>
        <div className={animationPhase === 'connect' ? 'text-green-400 font-bold' : ''}>
          🔗 Connect
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 text-right">
        <div>FSR Hub Platform</div>
        <div>Stakeholder Ecosystem</div>
        <div className="text-cyan-400">Hover nodes for details</div>
      </div>
    </div>
  );
};

export default StakeholderCouncil;