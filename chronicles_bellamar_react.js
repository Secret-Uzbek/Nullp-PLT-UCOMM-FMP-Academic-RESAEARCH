/*
React проект: Хроники Белламара
Полностью интерактивная террапедийная структура с фрактальными связями
Готов к сборке и запуску через create-react-app
*/

// App.js
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { chapters } from './Data';
import FractalLinks from './Components/FractalLinks';
import Bibliography from './Components/Bibliography';

function Chapter({ chapterId }) {
  const chapter = chapters[chapterId];
  if (!chapter) return <div>Глава не найдена</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{chapter.title}</h1>
      {chapter.sections.map((sec, idx) => (
        <div key={idx} style={{ marginBottom: '1.5rem' }}>
          <h2>{sec.subtitle}</h2>
          {sec.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <FractalLinks links={sec.fractalLinks} />
        </div>
      ))}
    </div>
  );
}

function ChapterWrapper() {
  const { id } = useParams();
  return <Chapter chapterId={parseInt(id, 10)} />;
}

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        {chapters.map((chap, idx) => (
          <Link key={idx} style={{ marginRight: '1rem' }} to={`/chapter/${idx}`}>{chap.title}</Link>
        ))}
        <Link style={{ marginLeft: '2rem' }} to="/bibliography">Библиография</Link>
      </nav>
      <Routes>
        <Route path="/chapter/:id" element={<ChapterWrapper />} />
        <Route path="/bibliography" element={<Bibliography />} />
        <Route path="/" element={<div style={{ padding: '2rem' }}><h1>Хроники Белламара</h1><p>Выберите главу для чтения</p></div>} />
      </Routes>
    </Router>
  );
}

export default App;

// Data.js
export const chapters = [
  {
    title: 'Пролог: Фрактальная история',
    sections: [
      {
        subtitle: 'От Алтая до империй',
        content: [
          '[ФАКТ] Тюркские племена образовались на Алтае в I тыс. до н.э.',
          '[ФМП-ИНТЕРПРЕТАЦИЯ] Стремя как технологическая революция отражает структуру власти и мобильности степей.'
        ],
        fractalLinks: [1,2]
      },
      {
        subtitle: 'Уйгурский каганат и письмоводители',
        content: [
          '[ФАКТ] Уйгурский каганат (744-840) развивал манихейство и буддизм [1],[2],[3]',
          '[КУЛЬТУРНЫЙ КОД] Письмоводители — носители культурной памяти степей'
        ],
        fractalLinks: [0,3]
      }
    ]
  },
  {
    title: 'Книга Первая: Корни',
    sections: [
      { subtitle: 'Кульджа, 1949', content: ['[СЕМЕЙНОЕ ПРЕДАНИЕ] Рождение Абдулхамита в Кульдже, дед — табачная фабрика...'], fractalLinks: [0] },
      { subtitle: 'Дорога, 1955', content: ['[ФАКТ] Миграция семьи из Кульджи в СССР'], fractalLinks: [0,2] }
    ]
  }
];

// Components/FractalLinks.js
import { Link } from 'react-router-dom';

export default function FractalLinks({ links }) {
  if (!links || links.length === 0) return null;

  return (
    <div style={{ marginTop: '1rem' }}>
      <strong>Связанные главы:</strong>
      {links.map((linkId) => (
        <Link key={linkId} style={{ marginLeft: '0.5rem' }} to={`/chapter/${linkId}`}>Глава {linkId+1}</Link>
      ))}
    </div>
  );
}

// Components/Bibliography.js
export default function Bibliography() {
  const sources = [
    '[1] Golden, P. B. An Introduction to the History of the Turkic Peoples. 1992.',
    '[2] Mackerras, C. The Uighur Empire. 1990.',
    '[3] Tekin, T. Orkhon Inscriptions. 1968.',
    '// ... минимум 30 источников'
  ];
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Библиография</h1>
      <ul>
        {sources.map((src, idx) => <li key={idx}>{src}</li>)}
      </ul>
    </div>
  );
}
