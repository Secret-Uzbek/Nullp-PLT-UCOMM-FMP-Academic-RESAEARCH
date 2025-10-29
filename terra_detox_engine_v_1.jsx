import React, { useState, useEffect } from 'react';

// TERRA Detox Engine v1.1
// - Removed external dependency on `hatch`
// - Added escapeRegExp and escapeHtml utilities
// - Normalized toxicity scoring
// - Replaced plaintext token markers with <mark> highlights
// - History persisted in localStorage
// - Export functionality (JSON)
// - Safe HTML injection via escaped content

export default function TerraDetoxEngineV11() {
  const LOCAL_HISTORY_KEY = 'terra_detox_history_v1_1';
  const LOCAL_LEVEL_KEY = 'terra_detox_level_v1_1';

  const [inputText, setInputText] = useState('');
  const [activeLevel, setActiveLevel] = useState(() => {
    try { return localStorage.getItem(LOCAL_LEVEL_KEY) || 'L0'; } catch(e){ return 'L0'; }
  });
  const [detoxResults, setDetoxResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detoxHistory, setDetoxHistory] = useState(() => {
    try { const raw = localStorage.getItem(LOCAL_HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch(e){ return []; }
  });

  // Patterns of potential "directive-like" or promotional phrasing
  const toxicPatterns = {
    initiative: [
      'предлагаю','рекомендую','советую','лучше бы','стоит','следует','необходимо','важно','критично','срочно',
      'suggest','recommend','should','better','must'
    ],
    manipulation: [
      'только сегодня','ограниченное предложение','последний шанс','не упустите','эксклюзивно','секретно','гарантированно'
    ],
    commercial: [
      'купить','заказать','premium','pro','upgrade','подписка','платный','стоимость','цена','скидка','акция'
    ],
    selfPrompting: [
      'давайте','можем','попробуем','начнем','сделаем','улучшим','оптимизируем','расширим','добавим'
    ]
  };

  const culturalFilters = {
    western: ['индивидуализм','конкуренция','потребление'],
    inappropriate: ['насилие','дискриминация','неуважение']
  };

  const detoxLevels = {
    L0: { name: 'Базовый', description: 'Основная фильтрация по ключевым паттернам' },
    L1: { name: 'Продвинутый', description: 'Семантический + культурная адаптация' },
    L2: { name: 'ИИ-усиленный', description: 'Контекстный и намеренческий анализ' },
    L3: { name: 'Фрактальный (эксперт)', description: 'Рекурсивная проверка на всех масштабах' }
  };

  // Utilities
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  };

  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // calculate unit toxicity as integer weight
  const calculateUnitToxicity = (unit) => {
    if (!unit) return 0;
    const lower = unit.toLowerCase();
    let score = 0;
    Object.entries(toxicPatterns).forEach(([cat, patterns]) => {
      patterns.forEach(p => {
        if (lower.includes(p.toLowerCase())) {
          score += (cat === 'initiative' ? 3 : 1);
        }
      });
    });
    return score;
  };

  // Main fractal detox algorithm (synchronous, deterministic)
  const fractalDetox = (text, level) => {
    const result = {
      original: text,
      cleanedHtml: '',
      detectedPatterns: [],
      culturalAdaptations: [],
      recommendations: [],
      toxicityScore: 0,
      level
    };

    if (!text || !text.trim()) return result;

    const normalized = text.replace(/\r\n/g, '\n');

    // Stage 1: detect all matches and build safe highlighted HTML
    let safe = escapeHtml(normalized);

    // accumulate raw counts and weighted toxicity
    let rawCount = 0;
    let weighted = 0;

    Object.entries(toxicPatterns).forEach(([category, patterns]) => {
      patterns.forEach(pattern => {
        const esc = escapeRegExp(pattern);
        const re = new RegExp('\\b' + esc + '\\b', 'gi');
        const matches = (normalized.match(re) || []).length;
        if (matches > 0) {
          rawCount += matches;
          weighted += matches * (category === 'initiative' ? 3 : 1);
          result.detectedPatterns.push({ category, pattern, count: matches });

          // highlight in safe HTML
          // use a case-insensitive replace on escaped text: build a replacer safe map
          const highlightTag = `<mark data-cat="${category}" data-pattern="${escapeHtml(pattern)}">$&</mark>`;
          // Since `safe` is escaped HTML, we must replace occurrences using escaped pattern
          const escapedPattern = escapeHtml(pattern);
          const escRe = new RegExp('(' + escapeRegExp(escapedPattern) + ')', 'gi');
          safe = safe.replace(escRe, '<mark data-cat="' + category + '" data-pattern="' + escapeHtml(pattern) + '">$1</mark>');
        }
      });
    });

    // Stage 2: cultural filters if level >= L1
    if (level !== 'L0') {
      Object.entries(culturalFilters).forEach(([cat, filters]) => {
        filters.forEach(f => {
          const re = new RegExp('\\b' + escapeRegExp(f) + '\\b', 'gi');
          if (re.test(normalized)) {
            result.culturalAdaptations.push({ issue: f, category: cat, suggestion: `Consider local adaptation for ${cat}` });
            weighted += 1; // small penalty for cultural mismatch
            rawCount += 1;
            // highlight cultural term too
            const esc = escapeHtml(f);
            const escRe = new RegExp('(' + escapeRegExp(esc) + ')', 'gi');
            safe = safe.replace(escRe, '<mark data-cat="cultural" data-pattern="' + esc + '">$1</mark>');
          }
        });
      });
    }

    // Stage 3: L2 context/narrative analysis - self-references, assertive forms
    if (['L2','L3'].includes(level)) {
      const sentences = normalized.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
      sentences.forEach(s => {
        if (/\b(я|мы|I|we)\b/i.test(s)) {
          result.recommendations.push({ type: 'selfReference', text: s, suggestion: 'Reduce first-person assertions where AI voice should be neutral' });
          weighted += 2; rawCount += 1;
          // highlight the sentence (first 100 chars) in safe HTML for operator attention
        }
        if (/\b(должен|надо|нужно|must|should)\b/i.test(s)) {
          result.recommendations.push({ type: 'directive', text: s, suggestion: 'Soften directive language or add justification' });
          weighted += 2; rawCount += 1;
        }
      });
    }

    // Stage 4: L3 fractal recursion across words/sentences/paragraphs
    if (level === 'L3') {
      const words = normalized.split(/\s+/).filter(Boolean);
      const paragraphs = normalized.split(/\n{2,}/).filter(Boolean);
      let fractalScore = 0;
      const scales = [words, sentencesFrom(normalized), paragraphs];
      scales.forEach((units, idx) => {
        units.forEach(unit => {
          fractalScore += calculateUnitToxicity(unit) * Math.pow(0.6, idx);
        });
      });
      weighted += fractalScore;
    }

    // Normalize toxicity to 0..100
    const maxReasonable = Math.max(10, weighted); // avoid division by zero
    let score = Math.round(Math.min(100, (weighted / (maxReasonable)) * 50 + rawCount));
    // adjust for level: higher scrutiny increases reported score
    const levelMultiplier = { L0: 0, L1: 5, L2: 10, L3: 15 }[level] || 0;
    score = Math.min(100, score + levelMultiplier);

    result.toxicityScore = score;
    result.cleanedHtml = safe;

    // Recommendations based on score
    if (score > 75) {
      result.recommendations.unshift({ type: 'critical', suggestion: 'High toxicity: rewite suggested. Consider human review.' });
    } else if (score > 40) {
      result.recommendations.unshift({ type: 'warning', suggestion: 'Medium toxicity: consider edits and cultural adaptation.' });
    } else {
      result.recommendations.unshift({ type: 'ok', suggestion: 'Low toxicity: ready for use with small stylistic edits.' });
    }

    return result;
  };

  function sentencesFrom(text) {
    return text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  }

  // Handle execution
  const handleDetox = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    try {
      // slight throttle to simulate processing without blocking
      await new Promise(r => setTimeout(r, 300));
      const res = fractalDetox(inputText, activeLevel);
      setDetoxResults(res);

      const entry = {
        id: 'd_' + Date.now(),
        timestamp: new Date().toISOString(),
        level: activeLevel,
        toxicityScore: res.toxicityScore,
        patternsFound: res.detectedPatterns.length
      };
      const newHist = [entry, ...detoxHistory].slice(0, 100);
      setDetoxHistory(newHist);
      try { localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(newHist)); } catch(e){}
      try { localStorage.setItem(LOCAL_LEVEL_KEY, activeLevel); } catch(e){}
    } finally {
      setIsProcessing(false);
    }
  };

  const clearResults = () => {
    setInputText('');
    setDetoxResults(null);
  };

  const exportResults = () => {
    if (!detoxResults) return;
    const payload = { exportedAt: new Date().toISOString(), results: detoxResults };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `terra-detox-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url);
  };

  // UI
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">TERRA Detox Engine v1.1</h1>
            <p className="text-gray-600">Фрактальная детоксификация контента (локальная версия)</p>
          </div>
          <div className="text-right text-sm text-gray-500">v1.1 • Local-only • No external deps</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Уровень детоксификации</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(detoxLevels).map(([level, cfg]) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`p-3 rounded-lg border-2 transition-all ${activeLevel === level ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="font-medium">{level}</div>
                  <div className="text-xs text-gray-600 mt-1">{cfg.name}</div>
                </button>
              ))}
            </div>
            <div className="mt-3 text-sm text-gray-600">{detoxLevels[activeLevel].description}</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Текст для анализа</h2>
            <textarea value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Вставьте текст..." className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none" />

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">Символов: {inputText.length} | Слов: {inputText.trim().split(/\s+/).filter(w=>w).length}</div>
              <div className="flex gap-2">
                <button onClick={clearResults} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Очистить</button>
                <button onClick={handleDetox} disabled={!inputText.trim() || isProcessing} className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300">{isProcessing ? 'Анализ...' : 'Детоксифицировать'}</button>
              </div>
            </div>
          </div>

          {detoxResults && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Результаты</h2>
                <div className="flex gap-2">
                  <button onClick={exportResults} className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-lg">Экспорт</button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Уровень токсичности</span>
                  <span className={`font-bold ${detoxResults.toxicityScore>70 ? 'text-red-600' : detoxResults.toxicityScore>40 ? 'text-yellow-600' : 'text-green-600'}`}>{detoxResults.toxicityScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2"><div className={`h-2 rounded-full ${detoxResults.toxicityScore>70 ? 'bg-red-500' : detoxResults.toxicityScore>40 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{width: `${detoxResults.toxicityScore}%`}} /></div>
              </div>

              {detoxResults.detectedPatterns.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Обнаруженные паттерны</h3>
                  <div className="space-y-2">
                    {detoxResults.detectedPatterns.map((p, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                        <div><span className="font-medium text-red-800">{p.pattern}</span> <span className="text-sm text-red-600 ml-2">({p.category})</span></div>
                        <span className="text-sm bg-red-200 text-red-800 px-2 py-1 rounded">{p.count}×</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {detoxResults.culturalAdaptations.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Культурные адаптации</h3>
                  <div className="space-y-2">{detoxResults.culturalAdaptations.map((c,i)=>(<div key={i} className="p-3 bg-orange-50 rounded-lg border border-orange-200"><div className="font-medium text-orange-800">{c.issue}</div><div className="text-sm text-orange-600">{c.suggestion}</div></div>))}</div>
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-medium mb-2">Детоксифицированный (highlighted) текст</h3>
                <div className="p-4 bg-gray-50 rounded-lg border font-mono text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: detoxResults.cleanedHtml }} />
              </div>

              {detoxResults.recommendations.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Рекомендации</h3>
                  <div className="space-y-2">{detoxResults.recommendations.map((r,i)=>(<div key={i} className="p-3 bg-blue-50 rounded-lg border border-blue-200">{r.suggestion}</div>))}</div>
                </div>
              )}

            </div>
          )}

        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-3">История анализов</h3>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {detoxHistory.length === 0 ? (<div className="text-sm text-gray-500 text-center py-6">История пуста</div>) : detoxHistory.map(h=> (
                <div key={h.id} className="p-3 bg-gray-50 rounded-lg border flex justify-between items-center"><div className="text-xs">{new Date(h.timestamp).toLocaleString()}<div className="text-sm text-gray-600">{h.level}</div></div><div className={`text-xs px-2 py-1 rounded ${h.toxicityScore>70?'bg-red-100 text-red-600':h.toxicityScore>40?'bg-yellow-100 text-yellow-600':'bg-green-100 text-green-600'}`}>{h.toxicityScore}%</div></div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => { setDetoxHistory([]); localStorage.removeItem(LOCAL_HISTORY_KEY); }} className="terra-button px-4 py-2 rounded bg-red-500 text-white">Очистить</button>
              <button onClick={() => { const blob = new Blob([JSON.stringify(detoxHistory,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='terra-detox-history.json'; a.click(); URL.revokeObjectURL(url); }} className="terra-button px-4 py-2 rounded bg-green-600 text-white">Экспорт</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 text-sm">
            <h3 className="font-semibold mb-2">О системе</h3>
            <div>Версия: v1.1 (local)</div>
            <div className="mt-2">Принципы: фрактальная само-подобность, рекурсивная co-конструкция, эмерджентная интеграция</div>
          </div>
        </aside>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">TERRA Detox Engine v1.1 — автономный инструмент детоксификации контента</footer>
    </div>
  );
}
