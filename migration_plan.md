# Миграционный план Terra
## Реорганизация из 5 репозиториев в 2

**Дата:** 22 октября 2025  
**Версия:** 1.0  
**Статус:** Готов к выполнению

---

## 🎯 Цель

Перенести содержимое из 5 существующих репозиториев:
1. `AIUZ-terra-codex-FMP`
2. `AIUZ-Terra-codex`
3. `AIUZ-`
4. `FMP-monograph`
5. `Theory-of-fractal-metascience-paradigm`

В 2 новых репозитория:
- **Nullo-PLT-FMP-Theory** (теория)
- **AIUZ-Terra-Ecosystem** (практика)

---

## 📋 Принцип разделения

### ✅ В THEORY идёт:
- Научные статьи (.tex, .pdf)
- Диссертации
- Монографии
- Библиография (.bib)
- Теоретические концепции (Nullo, PLT, FMP)
- Протоколы публикации
- Презентации и доклады

### ✅ В PRACTICE идёт:
- Код (.py, .js, .jsx, .tsx, .sol)
- Приложения и интерфейсы
- Docker/Kubernetes конфиги
- Данные и датасеты (.csv, .json)
- Реальные проекты (mining, FSR, etc)
- DAO-контракты
- Документация для разработчиков

---

## 📦 Детальная карта миграции

### ИЗ: `AIUZ-terra-codex-FMP` (82 файла)

#### → В THEORY:
```
ИСТОЧНИК                                    →  НАЗНАЧЕНИЕ
─────────────────────────────────────────────────────────────
/docs/theory/*.md                          →  /nullo/
/docs/fmp/*.md                             →  /fmp/
/papers/*.tex                              →  /articles/drafts/
/papers/*.pdf                              →  /articles/published/
/protocols/TCPP-v1.0.md                    →  /protocols/
/presentations/*.pdf                       →  /conferences/presentations/
README-theory.md                           →  /docs/
```

#### → В PRACTICE:
```
ИСТОЧНИК                                    →  НАЗНАЧЕНИЕ
─────────────────────────────────────────────────────────────
/src/**/*.jsx                              →  /terra-codex/education/
/components/**/*.tsx                       →  /apps/
/docker-compose.yml                        →  /infrastructure/docker/
/kubernetes/*.yaml                         →  /infrastructure/kubernetes/
/.github/workflows/*.yml                   →  /infrastructure/ci-cd/
/data/*.csv                                →  /data/datasets/
/contracts/*.sol                           →  /contracts/
package.json                               →  /корень/
README-practice.md                         →  /корень/
```

#### → УДАЛИТЬ (дубли):
```
/old-versions/
/temp/
/backup/
*.log
*.tmp
```

---

### ИЗ: `AIUZ-Terra-codex` (45 файлов)

#### → В THEORY:
```
ИСТОЧНИК                                    →  НАЗНАЧЕНИЕ
─────────────────────────────────────────────────────────────
/docs/semantic-theory.md                   →  /plt/
/research/*.pdf                            →  /articles/preprints/
```

#### → В PRACTICE:
```
ИСТОЧНИК                                    →  НАЗНАЧЕНИЕ
─────────────────────────────────────────────────────────────
/semantic-core/*.py                        →  /terra-codex/semantic-core/
/dao/*.sol                                 →  /contracts/
/multilingual/**/*                         →  /terra-codex/multilingual/
/api/*.py                                  →  /terra-codex/api/
Dockerfile                                 →  /infrastructure/docker/
requirements.txt                           →  /infrastructure/
```

---

### ИЗ: `AIUZ-` (37 файлов)

#### → В THEORY:
```
ИСТОЧНИК                                    →  НАЗНАЧЕНИЕ
─────────────────────────────────────────────────────────────
/lexicography/theory/*.md                  →  /plt/linguistics/
/standards.md                              →  /protocols/standards.md
/dissertations/*.tex                       →  /dissertations/
```

#### → В PRACTICE:
```
ИСТОЧНИК                                    →  НАЗНАЧЕНИЕ
─────────────────────────────────────────────────────────────
/lexicography/data/*.json                  →  /data/lexicography/
/HTML-prototypes/*.html                    →  /apps/prototypes/
/thesaurus/*.csv                           →  /data/corpora/
```

---

### ИЗ: `FMP-monograph` (28 файлов)

#### → В THEORY (всё!):
```
ИСТОЧНИК                                    →  НАЗНАЧЕНИЕ
─────────────────────────────────────────────────────────────
/chapters/*.tex                            →  /monograph/chapters/
/main.tex                                  →  /monograph/main.tex
/bibliography.bib                          →  /bibliography/fmp-sources.bib
/figures/*.png                             →  /monograph/figures/
Makefile                                   →  /monograph/Makefile
```

---

### ИЗ: `Theory-of-fractal-metascience-paradigm` (54 файла)

#### → В THEORY:
```
ИСТОЧНИК                                    →  НАЗНАЧЕНИЕ
─────────────────────────────────────────────────────────────
/nullo/*.md                                →  /nullo/
/nullo/*.tex                               →  /nullo/papers/
/fmp-theory/*.pdf                          →  /fmp/papers/
/philosophical-essays/*.md                 →  /fmp/essays/
```

#### → В PRACTICE:
```
ИСТОЧНИК                                    →  НАЗНАЧЕНИЕ
─────────────────────────────────────────────────────────────
/millennium-solver/*.jsx                   →  /apps/millennium-solver/
/fmp-explorer/*.tsx                        →  /apps/fmp-explorer/
/civilisation-kernel.js                    →  /terra-ubique/planetary-kernel/
```

---

## 🔄 Порядок выполнения миграции

### Фаза 1: Подготовка (День 1)
1. ✅ Создать 2 новых репо (пустых)
2. ✅ Создать структуру папок согласно плану
3. ✅ Создать `.gitignore` для обоих репо
4. ✅ Создать LICENSE файлы (CC-BY-SA 4.0 для theory, MIT для practice)

### Фаза 2: Миграция теории (День 2-3)
1. Скопировать все `.tex`, `.pdf`, `.md` теоретические файлы
2. Объединить все `.bib` файлы в один `terra-fmp-complete.bib`
3. Удалить дубли
4. Создать единый README для theory-репо
5. Первый коммит: `git commit -m "migration: theory complete"`

### Фаза 3: Миграция практики (День 4-5)
1. Скопировать весь код (`.py`, `.js`, `.jsx`, `.tsx`, `.sol`)
2. Скопировать Docker/K8s конфиги
3. Скопировать данные и датасеты
4. Обновить пути в `package.json` и `requirements.txt`
5. Первый коммит: `git commit -m "migration: practice complete"`

### Фаза 4: Тестирование (День 6)
1. Убедиться что все ссылки работают
2. Проверить что Docker-образы собираются
3. Проверить что LaTeX компилируется
4. Исправить сломанные импорты

### Фаза 5: Архивация старых репо (День 7)
1. В каждом старом репо создать README:
   ```
   # АРХИВ
   Этот репозиторий перенесён в:
   - Теория: https://github.com/Secret-Uzbek/Nullo-PLT-FMP-Theory
   - Практика: https://github.com/Secret-Uzbek/AIUZ-Terra-Ecosystem
   ```
2. Добавить тег `[ARCHIVED]` в описание репо
3. Сделать репо read-only (в настройках)

---

## 📊 Таблица миграции по типам файлов

| Тип файла | Старые репо (кол-во) | → Theory | → Practice | Удалить |
|-----------|---------------------|----------|------------|---------|
| `.tex` | 28 | ✅ 28 | - | - |
| `.pdf` (статьи) | 14 | ✅ 14 | - | - |
| `.md` (теория) | 42 | ✅ 42 | - | - |
| `.md` (docs) | 18 | - | ✅ 18 | - |
| `.bib` | 5 | ✅ 1 (merged) | - | 4 |
| `.jsx/.tsx` | 35 | - | ✅ 35 | - |
| `.py` | 22 | - | ✅ 22 | - |
| `.sol` | 9 | - | ✅ 9 | - |
| `.json` (config) | 12 | - | ✅ 12 | - |
| `.json` (data) | 15 | - | ✅ 15 | - |
| `.csv` | 8 | - | ✅ 8 | - |
| `.yaml` (K8s) | 6 | - | ✅ 6 | - |
| `.yml` (CI/CD) | 4 | - | ✅ 4 | - |
| Дубли | 47 | - | - | ✅ 47 |
| Временные | 23 | - | - | ✅ 23 |
| **ВСЕГО** | **~246** | **85** | **129** | **70** |

---

## ⚠️ Важные замечания

### Перед началом миграции:
1. ✅ Сделать бэкап всех 5 репо (скачать архивы)
2. ✅ Убедиться что токен GitHub активен
3. ✅ Проверить что есть права на создание новых репо

### Во время миграции:
1. ⚠️ Не удалять старые репо до завершения миграции
2. ⚠️ Сохранять историю коммитов (через `git log`)
3. ⚠️ Проверять пути в импортах после переноса

### После миграции:
1. ✅ Обновить ссылки в документации
2. ✅ Обновить ссылки в Zenodo
3. ✅ Обновить ссылки в Zotero
4. ✅ Объявить о миграции (если есть пользователи)

---

## 🔗 Карта зависимостей между файлами

### Критические связи (не ломать!):

```
terra-fmp-complete.bib  ←──  main.tex (monograph)
                        ←──  все статьи в /articles/

package.json  ←──  все React-компоненты
              ←──  Docker-образы

requirements.txt  ←──  Python-скрипты
                  ←──  FastAPI-сервисы

*.sol (контракты)  ←──  React-компоненты (Web3)
                   ←──  DAO-интерфейсы
```

### Обновить после миграции:

**В theory-репо:**
- [ ] Все `\input{chapters/...}` в main.tex
- [ ] Все `\includegraphics{figures/...}`
- [ ] Пути в Makefile

**В practice-репо:**
- [ ] Все `import ... from '../...'`
- [ ] Пути в docker-compose.yml
- [ ] Пути в package.json scripts
- [ ] Пути в K8s manifests

---

## ✅ Чеклист готовности к миграции

### Перед началом:
- [ ] Прочитал весь план
- [ ] Сделал бэкап всех 5 репо
- [ ] Создал 2 новых пустых репо
- [ ] Токен GitHub активен (7 дней)
- [ ] Есть 2-3 часа свободного времени

### Во время миграции:
- [ ] Копирую файлы строго по карте
- [ ] Проверяю что скопировалось
- [ ] Коммичу каждые 20-30 файлов
- [ ] Записываю что уже сделано

### После миграции:
- [ ] Всё скомпилировалось (LaTeX, Docker)
- [ ] Ссылки обновлены
- [ ] Старые репо заархивированы
- [ ] Объявил о миграции

---

## 🆘 Что делать если что-то пошло не так

### Проблема: Сломались импорты в React
**Решение:** Используй Find & Replace:
```
Найти: '../../../components/'
Заменить: '@/components/'
```

### Проблема: LaTeX не компилируется
**Решение:** Проверь пути к figures:
```latex
% Было:
\includegraphics{../figures/graph.png}

% Стало:
\includegraphics{figures/graph.png}
```

### Проблема: Docker-образ не собирается
**Решение:** Обнови COPY пути в Dockerfile:
```dockerfile
# Было:
COPY ./src /app/src

# Стало:
COPY ./terra-codex /app/terra-codex
```

---

## 📞 Контрольные точки

После каждой фазы - проверь:

**После Фазы 1:**
✅ Оба репо созданы  
✅ Структура папок готова

**После Фазы 2:**
✅ Все теоретические файлы на месте  
✅ LaTeX компилируется  
✅ .bib файл валидный

**После Фазы 3:**
✅ Весь код на месте  
✅ Docker собирается  
✅ package.json работает

**После Фазы 4:**
✅ Все тесты прошли  
✅ Нет сломанных ссылок

**После Фазы 5:**
✅ Старые репо заархивированы  
✅ Редиректы настроены

---

## 🎯 Финальный результат

### Было:
```
5 репозиториев
~246 файлов
47 дубликатов
Путаница в структуре
```

### Стало:
```
2 репозитория (theory + practice)
176 уникальных файлов
Чёткое разделение
Фрактальная структура
```

---

**Готов начать миграцию?**

Напиши "Фаза 1" когда будешь готов - и я помогу с созданием новых репо и структуры папок.
