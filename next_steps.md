# FMP_Post_Zenodo_Action_Plan.md

## ✅ Шаг 0 — фиксируем достижение
- DOI: 10.5281/zenodo.17404325
- PDF: FMP.pdf (12 стр., формулы, постулаты, литература)
- Лицензия: CC-BY 4.0 — свободное цитирование и копирование

---

### 🔮 Шаг 1 — «Цитатный щит» (24 ч)
- [ ] Добавить DOI в подпись почты: «ФМП: 10.5281/zenodo.17404325»
- [ ] Прикрепить DOI к ORCID-разделу «Works»
- [ ] Создать короткую ссылку: https://doi.org/10.5281/zenodo.17404325
- [ ] Сгенерировать QR-код 512 px → PNG → вставить в презентации

---

### 🪞 Шаг 2 — «Зеркало в мир» (48 ч)
- [ ] Загрузить PDF на ResearchGate как «Preprint» → auto-DOI-link
- [ ] Создать OSF-проект «FMP» → upload LaTeX + PDF → permanent GUID
- [ ] HAL (https://hal.science) → dépôt → выбрать «Preprint» → no review
- [ ] Google-Scholar увидит DOI ≈ через 3–7 дней

---

### 🧩 Шаг 3 — «Док-матрешка» (1 нед)
- [ ] Написать 1-стр. micro-paper (150 слов, 1 рис., 5 ссылок)
- [ ] Тема: «Hausdorff dimension of L0-L7 recursion»
- [ ] Категория arXiv: General Mathematics → без endorsement
- [ ] Сослаться на Zenodo-DOI → cross-ref повышает индексируемость

---

### 🧠 Шаг 4 — «Код = доказательство» (1–2 нед)
- [ ] Jupyter-notebook: `FMP_postulates_verification.ipynb`
- [ ] Ячейки:
  1. Постулат 1 → Python-функция `f(K)`
  2. Проверка self-similarity на случайных графах
  3. График `C(iteration)` → сходимость к фрактальному аттрактору
- [ ] Прикрепить notebook к Zenodo-записи → «Supplementary material»

---

### 🌐 Шаг 5 — «Open-source фундамент»
- [ ] GitHub-release `v1.0.0` → tag: `10.5281/zenodo.17404325`
- [ ] Структура репозитория: