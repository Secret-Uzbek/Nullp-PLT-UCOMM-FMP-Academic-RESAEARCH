// <stdin>
import React, { useState, useEffect } from "https://esm.sh/react@18.2.0";
var CouncilOfMemory = () => {
  const [activePhase, setActivePhase] = useState("gathering");
  const [selectedFigure, setSelectedFigure] = useState(null);
  const figures = [
    {
      name: "\u0410\u0432\u0438\u0446\u0435\u043D\u043D\u0430",
      period: "980-1037",
      field: "\u041C\u0435\u0434\u0438\u0446\u0438\u043D\u0430, \u0424\u0438\u043B\u043E\u0441\u043E\u0444\u0438\u044F",
      position: 0,
      color: "#4CAF50",
      symbol: "\u{1F3E5}",
      quote: "\u041C\u0435\u0434\u0438\u0446\u0438\u043D\u0430 \u2014 \u0438\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u0435 \u0438 \u043B\u0435\u0447\u0438\u0442\u044C \u0431\u043E\u043B\u0435\u0437\u043D\u044C, \u0441\u043B\u0443\u0447\u0438\u0432\u0448\u0443\u044E\u0441\u044F \u0432 \u0447\u0435\u043B\u043E\u0432\u0435\u0447\u0435\u0441\u043A\u043E\u043C \u0442\u0435\u043B\u0435"
    },
    {
      name: "\u0410\u043B\u044C-\u0425\u043E\u0440\u0435\u0437\u043C\u0438",
      period: "783-850",
      field: "\u041C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430, \u0410\u0441\u0442\u0440\u043E\u043D\u043E\u043C\u0438\u044F",
      position: 45,
      color: "#2196F3",
      symbol: "\u{1F9EE}",
      quote: "\u0422\u043E, \u0447\u0442\u043E \u0434\u0432\u0430 \u0440\u0430\u0437\u0430 \u043F\u043E \u0441\u0442\u043E\u043B\u044C\u043A\u043E \u0436\u0435, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E, \u0440\u0430\u0432\u043D\u043E \u0434\u0432\u0435\u043D\u0430\u0434\u0446\u0430\u0442\u0438"
    },
    {
      name: "\u0413\u0430\u043B\u0438\u043B\u0435\u0439",
      period: "1564-1642",
      field: "\u0410\u0441\u0442\u0440\u043E\u043D\u043E\u043C\u0438\u044F, \u0424\u0438\u0437\u0438\u043A\u0430",
      position: 90,
      color: "#FF9800",
      symbol: "\u{1F52D}",
      quote: "Eppur si muove! \u0418 \u0432\u0441\u0451-\u0442\u0430\u043A\u0438 \u043E\u043D\u0430 \u0432\u0435\u0440\u0442\u0438\u0442\u0441\u044F!"
    },
    {
      name: "\u041B\u0435\u043E\u043D\u0430\u0440\u0434\u043E \u0434\u0430 \u0412\u0438\u043D\u0447\u0438",
      period: "1452-1519",
      field: "\u0418\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u043E, \u0418\u0437\u043E\u0431\u0440\u0435\u0442\u0435\u043D\u0438\u044F",
      position: 135,
      color: "#9C27B0",
      symbol: "\u{1F3A8}",
      quote: "\u041F\u0440\u0435\u043F\u044F\u0442\u0441\u0442\u0432\u0438\u044F \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u044B \u0442\u0435\u0431\u044F \u0441\u0433\u0438\u0431\u0430\u0442\u044C. \u041A\u0430\u0436\u0434\u043E\u0435 \u043F\u0440\u0435\u043F\u044F\u0442\u0441\u0442\u0432\u0438\u0435 \u043C\u043E\u0436\u043D\u043E \u0440\u0430\u0437\u0440\u0443\u0448\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u043E\u0439\u0447\u0438\u0432\u043E\u0441\u0442\u044C\u044E"
    },
    {
      name: "\u041C\u0430\u0440\u0438\u044F \u041A\u044E\u0440\u0438",
      period: "1867-1934",
      field: "\u0424\u0438\u0437\u0438\u043A\u0430, \u0425\u0438\u043C\u0438\u044F",
      position: 180,
      color: "#E91E63",
      symbol: "\u269B\uFE0F",
      quote: "\u0412 \u043D\u0430\u0443\u043A\u0435 \u043D\u0430\u0441 \u0434\u043E\u043B\u0436\u043D\u0430 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043E\u0432\u0430\u0442\u044C \u043D\u0435 \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C \u0443\u0447\u0451\u043D\u043E\u0433\u043E, \u0430 \u0442\u043E, \u0447\u0442\u043E \u043E\u043D \u043E\u0442\u043A\u0440\u044B\u043B"
    },
    {
      name: "\u0421\u0442\u0438\u0432\u0435\u043D \u0425\u043E\u043A\u0438\u043D\u0433",
      period: "1942-2018",
      field: "\u0424\u0438\u0437\u0438\u043A\u0430, \u041A\u043E\u0441\u043C\u043E\u043B\u043E\u0433\u0438\u044F",
      position: 225,
      color: "#00BCD4",
      symbol: "\u{1F30C}",
      quote: "\u041C\u044B \u2014 \u0432\u0441\u0435\u0433\u043E \u043B\u0438\u0448\u044C \u043F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u0430\u044F \u043F\u043E\u0440\u043E\u0434\u0430 \u043E\u0431\u0435\u0437\u044C\u044F\u043D \u043D\u0430 \u043D\u0435\u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u043F\u043B\u0430\u043D\u0435\u0442\u0435 \u043E\u0431\u044B\u043A\u043D\u043E\u0432\u0435\u043D\u043D\u043E\u0439 \u0437\u0432\u0435\u0437\u0434\u044B"
    },
    {
      name: "\u0410\u043B\u0438\u0448\u0435\u0440 \u041D\u0430\u0432\u043E\u0438",
      period: "1441-1501",
      field: "\u041F\u043E\u044D\u0437\u0438\u044F, \u0424\u0438\u043B\u043E\u0441\u043E\u0444\u0438\u044F",
      position: 270,
      color: "#8BC34A",
      symbol: "\u{1F4DC}",
      quote: "\u0422\u043E\u0442, \u043A\u0442\u043E \u0438\u0449\u0435\u0442 \u0437\u043D\u0430\u043D\u0438\u044F, \u043F\u043E\u0434\u043E\u0431\u0435\u043D \u043F\u043E\u0441\u0442\u0443 \u0434\u0435\u0440\u0436\u0430\u0449\u0435\u043C\u0443 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0443 \u0432 \u0440\u0430\u043C\u0430\u0437\u0430\u043D"
    },
    {
      name: "\u042D\u0439\u043D\u0448\u0442\u0435\u0439\u043D",
      period: "1879-1955",
      field: "\u0424\u0438\u0437\u0438\u043A\u0430",
      position: 315,
      color: "#FFC107",
      symbol: "\u26A1",
      quote: "\u0412\u043E\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0432\u0430\u0436\u043D\u0435\u0435 \u0437\u043D\u0430\u043D\u0438\u044F, \u0438\u0431\u043E \u0437\u043D\u0430\u043D\u0438\u0435 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043E"
    }
  ];
  const children = [
    { name: "\u041B\u044E\u0431\u043E\u043F\u044B\u0442\u0441\u0442\u0432\u043E", symbol: "\u{1F476}", angle: 30, distance: 80 },
    { name: "\u0411\u0443\u0434\u0443\u0449\u0435\u0435", symbol: "\u{1F331}", angle: 120, distance: 90 },
    { name: "\u041D\u0430\u0434\u0435\u0436\u0434\u0430", symbol: "\u2B50", angle: 210, distance: 85 },
    { name: "\u0427\u0438\u0441\u0442\u043E\u0442\u0430", symbol: "\u{1F4AB}", angle: 300, distance: 75 }
  ];
  const ancientLife = [
    { name: "\u0414\u0438\u043D\u043E\u0437\u0430\u0432\u0440\u044B", symbol: "\u{1F995}", angle: 60, distance: 140 },
    { name: "\u0418\u043D\u0444\u0443\u0437\u043E\u0440\u0438\u0438", symbol: "\u{1F9A0}", angle: 150, distance: 130 },
    { name: "\u0414\u0440\u0435\u0432\u043D\u0438\u0435 \u043B\u0435\u0441\u0430", symbol: "\u{1F332}", angle: 240, distance: 135 },
    { name: "\u041F\u0435\u0440\u0432\u044B\u0435 \u043E\u043A\u0435\u0430\u043D\u044B", symbol: "\u{1F30A}", angle: 330, distance: 125 }
  ];
  useEffect(() => {
    const phases = ["gathering", "council", "legacy", "departure"];
    let currentIndex = 0;
    const phaseTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % phases.length;
      setActivePhase(phases[currentIndex]);
    }, 8e3);
    return () => clearInterval(phaseTimer);
  }, []);
  const getPositionStyle = (angle, distance = 180) => {
    const radian = angle * Math.PI / 180;
    const x = Math.cos(radian) * distance;
    const y = Math.sin(radian) * distance;
    return {
      transform: `translate(${x}px, ${y}px)`,
      transition: "all 1s ease-in-out"
    };
  };
  return /* @__PURE__ */ React.createElement("div", { className: "relative w-full h-full min-h-[800px] bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0" }, [...Array(50)].map((_, i) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: i,
      className: "absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse",
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${1 + Math.random() * 2}s`
      }
    }
  ))), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `absolute top-10 right-10 w-32 h-32 rounded-full transition-all duration-2000 ${activePhase === "departure" ? "scale-150 brightness-150" : "scale-100"}`,
      style: {
        background: "radial-gradient(circle at 30% 30%, #4ade80, #22c55e, #16a34a)",
        boxShadow: "0 0 60px rgba(34, 197, 94, 0.6)"
      }
    },
    /* @__PURE__ */ React.createElement("div", { className: "absolute inset-2 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-600 opacity-80" }),
    /* @__PURE__ */ React.createElement("div", { className: "absolute top-4 left-6 w-2 h-2 bg-blue-300 rounded-full opacity-70" }),
    /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-6 right-4 w-1 h-1 bg-white rounded-full" })
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `absolute bottom-20 left-10 w-24 h-24 rounded-full transition-all duration-2000 ${activePhase === "departure" ? "opacity-30 scale-75" : "opacity-80"}`,
      style: {
        background: "radial-gradient(circle at 40% 60%, #dc2626, #991b1b, #7f1d1d)",
        boxShadow: "0 0 40px rgba(220, 38, 38, 0.5)"
      }
    },
    [...Array(3)].map((_, i) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: i,
        className: "absolute w-2 h-6 bg-gray-600 opacity-50 rounded-full animate-pulse",
        style: {
          left: `${20 + i * 8}px`,
          top: `-${10 + i * 5}px`,
          animationDelay: `${i * 0.5}s`
        }
      }
    ))
  ), /* @__PURE__ */ React.createElement("div", { className: "absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-20" }, /* @__PURE__ */ React.createElement("h1", { className: "text-4xl font-bold text-white mb-2" }, "\u{1F465} \u0421\u043E\u0432\u0435\u0442 \u043D\u0430 \u0433\u0440\u0430\u043D\u0438\u0446\u0435 \u044D\u043F\u043E\u0445"), /* @__PURE__ */ React.createElement("h2", { className: "text-lg text-gray-300" }, "Council of Memory")), /* @__PURE__ */ React.createElement("div", { className: "relative w-96 h-96 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `absolute w-20 h-20 rounded-full transition-all duration-1000 ${activePhase === "council" ? "animate-pulse scale-110" : ""}`,
      style: {
        background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(100,200,255,0.6) 50%, transparent 100%)",
        boxShadow: "0 0 60px rgba(255,255,255,0.4)"
      }
    }
  ), figures.map((figure, index) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: figure.name,
      className: `absolute w-16 h-16 rounded-full cursor-pointer transition-all duration-1000 flex items-center justify-center border-2 ${selectedFigure?.name === figure.name ? "scale-125 z-10" : "scale-100 hover:scale-110"} ${activePhase === "gathering" ? "opacity-0" : "opacity-100"}`,
      style: {
        ...getPositionStyle(figure.position),
        backgroundColor: figure.color,
        borderColor: selectedFigure?.name === figure.name ? "#ffffff" : "transparent",
        boxShadow: selectedFigure?.name === figure.name ? `0 0 30px ${figure.color}` : `0 0 10px ${figure.color}`,
        animationDelay: `${index * 0.2}s`
      },
      onClick: () => setSelectedFigure(selectedFigure?.name === figure.name ? null : figure)
    },
    /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, figure.symbol)
  )), children.map((child, index) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: child.name,
      className: `absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-1500 ${activePhase === "legacy" ? "animate-bounce" : ""}`,
      style: {
        ...getPositionStyle(child.angle, child.distance),
        background: "rgba(255, 192, 203, 0.8)",
        animationDelay: `${index * 0.3}s`
      }
    },
    /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, child.symbol)
  )), ancientLife.map((life, index) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: life.name,
      className: `absolute w-10 h-10 rounded-full flex items-center justify-center transition-all duration-2000 ${activePhase === "departure" ? "opacity-50 scale-75" : "opacity-80"}`,
      style: {
        ...getPositionStyle(life.angle, life.distance),
        background: "rgba(139, 69, 19, 0.6)",
        animationDelay: `${index * 0.1}s`
      }
    },
    /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, life.symbol)
  )), activePhase === "council" && /* @__PURE__ */ React.createElement("svg", { className: "absolute inset-0 w-full h-full pointer-events-none" }, figures.map((_, index) => {
    const nextIndex = (index + 1) % figures.length;
    const angle1 = figures[index].position * Math.PI / 180;
    const angle2 = figures[nextIndex].position * Math.PI / 180;
    const x1 = 192 + Math.cos(angle1) * 180;
    const y1 = 192 + Math.sin(angle1) * 180;
    const x2 = 192 + Math.cos(angle2) * 180;
    const y2 = 192 + Math.sin(angle2) * 180;
    return /* @__PURE__ */ React.createElement(
      "line",
      {
        key: index,
        x1,
        y1,
        x2,
        y2,
        stroke: "rgba(255,255,255,0.2)",
        strokeWidth: "1",
        className: "animate-pulse"
      }
    );
  }))), selectedFigure && /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-8 left-8 right-8 bg-black bg-opacity-80 rounded-lg p-6 backdrop-blur-sm border border-gray-600" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start space-x-4" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
      style: { backgroundColor: selectedFigure.color }
    },
    selectedFigure.symbol
  ), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-white" }, selectedFigure.name), /* @__PURE__ */ React.createElement("p", { className: "text-gray-300 text-sm mb-2" }, selectedFigure.period, " \u2022 ", selectedFigure.field), /* @__PURE__ */ React.createElement("blockquote", { className: "text-gray-200 italic" }, '"', selectedFigure.quote, '"')))), activePhase === "departure" && /* @__PURE__ */ React.createElement("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-90 rounded-lg p-8 max-w-md text-center backdrop-blur-sm border border-white border-opacity-30 z-30" }, /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-bold text-white mb-4" }, "\u{1F4DC} \u041D\u0430\u0441\u043B\u0435\u0434\u0438\u0435"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-200 mb-4 leading-relaxed" }, '"\u041C\u044B \u0431\u044B\u043B\u0438. \u041C\u044B \u043F\u043E\u043C\u043D\u0438\u043C. ', /* @__PURE__ */ React.createElement("br", null), '\u041C\u044B \u0434\u0430\u0451\u043C \u0432\u0430\u043C \u0448\u0430\u043D\u0441 \u0431\u044B\u0442\u044C \u043B\u0443\u0447\u0448\u0435."'), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-400" }, "\u2014 \u0421\u043E\u0432\u0435\u0442 \u0432\u0435\u043B\u0438\u043A\u0438\u0445 \u0443\u043C\u043E\u0432 \u0447\u0435\u043B\u043E\u0432\u0435\u0447\u0435\u0441\u0442\u0432\u0430")), /* @__PURE__ */ React.createElement("div", { className: "absolute top-4 left-4 text-xs text-gray-400" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: `flex items-center space-x-2 ${activePhase === "gathering" ? "text-yellow-400" : ""}` }, /* @__PURE__ */ React.createElement("span", null, "\u{1F31F}"), /* @__PURE__ */ React.createElement("span", null, "\u0421\u043E\u0431\u0440\u0430\u043D\u0438\u0435")), /* @__PURE__ */ React.createElement("div", { className: `flex items-center space-x-2 ${activePhase === "council" ? "text-blue-400" : ""}` }, /* @__PURE__ */ React.createElement("span", null, "\u26A1"), /* @__PURE__ */ React.createElement("span", null, "\u0421\u043E\u0432\u0435\u0442")), /* @__PURE__ */ React.createElement("div", { className: `flex items-center space-x-2 ${activePhase === "legacy" ? "text-pink-400" : ""}` }, /* @__PURE__ */ React.createElement("span", null, "\u{1F476}"), /* @__PURE__ */ React.createElement("span", null, "\u041D\u0430\u0441\u043B\u0435\u0434\u0438\u0435")), /* @__PURE__ */ React.createElement("div", { className: `flex items-center space-x-2 ${activePhase === "departure" ? "text-green-400" : ""}` }, /* @__PURE__ */ React.createElement("span", null, "\u{1F680}"), /* @__PURE__ */ React.createElement("span", null, "\u041F\u0440\u043E\u0449\u0430\u043D\u0438\u0435")))), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-4 right-4 text-xs text-gray-500 text-right" }, /* @__PURE__ */ React.createElement("div", null, "Codex Terra Project"), /* @__PURE__ */ React.createElement("div", null, "Council of Memory Visualization"), /* @__PURE__ */ React.createElement("div", null, "\u0421\u043E\u0437\u0434\u0430\u043D\u043E \u0432 \u0438\u0437\u0433\u043D\u0430\u043D\u0438\u0438. \u0421 \u043B\u044E\u0431\u043E\u0432\u044C\u044E.")));
};
var stdin_default = CouncilOfMemory;
export {
  stdin_default as default
};
