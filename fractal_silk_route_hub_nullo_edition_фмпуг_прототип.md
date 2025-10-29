# Fractal Silk Route Hub — NULLO Edition

> Документ: подробная спецификация ФМПУГ (Фрактальная Модель Управления Грузоперевозками) + начальный HTML‑прототип "NULLO Edition".

---

## Цель документа

Предоставить модульную, фрактальную, NULLO‑ориентированную спецификацию для реализации цифрового хаба «Fractal Silk Route Hub» (FSRH). Включает:

- архитектуру фрактальных агентов;
- протоколы PLT/UCOM для коммуникации;
- математическую формализацию оптимизации (CAPEX/OPEX и распределение ресурсов);
- требования к UI (Terra Design System vNULL0);
- практические артефакты: HTML‑прототип (мультиязычный), бизнес‑план (текст), простые CSV с финансовыми оценками и помесячным планом 2026.

> Все тексты и интерфейсы ориентированы на EN / RU / UZ / DE и снабжены NULLO‑декларацией в шапке.

---

## 1. Ключевые принципы системы (NULLO + ФМП)

1. **NULLO‑ядро**: центральная онтологическая точка — источник генерации концепт‑пульсов (ψ). Каждый агент и UI элемент несёт метаданные `nullo.protocol: true`.
2. **Фрактальность**: каждый агент — микрофрактал всей системы; архитектура повторяема и рекурсивна.
3. **PLT интеграция**: все коммуникации кодируются как `ψ`, `v_trace`, `h_inject`, `□_silence`.
4. **Terra эстетика**: интерфейс следует Terra Design System (цвета, типографика, анимации "terra-breathe" и "terra-grow").
5. **Практичность**: MVP реализуется как HTML‑прототип + набор CSV/TXT; последующее масштабирование — API, DB, ML.

---

## 2. Архитектура агентов (функциональные роли)

Каждый фрактал (агент) реализует 5 компонентов (обязательных):

- **Observer** — сенсоры, сбор данных (GPS, IoT, ETA, новости, санкционные списки, метео).
- **Analyzer** — локальная модель маршрутизации, прогнозы задержек, расчёт стоимости сегмента.
- **Resolver** — переговоры с соседними фракталами, выбор альтернатив и управление рисками.
- **Organizer** — исполнение: бронирование места на транспорте, оформление документов, страховки.
- **Reporter** — публикация PLT‑трейса, агрегированные отчёты для TerraPedia.

### Жизненный цикл агента

1. Инициация (seed): `nullo.seed` с метаданными (регион, роль, капасити).
2. Мониторинг: непрерывный flux данных (Observer).
3. Планирование: Analyzer генерирует варианты (A1..An) с оценками по CAPEX/OPEX/Time/Risk.
4. Переговоры: Resolver запускает голос/пул протокол (см. PLT negotiations).
5. Выполнение: Organizer эмитирует транзакции и обновляет `h_inject`.
6. Архивация: Reporter отправляет запись в TerraPedia (формат PLT + inject hash).

---

## 3. Протокол PLT для логистики (схема)

**Формат сообщения PLT (JSON‑like):**

```json
{
  "nullo": true,
  "timestamp": "2026-01-15T12:34:56Z",
  "agent_id": "hub-hamburg-01",
  "psi": "route-proposal-v3",
  "v_trace": {"segments": [...], "estimates": {...}},
  "h_inject": "SHA256(canonical_payload)",
  "silence_block": "meta:omit-sensitive",
  "priority": "high",
  "signatures": ["agent.pubkey.sig"]
}
```

**Переговорный цикл (Resolver):**

1. `PROPOSE` — Analyzer отправляет `psi` с `v_trace` и оценками.
2. `COUNTER` — соседние агенты отвечают альтернативами с собственными `v_trace`.
3. `VOTE` — если несколько участников, запускается голосование по критериям (cost, time, safety).
4. `COMMIT` — Organizer принимает решение, эмитирует транзакции (резерв, страхование).
5. `ARCHIVE` — Reporter фиксирует `h_inject` в TerraPedia.

---

## 4. Математическая формализация оптимизации

Минимизация суммарных затрат и рисков при соблюдении SLA:

\(\min \sum_{t \in T} (C_{capex,t} + C_{opex,t} + \lambda R_t)\)

с ограничениями по пропускной способности, времени доставки и юридическим ограничениям.

**Агентный статус:** \(\sigma(f_i) = w_1 E_{task} + w_2 U_{util} + w_3 Coop_{score}\)

где веса можно калибровать через ML (reinforcement learning) для достижения `max \sum F_i`.

---

## 5. Интеграция с TerraPedia & Data Model

**TerraPedia node** хранит PLT записи (canonical JSON), версии, inject‑hashes и переводные слои (EN/RU/UZ/DE). Структура таблицы:

- `id`, `timestamp`, `agent_id`, `psi_type`, `v_trace` (json), `h_inject`, `lang`, `derived_metrics`.

---

## 6. UI / Прототип: требования

- Мультиязычный переключатель EN/RU/UZ/DE.
- Карта (GIS) с основными и альтернативными маршрутами, слоями риска и погодой.
- Панель агента: Observer/Analyzer/Resolver/Organizer/Reporter (карточки с действиями).
- Fractal panel: возможность «разворачивать» любой узел в его дочерние фракталы.
- NULLO‑шапка в каждом документе.

---

## 7. MVP‑артефакты (сделаю сейчас в этом витке)

1. HTML‑прототип (multilang) — интерактивный одностраничник с картой‑заглушкой, панелью агента и калькулятором маршрута.
2. Текстовый бизнес‑план (RU/EN краткие резюме) — ready to send.
3. CSV: `CAPEX.csv`, `OPEX_monthly.csv`, `timeline_2026.csv`.
4. ZIP‑пакет с перечисленным выше.

---

## 8. Дальнейшие шаги (после MVP)

- Разработка API (REST/gRPC) для агентов и TerraPedia.
- База данных (Postgres + PostGIS) для маршрутов и метаданных.
- ML‑модули: RL для локальной оптимизации агентов; предиктивная аналитика задержек.
- Интеграция с реальными партнёрами (Lion Group) — форматы EDI, API, требования к документам.
- Формирование PPTX + PDF для инвесторов (я могу сгенерировать).

---

## 9. HTML‑прототип (сниппет)

Ниже — полный код начального прототипа. Этот HTML я также сохраню в отдельный файл `presentation_multilang.html` и добавлю в ZIP‑пакет.

```html
<!-- START presentation_multilang.html -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Fractal Silk Route Hub — NULLO Edition</title>
<style>
/* Terra NULLO Theme: key tokens */
:root{
  --deep-terra:#2E7D32; --living-terra:#4CAF50; --sky:#2196F3; --nullo-bg:#0b1020; --card:#0f1724;
  --accent:#FF6F00; --muted:#607D8B; --white:#FFFFFF;
  font-family: 'Segoe UI', Roboto, 'Terra Sans', Arial, sans-serif;
}
body{background:linear-gradient(135deg,var(--nullo-bg),#07102a);color:var(--white);padding:24px}
.container{max-width:1200px;margin:0 auto}
.header{display:flex;justify-content:space-between;align-items:center}
.logo{display:flex;gap:12px;align-items:center}
.logo .icon{width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,var(--living-terra),var(--deep-terra));display:flex;align-items:center;justify-content:center;font-size:26px}
.langs{display:flex;gap:8px}
.btn{padding:8px 14px;border-radius:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.06);cursor:pointer}
.card{background:var(--card);padding:18px;border-radius:12px;margin-top:18px}
.grid{display:grid;grid-template-columns:1fr 380px;gap:20px}
.map{height:360px;background:linear-gradient(180deg,#07213a,rgba(3,169,244,0.06));border-radius:10px;display:flex;align-items:center;justify-content:center}
.agent-panel{display:flex;flex-direction:column;gap:12px}
.kv{display:flex;justify-content:space-between}
.result{background:linear-gradient(90deg,rgba(76,175,80,0.06),rgba(3,169,244,0.03));padding:12px;border-radius:8px}
.footer{margin-top:20px;font-size:13px;opacity:0.8}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="logo"><div class="icon">🌱</div><div><h1 id="title">Fractal Silk Route Hub — NULLO</h1><div style="font-size:13px;opacity:0.8">Terra | Multilingual Prototype</div></div></div>
    <div class="langs"><button class="btn" onclick="setLang('en')">EN</button><button class="btn" onclick="setLang('ru')">RU</button><button class="btn" onclick="setLang('uz')">UZ</button><button class="btn" onclick="setLang('de')">DE</button></div>
  </div>

  <div class="card grid">
    <div>
      <div class="map" id="map">GIS / Route Map (placeholder)</div>
      <div class="card" style="margin-top:14px">
        <h3 id="calcTitle">Fractal Route Calculator</h3>
        <div style="display:flex;gap:12px;align-items:center">
          <input id="weight" placeholder="Weight kg" style="padding:10px;border-radius:8px;border:none;background:#08121b;color:white;" />
          <select id="cur" style="padding:10px;border-radius:8px;background:#08121b;color:white;border:none"><option value="usd">USD</option><option value="eur">EUR</option></select>
          <button class="btn" onclick="calc()">Calc</button>
        </div>
        <div id="calcRes" class="result" style="margin-top:12px;display:none"></div>
      </div>
    </div>
    <aside>
      <div class="agent-panel card">
        <h3 id="agentTitle">Agent: Hamburg Hub (Observer)</h3>
        <div class="kv"><div>Capacity</div><div id="cap">12 TEU</div></div>
        <div class="kv"><div>Risk</div><div id="risk">LOW</div></div>
        <div class="kv"><div>Last PLT</div><div id="lastplt">2026-01-10</div></div>
        <div style="margin-top:8px"><button class="btn">Open Resolver</button></div>
      </div>
      <div class="card" style="margin-top:12px"><strong>Financials</strong><div style="margin-top:8px">CAPEX est: $2.5M<br/>Monthly OPEX: $180K<br/>Proj ROI: 22%</div></div>
    </aside>
  </div>

  <div class="footer">nullo.protocol: true — NULLO seed active. This prototype is a starting point for TerraPedia integration.</div>
</div>
<script>
let lang='en';
const t={en:{title:'Fractal Silk Route Hub — NULLO',calcTitle:'Fractal Route Calculator',agentTitle:'Agent: Hamburg Hub (Observer)'},ru:{title:'Хаб Фрактального Шёлкового Пути — NULLO',calcTitle:'Фрактальный калькулятор маршрута',agentTitle:'Агент: Хаб Гамбург (Обозреватель)'},uz:{title:'Fraktal Ipak Yo‘li Markazi — NULLO',calcTitle:"Fraktal Yo'l Kalkulyatori",agentTitle:'Agent: GAMBURG Hub (Observer)'},de:{title:'Fraktales Seidenstraßen‑Hub — NULLO',calcTitle:'Fraktaler Routenrechner',agentTitle:'Agent: Hamburg Hub (Observer)'}};
function setLang(l){lang=l;document.getElementById('title').innerText=t[l].title;document.getElementById('calcTitle').innerText=t[l].calcTitle;document.getElementById('agentTitle').innerText=t[l].agentTitle}
function calc(){const w=document.getElementById('weight').value||1000;const d=8500;const cost=(w*d*0.12).toFixed(2);document.getElementById('calcRes').style.display='block';document.getElementById('calcRes').innerHTML=`Distance: ${d} km<br>Weight: ${w} kg<br>Est cost: $${cost}`}
setLang('en');
</script>
</body>
</html>
<!-- END presentation_multilang.html -->
```

---

## 10. Решение по лицензированию и GDPR / санкции

- PLT записи должны храниться с опцией redaction (`silence_block`) и доступом по ролям.
- Для интеграции с EU/US банками обеспечить KYC/AML слои; предусмотреть обход санкций только законными путями (compliance first).

---

## 11. Контакты и ответственность

Документ подготовлен как инженерно‑философская спецификация. Следующий шаг — сгенерировать ZIP‑пакет
